import React from 'react';
import { styled } from 'styled-components';
import { Message } from 'oskari-ui';

// The content is on p-tags that don't have any padding/margin without this
const Content = styled('div')`
    p {
        margin-bottom: 1em;
    }
`;

export class InspireView {
    constructor (instance) {
        this.instance = instance;
    }

    getContent () {
        return <Message bundleKey={ this.instance.getName() } messageKey="flyoutContent.content" allowHTML={true} LabelComponent={Content} />;
    }
}
