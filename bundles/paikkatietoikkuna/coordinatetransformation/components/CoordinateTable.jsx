import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Message, TextInput } from 'oskari-ui';
import { ComponentLabel } from './ComponentLabel';
import { Table } from 'oskari-ui/components/Table';
import { SRS, SRS_H, SYSTEM } from '../constants';
import { getDimension } from '../helper';

const COLUMNS = ['x', 'y', 'z'];
const WIDTH = 360;

const StyledTable = styled(Table)`
    td.ant-table-cell {
        ${props => props.$editable && 'padding: 0 !important;'}
        height: 24px;
        font-size: 12px;
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

export const CoordinateTable = ({ type, coordinates, srs, heightSrs, controller, editable }) => {
    // TODO: internal state for pagination
    // TODO: assumes pagination page size 10
    const dataSource = [...coordinates, ...getEmptyArray(10 - coordinates.length % 10)]; // .map((a,key) => ({...a, key }));
    const optController = editable ? controller : null;
    const count = coordinates.filter(coord => coord && !coord.invalid).length;
    return (
        <Content className={`t_table_${type}`}>
            <ComponentLabel label={`flyout.coordinateTable.${type}`}>
                <Count className='t_row_count'>{count}</Count>
                <Message messageKey='flyout.coordinateTable.rows' />
            </ComponentLabel>
            <StyledTable bordered
                $editable={editable}
                columns={getColumns(srs, heightSrs, optController)}
                dataSource={dataSource}
                pagination={{ hideOnSinglePage: true }}/>
        </Content>
    );
};

CoordinateTable.propTypes = {
    coordinates: PropTypes.array.isRequired,
    srs: PropTypes.string,
    type: PropTypes.string.isRequired,
    controller: PropTypes.object.isRequired
};

export const ResultTable = ({ coordinates, inputSrs, inputHeightSrs, results, outputSrs, outputHeightSrs }) =>  {
    const inputCols = getColumns(inputSrs, inputHeightSrs);
    const ouputCols = getColumns(outputSrs, outputHeightSrs);
    let dataSource = [];
    if (coordinates.length === results.length) {
        dataSource = coordinates.map((coord, i) => ({ ...coord, ...results[i] }));
    }
    return (
        <Content>
            <ComponentLabel label='flyout.coordinateTable.output' />
            <StyledTable bordered
                $editable={false}
                columns={[...inputCols, ...ouputCols ]}
                dataSource={dataSource}
                pagination={{ hideOnSinglePage: true }}/>
        </Content>
    );
};
