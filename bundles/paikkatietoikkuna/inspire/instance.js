import './Flyout.js';
import React from 'react';
import { styled } from 'styled-components';
import { NavigationAdapter } from 'oskari-ui/util/NavigationAdapter';
import { showFlyout } from 'oskari-ui/components/window';
import { InspireView } from './view/InspireView';

const MENU_ITEM_ID = 'inspire-item';
const FLYOUT_ID = 'Inspire';
const FlyoutPadding = styled('div')`
    margin: 0;
    padding: 1.5em 1.5em 1.5em 1.75em;
    max-width: 44em;
`;

Oskari.clazz.define('Oskari.mapframework.bundle.inspire.instance',
    function () {
        this.plugins = {};
        this.defaultConf.flyoutClazz = 'Oskari.inspire.Flyout';
        this.defaultConf.name = 'inspire';
        this.loc = Oskari.getMsg.bind(null, 'inspire');
        this.inspireView = null;
        this.mainNavigationControls = null;
        this.navigation = new NavigationAdapter(this, {
            createMenuItem: (navigation) => this.createMenuItem(navigation),
            onStart: () => {
                this.inspireView = new InspireView(this);
            },
            onStop: () => {
                this.closeMainNavigationFlyout();
                this.inspireView = null;
            }
        });
    },
    {
        __name: 'inspire',
        start: function () {
            const conf = this.getConfiguration();
            const sandbox = Oskari.getSandbox(conf.sandbox || 'sandbox');
            this.sandbox = sandbox;
            sandbox.register(this);
            if (conf.stateful === true) {
                sandbox.registerAsStateful(this.mediator.bundleId, this);
            }
            this.navigation.start();
            this.afterStart(sandbox);
        },
        /**
        * @method afterStart
        */
        afterStart: function () {
            if (!this.navigation.service) {
                this.createUi();
            }
        },
        stop: function () {
            const result = this.navigation.stop();
            if (this.navigation.service) {
                return result;
            }
            const sandbox = this.sandbox;
            sandbox.unregisterStateful(this.mediator.bundleId);
            sandbox.unregister(this);
            this.sandbox = null;
            this.started = false;
        },
        getName: function () {
            return this.__name;
        },
        getTitle: function () {
            return this.loc('tile.title');
        },
        createUi: function () {
            this.plugins['Oskari.userinterface.Flyout'].createContent();
        },
        createMenuItem: function ({ MenuItem, MenuItemActivationResult }) {
            const menuItem = new MenuItem({
                id: MENU_ITEM_ID,
                sortOrder: 51,
                name: this.getTitle(),
                tooltip: this.getTitle(),
                setActive: (isActive) => {
                    if (isActive) {
                        const opened = this.showMainNavigationFlyout(() => menuItem.onClose?.(MENU_ITEM_ID));
                        return opened ? MenuItemActivationResult.OK : MenuItemActivationResult.FAILED;
                    }
                    this.closeMainNavigationFlyout();
                    return MenuItemActivationResult.OK;
                }
            });
            return menuItem;
        },
        showMainNavigationFlyout: function (onClose) {
            if (this.mainNavigationControls) {
                return true;
            }
            const controls = showFlyout(this.getTitle(), this.getPaddedFlyoutContent(), () => {
                if (this.mainNavigationControls !== controls) {
                    return;
                }
                this.mainNavigationControls = null;
                onClose();
            }, { id: FLYOUT_ID });
            if (!controls) {
                return false;
            }
            this.mainNavigationControls = controls;
            return true;
        },
        closeMainNavigationFlyout: function () {
            const controls = this.mainNavigationControls;
            this.mainNavigationControls = null;
            controls?.close();
        },
        getPaddedFlyoutContent: function () {
            return (
                <FlyoutPadding>
                    {this.inspireView.getContent()}
                </FlyoutPadding>
            );
        }
    },
    {
        extend: ['Oskari.userinterface.extension.DefaultExtension']
    }
);
