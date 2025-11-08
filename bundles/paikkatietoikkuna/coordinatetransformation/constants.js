export const BUNDLE = 'coordinatetransformation';
export const WATCH_JOB = 'CoordinateTransformJob'; // deprecated
export const WATCH_URL = '/coordinatetransform/watch/'; // deprecated
export const BASE_URL = '/action/KomuProj';
export const FETCH_SIZE = 10000;
export const ID_PREFIX = 'coord_marker_';
export const SOURCE = ['table', 'file', 'map']; // deprecated
export const LON_AXES = ['E', 'λ', 'X'];
export const LAN_AXES = ['N', 'φ', 'Y'];

export const HOUR_TO_MIN = 60; // MIN_TO_SEC
export const HOUR_TO_SEC = 3600;
// 2 * pi =~ 6.283185307179586476925286766559
const PI2 = Math.PI * 2;
export const DEC_TO_GRAD = 10 / 9;
export const DEC_TO_RAD = PI2 / 360;

export const MAP = {
    ADD: 'add',
    REMOVE: 'remove',
    STORE: 'store',
    POPUP: 'showPopup',
    SHOW: 'showOnMap'
};

export const ACTIONS = {
    IMPORT: 'file',
    MAP: 'map',
    CLIPBOARD: 'clipboard'
};

export const MARKER = {
    colors: {
        new: '#ff0000',
        old: '#00ff00'
    },
    shape: 3,
    size: 3
};

export const PAGINATION = {
    current: 1,
    pageSize: 10
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
        delimeter: ';',
        lineSeparator: '\r\n'
    }
};

// const closestZoom = 6;

export const SEPARATORS = {
    lineSeparator: [
        { label: 'Windows / DOS', value: '\r\n' },
        { label: 'UNIX / Mac', value: '\n' }
    ],
    delimiter: [
        { loc: 'fileSettings.options.delimeters.tab', value: '\t' },
        { loc: 'fileSettings.options.delimeters.space', value: ' ' },
        { loc: 'fileSettings.options.delimeters.comma', value: ',' },
        { loc: 'fileSettings.options.delimeters.semicolon', value: ';' },
        { loc: 'fileSettings.options.delimeters.pipe', value: '|' }
    ],
    decimalSeparator: [
        { loc: 'fileSettings.options.delimeters.point', value: '.' },
        { loc: 'fileSettings.options.delimeters.comma', value: ',' }
    ]
};
export const DECIMAL = [
    { label: '~1 m', value: '0' },
    { label: '~0.1 m', value: '1' },
    { label: '~1 cm', value: '2' },
    { label: '~1 mm', value: '3' },
    { label: '~0.1 mm', value: '4' }
];

export const DEGREE = [
    { loc: 'fileSettings.options.degrees.degree', value: 'degree', decimals: 8 },
    { loc: 'fileSettings.options.degrees.gradian', value: 'gradian', decimals: 8 },
    { loc: 'fileSettings.options.degrees.radian', value: 'radian', decimals: 10 },
    { label: 'DD', value: 'DD', decimals: 8 },
    { label: 'DD MM', value: 'DD MM', decimals: 6 },
    { label: 'DD MM SS', value: 'DD MM SS', decimals: 4 },
    { label: 'DDMM', value: 'DDMM', decimals: 6 },
    { label: 'DDMMSS', value: 'DDMMSS', decimals: 4 }
];
export const DEGREE_DECIMALS = DEGREE.find(d => d.value === 'degree')?.decimals;
export const DMS = ['\u00B0', '\u0027', '\u0022'];
export const DMS_PATTERNS = [
    {
        id: 'DDMMSS',
        char: '\u0022', // quotation mark
        pattern: '(-?\\d+)[\u00B0d]\\s*(-?\\d+)\u0027\\s*(-?\\d+(?:\\.\\d+)?)\u0022'
    }, {
        id: 'DDMM',
        char: '\u0027', // apostrophe
        pattern: '(-?\\d+)[\u00B0d]\\s*(-?\\d+(?:\\.\\d+)?)[\u0027]\\s*'
    }, {
        id: 'DD',
        char: '\u00B0', // degree mark
        pattern: '(\\d+(?:\\.\\d+)?)[\u00B0d]\\s*'
    }
];

