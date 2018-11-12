const path = require('path');
const coreConf = require('oskari-frontend/.eslintrc.js');

if (!coreConf.settings) {
    coreConf.settings = {};
}

coreConf.settings['import/resolver'] = {
    webpack: {
        config: {
            resolve: {
                modules: [path.resolve(__dirname, 'node_modules/oskari-frontend/node_modules'), 'node_modules'], // allow use of oskari-frontend node_modules from this repo
            }
        }
    }
}

module.exports = coreConf;