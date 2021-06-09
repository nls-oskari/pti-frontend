import React from 'react';
import ReactDOM from 'react-dom';
import { LocaleProvider } from 'oskari-ui/util';
import { LayerAnalyticsContent } from './LayerAnalyticsContent';

Oskari.clazz.define('Oskari.framework.bundle.admin-layeranalytics.Flyout',

    function (instance) {
        this.instance = instance;
        this.container = null;
        this.flyout = null;
    }, {
        __name: 'Oskari.framework.bundle.admin-layeranalytics.Flyout',
        getName () {
            return this.__name;
        },
        getTitle () {
            return this.instance.getLocalization('flyout.title');
        },
        setEl (el, flyout, width, height) {
            this.container = el[0];
            this.flyout = flyout;
            this.container.classList.add('admin-layeranalytics');
            this.flyout.addClass('admin-layeranalytics');
        },
        /**
         * Renders content for flyout UI
         * @method createContent
         */
        createContent () {
            const root = this.container;
            if (!root) {
                return;
            }

            this.updateListing();
        },
        updateListing () {
            ReactDOM.render(
                <LocaleProvider value={{ bundleKey: this.instance.getName() }}>
                    <LayerAnalyticsContent analyticsData={[...this.instance.getAnalyticsData()]} isLoading={ this.instance.getLoadingState() } />
                </LocaleProvider>,
                this.container
            );
        },
        startPlugin () {}
    }
);
