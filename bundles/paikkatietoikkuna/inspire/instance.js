import './Flyout.js';

Oskari.clazz.define('Oskari.mapframework.bundle.inspire.instance',
    function () {
        this.plugins = {};
        this.defaultConf.flyoutClazz = 'Oskari.inspire.Flyout';
        this.defaultConf.name = 'inspire';
        this.loc = Oskari.getMsg.bind(null, 'inspire');
    },
    {
        __name: 'inspire',
        /**
        * @method afterStart
        */
        afterStart: function () {
            this.createUi();
        },
        getName: function () {
            return this.__name;
        },
        createUi: function () {
            this.plugins['Oskari.userinterface.Flyout'].createContent();
        }
    },
    {
        extend: ['Oskari.userinterface.extension.DefaultExtension']
    }
);
