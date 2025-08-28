import React from 'react';
import styled from 'styled-components';
import { Message, Card, WarningIcon } from 'oskari-ui';
import { ErrorBoundary } from 'oskari-ui/util';

const MAX_COLUMNS = 4;

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
    if (!fileContents.headers) {
        return null;
    }
    const headerLineCount = fileContents.headerLines.length;
    let previewHeaders = fileContents.headers;
    if (fileContents.headers.length > MAX_COLUMNS) {
        previewHeaders = fileContents.headers.slice(0, MAX_COLUMNS);
    }
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

const PreviewCell = ({ data }) => {
    const numberValue = parseFloat(data);
    if (isNaN(numberValue)) {
        // show raw value
        return (<PreviewCellStyle className={'invalid'}>{data} <WarningIcon/></PreviewCellStyle>);
    }
    // show as number
    return (<PreviewCellStyle>{numberValue}</PreviewCellStyle>);
};

const ParseDataRow = ({ fileContents }) => {
    if (!fileContents.data) {
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
    const previewRows = previewData.map(data => (
            <tr>
                { data.map(cell => (<PreviewCell data={ cell } />)) }
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
        previewRows.push(<tr>
                <HasMoreCell colSpan={ colCount }>
                    + {extraMessages}
                </HasMoreCell>
            </tr>);
    }
    return previewRows;
};

const RawPreviewRow = ({ fileContents }) => {
    const previewLines = fileContents.lines.slice(0, Math.min(5, fileContents.lines.length));

    return (<RawPreviewNode>{ previewLines.join('\r\n') + '\r\n...' }</RawPreviewNode>);
};

export const FilePreview = ({ fileContents }) => {
    if (!fileContents) {
        return null;
    }
    
    return (
        <ErrorBoundary hide={true}>
            <Card title={<Message messageKey='fileSettings.previewTitle' />} size="small">
                <table>
                    <ParseHeaderRow fileContents={fileContents} />
                    <tbody>
                        <ParseDataRow fileContents={fileContents} />
                    </tbody>
                </table>
                <RawPreviewRow fileContents={fileContents} />
            </Card>
        </ErrorBoundary>);
};
