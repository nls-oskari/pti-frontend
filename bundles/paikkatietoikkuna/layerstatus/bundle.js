/**
 * @class Oskari.pti.layerstatus.StatusBundle
 *
 * Definition for bundle. See source for details.
 */
Oskari.clazz.define('Oskari.pti.layerstatus.StatusBundle', function () { }, {
    'create': function () {
        return Oskari.clazz.create('Oskari.pti.layerstatus.StatusBundleInstance');
    },
    'update': function (manager, bundle, bi, info) { }
}, {
    'protocol': ['Oskari.bundle.Bundle'],
    'source': {
        'scripts': [{
            'type': 'text/javascript',
            'src': './instance.js'
        }]
    }
});

Oskari.bundle_manager.installBundleClass('pti_layerstatus', 'Oskari.pti.layerstatus.StatusBundle');
