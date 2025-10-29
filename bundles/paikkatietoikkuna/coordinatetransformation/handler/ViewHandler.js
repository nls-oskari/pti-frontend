import { StateHandler, controllerMixin, Messaging } from 'oskari-ui/util';
import { showInfoPopup } from '../view/InfoPopup';
import { showFilePopup } from '../view/FilePopup';
import { showConfirmPopup } from '../view/ConfirmPopup';
import { showClipboardPopup } from '../view/ClipboardPopup';
import { showMapSelectPopup, showMapPreviewPopup } from '../view/MapPopup';
import { SOURCE, MAP, BASE_URL, WATCH_JOB, WATCH_URL, FILE_DEFAULTS, ACTIONS, PAGINATION, SRS } from '../constants';
import { stateToPTIArray, stateToTransformRequest, stateToKomuRequest, parseKomuResponse, validateFileSettings, validateTransform, validateCoordinate, parseCoordinateValue, is3DSystem, getDimension, getLabelForMarker, getCoordinatesExtent } from '../helper';
import { parseFile, parseFileContents, parseValue } from './FileParser';
import { exportStateToFile } from './FileWriter';

const getInitialState = () => ({
    loading: false,
    source: SOURCE[0], // deprecated
    // TODO: maybe this isn't needed !!fileContents => source === 'file'
    // only file has special handling
    sources: [],
    inputSrs: null,
    outputSrs: null,
    inputHeightSrs: null,
    outputHeightSrs: null,
    files: [],
    fileContents: null,
    import: { ...FILE_DEFAULTS.import },
    export: { ...FILE_DEFAULTS.export },
    coordinates: [],
    results: [],
    transformed: false, // set false if coordinates or srs selections are updated
    pagination: { ...PAGINATION }
});

class UIHandler extends StateHandler {
    constructor (instance, loc, conf = {}) {
        super();
        this.instance = instance;
        this.sandbox = instance.getSandbox();
        this.loc = loc;
        this.infoPopup = null;
        this.filePopup = null;
        this.mapPopup = null;
        this.clipboardPopup = null;
        this.confirmPopup = null;
        this.setState(getInitialState());
        this.addStateListener(state => this.filePopup?.update(state));
        this.baseUrl = conf.url || BASE_URL;
        Oskari.urls.set(WATCH_JOB, WATCH_URL);
        this.log = Oskari.log('CoordTransHandler');
    }

    reset (closeFlyout) {
        const state = getInitialState();
        this.updateState(state);
        if (closeFlyout) {
            const flyout = this.instance.getFlyout();
            flyout.close();
        }
    }

    // deprecated
    setSource (source) {
        if (source === this.getState().source) {
            return;
        }
        if (this.getState().coordinates.length) {
            this.confirmSourceChange(source);
            return;
        }
        if (source === 'map') {
            const inputSrs = this.sandbox.getMap().getSrsName();
            this.updateState({ inputSrs });
            this.selectFromMap();
        }
        if (source === 'file') {
            this.showFileSettings('import');
        }
        this.updateState({ source });
    }

    addFromSource (source) {
        const { coordinates, inputSrs } = this.getState();
        if (source === ACTIONS.MAP) {
            const mapSrs = this.sandbox.getMap().getSrsName();
            if (inputSrs && inputSrs !== mapSrs) {
                this.confirmMapSrs(mapSrs);
                return;
            }
            this.updateState({ inputSrs: mapSrs });
            this.selectFromMap();
        } else if (source === ACTIONS.IMPORT) {
            if (coordinates.length) {
                this.confirmReset(() => this.showFileSettings('import'));
                return;
            }
            this.showFileSettings('import');
        } else if (source === ACTIONS.CLIPBOARD) {
            this.showClipboard();
        }
    }

    addSourceToState (source) {
        const { sources } = this.getState();
        if (!source || sources.includes(source)) {
            return;
        }
        this.updateState({ sources: [...sources, source] });
    }

    confirmReset (callback = () => {}) {
        const onChange = () => {
            this.updateState({ coordinates: [], results: [], sources: [] });
            this.closeConfirmPopup();
            callback();
        };
        const onConfirm = () => {
            this.reset();
            this.closeConfirmPopup();
            callback();
        };
        this.confirmPopup = showConfirmPopup('confirm.title', 'confirm.reset', onConfirm, () => this.closeConfirmPopup(), onChange);
    }

