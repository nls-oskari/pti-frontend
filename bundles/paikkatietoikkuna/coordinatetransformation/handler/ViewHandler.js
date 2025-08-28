import { StateHandler, controllerMixin, Messaging } from 'oskari-ui/util';
import { showInfoPopup } from '../view/InfoPopup';
import { showFilePopup } from '../view/FilePopup';
import { showConfirmPopup } from '../view/ConfirmPopup';
import { showClipboardPopup } from '../view/ClipboardPopup';
import { showMapSelectPopup, showMapPreviewPopup } from '../view/MapPopup';
import { SOURCE, MAP, WATCH_JOB, WATCH_URL, TRANSFORM, FILE_DEFAULTS, SEPARATORS, ACTIONS } from '../constants';
import { stateToPTIArray, loadFile, validateTransform, validateFileSettings, parseCoordinateValue, is3DSystem } from '../helper';
import { parseFile, parseFileContents } from './FileParser';

const getInitialState = () => ({
    loading: false,
    source: SOURCE[0],
    sources: [],
    transformType: null,
    inputSrs: null,
    outputSrs: null,
    inputHeightSrs: null,
    outputHeightSrs: null,
    files: [],
    import: { ...FILE_DEFAULTS.import },
    export: { ...FILE_DEFAULTS.export },
    coordinates: [],
    results: []
});

class UIHandler extends StateHandler {
    constructor (instance) {
        super();
        this.instance = instance;
        this.sandbox = instance.getSandbox();
        this.loc = instance.loc;
        this.infoPopup = null;
        this.filePopup = null;
        this.mapPopup = null;
        this.clipboardPopup = null;
        this.confirmPopup = null;
        this.setState(getInitialState());
        this.addStateListener(state => this.filePopup?.update(state));
        Oskari.urls.set(WATCH_JOB, WATCH_URL);
    }

