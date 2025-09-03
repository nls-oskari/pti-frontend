import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Label, Message} from 'oskari-ui';

const StyledLabel = styled(Label)`
    font-weight: bold;
    ${props => props.$height && `height: ${props.$height}px`}
`;
const Extra = styled.span`
    float: right;
`;

export const ComponentLabel  = ({ height, label, children }) => (
    <StyledLabel $height={height}>
        <Message messageKey={label} />
        <Extra>
            { children }
        </Extra>
    </StyledLabel>
);

ComponentLabel.propTypes = {
    label: PropTypes.string.isRequired,
    height: PropTypes.number
};
