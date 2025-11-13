import { addCardinal, toDegree, getFileContent } from './FileWriter';
import { FILE_DEFAULTS } from '../constants';

const CSV =
`id;x;y;z;comment
p1;6994350,131;23675008,210;10,550;line ending 1
p2;6944190,563;23627821,731;11,113;line ending 2
p3;7034685,800;23597550,300;9,000;line ending 3`;

const HEADER =
`Coordinate Reference System: EPSG:3877 + EPSG:3900 - ETRS-GK23 + N2000 height - axes: E,N,H (reversed) - unit: metre
23675008E;6994350N;11;line ending 1;line ending 2;line ending 3`;

describe('addCardinal function', () => {
    test('adds cardinal for coordinate', () => {
        expect.assertions(4);
        expect(addCardinal('394913,8', true)).toEqual('394913,8E');
        expect(addCardinal('-394913,8', true)).toEqual('394913,8W');
        expect(addCardinal('6696617.2')).toEqual('6696617.2N');
        expect(addCardinal('-6696617.2')).toEqual('6696617.2S');
    });
});

describe('toDegree function', () => {
    test('coordinate to degree', () => {
        expect.assertions(6);
        expect(toDegree(65.1, 'degree', 0)).toEqual('65');
        expect(toDegree(65.1, 'DD MM', 3)).toEqual('65 06.000');
        expect(toDegree(65.1, 'DD MM SS', 3)).toEqual('65 05 60.000'); // or '65 06 00.000'
        //expect(['65 05 60.000', '65 06 00.000']).toContain(toDegree(65.1, 'DD MM SS', 3)); 
        expect(toDegree(65.101, 'DD MM SS', 3)).toEqual('65 06 03.600');
        expect(toDegree(180, 'radian', 8)).toEqual(Math.PI.toFixed(8));
        expect(toDegree(90, 'gradian', 5)).toEqual('100.00000');
    });
});

describe('getFileContent function', () => {
    test('test export without file contents', () => {
        expect.assertions(4);
        const results = [
            { x: 65.8297771534, y: 26.8019647025},
            { x: 65.6578528212, y: 26.2021364531 }
        ];
        const state = {
            results,
            outputSrs: 'EPSG:10690', // GRS80
            export: { ...FILE_DEFAULTS.export }
        };
        // get results with default settings
        expect(getFileContent(state).includes(FILE_DEFAULTS.export.lineSeparator)).toBe(true);

        state.export.decimalCount = '0'; // ~1 m => 5 decimals for degree
        state.export.decimalSeparator = '.';
        const degrees = results.map(({x, y}) => [x, y].map(c => c.toFixed(5)).join(';')).join('\r\n');
        expect(getFileContent(state)).toEqual(degrees);

        const unit = 'DD MM SS'; // ~1 m => 1 decimals
        state.export.unit = unit;
        state.export.createHeader = true;
        const lines = getFileContent(state).split('\r\n');
        expect(lines[0].includes(unit)).toBe(true);
        expect(lines[1]).toEqual('65 49 47.2;26 48 07.1');
    });

    test('test export with imported file', () => {
        expect.assertions(2);
        const results = [
            { x: 6994350.131, y: 23675008.21, z: 10.55 },
            { x: 6944190.56342, y:23627821.73124, z: 11.1132 },
            { x: 7034685.8, y: 23597550.3, z: 9 }
        ];
        const fileContents = {
            headers: [['id', 'x', 'y', 'z', 'comment']],
            prefixes: [['p1'], ['p2'], ['p3']],
            lineEndings: [['line ending 1'], ['line ending 2'], ['line ending 3']]
        };
        const exportSettings = {
            ...FILE_DEFAULTS.export,
            lineSeparator: '\n',
            writeHeaders: true,
            writeLineEndings: true,
            prefixColCount: 1
        };
        const state = {
            results,
            outputSrs: 'EPSG:3877',// GK23
            outputHeightSrs: 'EPSG:3900', // N2000
            export: exportSettings,
            fileContents
        };
        expect(getFileContent(state)).toEqual(CSV);

        // create header, rounding & decimals, multi line endings
        state.results.splice(1);
        fileContents.lineEndings = [fileContents.lineEndings.flat()];
        state.export = {
            ...FILE_DEFAULTS.export,
            lineSeparator: '\n',
            createHeader: true,
            writeLineEndings: true,
            decimalCount: 0,
            axisFlip: true,
            writeCardinals: true
        };
        expect(getFileContent(state)).toEqual(HEADER);
    });
});
