import { SRS, SRS_H, SYSTEM, HOUR_TO_MIN, DEC_TO_GRAD, DEC_TO_RAD } from '../constants';
import { getDimension, isDegreeSystem, isLonFirst, getDecimalCount } from '../helper';

const CRS = 'Coordinate Reference System';

const toDegree = (coord, unit, decimals) => { //, isLon)
    if (unit === 'DD' || unit === 'degree') {
        return coord.toFixed(decimals);
    }
    if (unit === 'gradian') {
        coord *= DEC_TO_GRAD;
        return coord.toFixed(decimals);
    }
    if (unit === 'radian') {
        coord *= DEC_TO_RAD;
        return coord.toFixed(decimals);
    }
    const separator = unit.includes(' ') ? ' ' : '';
    const d = Math.floor(coord);
    const m = (coord - d) * HOUR_TO_MIN;
    const dd = d < 10 ? '0' + d : d.toString();
    // const dd = isLon && d < 100 ? '0' + d : d.toString();
    if (unit === 'DDMM' || unit === 'DD MM') {
        let mm = m.toFixed(decimals);
        if (m < 10) {
            mm = '0' + mm;
        }
        return dd + separator + mm;
    }
    const mInt = Math.floor(m);
    const s = (m - mInt) * HOUR_TO_MIN;
    const mm = mInt < 10 ? '0' + mInt : mInt;
    let ss = s.toFixed(decimals);
    if (s < 10) {
        ss = '0' + ss;
    }
    return dd + separator + mm + separator + ss;
};

const addCardinal = (coord, isLon) => {
    if (coord.startsWith('-')) {
        const cardinal = isLon ? 'W' : 'S';
        return coord.substring(1) + cardinal;
    }
    const cardinal = isLon ? 'E' : 'N';
    return coord + cardinal;
};

const getFileContent = ({
    results,
    inputSrs,
    inputHeightSrs,
    outputSrs,
    outputHeightSrs,
    export: settings,
    fileContents
}) => {
    const {
        unit,
        decimalCount,
        decimalSeparator,
        delimiter,
        lineSeparator,
        axisFlip,
        prefixColCount,
        writeCardinals,
        writeLineEndings
    } = settings;
    const { prefixes = [], lineEndings = [], data = [] } = fileContents || {};
    const dimension = getDimension(outputSrs, outputHeightSrs);
    const isDegree = isDegreeSystem(outputSrs);
    // Force to 'metric' for non degree as select isn't shown for user
    const decimalUnit = isDegree ? unit : 'metric';
    const decimals = getDecimalCount(decimalCount, decimalUnit);

    const lonFirst = axisFlip ? !isLonFirst(outputSrs) : isLonFirst(outputSrs);
    const lonIndex = lonFirst ? 0 : 1;
    const prefixesFromImport = prefixes.length > 0;
    const replace = decimalSeparator === ',';

    let lineEndingCount = 0;
    let collectedEndings = lineEndings;
    if (writeLineEndings) {
        lineEndings.forEach(row => {
            const size = row?.length;
            if (size > lineEndingCount) {
                lineEndingCount = size;
            }
        });
        // file parser uses dimension 3 for parsing data
        // get first line ending column from data
        if (getDimension(inputSrs, inputHeightSrs) === 2) {
            collectedEndings = data.map((dataRow, i) => {
                const first = dataRow[2] || '';
                // missing value at the end should be fine for csv, could use lineEndingCount to fill array with ''
                const rest = lineEndings[i] || [];
                return [first, ...rest];
            });
            lineEndingCount++;
        }
    }

    return results.map((coord, index) => {
        const x = axisFlip ? coord.y : coord.x;
        const y = axisFlip ? coord.x : coord.y;
        const array = dimension === 3 ? [x, y, coord.z] : [x, y];
        let row = isDegree
            ? array.map((c, i) => toDegree(c, unit, decimals, i === lonIndex))
            : array.map(c => c.toFixed(decimals));

        // replace point and writeCardinals if needed
        row = row.map(r => replace ? r.replace('.', ',') : r)
            .map((r, i) => writeCardinals ? addCardinal(r, i === lonIndex) : r);

        if (prefixColCount > 0) {
            // use stored from imported file if available
            const ids = prefixesFromImport
                ? prefixes[index] || [...Array(prefixColCount)].map(() => '')
                : [index + 1];
            ids.forEach(p => row.unshift(p));
        }
        if (lineEndingCount > 0) {
            collectedEndings[index].forEach(p => row.push(p));
        }
        return row.join(delimiter);
    }).join(lineSeparator);
};

const createSrsHeader = (srs, height, axisFlip, decimalUnit) => {
    // name for KKJ (no need to localize zones)
    const { name, label = name, axes = [], system } = SRS.find(s => s.value === srs) || {};
    const { unit: systemUnit } = SYSTEM.find(s => s.value === system) || {};
    let heightName = '';
    if (height) {
        const { axis = 'H', name } = SRS_H.find(h => h.value === height) || {};
        axes.push(axis);
        heightName = ` + ${name}`;
    }
    const modAxes = axisFlip ? [...axes.slice(0, 2).toReversed(), ...axes.slice(2)] : axes;
    const selectedUnit = isDegreeSystem(srs) && decimalUnit !== 'degree' ? ` (${decimalUnit})` : '';
    return `${CRS}: ${srs} - ${label}${heightName} - axes: ${modAxes.join()}${axisFlip ? ' (reversed)' : ''} - unit: ${systemUnit}${selectedUnit}`;
};

export const exportStateToFile = (state) => {
    const { outputSrs, outputHeightSrs, fileContents } = state;
    const { fileName, lineSeparator, createHeader, writeHeaders, axisFlip, unit, delimiter } = state.export;

    const content = [];
    if (createHeader) {
        const header = createSrsHeader(outputSrs, outputHeightSrs, axisFlip, unit);
        content.push(header);
    }
    if (writeHeaders) {
        fileContents?.headers?.forEach(header => content.push(header.join(delimiter)));
    }
    const text = getFileContent(state);
    content.push(text);
    const file = new Blob([content.join(lineSeparator)], { type: 'text/plain' }); // transparent, native
    loadFile(file, fileName);
};

const loadFile = (file, name) => {
    const elem = document.createElement('a');
    const href = window.URL.createObjectURL(file);
    elem.href = href;
    elem.download = name || 'results.txt';
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
    window.URL.revokeObjectURL(href);
};
