import { SRS, SRS_H, DEGREE, HOUR_TO_MIN, HOUR_TO_SEC, DEC_TO_GRAD, DEC_TO_RAD, CARDINALS } from '../constants';
import { getDimension } from '../helper';

export const parseFile = (file, dimension) => {
    return new Promise((resolve, reject) => {
        if (!file || typeof file.text !== 'function') {
            reject(new Error('Unable to parse file'));
        }
        let lines = [];
        file.text().then(content => {
            lines = content.trim().split(/\r?\n/);
            resolve(interpretFileContents(lines, dimension));
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

export const parseFileContents = (lines = [], importSettings = {}) => {
    const { delimiter, decimalSeparator, headerLineCount, prefixColCount, dimension } = importSettings;

    let headers = [];
    let linesWithData = lines;
    if (headerLineCount > 0) {
        const headerLines = lines.slice(0, headerLineCount);
        headers = headerLines.map(line => line.split(delimiter).map(cell => cell.trim()));
        linesWithData = lines.slice(headerLineCount);
    }
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
        // Fix for strange error: prefixColCount and wrong headerLineCount (too small)
        // linesWithData gets header row which may not have delimeter => whole header line goes to prefix array
        // to be sure that data get filled correctly for preview and parsing
        if (!data[lineIndex]) {
            data[lineIndex] = [];
        }
    });

    let lineEndingCount = 0;
    lineEndings.forEach(row => {
        const size = row?.length;
        if (size > lineEndingCount) {
            lineEndingCount = size;
        }
    });

    // store values for export & preview
    const settings = {
        dimension, // data column count
        decimalSeparator,
        delimiter,
        headerLineCount,
        prefixColCount,
        columns: dimension + prefixColCount + lineEndingCount
    };
    return {
        settings,
        data,
        prefixes,
        lineEndings,
        lines,
        headers
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

const interpretFileContents = (lines = [], dimension = 2) => {
    const midIndex = Math.floor(lines.length / 2);
    const dataLine = lines[midIndex];
    const delimiter = detectDelimiter(dataLine);
    const headerLineCount = countHeaders(lines, delimiter);
    const decimalSeparator = detectDecimalSeparator(dataLine, delimiter);

    const detectedSrs = lines.slice(0, headerLineCount)
        .map(line => detectEpsgCodes(line))
        .find(found => found);

    const { srs, height } = detectedSrs || {};
    if (detectedSrs) {
        dimension = getDimension(srs, height);
    }

    const prefixColCount = countPrefixColoumns(lines[midIndex], lines[midIndex + 1], delimiter, dimension);
    const settings = { delimiter, decimalSeparator, headerLineCount, prefixColCount, dimension };
    const fileContents = parseFileContents(lines, settings);
    return { srs, height, fileContents };
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

export const detectDelimiter = (line) => {
    const delimiters = [';', '\t', '|'];
    let maxCount = 0;
    let bestDelimiter = ';';

    for (const delim of delimiters) {
        const count = countNumericCells(line, delim);
        if (count > maxCount) {
            maxCount = count;
            bestDelimiter = delim;
        }
    }
    if (maxCount > 1) {
        return bestDelimiter;
    }
    // space (DD MM SS) and comma (decimal separator) as last
    // const comma = countNumericCells(line, ',');
    // const space = countNumericCells(line, ' ');
    const pointDecimalSeparator = line.includes('.');
    return pointDecimalSeparator ? ',' : ' ';
};

export const detectEpsgCodes = (headerLine) => {
    const codes = headerLine
        .replace(/\D/g, ' ') // replace non digits with white space
        .split(' ')
        .filter(num => num.length === 4 || num.length === 5)
        .map(num => `EPSG:${num}`);
    const srs = codes.find(code => SRS.find(s => s.value === code));
    const height = codes.find(code => SRS_H.find(s => s.value === code));
    if (srs || height) {
        return { srs, height };
    }
    return null;
};

const normalizeForNaN = cell => {
    // Remove spaces for e.g. DD MM SS
    const normalized = cell.replace(',', '.').replaceAll(' ', '');
    // remove cardinal
    if (CARDINALS.some(c => normalized.endsWith(c))) {
        return normalized.substring(0, normalized.length - 1);
    }
    return normalized;
};

// eslint-disable-next-line no-unused-vars
const isNumericRow = (row, delimiter) => {
    const cells = row.split(delimiter).map(cell => normalizeForNaN(cell));
    return cells.every(normalized => !isNaN(normalized) && normalized !== '');
};

const countNumericCells = (row, delimiter) => {
    const cells = row.split(delimiter).map(cell => normalizeForNaN(cell));
    return cells.filter(normalized => !isNaN(normalized) && normalized !== '').length;
};

const countHeaders = (lines = [], delimiter) => {
    let headerLines = 0;
    for (let i = 0; i < lines.length;) {
        if (countNumericCells(lines[i], delimiter) > 1) {
            headerLines = i;
            break;
        } else {
            i++;
        }
    }
    return headerLines;
};

export const countPrefixColoumns = (row, nextRow, delimiter, dimension) => {
    const cells = row.split(delimiter).map(cell => normalizeForNaN(cell));
    if (cells.length <= dimension) {
        return 0;
    }
    const firstNumIndex = cells.findIndex(cell => !isNaN(cell));
    if (firstNumIndex > 0) {
        // UI has checkbox
        return 1; // firstNumIndex;
    }
    // Cases:
    // 3D data without srs selections (dimension === 2)
    // line endings (number || string)
    // numeric prefix
    if (nextRow) {
        const nextCells = nextRow.split(delimiter).map(cell => cell.trim());
        // use parse float (degree)
        const isLineNumber = parseFloat(nextCells[0]) - parseFloat(cells[0]) === 1;
        if (isLineNumber) {
            return 1;
        }
    }
    return 0;
};
