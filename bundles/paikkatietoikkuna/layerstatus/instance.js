/**
 * @class Oskari.mapframework.bundle.telemetry.TelemetryBundleInstance
 */
 Oskari.clazz.define('Oskari.pti.layerstatus.StatusBundleInstance', function () {

}, {
    __name: 'LayerStatusBundleInstance',
    __loadingStatus: {},
    _startImpl: function (sandbox) {        
        const STATE = {
            ERROR: 'error',
            SUCCESS: 'success'
        };
        let loadingStats = this.__loadingStatus;
        const map = sandbox.findRegisteredModuleInstance('MainMapModule');
        map.on('layer.loading', (event) => {
            // event: {layer: 801, started: true, errored: false}
            if (event.started) {
                // don't care about start events
                return;
            }
            let stats = loadingStats[event.layer] || { errors: 0, success: 0, stack: [], previous: STATE.SUCCESS };
            let currentState = STATE.SUCCESS;
            if (event.errored) {
                stats.errors++
                currentState = STATE.ERROR;
            } else {
                stats.success++;
            }
            
            if (stats.previous !== currentState) {
                stats.previous = currentState;
                // for the first 10 state changes:
                // save stack for current state with center coord and zoom level
                if (stats.stack.length < 10) {
                    const mapState = sandbox.getMap();
                    stats.stack.push({
                        x: mapState.getX(),
                        y: mapState.getY(),
                        z: mapState.getZoom(),
                        state: currentState,
                        layers: mapState.getLayers().map(l => l.getId())
                    });
                }
            }
            loadingStats[event.layer] = stats;
        });
    }
}, {
    'extend': ['Oskari.BasicBundle'],
    'protocol': ['Oskari.bundle.BundleInstance', 'Oskari.mapframework.module.Module']
});
