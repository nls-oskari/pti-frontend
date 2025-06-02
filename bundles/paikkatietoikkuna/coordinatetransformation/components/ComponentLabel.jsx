import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Label, Message} from 'oskari-ui';

const StyledLabel = styled(Label)`
    font-weight: bold;
`;
const Extra = styled.span`
    float: right;
`;

export const ComponentLabel  = ({ label, children }) => (
    <StyledLabel>
        <Message messageKey={label} />
        <Extra>
            { children }
        </Extra>
    </StyledLabel>
);

ComponentLabel.propTypes = {
    label: PropTypes.string.isRequired
};
