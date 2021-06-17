import React from 'react';
import ReactDOM from 'react-dom';
import { LocaleProvider } from 'oskari-ui/util';
import { LayerAnalyticsList } from './LayerAnalyticsList';
import { LayerAnalyticsDetails } from './LayerAnalyticsDetails';

Oskari.clazz.define('Oskari.framework.bundle.admin-layeranalytics.Flyout',

    function (instance) {
        this.instance = instance;
        this.container = null;
        this.flyout = null;
        this.selectedLayerId = null;
    }, {
        __name: 'Oskari.framework.bundle.admin-layeranalytics.Flyout',
        getName () {
            return this.__name;
        },
        getTitle () {
            return this.instance.getLocalization('flyout').title;
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
        generateToScaleURL (details) {
            const stack = details.stack[0];
            let toScaleURL = '/?coord=' + stack.x + '_' + stack.y;
            toScaleURL += '&mapLayers='
            for (const [index, value] of stack.layers.entries()) {
                toScaleURL += value; // add layer id
                toScaleURL += '+100'; // add layer opacity
                toScaleURL += '+'; // add layer default style as empty string
                if (index !== (stack.layers.length - 1)) {
                    toScaleURL += ','; // add layer separator if not last layer in stack
                }
            }
            return toScaleURL;
        },
        updateListing () {
            ReactDOM.render(
                <LocaleProvider value={{ bundleKey: this.instance.getName() }}>
                    { !this.selectedLayerId ?
                        <LayerAnalyticsList
                            analyticsData={[...this.instance.getAnalyticsData()]}
                            isLoading={ this.instance.getLoadingState() }
                            layerEditorCallback={ this.openLayerEditor }
                            layerDetailsCallback={ (id) => this.toggleLayerDetails(id) }
                        />
                    :
                        <LayerAnalyticsDetails
                            layerData={ this.instance.getSingleLayerData(this.selectedLayerId) }
                            closeDetailsCallback={ () => this.toggleLayerDetails() }
                            toScaleCallback={ this.generateToScaleURL }
                        />
                    }
                </LocaleProvider>,
                this.container
            );
        },
        openLayerEditor (id) {
            if (id) {
                Oskari.getSandbox().postRequestByName('ShowLayerEditorRequest', [id]);
            }
        },
        toggleLayerDetails (selectedId) {
            this.selectedLayerId = typeof selectedId !== 'undefined' ? selectedId : null;
            this.updateListing();
        },
        startPlugin () {}
    }
);
