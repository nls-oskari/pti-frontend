import React from 'react';
import { createRoot } from 'react-dom/client';
import styled from 'styled-components';
import { Message } from 'oskari-ui';

// The content is on p-tags that don't have any padding/margin without this
const Content = styled.div`
    p {
        margin-bottom: 1em;
    }
`;

Oskari.clazz.define('Oskari.inspire.Flyout',

    function (instance) {
        this.instance = instance;
        this.container = null;
        this.flyout = null;
    }, {
        __name: 'Oskari.inspire.Flyout',
        getName: function () {
            return this.__name;
        },
        getTitle: function () {
            return this.instance.loc('flyout.title');
        },
        setEl: function (el, flyout, width, height) {
            this.container = el[0];
            this._reactRoot = createRoot(this.container);
            this.flyout = flyout;
            this.container.classList.add('inspire');
            this.flyout.addClass('inspire');
            this.flyout.css('max-width', '700px');
        },
        /**
         * Renders content for flyout UI
         * @method createContent
         */
        createContent: function () {
            if (!this._reactRoot) {
                return;
            }
            this._reactRoot.render(<Message bundleKey={ this.instance.getName() } messageKey="flyoutContent.content" allowHTML={true} LabelComponent={Content} />);
        },
        startPlugin: function () {}
    });
