import { FILE_DEFAULTS } from './constants';
import {
    parseCoordinateValue,
    getDMS,
    getDimension,
    isDegreeSystem,
    is3DSystem,
    getSrsUnit,
    isLonFirst,
    validateCoordinate,
    validateFileSettings,
    validateTransform,
    getLabelForMarker,
    coordinatesToCSV,
    parseKomuResponse
} from './helper';

describe('srs functions', () => {
    test('returns defaults', () => {
        expect(getDimension()).toEqual(2);
        expect(isDegreeSystem()).toEqual(false);
        expect(is3DSystem()).toEqual(false);
        expect(isLonFirst()).toEqual(false);
        expect(getSrsUnit()).toEqual('metre');
    });
    test('returns default dimension', () => {
        const srs = 'EPSG:10689'; // GRS80h
        expect(getDimension(srs)).toEqual(3);
        expect(isDegreeSystem(srs)).toEqual(true);
        expect(getSrsUnit(srs)).toEqual('degree');
    });
    test('returns default dimension', () => {
        const srs = 'EPSG:3067'; // TM35FIN
        expect(isLonFirst(srs)).toEqual(true);
        expect(getSrsUnit(srs)).toEqual('metre');
    });
});

describe('request & response', () => {
    test('returns true for valid', () => {
        const coordinates = [...Array(5)].map((empty, z) => ({ x:383715, y: 6676275, z }));
        const csv3D = coordinatesToCSV(coordinates, 3);
        expect(parseKomuResponse(csv3D)).toEqual(coordinates);
        // z is ignored for 2D
        const csv2D = coordinatesToCSV(coordinates, 2);
        expect(parseKomuResponse(csv2D)).toEqual(coordinates.map(c => ({ ...c, z: undefined })));
    });
});

describe('getLabelForMarker function', () => {
    test('returns label', () => {
        const coordinate = { x: 10.1, y: 12.2, z: 10 };
        expect(getLabelForMarker(coordinate, 'EPSG:3067')).toEqual('E: 10,1, N: 12,2');
        expect(getLabelForMarker(coordinate, 'EPSG:5048')).toEqual('N: 10,1, E: 12,2');
        expect(getLabelForMarker(coordinate, 'EPSG:10689')).toEqual('Lat: 10,1, Lon: 12,2, h: 10');
        expect(getLabelForMarker(coordinate, 'EPSG:10688')).toEqual('X: 10,1, Y: 12,2, Z: 10');
    });
});


describe('validateCoordinate function', () => {
    const is3D = true;
    test('returns true for valid', () => {
        const coord = { x: 10.4, y: 20.4, z: 10 };
        expect(validateCoordinate(coord)).toBe(true);
        expect(validateCoordinate(coord, is3D)).toBe(true);
    });
    test('returns false for invalid', () => {
        expect(validateCoordinate({ x: '10', y: '20' })).toBe(false); // not number
        expect(validateCoordinate({ x: 10, y: 20 }, is3D)).toBe(false); // z missing
    });
});

describe('validateFileSettings function', () => {
    test('returns error keys or empty array', () => {
        const valid = []; // no errors
        //  (state, type) => selects = state[type] => use 'test' for common
        expect(validateFileSettings({ test: {} }, 'test')).toEqual(['noDelimiter', 'noDecimalSeparator']);
        const test = { delimiter: ',', decimalSeparator: ','};
        expect(validateFileSettings({ test }, 'test')).toEqual(['doubleComma']);
        test.delimiter = ' ';
        test.unit = 'DD MM';
        expect(validateFileSettings({ test }, 'test')).toEqual(['doubleSpace']);
        // import
        const importSettings = { ...FILE_DEFAULTS.import, delimiter: ' ', decimalSeparator: ','};
        expect(validateFileSettings({ import: importSettings, files: [] }, 'import')).toEqual(['noInputFile']);
        expect(validateFileSettings({ import: importSettings, files: [''], fileContents: {} }, 'import')).toEqual(valid);
        // export
        expect(validateFileSettings({ ...FILE_DEFAULTS }, 'export')).toEqual(['noFileName']);
        expect(validateFileSettings({ export: { ...FILE_DEFAULTS.export, fileName: 'test' }}, 'export')).toEqual(valid);
    });
});

