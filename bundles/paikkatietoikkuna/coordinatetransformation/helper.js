import { SRS, SRS_H, SYSTEM, MARKER, DMS_PATTERNS, LON_AXES, HOUR_TO_MIN,  HOUR_TO_SEC} from './constants';

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

export const isLonFirst = (srs) => {
    const { axes = [] } = SRS.find(s => s.value === srs) || {};
    if (axes.length < 2) {
        Oskari.log('CoordTransHelper').warn('Misconfigured srs coordinate axes - cannot get lon first');
        return false;
    }
    return LON_AXES.some(axis => axis === axes[0]);
};

export const validateCoordinate = (coord, is3D) => {
    if (coord.valid === false) {
        return false;
    }
    const { x, y, z } = coord;
    const array = is3D ? [x, y, z] : [x, y];
    return !array.some(c => typeof c !== 'number' || isNaN(c));
};

export const validateTransform = (state) => {
    const { inputSrs, outputSrs, inputHeightSrs, outputHeightSrs, coordinates, files } = state;
    const errors = [];
    const warnings = [];
    const input3D = getDimension(inputSrs, inputHeightSrs) === 3;
    const output3D = getDimension(outputSrs, outputHeightSrs) === 3;

    if (!inputSrs || !outputSrs) {
        errors.push('crs');
    }
    const { system: outputSystem } = SRS.find(s => s.value === outputSrs) || {};
    if (!input3D && outputSystem === 'PROJ_3D') {
        errors.push('xyz');
    }
    // No need to check warnings
    if (errors.length) {
        return { errors, warnings };
    }
    if (input3D !== output3D) {
        warnings.push(input3D ? '3DTo2D' : '2DTo3D');
    }
    if (coordinates.some(coord => !validateCoordinate(coord, input3D))) {
        warnings.push('coordinates');
    }
    if (coordinates.some(coord => !validateCoordInBounds(coord, inputSrs))) {
        warnings.push('bbox');
    }
    if (files.length && files[0].size > 10 * 1024 * 1024) {
        warnings.push('largeFile');
    }
    return { errors, warnings };
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
        } else if (!state.fileContents) {
            // TODO: invalidFile, failedToParse, etc..
            // use else if for now to avoid duplicate error message without input file
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

export const validateCoordInBounds = (coord, srs) => {
    const { bounds } = SRS.find(s => s.value === srs) || {};
    if (!bounds || bounds.length !== 4) {
        return true;
    }
    const swap = !isLonFirst(srs);
    const x = swap ? coord.y : coord.x;
    const y = swap ? coord.x : coord.y;
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

// Added for debugging
export const getCoordinatesExtent = (coordinates, srs) => {
    if (!coordinates.length) {
        return {};
    }
    const swap = !isLonFirst(srs);
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    coordinates.forEach(({ x, y }, i) => {
        const coord = swap ? [y, x] : [x, y];
        if (coord.some(c => typeof c !== 'number' || isNaN(c))) {
            Oskari.log('CoordTransHelper').warn('Invalid coord:', coord, 'at:', i);
            return;
        }
        if (coord[0] < minX) {
            minX = coord[0];
        }
        if (coord[0] > maxX) {
            maxX = coord[0];
        }
        if (coord[1] < minY) {
            minY = coord[1];
        }
        if (coord[1] > maxY) {
            maxY = coord[1];
        }
    });
    // wkt: left-bottom counterclockwise closed
    return {
        extent: [minX, minY, maxX, maxY],
        bbox: { left: minX, bottom: minY, right: maxX, top: maxY },
        min: { x: swap ? minY : minX, y: swap ? minX : minY },
        max: { x: swap ? maxY : maxX, y: swap ? maxX : maxY },
        wkt: `POLYGON ((${minX} ${minY}, ${maxX} ${minY}, ${maxX} ${maxY}, ${minX} ${maxY}, ${minX} ${minY}))`
    };
    // Oskari.getSandbox().postRequestByName('MapModulePlugin.AddFeaturesToMapRequest', [wkt, { layerId: 'komu', centerTo: true }]);
};

export const coordinateToMarker = (coord, isNew) => {
    const { colors, ...props } = MARKER;
    const { x, y, label } = coord;
    const msg = label || `E: ${x}, N: ${y}`; // default to map E, N
    const color = isNew ? colors.new : colors.old;
    return { ...props, x, y, msg, color };
};

export const stateToKomuParams = (state) => {
    const { inputSrs, outputSrs, inputHeightSrs, outputHeightSrs } = state;
    let sourceCRS = inputSrs;
    if (inputHeightSrs) {
        sourceCRS += ',' + inputHeightSrs;
    }
    let targetCRS = outputSrs;
    if (outputHeightSrs) {
        targetCRS += ',' + outputHeightSrs;
    }
    const dimension = getDimension(inputSrs, inputHeightSrs);
    return { sourceCRS, targetCRS, dimension };
};

export const coordinatesToCSV = (coordinates, dimension) => {
    const is2D = dimension === 2;
    // x,y,z;x,y,z,..
    return coordinates
        .map(({ x, y, z }) => is2D ? [x, y] : [x, y, z])
        .map(coord => coord.join())
        .join(';');
};

export const parseKomuResponse = (text) => {
    return text.split(`;`).map(coord => {
        const [x, y, z] = coord.split(',').map(c => parseFloat(c));
        return { x, y, z };
    });
};

// deprecated
export const stateToPTIArray = (state, transformType = 'A2A', toFile) => {
    const { source = 'table', inputSrs, outputSrs, inputHeightSrs, outputHeightSrs } = state;
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

export const getDMS = value => {
    const dms = DMS_PATTERNS.find(({ char }) => value.includes(char));
    if (!dms) {
        return {};
    }
    return {
        ...dms,
        regexp: new RegExp(dms.pattern)
    };
};

const dmsToDegree =  (dms, id) => {
    const parts = dms?.map(n => parseFloat(n)) || [];
    if (id === 'DD' || parts.length === 1) {
        return parts[0];
    }
    if (id === 'DDMM' || parts.length === 2) {
        return parts[0] + (parts[1] / HOUR_TO_MIN);
    }
    if (id === 'DDMMSS' || parts.length === 3) {
        return parts[0] + (parts[1] / HOUR_TO_MIN) + (parts[2] / HOUR_TO_SEC);
    }
    return NaN;
};

export const parseCoordinateValue = value => {
    if (typeof value === 'number') {
        return value;
    }
    if (!value) {
        return NaN;
    }
    value = value.trim().replace(',', '.');
    // DMS (° ' ")
    const { regexp, id } = getDMS(value);
    if (regexp) {
        const dms = value.match(regexp)?.slice(1);
        return dmsToDegree(dms, id);
    }
    // DMS with spaces only
    if (value.includes(' ')) {
        return dmsToDegree(value.split(' '));
    }
    return parseFloat(value);
};