export const DATUM = [
    {
        value: 'KKJ',
        label: 'KKJ',
        alias: 'Kartastokoordinaattijarjestelma (1966)',
        epsg: 'EPSG:6123'
    }, {
        value: 'EUREF-FIN',
        label: 'EUREF-FIN',
        epsg: 'EPSG:1391'
    }, {
        value: 'ETRS89',
        label: 'ETRS89',
        alias: 'European Terrestrial Reference System 1989',
        epsg: 'EPSG:6258'
    }
];

export const SYSTEM = [
    {
        value: 'PROJ_2D',
        loc: 'flyout.coordinateSystem.coordinateSystem.proj2D',
        datums: ['KKJ', 'EUREF-FIN', 'ETRS89'],
        unit: 'metre',
        dimension: 2
    }, {
        value: 'PROJ_3D',
        loc: 'flyout.coordinateSystem.coordinateSystem.proj3D',
        datums: ['EUREF-FIN'],
        unit: 'metre (geocentric)',
        dimension: 3
    }, {
        value: 'GEOG_2D',
        loc: 'flyout.coordinateSystem.coordinateSystem.geo2D',
        datums: ['KKJ', 'EUREF-FIN'],
        unit: 'degree',
        dimension: 2
    }, {
        value: 'GEOG_3D',
        loc: 'flyout.coordinateSystem.coordinateSystem.geo3D',
        datums: ['EUREF-FIN'],
        unit: 'degree',
        dimension: 3
    }
];

export const PROJECTION = [
    {
        value: 'KKJ',
        label: 'KKJ',
        datums: ['KKJ']
    }, {
        value: 'TM',
        label: 'Transversal Mercator',
        datums: ['EUREF-FIN', 'ETRS89']
    }, {
        value: 'GK',
        label: 'Gauss-Kruger',
        datums: ['EUREF-FIN']
    }, {
        value: 'LAEA',
        label: 'Lambert Azimuthal Equal Area',
        datums: ['ETRS89']
    }, {
        value: 'LCC',
        label: 'Lambert Conic Conformal',
        datums: ['ETRS89']
    }
];

