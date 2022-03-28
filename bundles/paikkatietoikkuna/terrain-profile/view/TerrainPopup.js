Oskari.clazz.define('Oskari.mapframework.bundle.terrain-profile.TerrainPopup',
    function (cancelFunc, queryFunc) {
        const loc = Oskari.getMsg.bind(null, 'TerrainProfile');
        const title = loc('popupTitle');
        const buttons = [];
        const cancelBtn = Oskari.clazz.create('Oskari.userinterface.component.buttons.CancelButton');

        cancelBtn.setHandler(cancelFunc);
        buttons.push(cancelBtn);

        const queryButton = Oskari.clazz.create('Oskari.userinterface.component.buttons.OkButton');

        queryButton.setTitle(loc('showProfile'));
        queryButton.setHandler(queryFunc);
        buttons.push(queryButton);

        const content = jQuery('<div>' + loc('popupText') + '</div>');

        this.show(title, content, buttons);
        this.moveTo('#toolbar div.tool[tool=TerrainProfile]', 'top');
    },
    {},
    {
        extend: ['Oskari.userinterface.component.Popup']
    }
);
