import 'oskari-loader!../../packages/paikkatietoikkuna/lang-overrides/bundle.js';

import 'oskari-loader!oskari-frontend/packages/framework/bundle/mapfull/bundle.js';
import 'oskari-loader!oskari-frontend/packages/framework/bundle/oskariui/bundle.js';
import 'oskari-loader!oskari-frontend/packages/framework/bundle/ui-components/bundle.js';
import 'oskari-loader!oskari-frontend/packages/framework/bundle/divmanazer/bundle.js';

import 'oskari-loader!oskari-frontend/packages/mapping/ol/mapmodule/bundle.js';
import 'oskari-loader!oskari-frontend/packages/mapping/ol/mapwmts/bundle.js';
import 'oskari-loader!oskari-frontend/packages/mapping/ol/wfsvector/bundle.js';
import 'oskari-loader!oskari-frontend/packages/mapping/ol/maparcgis/bundle.js';
import 'oskari-loader!oskari-frontend-contrib/packages/mapping/ol/mapanalysis/bundle.js';
import 'oskari-loader!oskari-frontend/packages/mapping/ol/mapuserlayers/bundle.js';

import 'oskari-loader!oskari-frontend/packages/mapping/ol/infobox/bundle.js';
import 'oskari-loader!oskari-frontend/packages/mapping/ol/drawtools/bundle.js';
import 'oskari-loader!oskari-frontend/packages/mapping/ol/toolbar/bundle.js';
import 'oskari-loader!oskari-frontend/packages/framework/bundle/publishedstatehandler/bundle.js';

import 'oskari-loader!oskari-frontend/packages/framework/bundle/coordinatetool/bundle.js';
import 'oskari-loader!oskari-frontend/packages/mapping/ol/maprotator/bundle.js';

import 'oskari-loader!oskari-frontend/packages/framework/bundle/postprocessor/bundle.js';
import 'oskari-loader!oskari-frontend/packages/framework/bundle/rpc/bundle.js';

import 'oskari-lazy-loader?layerswipe!oskari-frontend/packages/mapping/ol/layerswipe/bundle.js';
import 'oskari-lazy-loader?timeseries!oskari-frontend/packages/framework/bundle/timeseries/bundle.js';
import 'oskari-lazy-loader?maplegend!oskari-frontend/packages/framework/bundle/maplegend/bundle.js';
import 'oskari-lazy-loader?featuredata!oskari-frontend/packages/framework/featuredata/bundle.js';
import 'oskari-lazy-loader?routingService!oskari-frontend/packages/framework/bundle/routingService/bundle.js';
import 'oskari-lazy-loader?feedbackService!oskari-frontend/packages/framework/bundle/feedbackService/bundle.js';
import 'oskari-lazy-loader?statsgrid!oskari-frontend/packages/statistics/statsgrid/bundle.js';

import 'oskari-lazy-loader?metadataflyout!oskari-frontend/packages/catalogue/bundle/metadataflyout/bundle.js';
import 'oskari-lazy-loader?metadatasearch!oskari-frontend/packages/catalogue/metadatasearch/bundle.js';

import { PTIOrtophotoTimeseriesGFIformatter } from '../../util/PTIOrtophotoTimeseriesGFIformatter';

import './css/overwritten.css';

Oskari.on('app.start', () => {
    var plugin = Oskari.getSandbox().findRegisteredModuleInstance('MainMapModuleGetInfoPlugin');
    if (plugin) {
        // not all embedded maps have the plugin
        plugin.addLayerFormatter(new PTIOrtophotoTimeseriesGFIformatter());
    }
});