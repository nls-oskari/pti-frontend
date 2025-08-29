import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Message, TextInput, WarningIcon } from 'oskari-ui';
import { ComponentLabel } from './ComponentLabel';
import { IconButton } from 'oskari-ui/components/buttons';
import { Table } from 'oskari-ui/components/Table';
import { SwapOutlined } from '@ant-design/icons';
import { SRS, SRS_H, ACTIONS } from '../constants';

const COLUMNS = ['x', 'y', 'z'];
const WIDTH = 360;

const StyledWarningIcon = styled(WarningIcon)`
    margin-right: 1em;
    font-size: 16px;
`;

const StyledTable = styled(Table)`
    td.ant-table-cell {
        ${props => props.$editable && 'padding: 0 !important;'}
        height: 24px;
        font-size: 12px;
    }
    .ant-table-thead {
        height: ${props => props.$large ? 52 : 34}px;
    }
`;

const StyledInput = styled(TextInput)`
    border: none;
    font-size: 12px;
`;
const Count = styled.span`
    margin-right: 0.5em;
`;

const Content = styled.div`

`;

// TODO: remove ?
const Cell = ({ value, item, onChange }) => {
    return (
        <TextInput
            value={value}
            onChange={(e) => onChange(item.key, e.target.value)}
        />
    );
};

const getEmptyArray = size => [...Array(size)].map(() => ({}));

const getColumn = (column, lonFirst, unit, dimension, editable, controller) => {
    let columnTitle = column;
    if (lonFirst) {
        if (column === 'x') {
            columnTitle = 'y';
        } else if (column === 'y') {
            columnTitle = 'x';
        }
    }
    const props = {
        title: <Message messageKey={`flyout.coordinateTable.${unit}.${columnTitle}`} />,
        dataIndex: column,
        width: dimension === 2 ? 180 : 120
    };
    const onEdit = (index, item, value) => {
        controller.updateCoordinate(index, { ...item, [column]:  value });
    };
    // TODO: some styling for invalid coordinate??
    if (editable) {
        props.render = (value, item, index) =>
            <StyledInput size='small' value={value} onChange={e => onEdit(index, item, e.target.value)} onBlur={() => controller.parseInputCoordinate(index, column)} />
    }
    return props;
};
const getColumns = (srs, heightSrs, controller) => {
    const { axes } = SRS.find(s => s.value === srs) || {};
    const { axis } = SRS_H.find(s => s.value === heightSrs) || {};
    const columnAxes = axes ? [...axes] : ['', ''];
    if (axis) {
        columnAxes.push(axis)
    }
    const colWidth = WIDTH / columnAxes.length;
    return columnAxes.map((axis, colIndex) => {
        const col = COLUMNS[colIndex];
        return {
            title: axis ? <Message messageKey={`flyout.coordinateAxes.${axis}`}/> : axis,
            dataIndex: col,
            width: colWidth,
            render: controller
                ? (value, item, row) => <StyledInput size='small' value={value}
                    status={value && isNaN(value) ? 'error' : ''}
                    onChange={e => controller.updateCoordinate(row, { ...item, [col]: e.target.value })}
                    onBlur={() => controller.parseInputCoordinate(row, col)} />
                : undefined
        };
    });
};

export const CoordinatesTable = ({ coordinates, sources, inputSrs, inputHeightSrs, large, controller }) => {
    const dataSource = [...coordinates, ...getEmptyArray(10 - coordinates.length % 10)]; // .map((a,key) => ({...a, key }));
    const fromFile = sources.includes(ACTIONS.IMPORT);
    const optController = fromFile ? null : controller;
    return (
        <Content className='t_table_input'>
            <ComponentLabel label='flyout.coordinateTable.input'>
                <IconButton
                    icon={<SwapOutlined />}
                    title={<Message messageKey='actions.axisFlip'/>}
                    onClick={() => controller.swapCoordinates()} />
            </ComponentLabel>
            <StyledTable bordered
                $editable={!fromFile}
                $large={large}
                columns={getColumns(inputSrs, inputHeightSrs, optController)}
                dataSource={dataSource}
                pagination={{ hideOnSinglePage: true }}/>
        </Content>
    );
};

CoordinatesTable.propTypes = {
    coordinates: PropTypes.array.isRequired,
    sources: PropTypes.array.isRequired,
    inputSrs: PropTypes.string,
    inputHeightSrs: PropTypes.string,
    controller: PropTypes.object.isRequired,
    large: PropTypes.bool.isRequired
};

export const ResultsTable = ({ coordinates, results, outputSrs, outputHeightSrs, transformed, large }) =>  {
    const dataSource = [...results, ...getEmptyArray(10 - results.length % 10)]; // .map((a,key) => ({...a, key }));
    const count = coordinates.filter(coord => coord && !coord.invalid).length;
    const outdated = results.length > 0 && !transformed;
    const validLengths = coordinates.length === results.length;
    return (
        <Content className='t_table_output'>
            <ComponentLabel label='flyout.coordinateTable.output'>
                {outdated &&
                    <StyledWarningIcon tooltip={<Message messageKey='flyout.coordinateTable.outdated' />} />
                }
                <Count className='t_row_count'>{count}</Count>
                <Message messageKey='flyout.coordinateTable.rows' />
            </ComponentLabel>
            <StyledTable bordered
                $large={large}
                columns={getColumns(outputSrs, outputHeightSrs)}
                dataSource={dataSource}
                pagination={{ hideOnSinglePage: true }}/>
        </Content>
    );
};

ResultsTable.propTypes = {
    coordinates: PropTypes.array.isRequired,
    results: PropTypes.array.isRequired,
    outputSrs: PropTypes.string,
    outputHeightSrs: PropTypes.string,
    transformed: PropTypes.bool.isRequired,
    large: PropTypes.bool.isRequired
};
