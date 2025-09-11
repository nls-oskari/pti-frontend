import { DEGREE, HOUR_TO_MIN, HOUR_TO_SEC, DEC_TO_GRAD, DEC_TO_RAD } from '../constants';

export const parseFile = (file) => {
    return new Promise((resolve, reject) => {
        if (!file || typeof file.text !== 'function') {
            reject(new Error('Unable to parse file'));
        }
        let lines = [];
        file.text().then(content => {
            lines = content.trim().split(/\r?\n/);
            resolve(interpretFileContents(lines));
        });
    });
};

const addToArray = (array, index, value) => {
    if (array[index]) {
        array[index].push(value);
    } else {
        array[index] = [value];
    }
};

export const parseFileContents = (lines = [], delimiter = ';', headerLineCount = 0, prefixColCount = 0, dimension = 2) => {
    const headerMetadata = {
        headerLines: [],
        headers: []
    };
    let linesWithData = lines;
    if (headerLineCount > 0) {
        const headerLines = lines.slice(0, headerLineCount);
        const headers = headerLines[0].split(delimiter).map(cell => cell.trim());
        headerMetadata.headerLines = headerLines;
        // remove possible id column(s) at the start
        headerMetadata.headers = headers.slice(prefixColCount);
        linesWithData = lines.slice(headerLineCount);
    }
    const decimalSeparator = detectDecimalSeparator(linesWithData[0], delimiter);
    const data = [];
    const prefixes = [];
    const lineEndings = [];
    linesWithData.forEach((line, lineIndex) => {
        line.split(delimiter).forEach((cell, cellIndex) => {
            if (cellIndex < prefixColCount) {
                addToArray(prefixes, lineIndex, cell);
            } else if (cellIndex < prefixColCount + dimension) {
                const coord = decimalSeparator === ',' ? cell.replace(',', '.') : cell;
                addToArray(data, lineIndex, coord.trim());
            } else {
                addToArray(lineEndings, lineIndex, cell);
            }
        });
    });

    return {
        delimiter,
        decimalSeparator,
        prefixColCount,
        data,
        prefixes,
        lineEndings,
        lines,
        ...headerMetadata
    };
};

// https://github.com/nls-oskari/kartta.paikkatietoikkuna.fi/blob/master/service-coordtransform/src/main/java/fi/nls/paikkatietoikkuna/coordtransform/CoordTransService.java#L25-L26
export const parseValue = (value, format = 'metric') => {
    if (typeof value === 'undefined') {
        return NaN;
    }
    const asNumber = parseFloat(value);
    const unitItem = DEGREE.find(unit => unit.value === format);
    if (!unitItem) {
        return asNumber;
    }
    if (format === 'gradian') {
        return asNumber / DEC_TO_GRAD;
    } else if (format === 'radian') {
        return asNumber / DEC_TO_RAD;
    } else if (!format?.startsWith('DD')) {
        return asNumber;
    }
    // parsing the degree format
    const degreeValue = value.replaceAll(' ', '');
    const degreeFormat = format.replaceAll(' ', '');
    if (degreeFormat === 'DD') {
        return asNumber;
    } else if (degreeFormat === 'DDMM') {
        // value should be a string of length 4+
        if (degreeValue.length < 4) {
            return NaN;
        }
        const dd = parseFloat(degreeValue.substring(0, 2));
        const mm = parseFloat(degreeValue.substring(2));
        if (isNaN(dd) || isNaN(mm)) {
            return NaN;
        }
        return dd + mm / HOUR_TO_MIN;
    } else if (degreeFormat === 'DDMMSS') {
        // value should be a string of length 5+
        if (degreeValue.length < 5) {
            return NaN;
        }
        const dd = parseFloat(degreeValue.substring(0, 2));
        const mm = parseFloat(degreeValue.substring(2, 4));
        const ss = parseFloat(degreeValue.substring(4));
        if (isNaN(dd) || isNaN(mm) || isNaN(ss)) {
            return NaN;
        }
        return dd + (mm / HOUR_TO_MIN) + (ss / HOUR_TO_SEC);
    }

    return asNumber;
};

const interpretFileContents = (lines = []) => {
    // TODO: doesn't work correctly with quite common files (header, semicolon, point)
    // Maybe try to detect headers first as header line spaces leads to ' ' delimeter
    const delimiter = detectDelimiter(lines[0]);
    const headerLineCount = countHeaders(lines, delimiter);
    return parseFileContents(lines, delimiter, headerLineCount);
};

const detectDecimalSeparator = (line = '', delimiter = ';') => {
    if (!line.trim() || delimiter === ',') {
        return '.';
    }
    if (line.includes(',')) {
        return ',';
    }
    return '.';
};

const detectDelimiter = (line) => {
    // comma as last as it very well be the decimal separator as well
    const delimiters = [';', '\t', '|', ' ', ','];
    let maxCount = 0;
    let bestDelimiter = ';';

    for (const delim of delimiters) {
        const count = line.split(delim).length;
        if (count > maxCount) {
            maxCount = count;
            bestDelimiter = delim;
        }
    }

    return bestDelimiter;
};

const isNumericRow = (row, delimiter) => {
    const cells = row.split(delimiter).map(cell => cell.trim());

    return cells.every(cell => {
        const normalized = cell.replace(',', '.');
        return !isNaN(normalized) && normalized !== '';
    });
};

const countHeaders = (lines = [], delimiter) => {
    let headerLines = 0;
    for (let i = 0; i < lines.length;) {
        if (isNumericRow(lines[i], delimiter)) {
            headerLines = i;
            break;
        } else {
            i++;
        }
    }
    return headerLines;
};
