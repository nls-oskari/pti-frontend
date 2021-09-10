import React from 'react';
import PropTypes from 'prop-types';
import { Table, Spin } from 'antd';
import { Message } from 'oskari-ui';
import { EditOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import 'antd/es/table/style/index.js';

const TitleArea = styled.span`
    & {
        display: flex;
        justify-content: space-between;
    }
`;

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
            render: (title, item) => {
                return (
                    <TitleArea>
                        <a onClick={ () => layerDetailsCallback(item.id) } >{ title }</a>
                    </TitleArea>
                );
            }
        },
        {
            align: 'left',
            title: <Message messageKey='flyout.successTitle' />,
            dataIndex: 'success',
            key: 'success',
            sortDirections: ['descend', 'ascend', 'descend'],
            sorter: (a, b) => a.success - b.success,
        },
        {
            align: 'left',
            title: <Message messageKey='flyout.failureTitle' />,
            dataIndex: 'errors',
            key: 'errors',
            sortDirections: ['descend', 'ascend', 'descend'],
            sorter: (a, b) => a.errors - b.errors,
            render: (title, item) => {
                return (
                    <TitleArea>
                        { title }
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
        <Table
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
