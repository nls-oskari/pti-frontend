import React from 'react';
import PropTypes from 'prop-types';

function createHTMLContent(textContent) {
    return {
        __html: textContent
    };
}

export const FlyoutContent = ({textContent}) => {
    return <div dangerouslySetInnerHTML={createHTMLContent(textContent)}/>
};

FlyoutContent.propTypes = {
    textContent: PropTypes.string
};