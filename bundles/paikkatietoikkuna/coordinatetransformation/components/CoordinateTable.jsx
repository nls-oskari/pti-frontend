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
    float: right;
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
        if (value.includes('\t')) {
            controller.pasteCoordinates(value);
        } else {
            controller.updateCoordinate(index, { ...item, [column]:  value });
        }
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
    const columns = axes ? [...axes] : ['', ''];
    if (axis) {
        columns.push(axis)
    }
    const colWidth = WIDTH / columns.length;
    const onEdit = (index, column, item, value) => {
        if (value.includes('\t')) {
            controller.pasteCoordinates(value);
        } else {
            controller.updateCoordinate(index, { ...item, [column]: value });
        }
    };
    // TODO: if (optController) => props render
    return columns.map((axis, i) => ({
        title: axis ? <Message messageKey={`flyout.coordinateAxes.${axis}`}/> : axis,
        dataIndex: COLUMNS[i],
        width: colWidth,
        render: controller
            ? (value, item, index) => <StyledInput size='small' value={value} onChange={e => onEdit(index, COLUMNS[i], item, e.target.value)} onBlur={() => controller.parseInputCoordinate(index, COLUMNS[i])} />
            : undefined
    }));
};
export const InputCoordinates = ({ source, coordinates, inputSrs, inputHeightSrs, controller, editable=source === 'table'}) =>
    <CoordinateTable type='input' coordinates={coordinates} srs={inputSrs} heightSrs={inputHeightSrs} controller={controller} editable={editable} />;

export const OutputCoordinates = ({ results, outputSrs, outputHeightSrs, controller}) =>
    <CoordinateTable type='output' coordinates={results} srs={outputSrs} heightSrs={outputHeightSrs} controller={controller} />;

export const CoordinateTable = ({ type, coordinates, srs, heightSrs, controller, editable }) => {
    // TODO: internal state for pagination
    // TODO: assumes pagination page size 10
    const dataSource = [...coordinates, ...getEmptyArray(10 - coordinates.length % 10)]; // .map((a,key) => ({...a, key }));
    const optController = editable ? controller : null;
    return (
        <Content>
            <ComponentLabel label={`flyout.coordinateTable.${type}`}>
                {coordinates.filter(coord => !coord.invalid).length + ' '}
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
