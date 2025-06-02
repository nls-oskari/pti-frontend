import './Flyout.js';
import { MAP, ID_PREFIX } from './constants';
import { coordinateToMarker } from './helper';

Oskari.clazz.define('Oskari.coordinatetransformation.instance',
    function () {
        this.defaultConf.name = 'coordinatetransformation';
        this.defaultConf.flyoutClazz = 'Oskari.coordinatetransformation.Flyout';
        this.loc = Oskari.getMsg.bind(null, 'coordinatetransformation');
        this.mapSelection = null;
        this.tempCoords = []; // {id, x, y, ?label?}
        this.sandbox = Oskari.getSandbox();
    }, {
        __name: 'coordinatetransformation',
        getName: function () {
            return this.__name;
        },
        getFlyout: function () {
            return this.plugins['Oskari.userinterface.Flyout'];
        },
        toggleFlyout: function (visible) {
            const mode = visible ? 'attach' : 'hide';
            this.sandbox.postRequestByName('userinterface.UpdateExtensionRequest', [this, mode]);
        },
        setMapSelectionMode: function (mode) {
            const stopped = !mode;
            this.sandbox.postRequestByName('MapModulePlugin.GetFeatureInfoActivationRequest', [stopped]);
            if (stopped) {
                this.setMapCoordinates([]);
            }
            this.mapSelection = mode;
        },
        getMapCoordinates: function () {
            // remove id
            return this.tempCoords.map(({x, y}) => ({ x, y }));
        },
        setMapCoordinates: function (coords) {
            // Remove previous
            this.tempCoords.forEach(({id}) => this.sandbox.postRequestByName('MapModulePlugin.RemoveMarkersRequest', [id]));
            this.tempCoords = [];
            
            this.tempCoords = coords.map(coord => ({ ...coord, id: ID_PREFIX + Oskari.getSeq(this.getName()).nextVal()}));
            this.tempCoords.forEach(coord => {
                const marker = coordinateToMarker(coord);
                this.sandbox.postRequestByName('MapModulePlugin.AddMarkerRequest', [marker, coord.id]);
            });
        },
        eventHandlers: {
            'MapClickedEvent': function (event) {
                if (this.mapSelection !== MAP.ADD) {
                    return;
                }
                const { lon, lat } = event.getLonLat();
                // This assumes lon first (3067)
                const coord = {
                    x: parseInt(lon),
                    y: parseInt(lat),
                    id: ID_PREFIX + Oskari.getSeq(this.getName()).nextVal()
                };
                this.tempCoords.push(coord);
                const marker = coordinateToMarker(coord, true);
                this.sandbox.postRequestByName('MapModulePlugin.AddMarkerRequest', [marker, coord.id]);
            },
            'MarkerClickEvent': function (event) {
                if (this.mapSelection !== MAP.REMOVE) {
                    return;
                }
                const id = event.getID();
                if (!id.startsWith(ID_PREFIX)) {
                    return;
                }
                this.tempCoords = this.tempCoords.filter(coord => coord.id !== id);
                // TODO: add some check that we remove only own markers => id starts with prefix etc
                this.sandbox.postRequestByName('MapModulePlugin.RemoveMarkersRequest', [id]);
            },
            'userinterface.ExtensionUpdatedEvent': function (event) {
                if (event.getExtension().getName() !== this.getName()) {
                    return;
                }
                const state = event.getViewState();
                if (state === 'attach') {
                    this.getFlyout().setContainerMaxHeight(Oskari.getSandbox().getMap().getHeight());
                    this.sandbox.postRequestByName('DisableMapKeyboardMovementRequest');
                } else if (state === 'close') {
                    this.getFlyout().teardown();
                    this.sandbox.postRequestByName('EnableMapKeyboardMovementRequest');
                } else if (state === 'hide') {
                    this.sandbox.postRequestByName('EnableMapKeyboardMovementRequest');
                }
            },
            'MapSizeChangedEvent': function (event) {
                this.getFlyout().setContainerMaxHeight(event.getHeight());
            }
        }
    }, {
        /**
         * @property {String[]} protocol
         * @static
         */
        extend: ['Oskari.userinterface.extension.DefaultExtension'],
        protocol: ['Oskari.bundle.BundleInstance', 'Oskari.mapframework.module.Module']
    });
