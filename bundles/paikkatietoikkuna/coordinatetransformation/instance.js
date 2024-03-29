Oskari.clazz.define('Oskari.coordinatetransformation.instance',
    function () {
        this.defaultConf.name = 'coordinatetransformation';
        this.defaultConf.flyoutClazz = 'Oskari.coordinatetransformation.Flyout';
        this.transformationService = null;
        this.dataHandler = null;
        this.views = null;
        this.helper = null;
        this.loc = Oskari.getMsg.bind(null, 'coordinatetransformation');
        this.isMapSelection = false;
        this.isRemoveMarkers = false;
        this.sandbox = Oskari.getSandbox();
        // TODO should dimensions be handled by dataHandler
        this.dimensions = {
            input: 2,
            output: 2
        };
    }, {
        __name: 'coordinatetransformation',
        getName: function () {
            return this.__name;
        },
        getViews: function () {
            return this.views;
        },
        getService: function () {
            return this.transformationService;
        },
        setDimension: function (type, srs, elevation) {
            this.dimensions[type] = this.helper.getDimension(srs, elevation);
        },
        getDimension: function (type) {
            return this.dimensions[type];
        },
        getDimensions: function () {
            return this.dimensions;
        },
        /**
     * @method afterStart
     */
        afterStart: function () {
            this.helper = Oskari.clazz.create('Oskari.coordinatetransformation.helper');
            this.transformationService = Oskari.clazz.create('Oskari.coordinatetransformation.TransformationService', this);
            this.dataHandler = Oskari.clazz.create('Oskari.coordinatetransformation.CoordinateDataHandler', this.helper);
            this.instantiateViews();
            this.createUi();
            this.bindListeners();
        },
        bindListeners: function () {
            const me = this;
            const dimensions = this.getDimensions();
            this.dataHandler.on('InputCoordAdded', function (coords) {
                me.views.transformation.inputTable.render(coords, dimensions.input);
            });
            this.dataHandler.on('InputCoordsChanged', function (coords) {
                me.views.transformation.inputTable.render(coords, dimensions.input);
            });
            this.dataHandler.on('ResultCoordsChanged', function (coords) {
                me.views.transformation.outputTable.render(coords, dimensions.output);
            });
        },
        getPlugins: function () {
            return this.plugins;
        },
        getDataHandler: function () {
            return this.dataHandler;
        },
        getHelper: function () {
            return this.helper;
        },
        instantiateViews: function () {
            this.views = {
                transformation: Oskari.clazz.create('Oskari.coordinatetransformation.view.transformation', this, this.helper, this.dataHandler),
                MapSelection: Oskari.clazz.create('Oskari.coordinatetransformation.view.CoordinateMapSelection', this),
                mapmarkers: Oskari.clazz.create('Oskari.coordinatetransformation.view.mapmarkers', this)
            };
        },
        toggleViews: function (view) {
            const views = this.getViews();
            if (views[view]) {
                views[view].setVisible(true);
            }
            Object.keys(views).forEach(function (key) {
                if (view !== key) {
                    views[key].setVisible(false);
                }
            });
        },
        clearPopupsAndMarkers: function () {
            this.views.MapSelection.setVisible(false);
            this.views.mapmarkers.setVisible(false);
            this.views.transformation.closePopups();
            this.helper.removeMarkers();
            this.addMapCoordsToInput(false);
            this.setMapSelectionMode(false);
        },
        createUi: function () {
            this.plugins['Oskari.userinterface.Flyout'].createUi();
        },
        setMapSelectionMode: function (isSelect) {
            this.isMapSelection = !!isSelect;
            if (isSelect === true) {
                this.sandbox.postRequestByName('MapModulePlugin.GetFeatureInfoActivationRequest', [false]);
            } else {
                this.sandbox.postRequestByName('MapModulePlugin.GetFeatureInfoActivationRequest', [true]);
            }
        },
        setRemoveMarkers: function (isRemove) {
            this.isRemoveMarkers = isRemove;
        },
        addMapCoordsToInput: function (addBln) { // event??
            this.getDataHandler().addMapCoordsToInput(addBln);
        },
        /**
     * Creates the coordinatetransformation service and registers it to the sandbox.
     * @method createService
     * @param  {Oskari.Sandbox} sandbox
     * @return {Oskari.coordinatetransformation.TransformationService}
     *
    createService: function(sandbox) {
        var transformationService = Oskari.clazz.create( 'Oskari.coordinatetransformation.TransformationService', this );
        sandbox.registerService(transformationService);
        return transformationService;
    }, */
        eventHandlers: {
            'MapClickedEvent': function (event) {
                if (!this.isMapSelection || this.isRemoveMarkers) {
                    return;
                }
                const lonlat = event.getLonLat();
                const roundedLonLat = {
                    lon: parseInt(lonlat.lon),
                    lat: parseInt(lonlat.lat)
                };
                // add coords to map coords
                const markerId = this.dataHandler.addMapCoord(roundedLonLat);
                const label = this.helper.getLabelForMarker(roundedLonLat);
                this.helper.addMarkerForCoords(markerId, roundedLonLat, label);
            },
            'MarkerClickEvent': function (event) {
                if (!this.isMapSelection) {
                    return;
                }
                const markerId = event.getID();
                if (this.isRemoveMarkers === true) {
                    this.dataHandler.removeMapCoord(markerId);
                    this.sandbox.postRequestByName('MapModulePlugin.RemoveMarkersRequest', [markerId]);
                }
            },
            'userinterface.ExtensionUpdatedEvent': function (event) {
                if (event.getExtension().getName() !== this.getName()) {
                    return;
                }
                const state = event.getViewState();
                if (state === 'attach') {
                    this.plugins['Oskari.userinterface.Flyout'].setContainerMaxHeight(Oskari.getSandbox().getMap().getHeight());
                    this.sandbox.postRequestByName('DisableMapKeyboardMovementRequest');
                } else if (state === 'close') {
                    this.clearPopupsAndMarkers();
                    this.sandbox.postRequestByName('EnableMapKeyboardMovementRequest');
                } else if (state === 'hide') {
                    this.sandbox.postRequestByName('EnableMapKeyboardMovementRequest');
                }
            },
            'MapSizeChangedEvent': function (event) {
                this.plugins['Oskari.userinterface.Flyout'].setContainerMaxHeight(event.getHeight());
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
