import React from 'react';
import styled from 'styled-components';
import { Message, Card, WarningIcon } from 'oskari-ui';
import { ErrorBoundary } from 'oskari-ui/util';
import { parseValue } from '../handler/FileParser';

const MAX_COLUMNS = 3;

const PreviewCellStyle = styled.td`
text-align: center;
&.invalid {
    box-shadow: inset 0 0 2px 2px rgba(255,50,0,0.4);
    padding: 8px;
}
`;

const HasMoreCell = styled.td`
text-align: right !important;
`;

const RawPreviewNode = styled.pre`
    padding: 0.5em 1em;
    background-color: #fafafa;
    border-radius: 5px;
`;

const ParseHeaderRow = ({ fileContents }) => {
    const headerLineCount = fileContents.headers?.length;
    if (!headerLineCount) {
        return null;
    }
    const { prefixColCount = 0, dimension = MAX_COLUMNS } = fileContents.settings || {};
    // remove possible id column(s) at the start and line endings
    const previewHeaders = headers[0].slice(prefixColCount, prefixColCount + dimension);
    return (
        <thead>
            <tr>
                { previewHeaders.map(h => (<th key={h}>{ h }</th>)) }
            </tr>
            { headerLineCount > 1 && <tr>
                <HasMoreCell colSpan={ previewHeaders.length }>
                   + {headerLineCount - 1} <Message messageKey='fileSettings.rows' />
                </HasMoreCell>
            </tr>}
        </thead>)
}

const PreviewCell = ({ data, dataFormat }) => {
    const numberValue = parseValue(data, dataFormat);
    if (isNaN(numberValue)) {
        // show raw value
        return (<PreviewCellStyle className={'invalid'}>{data} <WarningIcon/></PreviewCellStyle>);
    }
    // show as number
    return (<PreviewCellStyle>{numberValue}</PreviewCellStyle>);
};

const ParseDataRow = ({ fileContents, dataFormat }) => {
    if (!fileContents.data || !fileContents.data.length) {
        return null;
    }
    // only show max 2 rows and 4 columns of data
    let previewData = fileContents.data;
    const dataCount = previewData.length;
    if (previewData.length > 2) {
        previewData = previewData.slice(0,2);
    }
    let colCountOriginal = previewData[0].length;
    let colCount = colCountOriginal;
    if (colCount > MAX_COLUMNS) {
        previewData = previewData.map(data => data.slice(0, MAX_COLUMNS));
        colCount = MAX_COLUMNS;
    }
    const previewRows = previewData.map((data, i) => (
            <tr key={ 'data_' + i }>
                { data.map(cell => (<PreviewCell key={i + '_' + cell} data={ cell } dataFormat={ dataFormat } />)) }
            </tr>
        ));
    let extraMessages = [];
    if (dataCount > 2 ) {
        extraMessages.push(<React.Fragment>{dataCount - 2} <Message messageKey='fileSettings.rows' /></React.Fragment>);
    }
    if (colCountOriginal > colCount ) {
        if (extraMessages.length) {
            extraMessages.push(' / ');
        }
        extraMessages.push(<React.Fragment>{colCountOriginal - colCount} <Message messageKey='fileSettings.columns' /></React.Fragment>);
    }
    if (extraMessages.length) {
        previewRows.push(<tr key='metadata'>
                <HasMoreCell colSpan={ colCount }>
                    + {extraMessages}
                </HasMoreCell>
            </tr>);
    }
    return previewRows;
};

const RawPreviewRow = ({ fileContents }) => {
    const { lines = [] } = fileContents;
    const previewLines = lines.slice(0, Math.min(5, lines.length));
    const more = lines.length > previewLines.length ? '\r\n...' : '';
    return (<RawPreviewNode>{ previewLines.join('\r\n') + more }</RawPreviewNode>);
};

export const FilePreview = ({ fileContents, dataFormat }) => {
    if (!fileContents) {
        return null;
    }
    
    return (
        <ErrorBoundary hide={true}>
            <Card title={<Message messageKey='fileSettings.previewTitle' />} size="small">
                <table>
                    <ParseHeaderRow fileContents={fileContents} />
                    <tbody>
                        <ParseDataRow fileContents={fileContents} dataFormat={dataFormat} />
                    </tbody>
                </table>
                <RawPreviewRow fileContents={fileContents} />
            </Card>
        </ErrorBoundary>);
};
