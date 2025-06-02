export const BUNDLE = 'coordinatetransformation';
export const WATCH_JOB = 'CoordinateTransformJob';
export const WATCH_URL = '/coordinatetransform/watch/';
export const ID_PREFIX = 'coord_marker_';
// TODO: or enums?
export const SOURCE = ['table', 'file', 'map'];
export const TRANSFORM = ['A2A', 'F2A', 'F2R' , 'F2F', 'A2F'];
export const MAP = {
    ADD: 'add',
    REMOVE: 'remove'
};

export const MARKER = {
    colors: {
        new: '#ff0000',
        old: '#00ff00'
    },
    shape: 3,
    size: 3
};

export const FILE_DEFAULTS = {
    import: {
        headerLineCount: 0,
        unit: 'degree'
    },
    export: {
        unit: 'degree',
        decimalCount: 3,
        decimalSeparator: Oskari.getDecimalSeparator(),
        coordinateSeparator: 'semicolon',
        lineSeparator: 'win'
    }
}
const closestZoom = 6;

export const SEPARATORS = {
    lineSeparator: [
        { label: 'Windows / DOS', value: 'win' },
        { label: 'UNIX / Mac', value: 'unix' }
    ],
    coordinateSeparator: [
        { loc: 'fileSettings.options.delimeters.tab', value: 'tab' },
        { loc: 'fileSettings.options.delimeters.space', value: 'space' },
        { loc: 'fileSettings.options.delimeters.comma', value: 'comma' },
        { loc: 'fileSettings.options.delimeters.semicolon', value: 'semicolon' }
    ],
    decimalSeparator: [
        { loc: 'fileSettings.options.delimeters.point', value: '.' },
        { loc: 'fileSettings.options.delimeters.comma', value: ',' }
    ]
};
export const DECIMAL = [
    { label: '~1 m', value: 0 },
    { label: '~0.1 m', value: 1 },
    { label: '~1 cm', value: 2 },
    { label: '~1 mm', value: 3 },
    { label: '~0.1 mm', value: 4 }
];

export const DEGREE = [
    { loc: 'fileSettings.options.degreeFormat.degree', value: 'degree', decimals: 8 },
    { loc: 'fileSettings.options.degreeFormat.gradian', value: 'gradian', decimals: 8 },
    { loc: 'fileSettings.options.degreeFormat.radian', value: 'radian', decimals: 10 },
    { label: 'DD', value: 'DD', decimals: 8 },
    { label: 'DD MM', value: 'DD MM', decimals: 6 },
    { label: 'DD MM SS', value: 'DD MM SS', decimals: 4 },
    { label: 'DDMM', value: 'DDMM', decimals: 6},
    { label: 'DDMMSS', value: 'DDMMSS', decimals: 4 }
];
export const DEGREE_DECIMALS = DEGREE.find(d => d.value === 'degree')?.decimals;
export const DMS = ['\u00B0', '\u0027', '\u0022'];

