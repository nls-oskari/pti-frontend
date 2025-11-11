import { detectDelimiter, detectEpsgCodes, parseValue, parseFile } from './FileParser';
const text = () => new Promise (resolve => resolve(LINES));
const LINES =
`Coordinate Reference System: EPSG:3879 - ETRS-GK25 - axes: N,E - unit: metre
65,82977715;26,80196470
65,65785282;26,20213645
65,97937106;26,19211347
`;

describe('parseFile function', () => {
    test('returns detected settings and parsed data', () => {
        const lines = LINES.split('\n');
        expect.assertions(5);
        parseFile({ text }).then(contents => {
            const { settings, data, headers } = contents.fileContents;
            expect(data.length).toEqual(3);
            expect(headers.length).toEqual(1);
            expect(headers).toEqual([lines.slice(0,1)]);
            // settings
            expect(settings.headerLineCount).toEqual(1);
            expect(settings.prefixColCount).toEqual(0);
        });
    });
});

describe('parseValue function', () => {
    test('returns float', () => {
        // parseFileContents replaces comma decimal separator before parseValue is used
        // test only with point separator
        expect.assertions(9);
        expect(parseValue()).toEqual(NaN);
        expect(parseValue('598728.573')).toEqual(598728.573);
        expect(parseValue('7227022.930N')).toEqual(7227022.930); // cardinal
        expect(parseValue('65.35548333', 'DD')).toEqual(65.35548333);
        expect(parseValue('65.35548333N', 'DD')).toEqual(65.35548333); // cardinal
        expect(parseValue('65 21.329', 'DD MM')).toEqual(65.35548333333334);
        expect(parseValue('65 21 19.740', 'DD MM SS')).toEqual(65.35548333333332);
        
        expect(parseValue('100', 'gradian')).toEqual(90);
        expect(parseValue(Math.PI, 'radian')).toEqual(180);
    });
});

describe('detectDelimiter function', () => {
    test('returns float', () => {
        expect.assertions(9);
        expect(detectDelimiter('66,10927863;26,49389136')).toEqual(';');
        expect(detectDelimiter('65 25,329;27 24,807')).toEqual(';');
        expect(detectDelimiter('65 10 25,329;27 10 24,807')).toEqual(';');

        expect(detectDelimiter('66.10927863,26.49389136')).toEqual(',');
        expect(detectDelimiter('66.10927863,26.49389136,10.0')).toEqual(',');

        expect(detectDelimiter('1;66,10927863;26,49389136;10')).toEqual(';');
        expect(detectDelimiter('1,66.10927863,26.49389136,10')).toEqual(',');
        expect(detectDelimiter('id;66,10927863;26.49389136;line ending')).toEqual(';');
        expect(detectDelimiter('id,66.10927863,26.49389136,line ending')).toEqual(',');
    });
});

describe('detectEpsgCode function', () => {
    test('returns epsg code', () => {
        const headerLine = 'Coordinate Reference System: EPSG:3879 - ETRS-GK25 - axes: N,E - unit: metre';
        expect.assertions(4);
        expect(detectEpsgCodes(headerLine).srs).toEqual('EPSG:3879');
        expect(detectEpsgCodes('---3879---').srs).toEqual('EPSG:3879');
        expect(detectEpsgCodes('38795')).toBeFalsy();
        expect(detectEpsgCodes('3 8 7 9')).toBeFalsy();
    });
});
