import './index.js';

// These framework bundles have to be imported first
import 'oskari-bundle!oskari-frontend/bundles/framework/mapfull';
import 'oskari-loader!oskari-frontend/packages/framework/bundle/oskariui/bundle.js';
import 'oskari-loader!oskari-frontend/packages/framework/bundle/ui-components/bundle.js';
import 'oskari-loader!oskari-frontend/packages/framework/bundle/divmanazer/bundle.js';

// Then import mapmodule (3D) and rest of the application 
import 'oskari-bundle!oskari-frontend/bundles/mapping/mapmodule/map3d_olcs';
import 'oskari-bundle!oskari-frontend/bundles/mapping/tiles3d';
import 'oskari-bundle!oskari-frontend/bundles/mapping/time-control-3d';
import 'oskari-bundle!oskari-frontend/bundles/mapping/camera-controls-3d';

import 'oskari-bundle!oskari-frontend/bundles/framework/coordinatetool';
import 'oskari-bundle!oskari-frontend/bundles/framework/layerlist';
import 'oskari-bundle!oskari-frontend/bundles/framework/findbycoordinates';
import 'oskari-bundle!oskari-frontend/bundles/framework/guidedtour';
import 'oskari-bundle!oskari-frontend/bundles/framework/maplegend';
import 'oskari-bundle!oskari-frontend/bundles/framework/statehandler';
import 'oskari-bundle!oskari-frontend/bundles/framework/search';
import 'oskari-bundle!oskari-frontend/bundles/framework/timeseries';

import 'oskari-bundle!oskari-frontend/bundles/mapping/heatmap';
import 'oskari-bundle!oskari-frontend/bundles/mapping/mapmyplaces';
import 'oskari-bundle!oskari-frontend/bundles/framework/myplacesimport/mapuserlayers';
import 'oskari-bundle!oskari-frontend/bundles/mapping/maparcgis';
import 'oskari-bundle!oskari-frontend/bundles/mapping/userstyle';
import 'oskari-bundle!oskari-frontend/bundles/mapping/drawtools';
import 'oskari-bundle!oskari-frontend/bundles/mapping/infobox';
import 'oskari-bundle!oskari-frontend/bundles/mapping/toolbar';

import 'oskari-bundle!oskari-frontend/bundles/mapping/dimension-change';

// pti
import 'oskari-bundle!../../bundles/paikkatietoikkuna/register';
import 'oskari-bundle!../../bundles/paikkatietoikkuna/telemetry'
import 'oskari-bundle!../../bundles/paikkatietoikkuna/lang-overrides';

// mobile tuning
import 'oskari-lazy-bundle?feedbackService!oskari-frontend/bundles/framework/feedbackService';
import 'oskari-lazy-bundle?myplaces3!oskari-frontend/bundles/framework/myplaces3';
import 'oskari-lazy-bundle?myplacesimport!oskari-frontend/bundles/framework/myplacesimport';
import 'oskari-lazy-bundle?mydata!oskari-frontend/bundles/framework/mydata';
import 'oskari-lazy-bundle?publisher2!oskari-frontend/bundles/framework/publisher2';
import 'oskari-lazy-bundle?printout!oskari-frontend/bundles/framework/printout';
import 'oskari-lazy-bundle?userguide!oskari-frontend/bundles/framework/userguide';
import 'oskari-lazy-bundle?statsgrid!oskari-frontend/bundles/statistics/statsgrid';
import 'oskari-lazy-bundle?terrain-profile!oskari-frontend-contrib/bundles/terrain-profile';

import 'oskari-lazy-bundle?coordinatetransformation!../../bundles/paikkatietoikkuna/coordinatetransformation';

import 'oskari-lazy-bundle?maprotator!oskari-frontend/bundles/mapping/maprotator';
import 'oskari-lazy-bundle?featuredata!oskari-frontend/bundles/framework/featuredata';
import 'oskari-lazy-bundle?metadataflyout!oskari-frontend/bundles/catalogue/metadataflyout'
import 'oskari-lazy-bundle?metadatasearch!oskari-frontend/bundles/catalogue/metadatasearch';
// added for mobile
import 'oskari-lazy-bundle?mobileuserguide!../../bundles/paikkatietoikkuna/mobileuserguide';
// end mobile tuning
// lazy
import 'oskari-lazy-bundle?admin-permissions!oskari-frontend/bundles/admin/admin-permissions';
import 'oskari-lazy-bundle?admin!oskari-frontend/bundles/admin/admin';
import 'oskari-lazy-bundle?metrics!oskari-frontend/bundles/admin/metrics';
import 'oskari-lazy-bundle?appsetup!oskari-frontend/bundles/admin/appsetup';
import 'oskari-lazy-bundle?admin-layereditor!oskari-frontend/bundles/admin/admin-layereditor';

import { PTIOrtophotoTimeseriesGFIformatter } from '../../util/PTIOrtophotoTimeseriesGFIformatter';

import './css/overwritten.css';

Oskari.on('app.start', () => {
    Oskari.getSandbox()
        .findRegisteredModuleInstance('MainMapModuleGetInfoPlugin')
        .addLayerFormatter(new PTIOrtophotoTimeseriesGFIformatter());
});
