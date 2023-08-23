import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const LinkContainer = styled('div')`
    padding: 10px 10px 0px 16px;
    color: #CCC;
    vertical-align: bottom;
    margin-bottom: 8px;
    font-size: 12px;
    line-height: 12.6px;
`;

const StyledLink = styled('a')`
    color: #FFDE00;
    font-size: 12px;
    line-height: 150%;
    cursor: pointer;

    div {
        text-decoration: underline;
    }
    
`;

export const Link = ({ href, children }) => (
    <StyledLink href={href} rel="noopener" target="_blank">{children}</StyledLink>
);

Link.propTypes = {
    href: PropTypes.string
};
