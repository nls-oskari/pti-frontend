import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'antd';
import { Message } from 'oskari-ui';
import { ArrowLeftOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import 'antd/es/card/style/index.js';

export const LayerAnalyticsDetails = ({ layerData, closeDetailsCallback }) => {

    return (
        <Card>
            <Button onClick={ () => closeDetailsCallback() } ><ArrowLeftOutlined /></Button>
            { layerData.id }
        </Card>
    );
};

LayerAnalyticsDetails.propTypes = {
    layerData: PropTypes.object.isRequired,
    closeDetailsCallback: PropTypes.func.isRequired
};
