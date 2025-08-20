export const BUNDLE = 'coordinatetransformation';
export const WATCH_JOB = 'CoordinateTransformJob';
export const WATCH_URL = '/coordinatetransform/watch/';
export const ID_PREFIX = 'coord_marker_';
// TODO: or enums?
export const SOURCE = ['table', 'file', 'map'];
export const TRANSFORM = ['A2A', 'F2A', 'F2R', 'F2F', 'A2F'];
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
};
// const closestZoom = 6;

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
    { label: 'DDMM', value: 'DDMM', decimals: 6 },
    { label: 'DDMMSS', value: 'DDMMSS', decimals: 4 }
];
export const DEGREE_DECIMALS = DEGREE.find(d => d.value === 'degree')?.decimals;
export const DMS = ['\u00B0', '\u0027', '\u0022'];

export const DATUM = [
    {
        value: 'KKJ',
        label: 'KKJ'
    }, {
        value: 'EUREF-FIN',
        label: 'EUREF-FIN'
    }
];
export const SYSTEM = [
    {
        value: 'PROJ_2D',
        loc: 'flyout.coordinateSystem.coordinateSystem.proj2D',
        datums: ['KKJ', 'EUREF-FIN'],
        unit: 'metric',
        dimension: 2
    }, {
        value: 'PROJ_3D',
        loc: 'flyout.coordinateSystem.coordinateSystem.proj3D',
        datums: ['EUREF-FIN'],
        unit: 'geocentric',
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
        unit: 'degree3D',
        dimension: 3
    }

];
export const PROJECTION = [
    {
        value: 'KKJ',
        label: 'KKJ',
        datum: 'KKJ'
    }, {
        value: 'TM',
        label: 'Transversal Mercator',
        datum: 'EUREF-FIN'
    }, {
        value: 'GK',
        label: 'Gauss-Kruger',
        datum: 'EUREF-FIN'
    }, {
        value: 'LAEA',
        label: 'Lambert Azimuthal Equal Area',
        datum: 'EUREF-FIN'
    }, {
        value: 'LCC',
        label: 'Lambert Conic Conformal',
        datum: 'EUREF-FIN'
    }
];

