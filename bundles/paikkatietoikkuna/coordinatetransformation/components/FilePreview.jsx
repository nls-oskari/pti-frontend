import React from 'react';
import styled from 'styled-components';
import { Message, Card, WarningIcon } from 'oskari-ui';
import { ErrorBoundary } from 'oskari-ui/util';
import { parseValue } from '../handler/FileParser';

const MAX_COLUMNS = 3;

const PreviewCellStyle = styled.td`
&&& {
    text-align: center;
}
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
    const previewHeaders = fileContents.headers[0].slice(prefixColCount, prefixColCount + dimension);
    const columns = previewHeaders.length === dimension ? 1 : dimension;
    return (
        <thead>
            <tr>
                { previewHeaders.map(h => (<th key={h} colSpan={columns}>{ h }</th>)) }
            </tr>
            { headerLineCount > 1 && <tr>
                <HasMoreCell colSpan={ dimension }>
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
    const dataCount = fileContents.data?.length;
    if (!dataCount) {
        return null;
    }
    // only show max 2 rows
    const previewData = fileContents.data.slice(0,2);
    const previewRows = previewData.map((data, i) => (
            <tr key={ 'data_' + i }>
                { data.map(cell => (<PreviewCell key={i + '_' + cell} data={ cell } dataFormat={ dataFormat } />)) }
            </tr>
        ));
    let extraMessages = [];
    const moreCount = dataCount - previewData.length;
    if (moreCount > 0) {
        extraMessages.push(<React.Fragment>{moreCount} <Message messageKey='fileSettings.rows' /></React.Fragment>);
    }
    const { dimension, columns } = fileContents.settings;
    if (columns > dimension ) {
        if (extraMessages.length) {
            extraMessages.push(' / ');
        }
        extraMessages.push(<React.Fragment>{columns - dimension} <Message messageKey='fileSettings.columns' /></React.Fragment>);
    }
    if (extraMessages.length) {
        previewRows.push(<tr key='metadata'>
                <HasMoreCell colSpan={ dimension }>
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
