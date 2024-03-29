Oskari.clazz.define('Oskari.coordinatetransformation.view.mapmarkers',
    function (instance) {
        const me = this;
        me.instance = instance;
        me.loc = Oskari.getMsg.bind(null, 'coordinatetransformation');
        me.dialog = null;
    }, {
        getName: function () {
            return 'Oskari.coordinatetransformation.view.mapmarkers';
        },
        setVisible: function (visible) {
            if (this.dialog === null && !visible) {
                return;
            }
            if (!visible) {
                this.dialog.close();
            } else {
                this.show();
            }
        },
        show: function () {
            const me = this;
            const helper = me.instance.getHelper();
            const dialog = Oskari.clazz.create('Oskari.userinterface.component.Popup');
            const btn = dialog.createCloseButton(this.loc('actions.done'));
            dialog.addClass('showMapMarkers');
            dialog.makeDraggable();
            me.dialog = dialog;

            btn.addClass('primary');

            btn.setHandler(function () {
                helper.removeMarkers();
                me.instance.toggleViews('transformation');
            });

            dialog.show(this.loc('mapMarkers.show.title'), this.loc('mapMarkers.show.info'), [btn]);
            dialog.moveTo(jQuery('.coordinatetransformation'), 'right', true);
        }
    }
);
