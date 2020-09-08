/**
 * @class Oskari.mapframework.bundle.inspire.InspireBundle
 *
 * Definition for bundle. See source for details.
 */
Oskari.clazz.define(
    "Oskari.mapframework.bundle.inspire.InspireBundle",
    function () {}, {
        "create": function () {
            return Oskari.clazz.create("Oskari.mapframework.bundle.inspire.instance");
        },
        "update": function (manager, bundle, bi, info) {}
    }, {
        "protocol": ["Oskari.bundle.Bundle"],
        "source": {

            "scripts": [{
                "type": "text/javascript",
                "src": "../../../../bundles/paikkatietoikkuna/inspire/instance.js"
            },
            {
                "type": "text/javascript",
                "src": "../../../../bundles/paikkatietoikkuna/inspire/Flyout.js"
            }],
            "locales": [{
                "lang": "fi",
                "type": "text/javascript",
                "src": "../../../../bundles/paikkatietoikkuna/inspire/resources/locale/fi.js"
            },
            {
                "lang": "sv",
                "type": "text/javascript",
                "src": "../../../../bundles/paikkatietoikkuna/inspire/resources/locale/sv.js"
            },
            {
                "lang": "en",
                "type": "text/javascript",
                "src": "../../../../bundles/paikkatietoikkuna/inspire/resources/locale/en.js"
            }
            ]
        },
        "bundle": {
            "manifest": {
                "Bundle-Identifier": "inspire",
                "Bundle-Name": "inspire",
                "Bundle-Author": [{
                    "Name": "tm",
                    "Organisation": "nls.fi",
                    "Temporal": {
                        "Start": "2014",
                        "End": "2020"
                    },
                    "Copyleft": {
                        "License": {
                            "License-Name": "EUPL",
                            "License-Online-Resource": "http://www.paikkatietoikkuna.fi/license"
                        }
                    }
                }],
                "Bundle-Name-Locale": {
                    "fi": {
                        "Name": " style-1",
                        "Title": " style-1"
                    },
                    "en": {}
                },
                "Bundle-Version": "1.0.0",
                "Import-Namespace": ["Oskari", "jquery"],
                "Import-Bundle": {}

                /**
                 *
                 */

            }
        },

        /**
         * @static
         * @property dependencies
         */
        "dependencies": ["jquery"]

    });

Oskari.bundle_manager.installBundleClass("inspire", "Oskari.mapframework.bundle.inspire.InspireBundle");
