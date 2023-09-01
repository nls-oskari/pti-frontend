import React from 'react';
import PropTypes from 'prop-types';

export const Link = ({ href, children }) => (
    <a href={href} rel="noopener" target="_blank">{children}</a>
);

Link.propTypes = {
    href: PropTypes.string
};
