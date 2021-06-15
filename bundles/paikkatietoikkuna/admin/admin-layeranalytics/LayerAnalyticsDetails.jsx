import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import { Message } from 'oskari-ui';
// import { EditOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import 'antd/es/card/style/index.js';

export const LayerAnalyticsList = ({ layerData }) => {

    console.log(layerData);

    return (
        <Card />
    );
};

LayerAnalyticsList.propTypes = {
    layerData: PropTypes.object.isRequired
};
