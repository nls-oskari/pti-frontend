import './index.js';

// These framework bundles have to be imported first
import 'oskari-bundle!oskari-frontend/bundles/framework/mapfull';
import 'oskari-loader!oskari-frontend/packages/framework/bundle/oskariui/bundle.js';
import 'oskari-loader!oskari-frontend/packages/framework/bundle/ui-components/bundle.js';
import 'oskari-loader!oskari-frontend/packages/framework/bundle/divmanazer/bundle.js';

// Then import mapmodule and rest of the application
import 'oskari-loader!oskari-frontend/packages/mapping/ol/mapmodule/bundle.js';

import 'oskari-loader!oskari-frontend/packages/mapping/ol/mapwmts/bundle.js';
import 'oskari-loader!oskari-frontend/packages/mapping/ol/maparcgis/bundle.js';
import 'oskari-loader!oskari-frontend/packages/mapping/ol/wfsvector/bundle.js';
import 'oskari-loader!oskari-frontend/packages/mapping/ol/mapmyplaces/bundle.js';
import 'oskari-loader!oskari-frontend/packages/mapping/ol/mapuserlayers/bundle.js';
import 'oskari-loader!oskari-frontend/packages/mapping/ol/drawtools/bundle.js';
import 'oskari-loader!oskari-frontend/packages/mapping/ol/toolbar/bundle.js';
import 'oskari-loader!oskari-frontend/packages/mapping/ol/infobox/bundle.js';
import 'oskari-loader!oskari-frontend/packages/mapping/ol/heatmap/bundle.js';
import 'oskari-loader!oskari-frontend/packages/mapping/ol/maprotator/bundle.js';
import 'oskari-loader!oskari-frontend/packages/mapping/ol/userstyle/bundle.js';

import 'oskari-bundle!oskari-frontend/bundles/framework/coordinatetool';
import 'oskari-bundle!oskari-frontend/bundles/framework/layerlist';
import 'oskari-bundle!oskari-frontend/bundles/framework/findbycoordinates';
import 'oskari-bundle!oskari-frontend/bundles/framework/guidedtour';
import 'oskari-bundle!oskari-frontend/bundles/framework/maplegend';
import 'oskari-bundle!oskari-frontend/bundles/framework/postprocessor';
import 'oskari-bundle!oskari-frontend/bundles/framework/routingService';
import 'oskari-bundle!oskari-frontend/bundles/framework/statehandler';
import 'oskari-bundle!oskari-frontend/bundles/framework/search';
import 'oskari-bundle!oskari-frontend/bundles/framework/timeseries';


// mobile tuning
import 'oskari-lazy-bundle?feedbackService!oskari-frontend/bundles/framework/feedbackService';
import 'oskari-lazy-bundle?myplaces3!oskari-frontend/bundles/framework/myplaces3';
import 'oskari-lazy-bundle?myplacesimport!oskari-frontend/bundles/framework/myplacesimport';
import 'oskari-lazy-bundle?mydata!oskari-frontend/bundles/framework/mydata';
import 'oskari-lazy-bundle?publisher2!oskari-frontend/bundles/framework/publisher2';
import 'oskari-lazy-bundle?printout!oskari-frontend/bundles/framework/printout';
import 'oskari-lazy-bundle?userguide!oskari-frontend/bundles/framework/userguide';
import 'oskari-lazy-bundle?statsgrid!oskari-frontend/bundles/statistics/statsgrid';
import 'oskari-lazy-bundle?featuredata!oskari-frontend/bundles/framework/featuredata';
import 'oskari-lazy-bundle?metadataflyout!oskari-frontend/bundles/catalogue/metadataflyout'
import 'oskari-lazy-bundle?metadatasearch!oskari-frontend/bundles/catalogue/metadatasearch';
import 'oskari-lazy-bundle?terrain-profile!oskari-frontend-contrib/bundles/terrain-profile';

import 'oskari-lazy-loader?coordinatetransformation!../../packages/paikkatietoikkuna/bundle/coordinatetransformation/bundle.js';
import 'oskari-lazy-loader?layerswipe!oskari-frontend/packages/mapping/ol/layerswipe/bundle.js';
// added for mobile
import 'oskari-lazy-loader?mobileuserguide!../../bundles/paikkatietoikkuna/mobileuserguide/bundle.js';
// end mobile tuning

import 'oskari-bundle!oskari-frontend/bundles/mapping/dimension-change';

// 3D layer support
import 'oskari-loader!oskari-frontend/packages/mapping/olcs/map3dtiles/bundle.js';

// pti
import 'oskari-loader!../../packages/paikkatietoikkuna/bundle/register/bundle.js';
import 'oskari-loader!../../packages/paikkatietoikkuna/bundle/telemetry/bundle.js';
import 'oskari-loader!../../packages/paikkatietoikkuna/lang-overrides/bundle.js';
import 'oskari-loader!../../packages/paikkatietoikkuna/bundle/inspire/bundle.js';
import 'oskari-bundle!oskari-frontend/bundles/framework/layeranalytics';

// lazy

import 'oskari-lazy-bundle?admin-permissions!oskari-frontend/bundles/admin/admin-permissions';
import 'oskari-lazy-bundle?admin!oskari-frontend/bundles/admin/admin';
import 'oskari-lazy-bundle?metrics!oskari-frontend/bundles/admin/metrics';
import 'oskari-lazy-bundle?appsetup!oskari-frontend/bundles/admin/appsetup';
import 'oskari-lazy-bundle?admin-layereditor!oskari-frontend/bundles/admin/admin-layereditor';
import 'oskari-lazy-bundle?admin-layeranalytics!oskari-frontend/bundles/admin/admin-layeranalytics';

import 'oskari-lazy-bundle?announcements!oskari-frontend/bundles/framework/announcements';
import 'oskari-lazy-bundle?admin-announcements!oskari-frontend/bundles/admin/admin-announcements';
import 'oskari-lazy-bundle?admin-users!oskari-frontend/bundles/admin/admin-users';

import { PTIOrtophotoTimeseriesGFIformatter } from '../../util/PTIOrtophotoTimeseriesGFIformatter';

import './css/overwritten.css';

Oskari.on('app.start', () => {
    Oskari.getSandbox()
        .findRegisteredModuleInstance('MainMapModuleGetInfoPlugin')
        .addLayerFormatter(new PTIOrtophotoTimeseriesGFIformatter());
});
