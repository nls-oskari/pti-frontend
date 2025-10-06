import 'oskari-loader!../../packages/paikkatietoikkuna/lang-overrides/bundle.js';

import 'oskari-bundle!oskari-frontend/bundles/framework/mapfull';
import 'oskari-loader!oskari-frontend/packages/framework/bundle/oskariui/bundle.js';
import 'oskari-loader!oskari-frontend/packages/framework/bundle/ui-components/bundle.js';
import 'oskari-loader!oskari-frontend/packages/framework/bundle/divmanazer/bundle.js';

import 'oskari-bundle!oskari-frontend/bundles/mapping/mapmodule/map2d_ol';
import 'oskari-bundle!oskari-frontend/bundles/mapping/maparcgis';
import 'oskari-bundle!oskari-frontend/bundles/framework/myplacesimport/mapuserlayers';

import 'oskari-bundle!oskari-frontend/bundles/mapping/infobox';
import 'oskari-bundle!oskari-frontend/bundles/mapping/drawtools';
import 'oskari-bundle!oskari-frontend/bundles/mapping/toolbar';

import 'oskari-bundle!oskari-frontend/bundles/framework/publishedstatehandler';

import 'oskari-bundle!oskari-frontend/bundles/framework/coordinatetool';

import 'oskari-bundle!oskari-frontend/bundles/framework/postprocessor';
import 'oskari-bundle!oskari-frontend/bundles/framework/rpc';

import 'oskari-lazy-bundle?maprotator!oskari-frontend/bundles/mapping/maprotator';
import 'oskari-lazy-bundle?timeseries!oskari-frontend/bundles/framework/timeseries';
import 'oskari-lazy-bundle?maplegend!oskari-frontend/bundles/framework/maplegend';
import 'oskari-lazy-bundle?featuredata!oskari-frontend/bundles/framework/featuredata';
import 'oskari-lazy-bundle?routingService!oskari-frontend/bundles/framework/routingService';
import 'oskari-lazy-bundle?feedbackService!oskari-frontend/bundles/framework/feedbackService';
import 'oskari-lazy-bundle?statsgrid!oskari-frontend/bundles/statistics/statsgrid';

import 'oskari-lazy-bundle?metadataflyout!oskari-frontend/bundles/catalogue/metadataflyout'
import 'oskari-lazy-bundle?metadatasearch!oskari-frontend/bundles/catalogue/metadatasearch';

import 'oskari-lazy-bundle?layerswipe!oskari-frontend/bundles/mapping/layerswipe';
import 'oskari-lazy-bundle?announcements!oskari-frontend/bundles/framework/announcements';

import { PTIOrtophotoTimeseriesGFIformatter } from '../../util/PTIOrtophotoTimeseriesGFIformatter';

import './css/overwritten.css';

Oskari.on('app.start', () => {
    var plugin = Oskari.getSandbox().findRegisteredModuleInstance('MainMapModuleGetInfoPlugin');
    if (plugin) {
        // not all embedded maps have the plugin
        plugin.addLayerFormatter(new PTIOrtophotoTimeseriesGFIformatter());
    }
});