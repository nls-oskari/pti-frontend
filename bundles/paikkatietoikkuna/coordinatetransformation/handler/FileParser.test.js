import { detectDelimiter, detectEpsgCodes, parseValue, parseFile, countPrefixColoumns } from './FileParser';
const getTextPromise = (lines) => () => new Promise (resolve => resolve(lines));
const GRS80 =
`Coordinate Reference System: EPSG:10690 - EUREF-FIN-GRS80 - axes: φ,λ - unit: degree
65,82977715 ; 26,80196470
65,65785282 ; 26,20213645
65,97937106 ; 26,19211347
`;

const GK25_N2000 =
`FileParser tries to find EPSG-codes from every header row
Coordinate Reference System: EPSG:3879 + EPSG:3900 - ETRS-GK25 + N2000 height - axes: N,E,H - unit: metre
1,6676229.692,25496455.278,30.254,office,Pasila Office Centre
2,6676172.887,25496132.773,15.254,mall,Mall of Tripla
`;

const CSV =
`id;x;y;z;comment
p1;6994350.131;23675008.210;10;line ending 1
p2;6944190.563;23627821.731;11;line ending 2
p3;7034685.879;23597550.373;9;line ending 3
`;

describe('parseFile function', () => {
    test('returns detected settings and parsed data for GRS80', () => {
        expect.assertions(11);
        const lines = GRS80.split('\n');
        const text = getTextPromise(GRS80);
        parseFile({ text }).then(contents => {
            const { settings, data, headers } = contents.fileContents;
            expect(data.length).toEqual(3);
            expect(headers.length).toEqual(1);
            const header = lines[0];
            expect(headers[0]).toEqual([header]); // header parts splited with delimiter
            // settings
            expect(settings.dimension).toEqual(2); // data columns
            expect(settings.prefixColCount).toEqual(0);
            expect(settings.headerLineCount).toEqual(1);
            expect(settings.delimiter).toEqual(';');
            expect(settings.decimalSeparator).toEqual(',');
            expect(settings.columns).toEqual(2); // all colums
            // data
            const cells = lines[1].split(';').map(cell => cell.replace(',', '.').trim());
            expect(data[0]).toEqual(cells);
            expect(data[0].length).toEqual(settings.dimension);
        });
    });

    test('returns detected settings and parsed data', () => {
        expect.assertions(15);
        const text = getTextPromise(GK25_N2000);
        parseFile({ text }).then(({ fileContents, srs, height }) => {
            const { settings, data, headers, prefixes, lineEndings } = fileContents;

            expect(srs).toEqual('EPSG:3879');
            expect(height).toEqual('EPSG:3900');

            expect(data.length).toEqual(2);
            expect(prefixes.length).toEqual(2);
            expect(lineEndings.length).toEqual(2);
            expect(headers.length).toEqual(2);

            // settings
            expect(settings.dimension).toEqual(3); // data columns
            expect(settings.prefixColCount).toEqual(1);
            expect(settings.headerLineCount).toEqual(2);
            expect(settings.delimiter).toEqual(',');
            expect(settings.decimalSeparator).toEqual('.');
            expect(settings.columns).toEqual(6); // all colums

            expect(data[0].length).toEqual(settings.dimension);
            expect(lineEndings[0].length).toEqual(2); // columns - data - prefix
            expect(prefixes[0].length).toEqual(1);
        });
    });

    test('returns parsed headers and data for CSV', () => {
        expect.assertions(6);
        const text = getTextPromise(CSV);
        const line = 'p1;6994350.131;23675008.210;10;line ending 1';
        parseFile({ text }).then(({ fileContents }) => {
            const { data, headers } = fileContents;
            expect(headers.length).toEqual(1);
            expect(headers[0].length).toEqual(5);
            expect(data[0].length).toEqual(2); // without srs and dimension defaults to 2D
            const array = [...prefixes[0], ...data[0], ...lineEndings[0]];
            expect(array.join(';')).toEqual(line);
        });
        const dimension = 3;
        parseFile({ text }, dimension).then(({ fileContents }) => {
            const { data, prefixes, lineEndings } = fileContents;
            expect(data[0].length).toEqual(3)
            const array = [...prefixes[0], ...data[0], ...lineEndings[0]];
            expect(array.join(';')).toEqual(line);
        });
    });
});