    reset (closeFlyout) {
        // TODO: close popups? see onFlyoutClose
        const state = getInitialState();
        this.updateState(state); // TODO: set or update
        if (closeFlyout) {
            const flyout = this.instance.getFlyout();
            flyout.close();
        }
    }

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
        this.addSourceToState(source);
    }

    addSourceToState (source) {
        const { sources } = this.getState();
        if(!source || sources.includes(source)) {
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

    addCoordinate (coordinate) {
        const { coordinates } = this.getState();
        this.updateState({ coordinates: [...coordinates, coordinate] });
    }

    updateCoordinate (index, coordinate) {
        const coordinates = [...this.getState().coordinates];
        // TODO: validate x,y,z getDimension (remove keys with empty value??)
        coordinates[index] = coordinate;
        // const updated = coordinates.map((c, i) => i === index ? coordinate : c);
        this.updateState({ coordinates });
    }

    pasteCoordinates (pasted) {
        const separator = pasted.includes(';') ? ';' : '\t';
        try {
            const coordinates = pasted
                .split('\n')
                .filter(notEmpty => notEmpty)
                .map(s => s.split(separator).map(val => parseCoordinateValue(val)))
                .map(([x, y, z]) => ({ x, y, z }));
            this.updateState({ coordinates });
        } catch {

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

    // TODO: refactor
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
        this.updateState({ [prop]: srs });
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

    outputSrsChange(srs) {
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
            this.transformToArray('A2A');
        };
        this.confirmPopup = showConfirmPopup('confirm.title', 'confirm.results', onConfirm, () => this.closeConfirmPopup(), onChange);
    }

    setHeightSrs (type, srs) {
        const prop = `${type}HeightSrs`;
        this.updateState({ [prop]: srs });
    }

    setFiles (files = []) {
        if (files.length === 0) {
            this.updateState({
                files: [],
                fileContents: undefined
            });
        }
        if (files.length !== 1) {
            return;
        }
        parseFile(files[0]).then(contents => {
            this.updateState({
                files,
                fileContents: contents,
                import: {
                    headerLineCount: contents.headerLines.length,
                    coordinateSeparator: contents.delimiterValueForBackend,
                    decimalSeparator: contents.decimalSeparator
                }
            });
        }).catch(err => {
            // TODO: error handling
            console.log(err);
            this.showValidationError(['noFileSettings']);
        });
    }

    setFileSetting (type, key, value) {
        const settings = this.getState()[type];
        const newTypeState = {
            [type]: {
                ...settings,
                [key]: value
            }
        };
        const { fileContents } = this.getState();
        if (fileContents) {
            // parseFileContents() to update parsing based on the new selection
            const coordSeparator = SEPARATORS.coordinateSeparator.find(sep => sep.value === newTypeState.import.coordinateSeparator)?.char;
            newTypeState.fileContents = parseFileContents(fileContents.lines, coordSeparator, newTypeState.import.headerLineCount);
        }

        this.updateState(newTypeState);
    }
    // TODO: refactor
    setImport (key, value) {
        const current = this.getState().import;
        this.updateState({ import: { ...current, [key]: value } });
    }
    // TODO: refactor
    setExport (key, value) {
        const current = this.getState().export;
        this.updateState({ export: { ...current, [key]: value } });
    }

    confirmClearTables () {
        const onConfirm = () => {
            this.updateState({ coordinates: [], results: [], sources: [] });
            this.closeConfirmPopup();
        };
        this.confirmPopup = showConfirmPopup('flyout.coordinateTable.clearTables', 'flyout.coordinateTable.confirmClear', onConfirm, () => this.closeConfirmPopup());
    }

    onAction (id) {
        if (id === 'map') {
            this.selectFromMap();
        }
        if (id === 'file') {
            this.showFileSettings('import');
        }
        if (id === 'preview') {
            this.transformToArray('F2R');
        }
        if (id === 'store') {
            const coordinates = this.instance.getMapCoordinates();
            this.instance.setMapSelectionMode();
            this.updateState({ coordinates });
        }
        if (Object.values(MAP).includes(id)) {
            this.instance.setMapSelectionMode(id);
        }
    }

    showOnMap () {
        const { coordinates, inputSrs } = this.getState(); //  inputSrs, source
        if (this.mapPopup) {
            return;
        }
        if (!coordinates.length || !inputSrs) {
            const title = 'mapMarkers.show.errorTitle';
            const msg = `mapMarkers.show.${!inputSrs ? 'noSrs' : 'noCoordinates'}`;
            this.showInfoMessage(title, msg);
            return;
        }
        // TODO: convert to map projection (axis order) and add label (source !== map)
        this.instance.setMapCoordinates(coordinates);
        this.instance.toggleFlyout(false);
        this.mapPopup = showMapPreviewPopup(() => this.closeMapPopup(true));
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
        this.filePopup?.close(); // TODO: change, reset???
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
        const listItems = errorKeys.map(key => this.loc(`flyout.transform.validateErrors.${key}`));
        const title = this.loc('flyout.transform.validateErrors.title');
        const paragraphs = [this.loc('flyout.transform.validateErrors.message')];
        this.infoPopup = showInfoPopup(title, paragraphs, listItems, () => this.closeInfoPopup());
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

    validate (stepOrType) {
        const state = this.getState();
        const isTransform = TRANSFORM.includes(stepOrType);
        let errors = isTransform ? validateTransform(state, stepOrType) : [];
        if (!isTransform) {
            if (stepOrType === 'srs' && (!state.inputSrs || !state.outputSrs)) {
                errors.push('crs');
            }
            if (stepOrType === 'inputSrs' && !state.inputSrs) {
                errors.push('srs');
            }
            if (stepOrType === 'ouputSrs' && !state.outputSrs) {
                errors.push('srs');
            }
            if (stepOrType === 'importFile') {
                errors = [...errors, ...validateFileSettings(state, 'import')];
            }
            if (stepOrType === 'exportFile') {
                errors = [...errors, ...validateFileSettings(state, 'export')];
            }
        }
        if (errors.length) {
            this.showValidationError(errors);
        }
        return errors.length > 0;
    }

    transformToFile (transformType) {
        if (this.validate(transformType)) {
            return;
        }
        this.updateState({ loading: true });
        const state = this.getState();
        const { params, body } = stateToPTIArray(state, transformType, true);
        const { fileName } = state.export;
        fetch(Oskari.urls.getRoute('CoordinateTransformation', params), {
            method: 'POST',
            body
        }).then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        }).then(json => {
            const { jobId } = json;
            this.watchFileJob(jobId, fileName);
        }).catch(() => {
            Messaging.error(this.loc('transform.responseErrors.generic'));
            this.updateState({ loading: false });
        });
    }

    importFileContentsToInputTable () {
        const { fileContents } = this.getState();
        /* {
            delimiter,
            // TODO: we don't need this when we don't send the file to backend
            delimiterValueForBackend: SEPARATORS.coordinateSeparator.find(sep => sep.char === delimiter)?.value,
            decimalSeparator,
            data,
            lines,
            headerLines,
            headers
        }
        */
        if (!fileContents) {
            // TODO: error handling
            alert('NOPE');
            return;
        }
        const coordinates = fileContents.data.map(([x, y, z]) => ({ x, y, z }));
        this.updateState({ coordinates });
    }

    transformToArray (transformType) {
        const state = this.getState();
        if (this.validate(transformType)) {
            return;
        }
        this.updateState({ loading: true });

        const { params, body } = stateToPTIArray(state, transformType, false);
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
            Messaging.error(this.loc('flyout.transform.responseErrors.generic'));
            this.updateState({ loading: false });
        });
    }

    watchJsonJob (jobId) {
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
                this.updateState({ loading: false, results });
            } else {
                this.showResponseError(json);
            }
        }).catch(() => {
            Messaging.error(this.loc('flyout.transform.responseErrors.generic'));
            this.updateState({ loading: false });
        });
    }

    watchFileJob (jobId, fileName) {
        fetch(Oskari.urls.getLocation(WATCH_JOB) + jobId, {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        }).then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            // getFileNameFromResponse
            return response.blob();
        }).then(blob => {
            if (!blob) {
                // set timeout??
                this.watchFileJob(jobId, fileName);
                return;
            }
            loadFile(blob, fileName);
            this.updateState({ loading: false });
        }).catch(() => {
            Messaging.error(this.loc('flyout.transform.responseErrors.generic'));
            this.updateState({ loading: false });
        });
    }

    showResponseError (response) {
        const { error, info } = response || {};
        const key = info?.errorKey || error?.errorKey || 'generic';
        Oskari.log('CoordTransHandler').error(error);
        Messaging.error(this.loc(`flyout.transform.responseErrors.${key}`));
        this.updateState({ loading: false });
    }
}

const wrapped = controllerMixin(UIHandler, [
    'setSource',
    'setSrs',
    'setHeightSrs',
    'updateCoordinate',
    'pasteCoordinates',
    'parseInputCoordinate',
    'setFileSetting',
    'setFiles',
    'confirmClearTables',
    'showOnMap',
    'transformToFile',
    'transformToArray',
    'showInfo',
    'showFileSettings',
    'onAction',
    'reset',
    'validate',
    'importFileContentsToInputTable',
    'addFromSource'
]);

export { wrapped as ViewHandler };
