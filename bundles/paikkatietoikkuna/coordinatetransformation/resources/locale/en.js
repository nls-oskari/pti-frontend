Oskari.registerLocalization(
{
    "lang": "en",
    "key": "coordinatetransformation",
    "value": {
        "title": "Coordinate Transformation",
        "tile": {
            "title": "Coordinate Transformation"
        },
        "flyout": {
            "title":"Coordinate Transformation",
            "mandatory": {
                "symbol": "Fields marked with an asterisk (",
                "desc": ") are required."
            },
            "filterSystems": {
                "title": "Filter coordinate reference systems",
                "epsg": "With EPSG code",
                "systems": "With datum and coordinate system"
            },
            "coordinateSystem": {
                "title": "Coordinate reference system information",
                "input": {
                    "title": "Input coordinate reference system information"
                },
                "output": {
                    "title": "Output coordinate reference system information"
                },
                "noFilter": "Any option",
                "epsgSearch": {
                    "label": "Search using EPSG code"
                },
                "geodeticDatum": {
                    "label": "Geodetic datum"
                },
                "coordinateSystem":{
                    "label": "Coordinate system",
                    "proj2D": "Cartesian 2D",
                    "proj3D": "Cartesian 3D",
                    "geo2D": "Geographic 2D",
                    "geo3D": "Geographic 3D"
                },
                "mapProjection":{
                    "label": "System of map projections"
                },
                "geodeticCoordinateSystem":{
                    "label": "Geodetic coordinate reference system",
                    "choose": "Select", // Choose
                    "kkj": "KKJ zone {zone, number}",
                    "ykj": "KKJ zone 3 / YKJ"
                },
                "heightSystem":{
                    "label": "Vertical coordinate reference system", // Height system
                    "none": "None",
                    "n43" : {
                        "info": "Please be aware that the N43 triangular network does not cover all of Northern Finland and therefore the transformation might not be possible to complete. For more details about N60-N43 transformation and triangulation (only in Finnish): JHS163 Finland's elevation system N2000, attachment 2 (figure 3):",
                        "url": "https://www.suomidigi.fi/ohjeet-ja-tuki/jhs-suositukset/jhs-163-suomen-korkeusjarjestelma-n2000"
                    }
                }
            },
            "coordinateAxes": {
                "N":"Northing [m]",
                "E":"Easting [m]",
                "φ":"Geodetic latitude",
                "λ":"Geodetic longitude",
                "X":"Geocentric X [m]",
                "Y":"Geocentric Y [m]",
                "Z":"Geocentric Z [m]",
                "H": "Height [m]",
                "h":"Ellipsoidal height [m]"
            },
            "coordinateTable": {
                "input": "Coordinates to be transformed",
                "output": "Result coordinates",
                "rows": "Rows",
                "outdated": "The selections or coordinates have changed. Transform coordinates to get updated results.",
                "clearTables": "Remove all coordinates",
                "confirmClear": "Are you sure you want to remove all coordinates from tables?"
            },
            "transform": {
                "warnings": {
                    "title": "Warning!",
                    "message": "Please note the following restrictions on selections or coordinates before the transform. Do you want to continue?",
                    "3DTo2D": "The selected input information contains height values, but the output information does not. Output coordinates will therefore not include height values.",
                    "2DTo3D": "The selected output information contains height values, but the input information does not. The height values 0 and height system N2000 will be added to the input information.",
                    "coordinates": "There are invalid rows in the coordinates to be transformed. The invalid rows will be removed before transform.",
                    "bbox": "The coordinates to be transformed are outside the coverage area of ​​the source coordinate system. The coordinate values ​​must be in the axis order defined by the source coordinate system.",
                    "largeFile": "The transformation of large files can take several minutes."
                },
                "validateErrors": {
                    "title": "Error!", // Error in coordinate system selections
                    "message": "Selections are incomplete or contain errors. Note the following requirements and try again.",
                    "xyz": "No height system has been selected for the input coordinate system. It is not possible to transform this input information into a projected 3D system.",
                    "crs": "A geodetic coordinate reference system must be selected both in the input and the output information.",
                    "noInputData": "No input coordinates.",
                    "noInputFile": "The file containing input information must be selected.",
                    "noFileName": "The output file must be named.",
                    "decimalCount": "The decimal number must be 0 or a positive integer.",
                    "headerCount": "The number of header rows must be 0 or a positive integer.",
                    "doubleComma": "The decimal and coordinate separators cannot both be commas.",
                    "doubleSpace": "The format/unit of an angle cannot contain spaces if the coordinate separator is Space.", //angle pattern
                    "noFileSettings": "No file settings.",
                    "noCoordinateSeparator": "Coordinate separator must be selected.",
                    "noDecimalSeparator": "Decimal separator must be selected."
                },
                "responseErrors": {
                    "titleTransform": "Error in transformation!",
                    "titleRead": "Error in reading file!",
                    "readFileError" : "Not all rows of the file were read successfully.",
                    "transformFileError": "The transformation of coordinates failed.",
                    "invalidLine": "The file's row {index, number} contains an invalid coordinate: {line}. Check that the selected decimal and coordinate separators and number of header rows match the contents of the file.",
                    "generic": "Coordinate transformation failed.",
                    //error codes
                    "invalid_coord": "Error in coordinate. Check that coordinates to be transformed are in correct format and that the geodetic coordinate reference system and height system are correct.",
                    //"invalid_number": "Invalid coordinate.",
                    //"invalid_coord_in_array": "Invalid coordinate.",
                    "no_coordinates": "No coordinates.",
                    "invalid_file_settings": "Error in file settings.",
                    "no_file": "No file matching the request could be found.",
                    "invalid_first_coord": "It was not possible to produce coordinates with these selections. Check that the coordinate separator, number of headers, geodetic coordinate and height system (dimension) selections as well as the option to use identifier or not match the contents of the file.",
                    "transformation_error": "Coordinate transformation failed. Service responded with error:",
                    "service_busy": "The transformation service is busy right now. Please try again later."
                },
                "responseFile": {
                    "title": "Attention!",
                    "hasMoreCoordinates": "It is not possible to transform more than {maxCoordsToArray, number} coordinates from the input information into the table. If you want to transform all coordinates, select Output to file."
                }
            }
        },
        "dataSource": {
            "title": "Coordinate information source",
            "select": "Select coordinate information source",
            "confirmChange": "Input coordinates will be removed. Do you want to continue?",
            "file": {
                "label": "From file",
                "button": "Import from file",
                "info":  "Select the file containing the input information and its settings.",
                "action": "edit selections"
            },
            "table": {
                "label": "Using table",
                "info": "Put the input information into the Input coordinates table."
            },
            "map": {
                "label": "Select locations on the map",
                "button": "Select locations on the map",
                "info": "Select coordinates to be transformed on the map by clicking them.",
                "confirmSelect": "The input coordinate reference system is automatically changed to ETRS-TM35FIN. Your selections for the input coordinate reference system will be replaced. Do you want to continue?",
                "action": "select more"
            },
            "clipboard": {
                "title": "Import coordinates from clipboard",
                "button": "Import from clipboard",
                "info":  "Import coordinates from clipboard (csv, excel)",
                "placeholder": "Enter coordinates here. Each row should contain one coordinate. Use semicolon or tab as a separator. Data can be imported in following format:\n383699,477;6676232,276;13,4"
            }
        },
        "mapMarkers":{
            "show":{
                "title": "Show locations on the map",
                "info" : "The coordinate reference system of the map is ETRS-TM35FIN. Coordinates have been placed on the map using this coordinate reference system. With the location, the coordinates are shown numerically in the input and/or output coordinate reference system. ",
                "errorTitle": "Error in showing positions",
                "noCoordinates": "No coordinates available to be shown on the map",
                "noSrs": "A geodetic coordinate reference system must be selected in input properties in order to show points on the map."
            },
            "select":{
                "title": "Select locations on the map",
                "info": "Click to select one or more points on the map. The coordinate reference system of the map is ETRS-TM35FIN. This coordinate reference system is automatically selected for the coordinates to be transformed and it cannot be changed. When selecting coordinates, please note that selecting locations on the map is not precise.",
                "add": "Add points",
                "remove": "Delete points"
            }
        },
        "actions": {
            "transform": "Transform",
            "export": "Save to file",
            "minimizeSrs": "Hide coordinate reference system extra selections",
            "minimizedSrs": "Show all coordinate reference system selections",
            "axisFlip": "Coordinates reversed",
            "search": "Search using name or EPSG code",
            "select": "Select",
            "cancel": "Cancel",
            "done": "Done",
            "ok": "Ok",
            "close": "Close"
        },
        "confirm": {
            "title": "Coordinate information selections",
            "reset": "All coordinates and selections will be removed. Do you want to continue?",
            "coordinates": "Input coordinates will be removed. Do you want to continue?",
            "results": "Input coordinates will be removed and new transformation will be done with new selections. Do you want to continue?",
            "mapSrs": "The input coordinate reference system is automatically changed to ETRS-TM35FIN. The input coordinates will be removed and your selections for the input coordinate reference system will be replaced. Do you want to continue?",
            "change": "Keep other selections and coordinates",
            "changeTooltip": "Note that keeping the selections and coordinates can lead to a situation where the results do not match the selections."
        },
        "fileSettings": {
            "import": "Input properties",
            "export": "Output properties",
            "rows": "rows",
            "columns": "columns",
            "previewTitle": "Preview",
            "options": {
                "fileName": "File name",
                "decimalSeparator": "Decimal separator",
                "coordinateSeparator": "Field separator",
                "headerLineCount": "Number of header rows",
                "decimalPrecision": "Decimal precision",
                "axisFlip": "Coordinates reversed",
                "writeCardinals": "Add cardinals (N,E,W,S)",
                "writeLineEndings": "Add end-of-lines from input file",
                "lineSeparator": "Line separator", // Row separator
                "unit": "Angle pattern", // Angle format/unit type/unit
                "createHeader": "Add CRS header",
                "writeHeaders": "Add header rows from input file", // (${count})??
                "prefixes": { // Use identifier, Use id infront
                    "input": "Coordinates contain identifiers",
                    "generate": "Generate identifers for rows",
                    "fromFile": "Add identifiers from input file"
                },
                "degrees":{
                    "degree": "Degree",
                    "gradian": "Grade",
                    "radian": "Radian"
                },
                "delimeters":{
                    "point": "Point",
                    "comma": "Comma",
                    "tab": "Tabulator",
                    "space": "Space",
                    "semicolon": "Semicolon",
                    "pipe": "Pipe"
                }
            }
        },
        "infoPopup": {
            "description": "Description",
            "table": {
                "title": "Coordinate information source - table",
                "paragraphs": [
                    "Put the input information into the Input coordinates table."
                ]
            },
            "map": {
                "title": "Coordinate information source - map",
                "paragraphs": [
                    "Select coordinates to be transformed on the map by clicking them.",
                    "The coordinate reference system of the map is ETRS-TM35FIN. This coordinate reference system is automatically selected for the coordinates to be transformed and it cannot be changed.",
                    "When selecting coordinates, please note that selecting locations on the map is not precise."
                ]
            },
            "file": {
                "title": "Coordinate information source - file",
                "paragraphs": [
                    "Select the file containing the input information and its settings."
                ]
            },
            "epsgSearch": {
                "title": "Search using EPSG code",
                "info": "A geodetic reference system may be searched with the EPSG code. Give the code as a numerical value, such as 3067.",
                "listItems": []
            },
            "geodeticDatum": {
                "title": "Geodetic datum",
                "info": "Datum describing the relationship between a 2D or 3D coordinate system and the Earth.",
                "listItems" : [
                    "Datum: a parameter or set of parameters defining the origin, scale and orientation of a coordinate system.",
                    "Examples of a geodetic datum are EUREF-FIN and the KKJ."
                ]
            },
            "coordinateSystem":{
                "title": "Coordinate system",
                "info": "A set of mathematical rules defining how coordinates are assigned to points.",
                "listItems" : [
                    "Different types of coordinate systems include cartesian coordinate systems, projected coordinate systems, polar coordinate systems, geodetic coordinate systems, spherical coordinate systems and cylindrical coordinate systems."
                ]
            },
            "mapProjection":{
                "title": "System of map projection",
                "info": "A set of rules determining how an area is described using a set of map projections.",
                "listItems" : [
                    "Map projection: a method of describing a three-dimensional surface on a two-dimensional plane (map).",
                    "The rules can be used to define map projections and projection zones. Map projection system may define identifiers, scale factor at central meridian or parallel, width or lenght or overlapping of the projection zones."
                ]
            },
            "geodeticCoordinateSystem":{
                "title": "Geodetic coordinate reference system",
                "info": "Coordinate reference system based on a geodetic datum.",
                "listItems" : [
                    "Coordinate reference system: a system consisting of a coordinate system that is related to the Earth with a datum.",
                    "The national projected coordinate system of Finland is ETRS-TM35FIN."
                ]
            },
            "heightSystem":{
                "title":"Vertical coordinate reference system",
                "info": "One-dimensional coordinate system based on a vertical datum.",
                "listItems" : [
                    "Vertical datum: a datum defining the relationship between gravity-related heights or depths and the Earth.",
                    "N2000 height system, described in the JHS163 recommendation, is to be used for nationwide tasks in Finland. "
                ]
            },
            "fileName":{
                "title":"File name",
                "info": "",
                "paragraphs" : [],
                "listItems" : []
            },
            "decimalCount":{
                "title":"Decimal precision",
                "info": "Number of decimals included in the output",
                "paragraphs": [
                    "This property is used to define the decimal accuracy of coordinates in the output. The default is the number of decimals matching an accuracy of 1mm." // The default for showing degrees is the nearest number of decimals in the metric system matching an accuracy of 1mm."
                ],
                "listItems" : [],
                "precisionTable": {
                    "title": "Number of decimals of angle pattern in metric equivalent",
                    "unit": "Angle pattern", // Angle shape/unit
                    "deg": "Degree, Grade and DD",
                    "rad": "Radian",
                    "min": "DDMM and DD MM",
                    "sec": "DDMMSS and DD MM SS"
                }
            },
            "coordinateSeparator":{
                "title":"Field separator",
                "info": "Defines by which delimeter the columns are separated from each other",
                "paragraphs": [
                    "Defines by which delimeter the columns are separated from each other in the file.",
                    "If the coordinates are preceded by an identifier or followed by a character string, these must also be separated from the coordinates using the same separator."
                ],
                "listItems" : []
            },
            "headerLineCount":{
                "title":"Number of header rows",
                "info": "Number of lines in the beginning of the file before the first coordinate row",
                "paragraphs": [
                    "This property is used to assign the number of lines to be bypassed at the start of the file before reading the first coordinate row.",
                    "The reason for bypassing can be, for example, a verbal description of the contents at the start of the file."
                ],
                "listItems" : []
            },
            "unit":{
                "title":"Angle pattern",
                "info": "Unit of a geodetic coordinates",
                "paragraphs": [
                    "This property is used to define the format of angle values. Supported angle units: Degree, Grade and Radian",
                    "Sexagesimal forms derived from the degree are also supported. In these formats, if degrees, minutes of arc and seconds of arc are separated by a space (DD MM and DD MM SS), the space cannot be used as the coordinate separator."
                ],
                "listItems" : []
            },
            "decimalSeparator":{
                "title":"Decimal separator",
                "info": "This property is used to define the decimal separator.",
                "paragraphs": [
                    "This property is used to define the decimal separator.",
                    "The decimal separator cannot be the same character as the coordinate separator. If the coordinate separator is a comma, the decimal separator must be a point."
                ],
                "listItems" : []
            },
            "lineSeparator":{
                "title":"Line separator",
                "info": "Character used as line break in the file",
                "paragraphs": [
                    "This property is used to define the character or character string used to separate lines in the file. This character or character string is added to the end of each line in the file."
                ],
                "listItems" : []
            },
            "prefixId":{
                "title":"Use identifiers",
                "info": "Coordinate row starts with identifier",
                "paragraphs": [
                    "This property is used to define that the coordinate values of each point are preceded on the same line by the point's identifier (ID)",
                    "The point identifier must be separated from the coordinate values using the same character string as that used as the coordinate value separator.",
                    "If the input file does not contain point identifiers or the points have been imported from a table or a map, the points are assigned identifiers starting from 1 and increasing by one integer for each point.",
                    "The identifiers in the input file do not need to be numerical."
                ],
                "listItems" : []
            },
            "axisFlip":{
                "title":"Reversed coordinates",
                "info": "",
                "paragraphs": [
                    "This property is used to define whether the first two coordinate values of each point in the file are in reverse order in comparison with the order given in the description of the coordinate reference system.",
                    "For example, coordinates in the KKJ coordinate reference system are by default given in North, East order. If the reverse order is selected, the East coordinate must precede the North coordinate in the file."
                ],
                "listItems" : []
            },
            "createHeader": {
                "title":"Create CRS header",
                "info": "The header row to be added is created from the data in the coordinate system you selected",
                "paragrapsh": [
                    "The header row to be added is created from the data in the coordinate system you selected. As shown in the following example:"
                ]
            },
            "writeHeaders":{
                "title":"Add header rows",
                "info": "Add header rows from the imported file to the result",
                "paragraphs": [
                    "This property is used to include metadata about coordinates in the header row. The code of the coordinate reference system is added to the header row.",
                    "When transforming from one file into another, any header rows in the input file in addition to the coordinate reference system information are added to the output file."
                ],
                "listItems" : []
            },
            "writeLineEndings":{
                "title":"Include end-of-row markers in output",
                "info": "End-of-lines are added to the output file",
                "paragraphs": [
                    "This property is used to include any end-of-line characters or character strings from the input file to the output file. All characters following the coordinate values until the line break are counted as end-of-line. The end-of-line must be separated from the coordinate values using the same character as that used as the coordinate value separator.",
                    "This property takes effect only in transformations from a file to another."
                ],
                "listItems" : []
            },
            "writeCardinals":{
                "title":"Use cardinals",
                "info": "Coordinate values are followed by cardinal directions (N, E, W or S).",
                "paragraphs": [
                    "This property is used to include cardinal directions to the coordinate values in the output.",
                    "Cardinal directions are indicated by N, E, W or S after the coordinate value.",
                    "The opposite cardinal direction is added to negative values and the minus signs are removed from coordinate values.",
                    "For example, the value of the East coordinate 325418 becomes 325418E and the value of the East coordinate -325418 becomes 325418W."
                ],
                "listItems" : []
            }
        }
    }
});
