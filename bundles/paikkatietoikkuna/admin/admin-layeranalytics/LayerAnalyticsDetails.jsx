import React from 'react';
import PropTypes from 'prop-types';
import { Button, Table, Space } from 'antd';
import { Message } from 'oskari-ui';
import { ArrowLeftOutlined } from '@ant-design/icons';

import 'antd/es/table/style/index.js';

const dateLocale = 'fi-FI';
const localeDateOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
};

const formatTimestamp = (timestamp) => {
    let date;
    if (typeof timestamp !== 'undefined') {
        date = new Date(timestamp);
    }
    return formatTime(date) + ' ' + formatDate(date);
};
const formatDate = (date) => {
    if (typeof date === 'undefined') {
        return '--.--.----';
    }
    return date.toLocaleDateString(dateLocale, localeDateOptions);
};

const formatTime = (date) => {
    if (typeof date === 'undefined') {
        return '--:--:--';
    }
    return date.toLocaleTimeString(dateLocale).replace(/\./g, ':');
};

export const LayerAnalyticsDetails = ({ layerData, closeDetailsCallback, toScaleCallback }) => {

    const columnSettings = [
        {
            title: <Message messageKey='flyout.failureTitle' />,
            dataIndex: 'errors',
            key: 'errors',
            sortDirections: ['descend', 'ascend', 'descend'],
            sorter: (a, b) => a.errors - b.errors
        },
        {
            title: 'Aika',
            dataIndex: 'time',
            key: 'time',
            render: (text) => <Space>{ formatTimestamp(text) }</Space>
        },
        {
            title: '',
            key: 'action',
            render: (text, entry) => (
              <Space size="middle">
                <a href={ toScaleCallback(entry) } target='_blank'><Message messageKey='flyout.moveToScale' /></a>
              </Space>
            )
        }
    ];

    return (
        <Space direction='vertical' style={{ width: '100%' }}>
            <Button onClick={ () => closeDetailsCallback() } >
                <ArrowLeftOutlined />
                <Message messageKey='flyout.backToList' />
            </Button>
            <b>{ layerData.title }</b>
            { layerData.details.length > 0 &&
                <Table
                    columns={ columnSettings }
                    dataSource={ layerData.details }
                    pagination={{ position: ['none', 'none'] }}
                />
            }
        </Space>
    );
};

LayerAnalyticsDetails.propTypes = {
    layerData: PropTypes.object.isRequired,
    closeDetailsCallback: PropTypes.func.isRequired,
    toScaleCallback: PropTypes.func.isRequired
};
