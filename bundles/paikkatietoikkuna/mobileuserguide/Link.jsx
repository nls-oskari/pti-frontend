import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// font-size is probably too small for mobile
//  but it's the same for other links as well
export const LinkContainer = styled('div')`
    vertical-align: bottom;
`;

const StyledLink = styled('a')`
`;
/*

    color: #FFDE00;
    div {
        text-decoration: underline;
    }
*/

export const Link = ({ href, children }) => (
    <StyledLink href={href} rel="noopener" target="_blank">{children}</StyledLink>
);

Link.propTypes = {
    href: PropTypes.string
};
