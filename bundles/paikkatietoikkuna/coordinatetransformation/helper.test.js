import { parseCoordinateValue, getDMS, getDimension, isDegreeSystem, is3DSystem, getSrsUnit, isLonFirst, validateCoordinate } from './helper';

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


describe('validateCoordinate function', () => {
    const is3D = true;
    test('returns true for valid', () => {
        const coord = { x:10.4, y:20.4, z:10 };
        expect(validateCoordinate(coord)).toBe(true);
        expect(validateCoordinate(coord, is3D)).toBe(true);
    });
    test('returns false for invalid', () => {
        expect(validateCoordinate({ x:'10', y:'20' })).toBe(false); // not number
        expect(validateCoordinate({ x:10, y:20 }, is3D)).toBe(false); // z missing
    });
});

describe('parseCoordinateValue function', () => {
    test('returns float', () => {
        expect.assertions(8);
        // TODO: toBeCloseTo
        // 65.35548333333334
        // 65.35548333 
        // DD
        expect(parseCoordinateValue('65,35548333°')).toEqual(65.35548333);
        expect(parseCoordinateValue('65,35548333')).toEqual(65.35548333);
        // DD MM
        expect(parseCoordinateValue('65° 21,329\'')).toEqual(65.35548333333334);
        expect(parseCoordinateValue('65 21,329')).toEqual(65.35548333333334);
        // DD MM SS
        expect(parseCoordinateValue('65° 21\' 19,740"')).toEqual(65.35548333333332);
        expect(parseCoordinateValue('65 21 19,740')).toEqual(65.35548333333332);
        // The coordinates recommended to be used in emergency calls
        expect(parseCoordinateValue('N 65° 21,329\'')).toEqual(65.35548333333334);
        expect(parseCoordinateValue('E 28° 49,125\'')).toEqual(28.81875);
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
        expect.assertions(3);
        const ddmmss = getDMS('65° 21\' 19,740"');
        expect(ddmmss.id).toEqual('DDMMSS');

        const ddmm = getDMS('65 21,329\'');
        expect(ddmm.id).toEqual('DDMM');

        const dd = getDMS('65,35548333°');
        expect(dd.id).toEqual('DD');

        /*
        expect('65° 21\' 19,740"').toMatch(new RegExp(ddmmss.pattern));
        const ddmmssParts = '65° 21\' 19,740"'.match(new RegExp(ddmmss.pattern));
        expect(ddmmssParts[1]).toEqual('65');
        expect(ddmmssParts[2]).toEqual('21');
        expect(ddmmssParts[3]).toEqual('19,740');
        */
    });
});