    confirmMapSrs (mapSrs) {
        const onChange = () => {
            this.setSrs('input', mapSrs, true);
            this.closeConfirmPopup();
            this.selectFromMap();
        };
        const onConfirm = () => {
            this.reset();
            onChange();
            this.closeConfirmPopup();
        };
        this.confirmPopup = showConfirmPopup('confirm.title', 'confirm.mapSrs', onConfirm, () => this.closeConfirmPopup(), onChange);
    }

    confirmSourceChange (source) {
        const onConfirm = () => {
            this.reset();
            this.setSource(source);
            this.closeConfirmPopup();
        };
        this.confirmPopup = showConfirmPopup('dataSource.title', 'dataSource.confirmChange', onConfirm, () => this.closeConfirmPopup());
    }

    closeConfirmPopup () {
        this.confirmPopup?.close();
        this.confirmPopup = null;
    }

    cleanInputCoordinates () {
        const { coordinates, inputSrs, inputHeightSrs } = this.getState();
        const input3D = getDimension(inputSrs, inputHeightSrs) === 3;
        const cleaned = coordinates.filter(coord => validateCoordinate(coord, input3D));
        this.updateState({ coordinates: cleaned });
    }

    updateCoordinate (index, coordinate) {
        const updated = [...this.getState().coordinates];
        updated[index] = coordinate;
        // fill empty/undefined with object
        const coordinates = updated.map(c => c ? c : { invalid: true });
        this.addSourceToState('table');
        this.updateState({ coordinates, transformed: false });
    }

    pasteCoordinates (pasted) {
        const separator = pasted.includes(';') ? ';' : '\t';
        try {
            const coordinates = pasted
                .split('\n')
                .filter(notEmpty => notEmpty)
                .map(s => s.split(separator).map(val => parseCoordinateValue(val)))
                .map(([x, y, z]) => ({ x, y, z }));
            this.addSourceToState('clipboard');
            this.updateState({ coordinates, transformed: false });
        } catch (err) {
            this.log.debug(err);
            Messaging.error(this.loc('transform.errors.paste'));
        }
    }

    // parse float on blur
    parseInputCoordinate (index, column) {
        const { coordinates } = this.getState();
        // eslint-disable-next-line no-unused-vars
        const { invalid: ignored, ...coord } = coordinates[index] || {};
        const value = parseCoordinateValue(coord[column]);
        // TODO: use column for invalid/error for styling ?
        const updated = isNaN(value) ? { ...coord, invalid: true } : { ...coord, [column]: value };
        this.updateCoordinate(index, updated);
    }

    swapCoordinates () {
        const { coordinates } = this.getState();
        const swapped = coordinates.map(c => ({ ...c, x: c.y, y: c.x }));
        this.updateState({ coordinates: swapped, transformed: false });
    }

    setSrs (type, srs, forced) {
        if (type === 'input' && !forced) {
            this.inputSrsChange(srs);
            return;
        }
        if (type === 'output' && !forced) {
            this.outputSrsChange(srs);
            return;
        }
        const prop = `${type}Srs`;
        this.updateState({ [prop]: srs, transformed: false });
        if (is3DSystem(srs)) {
            this.setHeightSrs(type, null);
        }
    }

    inputSrsChange (srs) {
        const { coordinates, inputSrs } = this.getState();
        if (!inputSrs || !coordinates.length) {
            this.setSrs('input', srs, true);
            return;
        }
        const onChange = () => {
            this.setSrs('input', srs, true);
            this.closeConfirmPopup();
        };
        const onConfirm = () => {
            this.reset();
            onChange();
        };
        this.confirmPopup = showConfirmPopup('confirm.title', 'confirm.coordinates', onConfirm, () => this.closeConfirmPopup(), onChange);
    }

    outputSrsChange (srs) {
        const { results, outputSrs } = this.getState();
        if (!outputSrs || !results.length) {
            this.setSrs('output', srs, true);
            return;
        }
        const onChange = () => {
            this.setSrs('output', srs, true);
            this.closeConfirmPopup();
        };
        const onConfirm = () => {
            this.updateState({ results: [] });
            onChange();
            this.transform();
        };
        this.confirmPopup = showConfirmPopup('confirm.title', 'confirm.results', onConfirm, () => this.closeConfirmPopup(), onChange);
    }

    setHeightSrs (type, srs) {
        const prop = `${type}HeightSrs`;
        if (srs === 'EPSG:8675') {
            // TODO: url isn't added because it did't work, find working url and refactor showInfoMessage
            this.showInfoMessage('flyout.coordinateSystem.heightSystem.label', 'flyout.coordinateSystem.heightSystem.n43.info');
        }
        this.updateState({ [prop]: srs, transformed: false });
    }

    setPagination (current, pageSize) {
        const { pagination } = this.getState();
        this.updateState({ pagination: { ...pagination, current } });
    }

