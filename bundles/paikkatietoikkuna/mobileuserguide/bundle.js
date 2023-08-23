/**
 * @class Oskari.mapframework.bundle.register.RegisterBundle
 *
 * Definition for bundle. See source for details.
 */
Oskari.clazz.define(
    "Oskari.pti.mobileuserguide.Bundle",
    function () {}, {
        "create": function () {
            return Oskari.clazz.create("Oskari.pti.mobileuserguide.UserGuideBundleInstance");
        },
        "update": function (manager, bundle, bi, info) {}
    }, {
        "protocol": ["Oskari.bundle.Bundle", "Oskari.mapframework.bundle.extension.ExtensionBundle"],
        "source": {
            "scripts": [{
                "type": "text/javascript",
                "src": "./instance.js"
            }],

            "locales": [{
                "lang": "en",
                "type": "text/javascript",
                "src": "./resources/locale/en.js"
            }, {
                "lang": "fi",
                "type": "text/javascript",
                "src": "./resources/locale/fi.js"
            }, {
                "lang": "sv",
                "type": "text/javascript",
                "src": "./resources/locale/sv.js"
            }]
        },
        "bundle": {
            "manifest": {
                "Bundle-Identifier": "register",
                "Bundle-Name": "register",
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

            }
        },

        /**
         * @static
         * @property dependencies
         */
        "dependencies": ["jquery"]

    });

Oskari.bundle_manager.installBundleClass("mobileuserguide", "Oskari.pti.mobileuserguide.Bundle");
