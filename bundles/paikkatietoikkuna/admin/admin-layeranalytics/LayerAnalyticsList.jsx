import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Table, Spin } from 'antd';
import { Message, Tooltip } from 'oskari-ui';
import { EditOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import 'antd/es/table/style/index.js';

const TitleArea = styled.span`
    & {
        display: flex;
        justify-content: space-between;
    }
`;

const StyledTable = styled(Table)`
    .ant-table-column-sorter {
        margin: 0 0 0 5px;
    }
`;

const sorterTooltipOptions = {
    title: <Message messageKey='flyout.sorterTooltip' />
};

export const LayerAnalyticsList = ({ analyticsData, isLoading, layerEditorCallback, layerDetailsCallback }) => {

    const columnSettings = [
        {
            align: 'left',
            title: <Message messageKey='flyout.idTitle' />,
            dataIndex: 'title',
            key: 'title',
            defaultSortOrder: 'ascend',
            sortDirections: ['descend', 'ascend', 'descend'],
            sorter: (a, b) => Oskari.util.naturalSort(a.title, b.title),
            showSorterTooltip: sorterTooltipOptions,
            render: (title, item) => {
                return (
                    <TitleArea>
                        <Tooltip title={ <Message messageKey='flyout.showDetailsTooltip' /> }>
                            <a onClick={ () => layerDetailsCallback(item.id) } >{ title }</a>
                        </Tooltip>
                    </TitleArea>
                );
            }
        },
        {
            align: 'left',
            title: <Message messageKey='flyout.totalDisplaysTitle' />,
            dataIndex: 'total',
            key: 'total',
            sortDirections: ['descend', 'ascend', 'descend'],
            sorter: (a, b) => a.total - b.total,
            showSorterTooltip: sorterTooltipOptions
        },
        {
            align: 'left',
            title: <Message messageKey='flyout.failurePercentage' />,
            dataIndex: 'failurePercentage',
            key: 'failurePercentage',
            sortDirections: ['descend', 'ascend', 'descend'],
            sorter: (a, b) => a.failurePercentage - b.failurePercentage,
            showSorterTooltip: sorterTooltipOptions,
            render: (title) => <Fragment>{ title }%</Fragment>
        },
        {
            align: 'left',
            key: 'edit',
            render: (title, item) => {
                return (
                    <TitleArea>
                        <EditOutlined onClick={ () => layerEditorCallback(item.id) } />
                    </TitleArea>
                );
            }
        }
    ];

    if (isLoading) {
        return ( <Spin/> );
    }

    return (
        <StyledTable
            columns={ columnSettings }
            dataSource={ analyticsData }
            pagination={{ position: ['none', 'bottomCenter'] }}
        />
    );
};

LayerAnalyticsList.propTypes = {
    analyticsData: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    layerEditorCallback: PropTypes.func.isRequired,
    layerDetailsCallback: PropTypes.func.isRequired
};
