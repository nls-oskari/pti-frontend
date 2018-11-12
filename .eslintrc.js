// http://eslint.org/docs/user-guide/configuring

module.exports = {
    "root": true,
    "env": {
      "browser": true,
    },
    "globals": {
      "_": false,
      "$": false,
      "ajaxUrl": false,
      "Cesium": false,
      "d3": false,
      "jQuery": false,
      "Oskari": false,
    },
    "parserOptions": {
      "ecmaVersion": 6,
      "sourceType": "module"
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    "extends": [
      "standard",
      "plugin:import/errors",
      "plugin:import/warnings"
    ],
    // add your custom rules here
    "rules": {
      "no-restricted-properties": ["error", 
        {"property": "getRequestBuilder", "message": "Please use Oskari.requestBuilder() instead."},
        {"property": "getEventBuilder", "message": "Please use Oskari.eventBuilder() instead."}
      ],
      "indent": ["error", 4],
      // semicolons
      "semi": ["error", "always"],
      // allow templates to have placeholders as we use lodash templates
      "no-template-curly-in-string": 0,
      // allow debugger during development
      "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
      // enforce single quote
      "quotes": ["error", "single", {"allowTemplateLiterals": true, "avoidEscape": true}],
      "no-unused-vars": ["error", { "vars": "all", "args": "none", "ignoreRestSiblings": false }],
      "no-fallthrough": "off",
      "standard/no-callback-literal": "off",
  
      // Temporary warn level for Travis-CI
      "brace-style": ["warn", "1tbs", { "allowSingleLine": true }],
      "camelcase": ["warn", { "properties": "never" }],
      "eqeqeq": ["warn", "always", { "null": "ignore" }],
      "handle-callback-err": ["warn", "^(err|error)$" ],
      "new-cap": ["warn", { "newIsCap": true, "capIsNew": false }],
      "no-unmodified-loop-condition": "warn",
      "no-unneeded-ternary": ["warn", { "defaultAssignment": false }],
      "one-var": ["warn", { "initialized": "never" }],
      "no-labels": ["warn", { "allowLoop": false, "allowSwitch": false }]
    },
    "settings": {
        "import/core-modules": ['ol/Map', 'ol/interaction', 'ol/proj', 'ol/control', 'ol/View'] // modules used from oskari-frontend; keep updated!
    }
  }
