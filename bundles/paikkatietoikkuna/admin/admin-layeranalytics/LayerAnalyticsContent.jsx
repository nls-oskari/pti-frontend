import React from 'react';
import PropTypes from 'prop-types';
import { Table, Spin } from 'antd';
import { Message } from 'oskari-ui';

const columnSettings = [
    {
        align: 'left',
        title: <Message messageKey='flyout.idTitle' />,
        dataIndex: 'id',
        key: 'id'
    },
    {
        align: 'left',
        title: <Message messageKey='flyout.successTitle' />,
        dataIndex: 'success',
        key: 'success'
    },
    {
        align: 'left',
        title: <Message messageKey='flyout.failureTitle' />,
        dataIndex: 'errors',
        key: 'errors'
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
