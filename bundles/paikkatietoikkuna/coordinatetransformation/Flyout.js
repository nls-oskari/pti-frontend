Oskari.clazz.define('Oskari.coordinatetransformation.Flyout',

    function (instance) {
        this.instance = instance;
        this.loc = Oskari.getMsg.bind(null, 'coordinatetransformation');
        this.container = null;
        this.flyout = null;
    }, {
        getName: function () {
            return 'Oskari.coordinatetransformation.Flyout';
        },
        getTitle: function () {
            return this.loc('flyout.title');
        },
        getViews: function () {
            return this.views;
        },
        setEl: function (el, flyout, width, height) {
            this.container = jQuery(el[0]);
            this.flyout = flyout;
            this.container.addClass('coordinatetransformation');
            this.flyout.addClass('coordinatetransformation');
        },
        createUi: function () {
            this.instance.getViews().transformation.createUI(this.container);
        },
        startPlugin: function () {
            this.template = jQuery();
        },
        setContainerMaxHeight: function (mapHeight) {
            // calculate max-height based on map size
            var container = this.flyout.find('.oskari-flyoutcontentcontainer');
            var toolbarHeight = this.flyout.find('.oskari-flyouttoolbar').outerHeight(true);
            var maxHeight = mapHeight - toolbarHeight;
            if (container) {
                container.css('max-height', maxHeight + 'px');
            }
            if (container.outerHeight(true) >= maxHeight) {
                this.flyout.css('top', '0px');
            }
        }
    });
