import './index.js';

// These framework bundles have to be imported first
import 'oskari-loader!oskari-frontend/packages/framework/bundle/mapfull/bundle.js';
import 'oskari-loader!oskari-frontend/packages/framework/bundle/oskariui/bundle.js';
import 'oskari-loader!oskari-frontend/packages/framework/bundle/divmanazer/bundle.js';

// Then import mapmodule (3D) and rest of the application 
import 'oskari-loader!oskari-frontend/packages/mapping/olcs/mapmodule/bundle.js';
import 'oskari-loader!oskari-frontend/packages/mapping/olcs/map3dtiles/bundle.js';
import 'oskari-loader!oskari-frontend/packages/mapping/time-control-3d/bundle.js';
import 'oskari-loader!oskari-frontend/packages/mapping/camera-controls-3d/bundle.js';

import 'oskari-loader!oskari-frontend/packages/catalogue/bundle/metadataflyout/bundle.js';
import 'oskari-loader!oskari-frontend/packages/catalogue/metadatacatalogue/bundle.js';

import 'oskari-loader!oskari-frontend/packages/framework/bundle/coordinatetool/bundle.js';
import 'oskari-loader!oskari-frontend/packages/framework/bundle/feedbackService/bundle.js';
import 'oskari-loader!oskari-frontend/packages/framework/bundle/findbycoordinates/bundle.js';
import 'oskari-loader!oskari-frontend/packages/framework/bundle/guidedtour/bundle.js';
import 'oskari-loader!oskari-frontend/packages/framework/layerlist/bundle.js';
import 'oskari-loader!oskari-frontend/packages/framework/bundle/maplegend/bundle.js';
import 'oskari-loader!oskari-frontend/packages/framework/bundle/myplaces3/bundle.js';
import 'oskari-loader!oskari-frontend/packages/framework/bundle/myplacesimport/bundle.js';
import 'oskari-loader!oskari-frontend/bundles/framework/mydata/bundle.js';
import 'oskari-loader!oskari-frontend/packages/framework/bundle/publisher2/bundle.js';
import 'oskari-loader!oskari-frontend/packages/framework/bundle/printout/bundle.js';
import 'oskari-loader!oskari-frontend/packages/framework/bundle/statehandler/bundle.js';
import 'oskari-loader!oskari-frontend/packages/framework/bundle/search/bundle.js';
import 'oskari-loader!oskari-frontend/packages/framework/bundle/timeseries/bundle.js';
import 'oskari-loader!oskari-frontend/packages/framework/bundle/ui-components/bundle.js';
import 'oskari-loader!oskari-frontend/packages/framework/bundle/userguide/bundle.js';
import 'oskari-loader!oskari-frontend/packages/framework/featuredata2/bundle.js';

import 'oskari-loader!oskari-frontend/packages/mapping/ol/heatmap/bundle.js';
import 'oskari-loader!oskari-frontend/packages/mapping/ol/mapwmts/bundle.js';
import 'oskari-loader!oskari-frontend/packages/mapping/ol/maprotator/bundle.js';
import 'oskari-loader!oskari-frontend/packages/mapping/ol/wfsvector/bundle.js';
import 'oskari-loader!oskari-frontend/packages/mapping/ol/mapmyplaces/bundle.js';
import 'oskari-loader!oskari-frontend/packages/mapping/ol/mapuserlayers/bundle.js';
import 'oskari-loader!oskari-frontend/packages/mapping/ol/maparcgis/bundle.js';
import 'oskari-loader!oskari-frontend/packages/mapping/ol/userstyle/bundle.js';
import 'oskari-loader!oskari-frontend/packages/mapping/ol/drawtools/bundle.js';
import 'oskari-loader!oskari-frontend/packages/mapping/ol/infobox/bundle.js';
import 'oskari-loader!oskari-frontend/packages/mapping/ol/toolbar/bundle.js';

import 'oskari-loader!oskari-frontend/packages/mapping/dimension-change/bundle.js';

import 'oskari-loader!oskari-frontend/packages/statistics/statsgrid/bundle.js';

// contrib
import 'oskari-loader!oskari-frontend-contrib/packages/analysis/ol/analyse/bundle.js';
import 'oskari-loader!oskari-frontend-contrib/packages/mapping/ol/mapanalysis/bundle.js';

// pti
import 'oskari-loader!../../packages/paikkatietoikkuna/bundle/register/bundle.js';
import 'oskari-loader!../../packages/paikkatietoikkuna/bundle/telemetry/bundle.js';
import 'oskari-loader!oskari-frontend-contrib/packages/terrain-profile/bundle.js';
import 'oskari-loader!../../packages/paikkatietoikkuna/lang-overrides/bundle.js';

// lazy
import 'oskari-lazy-loader?admin-layerrights!oskari-frontend/packages/framework/bundle/admin-layerrights/bundle.js';
import 'oskari-lazy-loader?admin!oskari-frontend/packages/admin/bundle/admin/bundle.js';
import 'oskari-lazy-loader?metrics!oskari-frontend/packages/admin/bundle/metrics/bundle.js';
import 'oskari-lazy-loader?appsetup!oskari-frontend/packages/admin/bundle/appsetup/bundle.js';
import 'oskari-lazy-loader?admin-layereditor!oskari-frontend/packages/admin/bundle/admin-layereditor/bundle.js';

import { PTIOrtophotoTimeseriesGFIformatter } from '../../util/PTIOrtophotoTimeseriesGFIformatter';

import './css/overwritten.css';

Oskari.on('app.start', () => {
    Oskari.getSandbox()
        .findRegisteredModuleInstance('MainMapModuleGetInfoPlugin')
        .addLayerFormatter(new PTIOrtophotoTimeseriesGFIformatter());
});