    setFiles (files = []) {
        if (files.length === 0) {
            this.updateState({
                files: [],
                fileContents: null
            });
        }
        if (files.length !== 1) {
            return;
        }
        parseFile(files[0]).then(contents => {
            const { inputSrs, import: settings } = this.getState();
            // use detected settings only if user hasn't selected value
            // Maybe this isn't needed if detect functions works right
            const newSettings = { ...settings };
            Object.keys(contents.settings).forEach(key => {
                if (newSettings[key] === FILE_DEFAULTS.import[key]) {
                    newSettings[key] = contents.settings[key];
                }
            });
            this.updateState({
                inputSrs: contents.srs || inputSrs,
                files,
                fileContents: contents,
                import: newSettings // { ...settings, ...contents.settings }
            });
        }).catch(err => {
            this.log.debug(err);
            Messaging.error(this.log('transform.errors.import'));
        });
    }

    setFileSetting (type, key, value) {
        const settings = this.getState()[type];
        const updated = {
            [type]: {
                ...settings,
                [key]: value
            }
        };
        if (type === 'import') {
            const { fileContents } = this.getState();
            if (fileContents) {
                const { headerLineCount, coordinateSeparator, prefixColCount } = updated[type];
                // parseFileContents() to update parsing based on the new selection
                updated.fileContents = parseFileContents(fileContents.lines, coordinateSeparator, headerLineCount, prefixColCount);
            }
        }
        this.updateState(updated);
    }

    confirmClearTables () {
        const onConfirm = () => {
            this.updateState({ coordinates: [], results: [], sources: [], transformed: false });
            this.closeConfirmPopup();
        };
        this.confirmPopup = showConfirmPopup('flyout.coordinateTable.clearTables', 'flyout.coordinateTable.confirmClear', onConfirm, () => this.closeConfirmPopup());
    }

    // deprecated
    onAction (id) {
        if (id === 'map') {
            this.selectFromMap();
        }
        if (id === 'file') {
            this.showFileSettings('import');
        }
    }

    setMapSelectionMode (mode) {
        switch (mode) {
        case MAP.POPUP:
            this.instance.setMapSelectionMode(MAP.ADD);
            this.instance.setMapCoordinates(this.getState().coordinates);
            this.showMapPopup();
            break;
        case MAP.STORE:
            this.updateState({ coordinates: this.instance.getMapCoordinates(), transformed: false });
            this.addSourceToState(ACTIONS.MAP);
            this.instance.setMapSelectionMode();
            break;
        case MAP.REMOVE:
        case MAP.ADD:
            this.instance.setMapSelectionMode(mode);
            break;
        case MAP.SHOW:
            this.showOnMap();
            break;
        }
    }

    showOnMap () {
        const { coordinates, inputSrs, pagination } = this.getState();
        if (this.mapPopup) {
            return;
        }
        if (!coordinates.length || !inputSrs) {
            const title = 'mapMarkers.show.errorTitle';
            const msg = `mapMarkers.show.${!inputSrs ? 'noSrs' : 'noCoordinates'}`;
            this.showInfoMessage(title, msg);
            return;
        }
        const { current, pageSize } = pagination;
        const end = current * pageSize;
        const start = end - pageSize;
        const toShow = coordinates.slice(start, end);
        const mapSrs = this.sandbox.getMap().getSrsName();

        const callback = mapCoords => {
            const labeled = mapCoords.map((coord, i) => {
                // Use original coords and srs for label
                const label = getLabelForMarker(toShow[i], inputSrs);
                return { ...coord, label };
            });
            this.instance.setMapCoordinates(labeled);
            this.instance.toggleFlyout(false);
            this.mapPopup = showMapPreviewPopup(() => this.closeMapPopup(true));
        };
        if (mapSrs === inputSrs) {
            callback(toShow);
        } else {
            this.transformToMapSrs({
                coordinates: toShow,
                inputSrs,
                outputSrs: mapSrs
            }, callback);
        }
    }

    selectFromMap () {
        const { coordinates } = this.getState();
        this.instance.setMapSelectionMode(MAP.ADD);
        this.instance.setMapCoordinates(coordinates);
        this.showMapPopup();
    }

    showMapPopup () {
        if (this.mapPopup) {
            return;
        }
        this.instance.toggleFlyout(false);
        this.mapPopup = showMapSelectPopup(this.getController(), () => this.closeMapPopup(true));
    }

    closeMapPopup (fromPopup) {
        this.mapPopup?.close();
        this.mapPopup = null;
        if (fromPopup) {
            this.instance.setMapSelectionMode();
            this.instance.toggleFlyout(true);
        }
    }