// https://www.maanmittauslaitos.fi/kartat-ja-paikkatieto/koordinaatit-ja-paikannus/epsg-koodit-ja-proj-muunnosohjelma
// projected bounds:[minX/E/lon, minY/N/lat, maxX/E/lon, maxY/N/lat] [W,S,E,N] from https://epsg.io/[xxxx]
export const SRS = [
    // newer GK EPSG-codes which have false easting 500000 prefixed with zone number -> GK19 19500000
    // GK replaced is the old one, which have always false easting 500000
    {
        value: 'EPSG:3873',
        label: 'ETRS-GK19',
        name: 'EUREF-FIN / GK19FIN',
        datum: 'EUREF-FIN',
        projection: 'GK',
        system: 'PROJ_2D',
        bounds: [19503041.74, 6524848.85, 20224215.96, 7828409.49],
        axes: ['N', 'E'],
        alias: 'ETRS89 / GK19FIN, valeitä (false easting) 19 500 00 m',
        replaced: 'EPSG:3126'
    }, {
        value: 'EPSG:3874',
        label: 'ETRS-GK20',
        name: 'EUREF-FIN / GK20FIN',
        datum: 'EUREF-FIN',
        projection: 'GK',
        system: 'PROJ_2D',
        bounds: [20446878.68, 6524866.44, 21167083.8, 7820883.59],
        axes: ['N', 'E'],
        alias: 'ETRS89 / GK20FIN, valeitä (false easting) 20 500 00 m',
        replaced: 'EPSG:3127'
    }, {
        value: 'EPSG:3875',
        label: 'ETRS-GK21',
        name: 'EUREF-FIN / GK21FIN',
        datum: 'EUREF-FIN',
        projection: 'GK',
        system: 'PROJ_2D',
        bounds: [21389145.54, 6524865.85, 22109853.34, 7813977.57],
        axes: ['N', 'E'],
        alias: 'ETRS89 / GK21FIN, valeitä (false easting) 21 500 00 m',
        replaced: 'EPSG:3128'
    }, {
        value: 'EPSG:3876',
        label: 'ETRS-GK22',
        name: 'EUREF-FIN / GK22FIN',
        datum: 'EUREF-FIN',
        projection: 'GK',
        system: 'PROJ_2D',
        bounds: [22331428.09, 6524848.63, 23052533.62, 7807692.12],
        axes: ['N', 'E'],
        alias: 'ETRS89 / GK22FIN, valeitä (false easting) 22 500 00 m',
        replaced: 'EPSG:3129'
    }, {
        value: 'EPSG:3877',
        label: 'ETRS-GK23',
        name: 'EUREF-FIN / GK23FIN',
        datum: 'EUREF-FIN',
        projection: 'GK',
        system: 'PROJ_2D',
        bounds: [23273734.53, 6524847.66, 23995133.53, 7802027.86],
        axes: ['N', 'E'],
        alias: 'ETRS89 / GK23FIN, valeitä (false easting) 23 500 00 m',
        replaced: 'EPSG:3130'
    }, {
        value: 'EPSG:3878',
        label: 'ETRS-GK24',
        name: 'EUREF-FIN / GK24FIN',
        datum: 'EUREF-FIN',
        projection: 'GK',
        system: 'PROJ_2D',
        bounds: [24216073.12, 6524862.94, 24937661.81, 7796985.36],
        axes: ['N', 'E'],
        alias: 'ETRS89 / GK24FIN, valeitä (false easting) 24 500 00 m',
        replaced: 'EPSG:3131'
    }, {
        value: 'EPSG:3879',
        label: 'ETRS-GK25',
        name: 'EUREF-FIN / GK25FIN',
        datum: 'EUREF-FIN',
        projection: 'GK',
        system: 'PROJ_2D',
        bounds: [25158452.15, 6524869.62, 25880127.1, 7792565.1],
        axes: ['N', 'E'],
        alias: 'ETRS89 / GK25FIN, valeitä (false easting) 25 500 00 m',
        replaced: 'EPSG:3132'
    }, {
        value: 'EPSG:3880',
        label: 'ETRS-GK26',
        name: 'EUREF-FIN / GK26FIN',
        datum: 'EUREF-FIN',
        projection: 'GK',
        system: 'PROJ_2D',
        bounds: [26100880.01, 6524850.09, 26822537.91, 7793954.97],
        axes: ['N', 'E'],
        alias: 'ETRS89 / GK26FIN, valeitä (false easting) 26 500 00 m',
        replaced: 'EPSG:3133'
    }, {
        value: 'EPSG:3881',
        label: 'ETRS-GK27',
        name: 'EUREF-FIN / GK27FIN',
        datum: 'EUREF-FIN',
        projection: 'GK',
        system: 'PROJ_2D',
        bounds: [27043365.14, 6524846.81, 27764902.68, 7798580.62],
        axes: ['N', 'E'],
        alias: 'ETRS89 / GK27FIN, valeitä (false easting) 27 500 00 m',
        replaced: 'EPSG:3134'
    }, {
        value: 'EPSG:3882',
        label: 'ETRS-GK28',
        name: 'EUREF-FIN / GK28FIN',
        datum: 'EUREF-FIN',
        projection: 'GK',
        system: 'PROJ_2D',
        bounds: [27985916.09, 6524859.78, 28707229.74, 7803828.36],
        axes: ['N', 'E'],
        alias: 'ETRS89 / GK28FIN, valeitä (false easting) 28 500 00 m',
        replaced: 'EPSG:3135'
    }, {
        value: 'EPSG:3883',
        label: 'ETRS-GK29',
        name: 'EUREF-FIN / GK29FIN',
        datum: 'EUREF-FIN',
        projection: 'GK',
        system: 'PROJ_2D',
        bounds: [28928541.55, 6524873.73, 29649527.39, 7809697.67],
        axes: ['N', 'E'],
        alias: 'ETRS89 / GK29FIN, valeitä (false easting) 29 500 00 m',
        replaced: 'EPSG:3136'
    }, {
        value: 'EPSG:3884',
        label: 'ETRS-GK30',
        name: 'EUREF-FIN / GK30FIN',
        datum: 'EUREF-FIN',
        projection: 'GK',
        system: 'PROJ_2D',
        bounds: [29871250.3, 6524851.88, 30591803.86, 7816187.99],
        axes: ['N', 'E'],
        alias: 'ETRS89 / GK30FIN, valeitä (false easting) 30 500 00 m',
        replaced: 'EPSG:3137'
    }, {
        value: 'EPSG:3885',
        label: 'ETRS-GK31',
        name: 'EUREF-FIN / GK31FIN',
        datum: 'EUREF-FIN',
        projection: 'GK',
        system: 'PROJ_2D',
        bounds: [30814051.27, 6524846.28, 31534067.33, 7823298.65],
        axes: ['N', 'E'],
        alias: 'ETRS89 / GK31FIN, valeitä (false easting) 31 500 00 m',
        replaced: 'EPSG:3138'
    }, {
        value: 'EPSG:3035',
        label: 'ETRS-LAEA',
        name: 'ETRS89 / LAEA Europe', // ETRS89-extended / LAEA Europe
        datum: 'ETRS89',
        projection: 'LAEA',
        system: 'PROJ_2D',
        bounds: [1908523.29, 1137678.21, 6901611.5, 6872461.46], // europe
        axes: ['N', 'E']
    }, {
        value: 'EPSG:3034',
        label: 'ETRS-LCC',
        name: 'ETRS89 / LCC Europe', // ETRS89-extended / LCC Europe
        datum: 'ETRS89',
        projection: 'LCC',
        system: 'PROJ_2D',
        bounds: [1599590.5, 762627.9, 6567884.54, 6743948.43], // europe
        axes: ['N', 'E']
    }, {
        value: 'EPSG:3046',
        label: 'ETRS-TM34 (N,E)',
        name: 'ETRS89 / UTM zone 34N (N-E)',
        datum: 'ETRS89',
        projection: 'TM',
        system: 'PROJ_2D',
        bounds: [-3043798.18, 3680130.24, 2093536.19, 9528204.85], // europe
        axes: ['N', 'E']
    }, {
        value: 'EPSG:10699',
        label: 'ETRS-TM34 (E,N)',
        name: 'EUREF-FIN / UTM zone 34N',
        datum: 'EUREF-FIN',
        projection: 'TM',
        system: 'PROJ_2D',
        bounds: [389189.88, 6522255.9, 1109609.4, 7810851.98],
        axes: ['E', 'N'],
        replaced: 'EPSG:25834' // ETRS89 / UTM zone 34N
    }, {
        value: 'EPSG:3047',
        label: 'ETRS-TM35 (N,E)',
        name: 'ETRS89 / UTM zone 35N (N-E)',
        datum: 'ETRS89',
        projection: 'TM',
        system: 'PROJ_2D',
        bounds: [-3646007.42, 3680723.36, 1528001.15, 9567789.69], // europe
        axes: ['N', 'E']
    }, {
        value: 'EPSG:25835',
        label: 'ETRS-TM35 (E,N)',
        name: 'ETRS89 / UTM zone 35N',
        datum: 'ETRS89',
        projection: 'TM',
        system: 'PROJ_2D',
        bounds: [-3646007.42, 3680723.36, 1528001.15, 9567789.69], // europe
        axes: ['E', 'N']
    }, {
        value: 'EPSG:3048',
        label: 'ETRS-TM36 (N,E)',
        name: 'ETRS89 / UTM zone 36N (N-E)',
        datum: 'ETRS89',
        projection: 'TM',
        system: 'PROJ_2D',
        bounds: [-4254095.6, 3680114.85, 966874.41, 9612110.39], // europe
        axes: ['N', 'E']
    }, {
        value: 'EPSG:10702',
        label: 'ETRS-TM36 (E,N)',
        name: 'EUREF-FIN / UTM zone 36N',
        datum: 'EUREF-FIN',
        projection: 'TM',
        system: 'PROJ_2D',
        bounds: [-299713.56, 6523093.09, 446414.83, 7836242.3],
        axes: ['E', 'N'],
        replaced: 'EPSG:25836' // ETRS89 / UTM zone 36N
    }, {
        value: 'EPSG:3067',
        label: 'ETRS-TM35FIN (E,N)',
        name: 'EUREF-FIN / TM35FIN(E,N)',
        datum: 'EUREF-FIN',
        projection: 'TM',
        system: 'PROJ_2D',
        bounds: [43547.79, 6522236.87, 764796.72, 7795461.19],
        axes: ['E', 'N'],
        alias: 'ETRS89 / TM35FIN(E,N)'
    }, {
        value: 'EPSG:5048',
        label: 'ETRS-TM35FIN (N,E)',
        name: 'EUREF-FIN / TM35FIN(N,E)',
        datum: 'EUREF-FIN',
        projection: 'TM',
        system: 'PROJ_2D',
        bounds: [43547.79, 6522236.87, 764796.72, 7795461.19],
        axes: ['N', 'E'],
        alias: 'ETRS89 / TM35FIN(N,E)'
    }, {
        value: 'EPSG:10690',
        label: 'EUREF-FIN-GRS80',
        name: 'EUREF-FIN',
        datum: 'EUREF-FIN',
        projection: '',
        system: 'GEOG_2D',
        bounds: [19.08, 58.84, 31.59, 70.09],
        axes: ['φ', 'λ'],
        replaced: 'EPSG:4258'
    }, {
        value: 'EPSG:10689',
        label: 'EUREF-FIN-GRS80h',
        name: 'EUREF-FIN',
        datum: 'EUREF-FIN',
        projection: '',
        system: 'GEOG_3D',
        bounds: [19.08, 58.84, 31.59, 70.09],
        axes: ['φ', 'λ', 'h'],
        replaced: 'EPSG:4937'
    }, {
        value: 'EPSG:10688',
        label: 'EUREF-FIN-XYZ',
        name: 'EUREF-FIN',
        datum: 'EUREF-FIN',
        projection: '',
        system: 'PROJ_3D',
        bounds: [1855677.68, 712122.25, 3126605.61, 1733040.37],
        axes: ['X', 'Y', 'Z'],
        replaced: 'EPSG:4936'
    }, {
        value: 'EPSG:3386',
        loc: 'flyout.coordinateSystem.geodeticCoordinateSystem.kkj',
        args: { zone: 0 },
        name: 'KKJ / Finland zone 0',
        datum: 'KKJ',
        projection: 'KKJ',
        system: 'PROJ_2D',
        bounds: [547043.17, 6627102.47, 1260363.75, 7836788.32],
        axes: ['N', 'E']
    }, {
        value: 'EPSG:2391',
        loc: 'flyout.coordinateSystem.geodeticCoordinateSystem.kkj',
        args: { zone: 1 },
        name: 'KKJ / Finland zone 1',
        datum: 'KKJ',
        projection: 'KKJ',
        system: 'PROJ_2D',
        bounds: [1400957.88, 6626458.25, 2093591.36, 7814216.46],
        axes: ['N', 'E']
    }, {
        value: 'EPSG:2392',
        loc: 'flyout.coordinateSystem.geodeticCoordinateSystem.kkj',
        args: { zone: 2 },
        name: 'KKJ / Finland zone 2',
        datum: 'KKJ',
        projection: 'KKJ',
        system: 'PROJ_2D',
        bounds: [2232435.81, 6626492.03, 2925991.46, 7797229.5],
        axes: ['N', 'E']
    }, {
        value: 'EPSG:2393',
        loc: 'flyout.coordinateSystem.geodeticCoordinateSystem.ykj',
        name: 'KKJ / Finland Uniform Coordinate System',
        datum: 'KKJ',
        projection: 'KKJ',
        system: 'PROJ_2D',
        bounds: [3064277.44, 6626471.36, 3757806.74, 7798047.82],
        axes: ['N', 'E']
    }, {
        value: 'EPSG:2394',
        loc: 'flyout.coordinateSystem.geodeticCoordinateSystem.kkj',
        args: { zone: 4 },
        name: 'KKJ / Finland zone 4',
        datum: 'KKJ',
        projection: 'KKJ',
        system: 'PROJ_2D',
        bounds: [3896717.7, 6626476.77, 4589271.75, 7815362.72],
        axes: ['N', 'E']
    }, {
        value: 'EPSG:3387',
        loc: 'flyout.coordinateSystem.geodeticCoordinateSystem.kkj',
        args: { zone: 5 },
        name: 'KKJ / Finland zone 5',
        datum: 'KKJ',
        projection: 'KKJ',
        system: 'PROJ_2D',
        bounds: [4729999.83, 6627321.29, 5446273.48, 7838261.51],
        axes: ['N', 'E']
    }, {
        value: 'EPSG:4123', // KKJ_GEO
        label: 'KKJ-Hayford',
        name: 'KKJ',
        datum: 'KKJ',
        projection: '',
        system: 'GEOG_2D',
        bounds: [19.24, 59.75, 31.59, 70.09],
        axes: ['φ', 'λ']
    }
];

