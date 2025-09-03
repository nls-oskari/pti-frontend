import { SRS, SRS_H, SYSTEM, MARKER, DEGREE_DECIMALS, DMS } from './constants';

export const getDimension = (srs, srsHeight) => {
    const { system } = SRS.find(s => s.value === srs) || {};
    // const { dimension } = SYSTEM.find(c => c.value === system) || {}
    if (system === 'PROJ_3D' || system === 'GEOG_3D') {
        return 3;
    } else if (SRS_H.find(h => h.value === srsHeight)) {
        return 3;
    }
    return 2;
};

export const isDegreeSystem = (srs) => {
    const { system } = SRS.find(s => s.value === srs) || {};
    return system === 'GEOG_2D' || system === 'GEOG_3D';
};

export const is3DSystem = (srs) => {
    const { system } = SRS.find(s => s.value === srs) || {};
    return system === 'PROJ_3D' || system === 'GEOG_3D';
};

export const getSrsUnit = srs => {
    const { system } = SRS.find(s => s.value === srs) || {};
    const { unit } = SYSTEM.find(c => c.value === system) || {};

    return unit || 'metric';
};

export const validateTransform = (state, type) => {
    if (type === 'F2R') {
        return validateFileSettings(state, 'import');
    }
    if (type === 'A2A') {
        return validateSelections(state);
    }
    if (type === 'F2A') {
        return [...validateSelections(state), ...validateFileSettings(state, 'import')];
    }
    // import settings are validated on import
    if (type === 'A2F' || type === 'F2F') {
        return [...validateSelections(state), ...validateFileSettings(state, 'export')];
    }
    return ['message'];
};
const validateSelections = (state) => {
    const { inputSrs, outputSrs, inputHeightSrs } = state;
    const errors = [];
    // TODO: set import, set export, transform => split ??
    if (!inputSrs || !outputSrs) {
        errors.push('crs');
    }
    const { system } = SRS.find(s => s.value === outputSrs) || {};
    if (getDimension(inputSrs, inputHeightSrs) !== 3 && system === 'PROJ_3D') {
        errors.push('xyz');
    }
    return errors;
};

export const validateFileSettings = (state, type) => {
    const selects = state[type];
    const errors = [];

    if (!selects.coordinateSeparator) {
        errors.push('noCoordinateSeparator');
    }
    if (!selects.decimalSeparator) {
        errors.push('noDecimalSeparator');
    }

    if (selects.decimalSeparator === ',' && selects.coordinateSeparator === 'comma') {
        errors.push('doubleComma');
    }
    if (selects.coordinateSeparator === 'space' && (selects.unit === 'DD MM SS' || selects.unit === 'DD MM')) {
        errors.push('doubleSpace');
    }
    if (type === 'import') {
        if (!state.files.length) {
            errors.push('noInputFile');
        }
        if (typeof selects.headerLineCount !== 'number' || selects.headerLineCount < 0) {
            errors.push('headerCount');
        }
    }
    if (type === 'export') {
        if (!selects.fileName) {
            errors.push('noFileName');
        }
        if (typeof selects.decimalCount !== 'number' || selects.decimalCount < 0) {
            errors.push('decimalCount');
        }
    }
    return errors;
};

export const getDecimalCount = (decimals, unit) => {
    if (typeof decimals !== 'number') {
        return 0;
    }
    switch (unit) {
    case 'metric':
        return decimals;
    case 'DD MM SS':
    case 'DDMMSS':
        return decimals + 1;
    case 'DD MM':
    case 'DDMM':
        return decimals + 3;
    case 'degree':
    case 'gradian':
    case 'DD':
        return decimals + 5;
    case 'radian':
        return decimals + 7;
    default:
        Oskari.log('CoordTransHelper').warn('Invalid unit - cannot get decimal count');
        return 0;
    }
};

export const getSystemsFromCompound = (epsg) => {
    switch (epsg) {
    case 'EPSG:3901': // YKJ + N60
        return {
            srs: 'EPSG:2393',
            height: 'EPSG:5717'
        };
    case 'EPSG:3902': // ETRS-TM35FIN (N,E) + N60
        return {
            srs: 'EPSG:3067', // CoordTrans service doesn't support EPSG:5048, use EPSG:3047 (Identical except for area of use) or 3067 and axisFlip
            height: 'EPSG:5717',
            reversed: 'EPSG:5048'
        };
    case 'EPSG:3903': // ETRS-TM35FIN (N,E) + N2000
        return {
            srs: 'EPSG:3067', // CoordTrans service doesn't support EPSG:5048, use EPSG:3047 (Identical except for area of use) or 3067 and axisFlip
            height: 'EPSG:3900',
            reversed: 'EPSG:5048'
        };
    case 'EPSG:7409': // ETRS89 + EVRF2000 (EUREF-FIN-GRS80 + N60)
        return {
            srs: 'EPSG:4258',
            height: 'EPSG:5717'
        };
    case 'EPSG:7423': // ETRS89 + EVRF2007 (EUREF-FIN-GRS80 + N2000)
        return {
            srs: 'EPSG:4258',
            height: 'EPSG:3900'
        };
    }
    return null;
};

export const isCoordInBounds = (srs, coord) => {
    const { bounds } = SRS.find(s => s.value === srs) || {};
    if (!bounds || bounds.length !== 4) {
        return true;
    }
    const { x, y } = coord;
    return bounds[0] <= x && x <= bounds[2] && bounds[1] <= y && y <= bounds[3];
};