export const DATUM = [
    {
        value: 'DATUM_KKJ',
        label: 'KKJ',
        cls: 'DATUM_KKJ DATUM_EUREF-FIN'
    }, {
        value: 'DATUM_EUREF-FIN',
        label: 'EUREF-FIN',
        cls: 'DATUM_KKJ DATUM_EUREF-FIN'
    }
];
export const SYSTEM = [
    {
        value: 'COORD_PROJ_2D',
        loc: 'flyout.coordinateSystem.coordinateSystem.proj2D',
        cls: 'DATUM_KKJ DATUM_EUREF-FIN',
        unit: 'metric',
        dimension: 2
    }, {
        value: 'COORD_PROJ_3D',
        loc: 'flyout.coordinateSystem.coordinateSystem.proj3D',
        cls: 'DATUM_EUREF-FIN',
        unit: 'geocentric',
        dimension: 3
    }, {
        value: 'COORD_GEOG_2D',
        loc: 'flyout.coordinateSystem.coordinateSystem.geo2D',
        cls: 'DATUM_EUREF-FIN DATUM_KKJ',
        unit: 'degree',
        dimension: 2
    }, {
        value: 'COORD_GEOG_3D',
        loc: 'flyout.coordinateSystem.coordinateSystem.geo3D',
        cls: 'DATUM_EUREF-FIN',
        unit: 'degree3D',
        dimension: 3
    }

];
export const PROJECTION = [
    {
        value: 'PROJECTION_KKJ',
        label: 'KKJ',
        cls: 'DATUM_KKJ'
    }, {
        value: 'PROJECTION_TM',
        label: 'Transversal Mercator',
        cls: 'DATUM_EUREF-FIN'
    }, {
        value: 'PROJECTION_GK',
        label: 'Gauss-Kruger',
        cls: 'DATUM_EUREF-FIN'
    }, {
        value: 'PROJECTION_LAEA',
        label: 'Lambert Azimuthal Equal Area',
        cls: 'DATUM_EUREF-FIN'
    }, {
        value: 'PROJECTION_LCC',
        label: 'Lambert Conic Conformal',
        cls: 'DATUM_EUREF-FIN'
    }

];
// bounds:[minx, miny, maxx, maxy], lonFirst: true -> lonlat, EN, XY
export const SRS = [
    // newer GK EPSG-codes which have false easting 500000 prefixed with zone number -> GK19 19500000
    // replacedEpsg is the old one, which have always false easting 500000
    {
        value: 'EPSG:3873',
        label: 'ETRS-GK19',
        datum: 'DATUM_EUREF-FIN',
        projection: 'PROJECTION_GK',
        system: 'COORD_PROJ_2D',
        bounds: [16136220.08, 4245436.94, 19729336.74, 9392386.51],
        lonFirst: false,
        replacedEpsg: 'EPSG:3126'
    }, {
        value: 'EPSG:3874',
        label: 'ETRS-GK20',
        datum: 'DATUM_EUREF-FIN',
        projection: 'PROJECTION_GK',
        system: 'COORD_PROJ_2D',
        bounds: [17036139.71, 4284384.64, 20718673.04, 9388493.84],
        lonFirst: false,
        replacedEpsg: 'EPSG:3127'
    }, {
        value: 'EPSG:3875',
        label: 'ETRS-GK21',
        datum: 'DATUM_EUREF-FIN',
        projection: 'PROJECTION_GK',
        system: 'COORD_PROJ_2D',
        bounds: [17935765.83, 4324906.92, 21707943.90, 9384787.32],
        lonFirst: false,
        replacedEpsg: 'EPSG:3128'
    }, {
        value: 'EPSG:3876',
        label: 'ETRS-GK22',
        datum: 'DATUM_EUREF-FIN',
        projection: 'PROJECTION_GK',
        system: 'COORD_PROJ_2D',
        bounds: [18835101.07, 4367049.45, 22697152.55, 9381268.03],
        lonFirst: false,
        replacedEpsg: 'EPSG:3129'
    }, {
        value: 'EPSG:3877',
        label: 'ETRS-GK23',
        datum: 'DATUM_EUREF-FIN',
        projection: 'PROJECTION_GK',
        system: 'COORD_PROJ_2D',
        bounds: [19734149.31, 4410859.98, 23686302.23, 9377936.99],
        lonFirst: false,
        replacedEpsg: 'EPSG:3130'
    }, {
        value: 'EPSG:3878',
        label: 'ETRS-GK24',
        datum: 'DATUM_EUREF-FIN',
        projection: 'PROJECTION_GK',
        system: 'COORD_PROJ_2D',
        bounds: [20632915.73, 4456388.39, 24675396.21, 9374795.15],
        lonFirst: false,
        replacedEpsg: 'EPSG:3131'
    }, {
        value: 'EPSG:3879',
        label: 'ETRS-GK25',
        datum: 'DATUM_EUREF-FIN',
        projection: 'PROJECTION_GK',
        system: 'COORD_PROJ_2D',
        bounds: [21531406.93, 4503686.78, 25664437.76, 9371843.41],
        lonFirst: false,
        replacedEpsg: 'EPSG:3132'
    }, {
        value: 'EPSG:3880',
        label: 'ETRS-GK26',
        datum: 'DATUM_EUREF-FIN',
        projection: 'PROJECTION_GK',
        system: 'COORD_PROJ_2D',
        bounds: [22429630.98, 4552809.52, 26653430.17, 9369082.63],
        lonFirst: false,
        replacedEpsg: 'EPSG:3133'
    }, {
        value: 'EPSG:3881',
        label: 'ETRS-GK27',
        datum: 'DATUM_EUREF-FIN',
        projection: 'PROJECTION_GK',
        system: 'COORD_PROJ_2D',
        bounds: [23327597.57, 4603813.37, 27642376.73, 9366513.60],
        lonFirst: false,
        replacedEpsg: 'EPSG:3134'
    }, {
        value: 'EPSG:3882',
        label: 'ETRS-GK28',
        datum: 'DATUM_EUREF-FIN',
        projection: 'PROJECTION_GK',
        system: 'COORD_PROJ_2D',
        bounds: [24225318.05, 4656757.53, 28631280.76, 9364137.06],
        lonFirst: false,
        replacedEpsg: 'EPSG:3135'
    }, {
        value: 'EPSG:3883',
        label: 'ETRS-GK29',
        datum: 'DATUM_EUREF-FIN',
        projection: 'PROJECTION_GK',
        system: 'COORD_PROJ_2D',
        bounds: [25122805.55, 4711703.72, 29620145.58, 9361953.68],
        lonFirst: false,
        replacedEpsg: 'EPSG:3136'
    }, {
        value: 'EPSG:3884',
        label: 'ETRS-GK30',
        datum: 'DATUM_EUREF-FIN',
        projection: 'PROJECTION_GK',
        system: 'COORD_PROJ_2D',
        bounds: [26020075.09, 4768716.31, 30608974.53, 9359964.10],
        lonFirst: false,
        replacedEpsg: 'EPSG:3137'
    }, {
        value: 'EPSG:3885',
        label: 'ETRS-GK31',
        datum: 'DATUM_EUREF-FIN',
        projection: 'PROJECTION_GK',
        system: 'COORD_PROJ_2D',
        bounds: [26917143.71, 4827862.39, 31597770.94, 9358168.88],
        lonFirst: false,
        replacedEpsg: 'EPSG:3138'
    }, {
        value: 'EPSG:3035',
        label: 'ETRS-LAEA',
        datum: 'DATUM_EUREF-FIN',
        projection: 'PROJECTION_LAEA',
        system: 'COORD_PROJ_2D',
        bounds: [1896628.62, 1507846.05, 4656644.57, 6827128.02],
        lonFirst: false
    }, {
        value: 'EPSG:3034',
        label: 'ETRS-LCC',
        datum: 'DATUM_EUREF-FIN',
        projection: 'PROJECTION_LCC',
        system: 'COORD_PROJ_2D',
        bounds: [1584884.54, 1150546.94, 4435373.08, 6675249.46],
        lonFirst: false
    }, {
        value: 'EPSG:3046',
        label: 'ETRS-TM34',
        datum: 'DATUM_EUREF-FIN',
        projection: 'PROJECTION_TM',
        system: 'COORD_PROJ_2D',
        bounds: [-3062460.04, 4323108.17, 707860.72, 9381033.40],
        lonFirst: false,
        reversedEpsg: 'EPSG:25834'
    }, {
        value: 'EPSG:3047',
        label: 'ETRS-TM35',
        datum: 'DATUM_EUREF-FIN',
        projection: 'PROJECTION_TM',
        system: 'COORD_PROJ_2D',
        bounds: [-3669433.90, 4601644.86, 642319.78, 9362767.00],
        lonFirst: false,
        reversedEpsg: 'EPSG:25835'
    }, {
        value: 'EPSG:3048',
        label: 'ETRS-TM36',
        datum: 'DATUM_EUREF-FIN',
        projection: 'PROJECTION_TM',
        system: 'COORD_PROJ_2D',
        bounds: [-4283197.87, 4949558.27, 575249.45, 9351421.46],
        lonFirst: false,
        reversedEpsg: 'EPSG:25836'
    }, {
        value: 'EPSG:3067',
        label: 'ETRS-TM35FIN', // (E,N)
        datum: 'DATUM_EUREF-FIN',
        projection: 'PROJECTION_TM',
        system: 'COORD_PROJ_2D',
        bounds: [-3669433.90, 4601644.86, 642319.78, 9362767.00],
        lonFirst: true,
        reversedEpsg: 'EPSG:5048'
    }, {
        value: 'EPSG:4258',
        label: 'EUREF-FIN-GRS80',
        datum: 'DATUM_EUREF-FIN',
        projection: '',
        system: 'COORD_GEOG_2D',
        bounds: [-16.1, 32.88, 39.65, 84.17],
        lonFirst: false
    }, {
        value: 'EPSG:4937',
        label: 'EUREF-FIN-GRS80h',
        datum: 'DATUM_EUREF-FIN',
        projection: '',
        system: 'COORD_GEOG_3D',
        bounds: [-16.1, 32.88, 39.65, 84.17],
        lonFirst: false
    }, {
        value: 'EPSG:4936',
        label: 'EUREF-FIN-XYZ',
        datum: 'DATUM_EUREF-FIN',
        projection: '',
        system: 'COORD_PROJ_3D',
        bounds: [5151420.52, -1486881.13, 500495.11, 414781.77],
        lonFirst: true
    }, {
        value: 'EPSG:3386',
        loc: 'flyout.coordinateSystem.geodeticCoordinateSystem.kkj',
        args: { zone: 0 },
        datum: 'DATUM_KKJ',
        projection: 'PROJECTION_KKJ',
        system: 'COORD_PROJ_2D',
        bounds: [569217.09, 6663791.81, 583029.96, 6693054.88],
        lonFirst: false
    }, {
        value: 'EPSG:2391',
        loc: 'flyout.coordinateSystem.geodeticCoordinateSystem.kkj',
        args: { zone: 1 },
        datum: 'DATUM_KKJ',
        projection: 'PROJECTION_KKJ',
        system: 'COORD_PROJ_2D',
        bounds: [1415885.57, 6628437.53, 1559300.06, 7695112.84],
        lonFirst: false
    }, {
        value: 'EPSG:2392',
        loc: 'flyout.coordinateSystem.geodeticCoordinateSystem.kkj',
        args: { zone: 2 },
        datum: 'DATUM_KKJ',
        projection: 'PROJECTION_KKJ',
        system: 'COORD_PROJ_2D',
        bounds: [2415851.96, 6627314.46, 2560464.61, 7647148.92],
        lonFirst: false
    }, {
        value: 'EPSG:2393',
        loc: 'flyout.coordinateSystem.geodeticCoordinateSystem.ykj',
        datum: 'DATUM_KKJ',
        projection: 'PROJECTION_KKJ',
        system: 'COORD_PROJ_2D',
        bounds: [3064557.21, 6651895.29, 3674549.99, 7785726.70],
        lonFirst: false
    }, {
        value: 'EPSG:2394',
        loc: 'flyout.coordinateSystem.geodeticCoordinateSystem.kkj', 
        args: { zone: 4 },
        datum: 'DATUM_KKJ',
        projection: 'PROJECTION_KKJ',
        system: 'COORD_PROJ_2D',
        bounds: [4418851.11, 6759862.03, 4557959.34, 7748619.72],
        lonFirst: false
    }, {
        value: 'EPSG:3387',
        loc: 'flyout.coordinateSystem.geodeticCoordinateSystem.kkj',
        args: { zone: 5 },
        datum: 'DATUM_KKJ',
        projection: 'PROJECTION_KKJ',
        system: 'COORD_PROJ_2D',
        bounds: [5423705.81, 6970442.95, 5428707.25, 6989284.23],
        lonFirst: false
    }, { 
        value:'EPSG:4123', // KKJ_GEO
        label: 'KKJ-Hayford',
        datum: 'DATUM_KKJ',
        projection: '',
        system: 'COORD_GEOG_2D',
        bounds: [19.24, 59.75, 31.59, 70.09],
        lonFirst: false
    }
];
export const SRS_H = [
    {
        value: 'EPSG:3900',
        label: 'N2000',
        cls: 'DATUM_KKJ DATUM_EUREF-FIN DATUM_DEFAULT'
    }, {
        value: 'EPSG:5717',
        label: 'N60',
        cls: 'DATUM_KKJ DATUM_EUREF-FIN DATUM_DEFAULT'
    }, { 
        value: 'EPSG:8675',
        label: 'N43',
        cls: 'DATUM_KKJ DATUM_EUREF-FIN DATUM_DEFAULT'
    }
];


const createCls = (json) => {
    Object.keys(json).forEach(function (key) {
        const geoCoord = json[key];
        if (key === 'DEFAULT') {
            geoCoord.cls = '';
        } else {
            geoCoord.cls = geoCoord.datum + ' ' + geoCoord.proj + ' ' + geoCoord.coord;
        }
    });
};