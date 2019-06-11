const fse = require('fs-extra');
fse.copy('./node_modules/cesium/Build/Cesium', './libraries/Cesium', err => {
    if (err) return console.error(err);
    console.log('Copied Cesium under libraries');
});