// TODO: pass mapmodule or move to service/maphelper??
export const moveMapToMarkers = (state) => {
    // TODO: use converted map coordinates, this works only for native srs
    const { coordinates } = state; // inputSrs
    // let { lonFirst } = SRS.find(s => s.value === inputSrs) || {};
    const sandbox = Oskari.getSandbox();
    const closestZoom = 6;
    // TODO: isAxisFlip? input settings? is this needed with objects
    // lonFirst = isAxisFlip ? !lonFirst : lonFirst;
    if (!coordinates.length) {
        // Nothing to do here
    } else if (coordinates.length === 1) {
        const { x, y } = coordinates[0];
        sandbox.postRequestByName('MapMoveRequest', [x, y, closestZoom]);
    } else {
        const map = sandbox.findRegisteredModuleInstance('MainMapModule');
        // TODO: array of objects
        const extent = map.getExtentForPointsArray(coordinates);
        // TODO: does this have zoom level optionn
        map.zoomToExtent(extent);
        if (map.getMapZoom() > closestZoom) {
            map.setZoomLevel(closestZoom);
        }
    }
};

export const getLabelForMarker = (coord, srs) => {
    const { axes } = SRS.find(s => s.value === srs) || {};
    const { x, y, z } = coord;
    if (!axes) {
        return `${x}, ${y}${z ? ', z' : ''}`;
    }
    // Table columns x, y, z always
    const labels = axes.map(axis => {
        if (axis === 'φ') {
            return 'Lat';
        }
        if (axis === 'λ') {
            return 'Lon';
        }
        return axis;
    });
    const decimal = Oskari.getDecimalSeparator();
    const values = [x, y, z].map(c => `${c || ''}`.replace('.', decimal));
    return labels.map((label, i) => `${label}: ${values[i]}`).join(', ');
    /*
    const [xLabel, yLabel, zLabel] = labels;
    if (zLabel) {
        return `${xLabel}: ${x}, ${yLabel}: ${y}, ${zLabel}: ${y}`;
    }
    return `${xLabel}: ${x}, ${yLabel}: ${y}`;
    */
};

export const coordinateToMarker = (coord, isNew) => {
    const { colors, ...props } = MARKER;
    const { x, y, label } = coord;
    const msg = label || `E: ${x}, N: ${y}`; // default to map E, N
    const color = isNew ? colors.new : colors.old;
    return { ...props, x, y, msg, color };
};

export const stateToPTIArray = (state, transformType, toFile) => {
    const { source, inputSrs, outputSrs, inputHeightSrs, outputHeightSrs } = state;
    const dimension = transformType === 'F2R' ? 3 : getDimension(inputSrs, inputHeightSrs);
    const params = {
        sourceCrs: inputSrs,
        sourceDimension: dimension,
        sourceHeightCrs: inputHeightSrs,
        targetCrs: outputSrs,
        targetDimension: getDimension(outputSrs, outputHeightSrs),
        targetHeightCrs: outputHeightSrs,
        transformType
    };

    let body;
    if (source === 'file') {
        const formData = new FormData();
        formData.append('importSettings', JSON.stringify(state.import));
        formData.append('coordFile', state.files[0]);
        if (toFile) {
            formData.append('exportSettings', JSON.stringify(state.export));
        }
        body = formData;
    } else {
        if (toFile) {
            const { decimalCount, unit, ...settings } = state.export;
            const forced = isDegreeSystem(outputSrs) ? unit : 'metric';
            const decimals = getDecimalCount(decimalCount, forced);
            params.exportSettings = JSON.stringify({ ...settings, decimalCount: decimals, unit: forced });
        }
        const coordinates = state.coordinates
            .filter(coord => !coord.invalid)
            .map(({ x, y, z }) => dimension === 2 ? [x, y] : [x, y, z])
            // .map(coord => coord.map(c => parseFloat(c)))
            .filter(coord => coord.every(c => !isNaN(c)));
        body = JSON.stringify(coordinates);
    }
    return {
        params,
        body
    };
};

export const parseCoordinateValue = value => {
    if (typeof value === 'number') {
        return value;
    }
    if (!value) {
        return NaN;
    }
    // TODO: Oskari.util has only mehtod for point => use fake point[1]
    // TODO: or DMS some value includes dms
    if (Oskari.util.coordinateIsDegrees([value, '0\u00B0'])) {
        return Oskari.util.coordinateDegreesToMetric([value, '0\u00B0'], DEGREE_DECIMALS)[0];
    }
    // TODO: refactor
    // DMS with spaces only (not ° ' ")
    if (value.includes(' ') && value.split(' ').filter(v => !isNaN(v).length > 1)) {
        // double spaces??
        const suffixed = value.split(' ').map((v, i) => v + DMS[i]).join(' ');
        return Oskari.util.coordinateDegreesToMetric([suffixed, '0\u00B0'], DEGREE_DECIMALS)[0];
        // TODO: or split filter empty map parseFloat / 60 ** i
    }
    return parseFloat(value.replace(',', '.'));
};

export const loadFile = (file, name) => {
    const elem = document.createElement('a');
    const href = window.URL.createObjectURL(file);
    elem.href = href;
    elem.download = name || 'results.txt';
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
    window.URL.revokeObjectURL(href);
};