// https://www.maanmittauslaitos.fi/kartat-ja-paikkatieto/koordinaatit-ja-paikannus/epsg-koodit-ja-proj-muunnosohjelma
// bounds:[minx, miny, maxx, maxy]
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
        bounds: [16136220.08, 4245436.94, 19729336.74, 9392386.51],
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
        bounds: [17036139.71, 4284384.64, 20718673.04, 9388493.84],
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
        bounds: [17935765.83, 4324906.92, 21707943.90, 9384787.32],
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
        bounds: [18835101.07, 4367049.45, 22697152.55, 9381268.03],
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
        bounds: [19734149.31, 4410859.98, 23686302.23, 9377936.99],
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
        bounds: [20632915.73, 4456388.39, 24675396.21, 9374795.15],
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
        bounds: [21531406.93, 4503686.78, 25664437.76, 9371843.41],
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
        bounds: [22429630.98, 4552809.52, 26653430.17, 9369082.63],
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
        bounds: [23327597.57, 4603813.37, 27642376.73, 9366513.60],
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
        bounds: [24225318.05, 4656757.53, 28631280.76, 9364137.06],
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
        bounds: [25122805.55, 4711703.72, 29620145.58, 9361953.68],
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
        bounds: [26020075.09, 4768716.31, 30608974.53, 9359964.10],
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
        bounds: [26917143.71, 4827862.39, 31597770.94, 9358168.88],
        axes: ['N', 'E'],
        alias: 'ETRS89 / GK31FIN, valeitä (false easting) 31 500 00 m',
        replaced: 'EPSG:3138'
    }, {
        value: 'EPSG:3035',
        label: 'ETRS-LAEA',
        name: 'ETRS89 / LAEA Europe',
        datum: 'EUREF-FIN',
        projection: 'LAEA',
        system: 'PROJ_2D',
        bounds: [1896628.62, 1507846.05, 4656644.57, 6827128.02],
        axes: ['N', 'E']
    }, {
        value: 'EPSG:3034',
        label: 'ETRS-LCC',
        name: 'ETRS89 / LCC Europe',
        datum: 'EUREF-FIN',
        projection: 'LCC',
        system: 'PROJ_2D',
        bounds: [1584884.54, 1150546.94, 4435373.08, 6675249.46],
        axes: ['N', 'E']
    }, {
        value: 'EPSG:3046',
        label: 'ETRS-TM34',
        name: 'ETRS89 / UTM zone 34N (N-E)',
        datum: 'EUREF-FIN',
        projection: 'TM',
        system: 'PROJ_2D',
        bounds: [-3062460.04, 4323108.17, 707860.72, 9381033.40],
        axes: ['N', 'E']
    }, {
        value: 'EPSG:10699',
        label: 'ETRS-TM34 (E,N)',
        name: 'EUREF-FIN / UTM zone 34N',
        datum: 'EUREF-FIN',
        projection: 'TM',
        system: 'PROJ_2D',
        bounds: [-3062460.04, 4323108.17, 707860.72, 9381033.40],
        axes: ['E', 'N'],
        replaced: 'EPSG:25834' // ETRS89 / UTM zone 34N
    }, {
        value: 'EPSG:3047',
        label: 'ETRS-TM35',
        name: 'ETRS89 / UTM zone 35N (N-E)',
        datum: 'EUREF-FIN',
        projection: 'TM',
        system: 'PROJ_2D',
        bounds: [-3669433.90, 4601644.86, 642319.78, 9362767.00],
        axes: ['N', 'E'],
    }, {
        value: 'EPSG:25835',
        label: 'ETRS-TM35 (E,N)',
        name: 'ETRS89 / UTM zone 35N',
        datum: 'EUREF-FIN',
        projection: 'TM',
        system: 'PROJ_2D',
        bounds: [-3669433.90, 4601644.86, 642319.78, 9362767.00],
        axes: ['E', 'N'],
    }, {
        value: 'EPSG:3048',
        label: 'ETRS-TM36',
        name: 'ETRS89 / UTM zone 36N (N-E)',
        datum: 'EUREF-FIN',
        projection: 'TM',
        system: 'PROJ_2D',
        bounds: [-4283197.87, 4949558.27, 575249.45, 9351421.46],
        axes: ['N', 'E']
    }, {
        value: 'EPSG:10702',
        label: 'ETRS-TM36 (E,N)',
        name: 'EUREF-FIN / UTM zone 36N',
        datum: 'EUREF-FIN',
        projection: 'TM',
        system: 'PROJ_2D',
        bounds: [-4283197.87, 4949558.27, 575249.45, 9351421.46],
        axes: ['E', 'N'],
        replaced: 'EPSG:25836' // ETRS89 / UTM zone 36N
    }, {
        value: 'EPSG:3067',
        label: 'ETRS-TM35FIN',
        name: 'EUREF-FIN / TM35FIN(E,N)',
        datum: 'EUREF-FIN',
        projection: 'TM',
        system: 'PROJ_2D',
        bounds: [-3669433.90, 4601644.86, 642319.78, 9362767.00],
        axes: ['E', 'N'],
        alias: 'ETRS89 / TM35FIN(E,N)'
    }, {
        value: 'EPSG:5048',
        label: 'ETRS-TM35FIN',
        name: 'EUREF-FIN / TM35FIN(N,E)',
        datum: 'EUREF-FIN',
        projection: 'TM',
        system: 'PROJ_2D',
        bounds: [-3669433.90, 4601644.86, 642319.78, 9362767.00],
        axes: ['N', 'E'],
        alias: 'ETRS89 / TM35FIN(N,E)'
    }, {
        value: 'EPSG:10690',
        label: 'EUREF-FIN-GRS80',
        name: 'EUREF-FIN',
        datum: 'EUREF-FIN',
        projection: '',
        system: 'GEOG_2D',
        bounds: [-16.1, 32.88, 39.65, 84.17],
        axes: ['φ', 'λ'],
        replaced: 'EPSG:4258'
    }, {
        value: 'EPSG:10689',
        label: 'EUREF-FIN-GRS80h',
        name: 'EUREF-FIN',
        datum: 'EUREF-FIN',
        projection: '',
        system: 'GEOG_3D',
        bounds: [-16.1, 32.88, 39.65, 84.17],
        axes: ['φ', 'λ', 'h'],
        replaced: 'EPSG:4937'
    }, {
        value: 'EPSG:10688',
        label: 'EUREF-FIN-XYZ',
        name: 'EUREF-FIN',
        datum: 'EUREF-FIN',
        projection: '',
        system: 'PROJ_3D',
        bounds: [5151420.52, -1486881.13, 500495.11, 414781.77],
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
        bounds: [569217.09, 6663791.81, 583029.96, 6693054.88],
        axes: ['N', 'E']
    }, {
        value: 'EPSG:2391',
        loc: 'flyout.coordinateSystem.geodeticCoordinateSystem.kkj',
        args: { zone: 1 },
        name: 'KKJ / Finland zone 1',
        datum: 'KKJ',
        projection: 'KKJ',
        system: 'PROJ_2D',
        bounds: [1415885.57, 6628437.53, 1559300.06, 7695112.84],
        axes: ['N', 'E']
    }, {
        value: 'EPSG:2392',
        loc: 'flyout.coordinateSystem.geodeticCoordinateSystem.kkj',
        args: { zone: 2 },
        name: 'KKJ / Finland zone 2',
        datum: 'KKJ',
        projection: 'KKJ',
        system: 'PROJ_2D',
        bounds: [2415851.96, 6627314.46, 2560464.61, 7647148.92],
        axes: ['N', 'E']
    }, {
        value: 'EPSG:2393',
        loc: 'flyout.coordinateSystem.geodeticCoordinateSystem.ykj',
        name: 'KKJ / Finland Uniform Coordinate System',
        datum: 'KKJ',
        projection: 'KKJ',
        system: 'PROJ_2D',
        bounds: [3064557.21, 6651895.29, 3674549.99, 7785726.70],
        axes: ['N', 'E']
    }, {
        value: 'EPSG:2394',
        loc: 'flyout.coordinateSystem.geodeticCoordinateSystem.kkj',
        args: { zone: 4 },
        name: 'KKJ / Finland zone 4',
        datum: 'KKJ',
        projection: 'KKJ',
        system: 'PROJ_2D',
        bounds: [4418851.11, 6759862.03, 4557959.34, 7748619.72],
        axes: ['N', 'E']
    }, {
        value: 'EPSG:3387',
        loc: 'flyout.coordinateSystem.geodeticCoordinateSystem.kkj',
        args: { zone: 5 },
        name: 'KKJ / Finland zone 5',
        datum: 'KKJ',
        projection: 'KKJ',
        system: 'PROJ_2D',
        bounds: [5423705.81, 6970442.95, 5428707.25, 6989284.23],
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