    showFileSettings (type) {
        this.filePopup?.close();
        const state = this.getState();
        if (type === 'export' && state.fileContents) {
            const { headerLineCount, ...restSettings } = state.fileContents.settings;
            const writeHeaders = headerLineCount > 0;
            // use default values from import file
            this.updateState({ export: { ...state.export, ...restSettings, writeHeaders } });
        }
        this.filePopup = showFilePopup(type, this.getState(), this.getController(), () => this.closeFileSettings());
    }

    closeFileSettings () {
        this.filePopup?.close();
        this.filePopup = null;
    }

    showClipboard () {
        if (this.clipboardPopup) {
            return;
        }
        this.clipboardPopup = showClipboardPopup(this.getController(), () => this.closeClipboard());
    }

    closeClipboard () {
        this.clipboardPopup?.close();
        this.clipboardPopup = null;
    }

    showInfo (key) {
        const { title, info = '', listItems = [], paragraphs = [info] } = this.loc(`infoPopup.${key}`);
        if (this.infoPopup) {
            this.infoPopup.update(title, paragraphs, listItems);
        } else {
            this.infoPopup = showInfoPopup(title, paragraphs, listItems, () => this.closeInfoPopup());
        }
    }

    showInfoMessage (titleKey, msgKey) {
        const title = this.loc(titleKey);
        const paragraphs = [this.loc(msgKey)];
        const listItems = [];
        if (this.infoPopup) {
            this.infoPopup.update(title, paragraphs, listItems);
            return;
        }
        this.infoPopup = showInfoPopup(title, paragraphs, listItems, () => this.closeInfoPopup());
    }

    showValidationError (errorKeys) {
        this.infoPopup?.close();
        const listItems = errorKeys.map(key => this.loc(`transform.validate.${key}`));
        const title = this.loc('transform.validate.title');
        const paragraphs = [this.loc('transform.validate.message')];
        this.infoPopup = showInfoPopup(title, paragraphs, listItems, () => this.closeInfoPopup());
    }

    showConfirmTransform (warningKeys) {
        this.infoPopup?.close();
        const listItems = warningKeys.map(key => this.loc(`transform.warnings.${key}`));
        const title = this.loc('transform.warnings.title');
        const paragraphs = [this.loc('transform.warnings.message')];
        const onConfirm = () => {
            this.cleanInputCoordinates();
            this.transformText();
        };
        this.infoPopup = showInfoPopup(title, paragraphs, listItems, () => this.closeInfoPopup(), onConfirm);
    }

    closeInfoPopup () {
        this.infoPopup?.close();
        this.infoPopup = null;
    }

    onFlyoutClose () {
        this.closeFileSettings();
        this.closeInfoPopup();
        this.closeMapPopup();
        this.closeConfirmPopup();
        this.closeClipboard();
    }

    transform () {
        const { warnings, errors } = validateTransform(this.getState());
        if (errors.length) {
            this.showValidationError(errors);
            return;
        }
        if (warnings.length) {
            this.showConfirmTransform(warnings);
            return;
        }
        if (this.log.isDebug()) {
            this.debugTransform();
        }
        this.transformText();
    }

    debugTransform () {
        const { inputSrs, coordinates } = this.getState();
        const { bounds = [] } = SRS.find(s => s.value === inputSrs) || {};
        const info = getCoordinatesExtent(coordinates, inputSrs);
        this.log.debug('Projected bounds for:', inputSrs, bounds);
        Object.keys(info).forEach(key => this.log.debug(key, '=>', info[key]));
    }

    importFileContentsToInputTable () {
        const errors = validateFileSettings(this.getState(), 'import');
        if (errors.length) {
            this.showValidationError(errors);
            return false;
        }
        const { fileContents, import: importSettings } = this.getState();
        const { unit } = importSettings;
        const coordinates = fileContents.data.map(([x, y, z]) => ({
            x: parseValue(x, unit),
            y: parseValue(y, unit),
            z: parseValue(z) // always metric
        }));
        // sets all coordinates from file so one source only
        this.updateState({ coordinates, sources: [ACTIONS.IMPORT] });
        return true;
    }

    exportResultsToFile () {
        const state = this.getState();
        const errors = validateFileSettings(state, 'export');
        if (errors.length) {
            this.showValidationError(errors);
            return false;
        }
        this.updateState({ loading: true });
        try {
            exportStateToFile(state);
        } catch (err) {
            this.log.debug(err);
            Messaging.error(this.loc('transform.errors.export'));
        }
        this.updateState({ loading: false });
        return true;
    }