describe('validateTransform function', () => {
    test('returns error keys or empty array', () => {
        expect.assertions(10);
        const valid = { errors: [], warnings: [] };
        const state = {
            inputSrs: 'EPSG:3067', // TM35FIN (E,N)
            outputSrs: 'EPSG:3877', // GK23
            inputHeightSrs: 'EPSG:3900', // N2000
            outputHeightSrs: 'EPSG:5717', // N60
            coordinates: [{ x:383715, y: 6676275, z: 0 }],
            files: []
        };
        const coordinates = state.coordinates.map(({ x, y, z }) => ({ x: y, y: x, z})); // axis flip => N,E

        expect(validateTransform(state)).toEqual(valid);
        expect(validateTransform({ ...state, coordinates, inputSrs: 'EPSG:5048' })).toEqual(valid); // TM35FIN (N,E)

        // localization keys (transform.validate) for errors
        expect(validateTransform({ ...state, coordinates: [] }).errors).toEqual(['noInputData']);
        expect(validateTransform({ ...state, inputSrs: null }).errors).toEqual(['crs']);
        expect(validateTransform({ ...state, outputSrs: null }).errors).toEqual(['crs']);
        expect(validateTransform({ ...state, inputHeightSrs: null }).errors).toEqual(['2DTo3D']);

        // localization keys (transform.validate) for warnings
        expect(validateTransform({ ...state, outputHeightSrs: null }).warnings).toEqual(['3DTo2D']);
        expect(validateTransform({ ...state, coordinates }).warnings).toEqual(['bbox']);
        expect(validateTransform({ ...state, coordinates: [{}] }).warnings).toEqual(['coordinates']); // skips bbox check
        expect(validateTransform({ ...state, coordinates: [...coordinates, {}] }).warnings).toEqual(['coordinates', 'bbox']);
    });
});

describe('parseCoordinateValue function', () => {
    test('returns float', () => {
        expect.assertions(12);
        // TODO: use toBeCloseTo 10 decimals?
        // DD
        expect(parseCoordinateValue('65,35548333°')).toEqual(65.35548333);
        expect(parseCoordinateValue('65,35548333')).toEqual(65.35548333);
        expect(parseCoordinateValue('65.35548333N')).toEqual(65.35548333);
        expect(parseCoordinateValue('65.35548333')).toEqual(65.35548333);
        // DD MM
        expect(parseCoordinateValue('65° 21,329\'')).toEqual(65.35548333333334);
        expect(parseCoordinateValue('65 21,329')).toEqual(65.35548333333334);
        // DD MM SS
        expect(parseCoordinateValue('65° 21\' 19,740"')).toEqual(65.35548333333332);
        expect(parseCoordinateValue('65 21 19,740')).toEqual(65.35548333333332);
        // The coordinates recommended to be used in emergency calls
        expect(parseCoordinateValue('N 65° 21,329\'')).toEqual(65.35548333333334);
        expect(parseCoordinateValue('E 28° 49,125\'')).toEqual(28.81875);
        // prime & double prime
        expect(parseCoordinateValue('60°11′57″N')).toEqual(60.19916666666666);
        expect(parseCoordinateValue('024°56′10″E')).toEqual(24.93611111111111);
    });
    test('returns NaN for invalid', () => {
        expect.assertions(3);
        expect(parseCoordinateValue()).toEqual(NaN);
        expect(parseCoordinateValue(' ')).toEqual(NaN);
        expect(parseCoordinateValue('P1')).toEqual(NaN);
    });
    test('returns same value for number', () => {
        expect.assertions(1);
        expect(parseCoordinateValue(65.35548333)).toEqual(65.35548333);
    });
});

describe('getDMS function', () => {
    test('returns suitable regexp for parsing', () => {
        expect.assertions(4);
        let { unit } = getDMS('65° 21\' 19,740"');
        expect(unit).toEqual('DDMMSS');

        unit = getDMS('60°11′57″N').unit;
        expect(unit).toEqual('DDMMSS');

        unit = getDMS('65 21,329\'').unit;
        expect(unit).toEqual('DDMM');

        unit = getDMS('65,35548333°').unit;
        expect(unit).toEqual('DD');

        /*
        expect('65° 21\' 19,740"').toMatch(new RegExp(ddmmss.pattern));
        const ddmmssParts = '65° 21\' 19,740"'.match(new RegExp(ddmmss.pattern));
        expect(ddmmssParts[1]).toEqual('65');
        expect(ddmmssParts[2]).toEqual('21');
        expect(ddmmssParts[3]).toEqual('19,740');
        */
    });
});
