import React from 'react';
import ReactDOM from 'react-dom';
import { Message } from 'oskari-ui';

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
            this.flyout = flyout;
            this.container.classList.add('inspire');
            this.flyout.addClass('inspire');
        },
        /**
         * Renders content for flyout UI
         * @method createContent
         */
        createContent: function () {
            const root = this.container;
            if (!root) {
                return;
            }
            ReactDOM.render(<Message bundleKey={ this.instance.getName() } messageKey="flyoutContent.content" allowHTML={true} />, root);
        },
        startPlugin: function () {}
    });