describe('parseValue function', () => {
    test('returns float', () => {
        // parseFileContents replaces comma decimal separator before parseValue is used
        // test only with point separator
        expect.assertions(10);
        expect(parseValue()).toEqual(NaN);
        expect(parseValue('598728.573')).toEqual(598728.573);
        expect(parseValue('7227022.930N')).toEqual(7227022.930); // cardinal
        expect(parseValue('65.35548333', 'DD')).toEqual(65.35548333);
        expect(parseValue('65.35548333N', 'DD')).toEqual(65.35548333); // cardinal
        expect(parseValue('65 21.329', 'DD MM')).toEqual(65.35548333333334);
        expect(parseValue('65 21 19.740', 'DD MM SS')).toEqual(65.35548333333332);
        expect(parseValue('65 21 19.740N', 'DD MM SS')).toEqual(65.35548333333332); // cardinal
        
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

describe('detectEpsgCodes function', () => {
    test('returns epsg codes', () => {
        const headerLine = 'Coordinate Reference System: EPSG:3879 - ETRS-GK25 - axes: N,E - unit: metre';
        expect.assertions(4);
        expect(detectEpsgCodes(headerLine).srs).toEqual('EPSG:3879');
        expect(detectEpsgCodes('---3879---').srs).toEqual('EPSG:3879');
        expect(detectEpsgCodes('38795')).toBeFalsy();
        expect(detectEpsgCodes('3 8 7 9')).toBeFalsy();
    });
});

describe('countPrefixColoumns function', () => {
    test('returns prefix count', () => {
        expect.assertions(14);
        expect(countPrefixColoumns('60.16743026,24.95428515','', ',', 2)).toEqual(0);
        expect(countPrefixColoumns('60.16743026,24.95428515,10.0','', ',', 2)).toEqual(0);
        expect(countPrefixColoumns('60.16743026,24.95428515,10.0','', ',', 3)).toEqual(0);
        expect(countPrefixColoumns('60.16743026,24.95428515,10.0,line ending','', ',', 3)).toEqual(0);

        expect(countPrefixColoumns('60,16743026N ; 24,95428515E','', ';', 2)).toEqual(0);
        expect(countPrefixColoumns('60 12 30,167;24 23 12,954','', ';', 2)).toEqual(0);
        expect(countPrefixColoumns('60,16743026N ; 24,95428515E; 10','', ';', 3)).toEqual(0);

        expect(countPrefixColoumns('Kauppatori;60.16743026;24,95428515','', ';', 2)).toEqual(1);
        expect(countPrefixColoumns('Kauppatori;60,16743026;24,95428515;line ending;another','', ';', 2)).toEqual(1);
        expect(countPrefixColoumns('Kauppatori;60,16743026;24,95428515;10','', ';', 3)).toEqual(1);
        expect(countPrefixColoumns('Kauppatori,60.16743026;24.95428515,10.12,ending','', ',', 3)).toEqual(1);

        // line numbers
        const lineNumbers = [...Array(2)].map((r, i) => `${i+1};34.1;43.2`);
        expect(countPrefixColoumns(...lineNumbers, ';', 2)).toEqual(1);

        const degrees = [...Array(2)].map((r, i) => `${i + 60}.${i};34.1;43.2`);
        expect(countPrefixColoumns(...degrees, ';', 2)).toEqual(0);

        // for now doesn't detect numeric prefix
        const numeric = [...Array(2)].map((r, i) => `${i*2};34.1;43.2`);
        expect(countPrefixColoumns(...numeric, ';', 2)).toEqual(0);
    });
});
