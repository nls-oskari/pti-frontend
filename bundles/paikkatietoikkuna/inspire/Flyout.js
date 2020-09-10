import React from 'react';
import ReactDOM from 'react-dom';
import { Message } from 'oskari-ui';

Oskari.clazz.define('Oskari.inspire.Flyout',

    function (instance) {
        this.instance = instance;
        this.loc = Oskari.getMsg.bind(null, 'inspire');
        this.container = null;
        this.flyout = null;
        this.flyoutContent = this.loc('flyoutContent').content;
    }, {
        getName: function () {
            return 'Oskari.inspire.Flyout';
        },
        getTitle: function () {
            return this.loc('flyout.title');
        },
        setEl: function (el, flyout, width, height) {
            this.container = jQuery(el[0]);
            this.flyout = flyout;
            this.container.addClass('inspire');
            this.flyout.addClass('inspire');
        },
        /**
         * Renders content for flyout UI
         * @method createContent
         */
        createContent: function () {
            const root = document.getElementsByClassName('oskari-flyoutcontent inspire')[0];
            if (!root) {
                return;
            }

            ReactDOM.render(<Message bundleKey="flyoutContentMessage" messageKey={ this.flyoutContent } allowHTML={true} />, root);
        },
        startPlugin: function () {
            this.template = jQuery();
        }
    });