    transformJson () {
        this.updateState({ loading: true });
        const { params, body } = stateToTransformRequest(this.getState());
        fetch(Oskari.urls.buildUrl(this.baseUrl, params), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body
        }).then(response => {
            return response.json();
        }).then(json => {
            if (!Array.isArray(json)) {
                this.showResponseError(json);
                return;
            }
            this.updateState({ results: json, loading: false, transformed: true });
        }).catch((e) => {
            Messaging.error(this.loc('transform.errors.generic'));
            this.updateState({ loading: false });
        });
    }

    transformText () {
        this.updateState({ loading: true });
        const { params, body } = stateToKomuRequest(this.getState());
        fetch(Oskari.urls.buildUrl(this.baseUrl, params), {
            method: 'POST',
            headers: {
                Accept: 'text/plain'
            },
            body
        }).then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
                // return response.json(); => typeof text !== 'string' => showResponseError(text)
            }
            return response.text();
        }).then(text => {
            const results = parseKomuResponse(text);
            this.updateState({ results, loading: false, transformed: true });
        }).catch((e) => {
            Messaging.error(this.loc('transform.errors.generic'));
            this.updateState({ loading: false });
        });
    }

    // deprecated
    transformToMapSrs (values, callback) {
        const state = { ...this.getState(), ...values };
        const { errors } = validateTransform(state);
        if (errors.length) {
            this.showValidationError(errors);
            return;
        }
        this.updateState({ loading: true });
        const { params, body } = stateToPTIArray(state);
        fetch(Oskari.urls.getRoute('CoordinateTransformation', params), {
            method: 'POST',
            headers: {
                Accept: 'application/json'
            },
            body
        }).then(response => {
            return response.json();
        }).then(json => {
            const { jobId } = json;
            if (jobId) {
                this.watchJsonJob(jobId, callback);
            } else {
                this.showResponseError(json);
            }
        }).catch((e) => {
            Messaging.error(this.loc('transform.errors.generic'));
            this.updateState({ loading: false });
        });
    }

    // deprecated
    transformToArray () {
        this.updateState({ loading: true });
        const { params, body } = stateToPTIArray(this.getState());
        fetch(Oskari.urls.getRoute('CoordinateTransformation', params), {
            method: 'POST',
            headers: {
                Accept: 'application/json'
            },
            body
        }).then(response => {
            return response.json();
        }).then(json => {
            const { jobId, inputCoordinates, error } = json;
            if (jobId) {
                this.watchJsonJob(jobId);
            } else if (inputCoordinates && !error) {
                // F2R returns coords immediately
                const coordinates = inputCoordinates.map(([x, y, z]) => ({ x, y, z }));
                this.updateState({ loading: false, coordinates });
            } else {
                this.showResponseError(json);
            }
        }).catch((e) => {
            Messaging.error(this.loc('transform.errors.generic'));
            this.updateState({ loading: false });
        });
    }

    // deprecated
    watchJsonJob (jobId, callback) {
        fetch(Oskari.urls.getLocation(WATCH_JOB) + jobId, {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        }).then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        }).then(json => {
            const { jobId, resultCoordinates } = json; // hasMoreCoordinates ??
            if (jobId) {
                // set timeout??
                this.watchJsonJob(jobId);
            } else if (resultCoordinates) {
                // TODO: can undefined z cause problems??
                const results = resultCoordinates.map(([x, y, z]) => ({ x, y, z }));
                if (typeof callback === 'function') {
                    this.updateState({ loading: false });
                    callback(results);
                } else {
                    this.updateState({ loading: false, results, transformed: true });
                }
            } else {
                this.showResponseError(json);
            }
        }).catch(() => {
            Messaging.error(this.loc('transform.errors.generic'));
            this.updateState({ loading: false });
        });
    }

    showResponseError (response) {
        const { error, info } = response || {};
        const key = info?.errorKey || error?.errorKey || 'generic';
        Messaging.error(this.loc(`transform.errors.${key}`));
        this.updateState({ loading: false });
    }
}

const wrapped = controllerMixin(UIHandler, [
    'setSrs',
    'setHeightSrs',
    'updateCoordinate',
    'pasteCoordinates',
    'parseInputCoordinate',
    'setFileSetting',
    'setFiles',
    'confirmClearTables',
    'showOnMap',
    'exportResultsToFile',
    'transform',
    'showInfo',
    'showFileSettings',
    'onAction',
    'setMapSelectionMode',
    'reset',
    'importFileContentsToInputTable',
    'addFromSource',
    'swapCoordinates',
    'setPagination'
]);

export { wrapped as ViewHandler };
