import './index.js';

// These framework bundles have to be imported first
import 'oskari-loader!oskari-frontend/packages/framework/bundle/mapfull/bundle.js';
import 'oskari-loader!oskari-frontend/packages/framework/bundle/oskariui/bundle.js';
import 'oskari-loader!oskari-frontend/packages/framework/bundle/divmanazer/bundle.js';

// Then import mapmodule and rest of the application
import 'oskari-loader!oskari-frontend/packages/mapping/ol/mapmodule/bundle.js';

import 'oskari-loader!oskari-frontend/packages/catalogue/bundle/metadataflyout/bundle.js';
import 'oskari-loader!oskari-frontend/packages/catalogue/metadatacatalogue/bundle.js';

import 'oskari-loader!oskari-frontend/packages/framework/bundle/backendstatus/bundle.js';
import 'oskari-loader!oskari-frontend/packages/framework/bundle/coordinatetool/bundle.js';
import 'oskari-loader!oskari-frontend/packages/framework/bundle/feedbackService/bundle.js';
import 'oskari-loader!oskari-frontend/packages/framework/bundle/findbycoordinates/bundle.js';
import 'oskari-loader!oskari-frontend/packages/framework/bundle/guidedtour/bundle.js';
import 'oskari-loader!oskari-frontend/packages/framework/bundle/layerselection2/bundle.js';
import 'oskari-loader!oskari-frontend/packages/framework/bundle/maplegend/bundle.js';
import 'oskari-loader!oskari-frontend/packages/framework/bundle/myplaces3/bundle.js';
import 'oskari-loader!oskari-frontend/packages/framework/bundle/myplacesimport/bundle.js';
import 'oskari-loader!oskari-frontend/packages/framework/bundle/personaldata/bundle.js';
import 'oskari-loader!oskari-frontend/packages/framework/bundle/publisher2/bundle.js';
import 'oskari-loader!oskari-frontend/packages/framework/bundle/printout/bundle.js';
import 'oskari-loader!oskari-frontend/packages/framework/bundle/postprocessor/bundle.js';
import 'oskari-loader!oskari-frontend/packages/framework/bundle/routingService/bundle.js';
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
import 'oskari-loader!oskari-frontend/packages/mapping/ol/drawtools/bundle.js';
import 'oskari-loader!oskari-frontend/packages/mapping/ol/infobox/bundle.js';
import 'oskari-loader!oskari-frontend/packages/mapping/ol/toolbar/bundle.js';

import 'oskari-loader!oskari-frontend/packages/statistics/statsgrid/bundle.js';

// contrib
import 'oskari-loader!oskari-frontend-contrib/packages/analysis/ol3/analyse/bundle.js';
import 'oskari-loader!oskari-frontend-contrib/packages/mapping/ol/mapanalysis/bundle.js';

// pti
import 'oskari-loader!../../../packages/paikkatietoikkuna/bundle/dimension-change/bundle.js';
import 'oskari-loader!../../../packages/paikkatietoikkuna/bundle/register/bundle.js';
import 'oskari-loader!../../../packages/paikkatietoikkuna/bundle/telemetry/bundle.js';
import 'oskari-loader!../../../packages/paikkatietoikkuna/bundle/terrain-profile/bundle.js';
import 'oskari-loader!../../../packages/paikkatietoikkuna/lang-overrides/bundle.js';
// 3D layer support
import 'oskari-loader!../../../packages/paikkatietoikkuna/bundle/map3dtiles/bundle.js';

// lazy
import 'oskari-lazy-loader?layerselector2!oskari-frontend/packages/framework/bundle/layerselector2/bundle.js';
import 'oskari-lazy-loader?layerlist!oskari-frontend/packages/framework/layerlist/bundle.js';
import 'oskari-lazy-loader?admin-layerselector!oskari-frontend/packages/integration/bundle/admin-layerselector/bundle.js';
import 'oskari-lazy-loader?admin-layerselector!oskari-frontend/packages/integration/bundle/bb/bundle.js';
import 'oskari-lazy-loader?admin-layerrights!oskari-frontend/packages/framework/bundle/admin-layerrights/bundle.js';
import 'oskari-lazy-loader?admin!oskari-frontend/packages/admin/bundle/admin/bundle.js';
import 'oskari-lazy-loader?metrics!oskari-frontend/packages/admin/bundle/metrics/bundle.js';
import 'oskari-lazy-loader?appsetup!oskari-frontend/packages/admin/bundle/appsetup/bundle.js';
import 'oskari-lazy-loader?admin-layereditor!oskari-frontend/packages/admin/bundle/admin-layereditor/bundle.js';
import 'oskari-lazy-loader?coordinatetransformation!../../../packages/paikkatietoikkuna/bundle/coordinatetransformation/bundle.js';

import './css/overwritten.css';
