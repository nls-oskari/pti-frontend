import React from 'react';
import PropTypes from 'prop-types';
import { Table, Spin } from 'antd';
import { Message } from 'oskari-ui';

const columnSettings = [
    {
        align: 'left',
        title: <Message messageKey='flyout.idTitle' />,
        dataIndex: 'title',
        key: 'title',
        defaultSortOrder: 'ascend',
        sortDirections: ['descend', 'ascend', 'descend'],
        sorter: (a, b) => Oskari.util.naturalSort(a.title - b.title),
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
    }
];

export const LayerAnalyticsContent = ({ analyticsData, isLoading }) => {
    if (isLoading) {
        return ( <Spin/> );
    }

    return (
        <Table
            columns={ columnSettings }
            dataSource={ analyticsData }
            pagination={{ position: ['none', 'none'] }}
        />
    );
};

LayerAnalyticsContent.propTypes = {
    analyticsData: PropTypes.array.isRequired
};
