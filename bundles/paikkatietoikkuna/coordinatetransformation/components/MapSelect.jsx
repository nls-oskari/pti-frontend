import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Message, Radio } from 'oskari-ui';
import { BUNDLE, MAP } from '../constants';

const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;
const radioStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 8
};
// style={radioStyle}
export const MapSelect = ({ controller }) => {
    const [value, setValue] = useState(MAP.ADD);
    const onRadio = value => {
        setValue(value);
        controller.onAction(value);
    };
    const options = Object.values(MAP).map(value => ({ value, label: <Message messageKey={`mapMarkers.select.${value}`} bundleKey={BUNDLE} />}));
    return (
        <Content>
            <Message messageKey='mapMarkers.select.info' bundleKey={BUNDLE} />
            <Radio.Group
                value={value}
                onChange={evt => onRadio(evt.target.value)}
                options={options}/>
        </Content>
    );
};

MapSelect.propTypes = {
    controller: PropTypes.object.isRequired
};
