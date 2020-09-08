import React from 'react';

function createHTMLContent(textContent) {
    return {
        __html: textContent
    };
}

export const FlyoutContent = (props) => {
    return <div dangerouslySetInnerHTML={createHTMLContent(props.textContent)}/>
};
