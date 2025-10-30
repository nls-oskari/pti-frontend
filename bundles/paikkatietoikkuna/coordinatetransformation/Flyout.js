import React from 'react';
import { createRoot } from 'react-dom/client';
import { FlyoutContent } from './view/FlyoutContent';
import { LocaleProvider, ThemeProvider } from 'oskari-ui/util';
import { Spin } from 'oskari-ui';
import { ViewHandler } from './handler/ViewHandler';
import { BUNDLE } from './constants';

Oskari.clazz.define('Oskari.coordinatetransformation.Flyout',

    function (instance) {
        this.instance = instance;
        this.loc = Oskari.getMsg.bind(null, BUNDLE);
        this.container = null;
        this.handler = null;
        this._reactRoot = null;
    }, {
        getName: function () {
            return 'Oskari.coordinatetransformation.Flyout';
        },
        getTitle: function () {
            return this.loc('flyout.title');
        },
        setEl: function (el, flyout) {
            flyout.addClass(BUNDLE);
            this.flyout = flyout;
            this.container = el[0];
            this.container.classList.add(BUNDLE);
        },
        getHandler: function () {
            if (!this.handler) {
                this.handler = new ViewHandler(this.instance, this.loc, this.instance.getConfiguration());
                this.handler.addStateListener(() => this.lazyRender());
            }
            return this.handler;
        },
        getReactRoot: function () {
            if (!this._reactRoot && this.container) {
                this._reactRoot = createRoot(this.container);
            }
            return this._reactRoot;
        },
        teardown: function () {
            this.handler?.onFlyoutClose();
            if (this._reactRoot) {
                this._reactRoot.unmount();
                this._reactRoot = null;
            }
        },
        // For some screen sizes css + media doesn't give enough space for content
        setContainerMaxHeight: function (mapHeight) {
            // calculate max-height based on map size
            const container = this.flyout.find('.oskari-flyoutcontentcontainer');
            const toolbarHeight = this.flyout.find('.oskari-flyouttoolbar').outerHeight(true);
            const maxHeight = mapHeight - toolbarHeight;
            if (container) {
                container.css('max-height', maxHeight + 'px');
            }
            if (container.outerHeight(true) >= maxHeight) {
                this.flyout.css('top', '0px');
            }
        },
        lazyRender: function () {
            const handler = this.getHandler();
            const root = this.getReactRoot();
            if (!root || !handler) {
                return;
            }
            const state = handler.getState();
            const content = (
                <LocaleProvider value={{ bundleKey: BUNDLE }}>
                    <ThemeProvider>
                        <Spin spinning={state.loading} percent={state.progress} size='large' showTip>
                            <FlyoutContent {...state} controller={handler.getController()}/>
                        </Spin>
                    </ThemeProvider>
                </LocaleProvider>
            );
            root.render(content);
        }
    }, {
        extend: ['Oskari.userinterface.extension.DefaultFlyout']
    });
