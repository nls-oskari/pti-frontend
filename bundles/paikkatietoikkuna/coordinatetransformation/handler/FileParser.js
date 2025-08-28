import { SEPARATORS } from '../constants';

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

export const parseFileContents = (lines = [], delimiter = ';', headerLineCount = 0, prefixColCount = 0) => {
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
    const data = linesWithData.map(line =>
        line.split(delimiter)
            // remove possible id column(s) at the start
            .slice(prefixColCount)
            .map(cell => cell.trim())
            .map(cell => decimalSeparator === ',' ? cell.replace(',', '.') : cell)
            // TODO: detect non decimal cells?
    );

    return {
        delimiter,
        // TODO: we don't need this when we don't send the file to backend
        delimiterValueForBackend: SEPARATORS.coordinateSeparator.find(sep => sep.char === delimiter)?.value,
        decimalSeparator,
        prefixColCount,
        data,
        lines,
        ...headerMetadata
    };
};

const interpretFileContents = (lines = []) => {
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