export const SRS_C = [
    {
        value: 'EPSG:3901',
        label: 'YKJ + N60',
        name: 'KKJ / Finland Uniform Coordinate System + N60 height',
        datum: 'KKJ',
        projection: 'KKJ',
        system: 'PROJ_2D',
        srs: 'EPSG:2393',
        srsHeight: 'EPSG:5717',
        bounds: [3064557.21, 6626355.8, 3758085.96, 7797932.96],
        axes: ['N', 'E', 'H']
    }, {
        value: 'EPSG:3902',
        label: 'ETRS-TM35FIN + N60',
        name: 'EUREF-FIN / TM35FIN(N,E) + N60 height',
        datum: 'EUREF-FIN',
        projection: 'TM',
        system: 'PROJ_2D',
        srs: 'EPSG:5048',
        srsHeight: 'EPSG:5717',
        bounds: [64562.79, 6623573.95, 757812.73, 7794679.58],
        axes: ['N', 'E', 'H']
    }, {
        value: 'EPSG:3903',
        label: 'ETRS-TM35FIN + N2000',
        name: 'EUREF-FIN / TM35FIN(N,E) + N2000 height',
        datum: 'EUREF-FIN',
        projection: 'TM',
        system: 'PROJ_2D',
        srs: 'EPSG:5048',
        srsHeight: 'EPSG:3900',
        bounds: [64562.79, 6623573.95, 757812.73, 7794679.58],
        axes: ['N', 'E', 'H']
    }, {
        value: 'EPSG:10774',
        label: 'ETRS-TM35FIN + N2000',
        name: 'EUREF-FIN / TM35FIN(E,N) + N2000 height',
        datum: 'EUREF-FIN',
        projection: 'TM',
        system: 'PROJ_2D',
        srs: 'EPSG:3067',
        srsHeight: 'EPSG:3900',
        bounds: [64562.79, 6623573.95, 757812.73, 7794679.58],
        axes: ['E', 'N', 'H']
    }, {
        value: 'EPSG:10691',
        label: 'EUREF-FIN-GRS80 + N60',
        name: 'EUREF-FIN + N60 height',
        datum: 'EUREF-FIN',
        projection: '',
        system: 'GEOG_2D',
        srs: 'EPSG:10690',
        srsHeight: 'EPSG:5717',
        bounds: [19.24, 59.75, 31.59, 70.09],
        axes: ['φ', 'λ', 'H'],
        replaced: 'EPSG:7409' // ETRS89 + EVRF2000 height
    }, {
        value: 'EPSG:10692',
        label: 'EUREF-FIN-GRS80 + N2000',
        name: 'EUREF-FIN + N2000 height',
        datum: 'EUREF-FIN',
        projection: '',
        system: 'GEOG_2D',
        srs: 'EPSG:10690',
        srsHeight: 'EPSG:3900',
        bounds: [19.24, 59.75, 31.59, 70.09],
        axes: ['φ', 'λ', 'H'],
        replaced: 'EPSG:7423' // ETRS89 + EVRF2007 height
    }
];

export const SRS_H = [
    {
        value: 'EPSG:3900',
        label: 'N2000',
        name: 'N2000 height',
        axis: 'H'
    }, {
        value: 'EPSG:5717',
        label: 'N60',
        name: 'N60 height',
        axis: 'H'
    }, {
        value: 'EPSG:8675',
        label: 'N43',
        name: 'N43 height',
        axis: 'H'
    }
];
