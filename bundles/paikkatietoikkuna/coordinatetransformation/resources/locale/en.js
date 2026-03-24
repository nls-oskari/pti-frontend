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
            "coordinateSystem": {
                "title": "Coordinate reference system information",
                "input": {
                    "title": "Original coordinate system"
                },
                "output": {
                    "title": "Result coordinate system"
                },
                "noFilter": "Any option",
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
                    "label": "Coordinate reference system",
                    "choose": "Select", // Choose
                    "kkj": "KKJ zone {zone, number}",
                    "ykj": "KKJ zone 3 / YKJ"
                },
                "heightSystem":{
                    "label": "Vertical coordinate reference system", // Height system
                    "none": "None",
                    "n43" : {
                        "info": "Please be aware that the N43 triangular network does not cover all of Northern Finland and therefore the transformation might not be possible to complete.",
                        "label": "For more details about N60-N43 transformation and triangulation (only in Finnish):",
                        "link": "JHS163 Finland's elevation system N2000, attachment 2 (figure 3)",
                        "url": "https://geoforum.fi/jhs-163-suomen-korkeusjarjestelma-n2000/"
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
                "input": "Original coordinates",
                "output": "Result coordinates",
                "rows": "Rows",
                "outdated": "The selections or coordinates have changed. Transform coordinates to get updated results.",
                "clearTables": "Remove all coordinates",
                "confirmClear": "Are you sure you want to remove all coordinates from tables?"
            }
        },
        "transform": {
            "warnings": {
                "title": "Warning!",
                "message": "Please note the following restrictions on selections or coordinates before the transform.",
                "3DTo2D": "The selected input information contains height values, but the output information does not. Output coordinates will therefore not include height values.",
                "coordinates": "There are invalid rows in the coordinates to be transformed. The invalid rows will be removed before transform.",
                "bbox": "The coordinates to be transformed are outside the coverage area of ​​the source coordinate system. The coordinate values ​​must be in the axis order defined by the source coordinate system.",
                "largeFile": "The transformation of large files can take several minutes."
            },
            "validate": {
                "title": "Error!", // Error in coordinate system selections
                "message": "Selections are incomplete or contain errors. Note the following requirements and try again.",
                "2DTo3D": "No height system has been selected for the input coordinate system. It is not possible to transform this input information into a 3D system.",
                "crs": "A geodetic coordinate reference system must be selected both in the input and the output information.",
                "noInputData": "No input coordinates.",
                "noInputFile": "The file containing input information must be selected.",
                "noFileName": "The output file must be named.",
                "decimalCount": "The decimal number must be 0 or a positive integer.",
                "headerCount": "The number of header rows must be 0 or a positive integer.",
                "doubleComma": "The decimal and coordinate separators cannot both be commas.",
                "doubleSpace": "The format/unit of an angle cannot contain spaces if the coordinate separator is Space.", //angle pattern
                "noFileSettings": "No file settings.",
                "noDelimiter": "Coordinate separator must be selected.",
                "noDecimalSeparator": "Decimal separator must be selected."
            },
            "errors": {
                "transform": "Error in transformation!",
                "import": "Error in reading file!", // Not all rows of the file were read successfully.
                "paste": "Failed to import coordinates from clipboard!",
                "export": "Failed to write coordinates to file.",
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
                "placeholder": "Paste coordinates from the clipboard for example by pressing CTRL+V. One row includes coordinates for one point. Separate the coordinates with a semicolon or a tab. Coordinates may be for example in this format:\n383699,477;6676232,276;13,4"
            }
        },
        "mapMarkers":{
            "show":{
                "title": "Show locations on the map",
                "info" : "Show the locations of the points in the table on a map using the ETRS-TM35FIN coordinate system. For each point, the east and north coordinates (E, N) are displayed.",
                "errorTitle": "Error in showing positions",
                "noCoordinates": "No coordinates available to be shown on the map",
                "noSrs": "A geodetic coordinate reference system must be selected in input properties in order to show points on the map."
            },
            "select":{
                "title": "Select locations on the map",
                "info": "Click one or more points on the map. The coordinates of the points you clicked will appear in a table on the main page of Coordinate Transformation. The coordinates are represented in the ETRS-TM35FIN coordinate referesen system and rounded to integers. If you want to add or remove points, click the button \"Select locations on the map\" again.",
                "add": "Add points",
                "remove": "Delete points"
            }
        },
        "actions": {
            "transform": "Transform",
            "export": "Save to file",
            "minimizeSrs": "Hide extra options",
            "minimizedSrs": "Show all options",
            "axisFlip": "Reverse coordinates",
            "search": "Search using name or EPSG code",
            "select": "Select",
            "cancel": "Cancel",
            "done": "Done"
        },
        "confirm": {
            "title": "Coordinate information selections",
            "continue": "Do you want to continue?",
            "reset": "All coordinates and selections will be removed. Do you want to continue?",
            "coordinates": "Input coordinates will be removed. Do you want to continue?",
            "results": "Input coordinates will be removed and new transformation will be done with new selections. Do you want to continue?",
            "mapSrs": "The input coordinate reference system is automatically changed to ETRS-TM35FIN. The input coordinates will be removed and your selections for the input coordinate reference system will be replaced. Do you want to continue?",
            "change": "Keep other selections and coordinates",
            "changeTooltip": "Note that keeping the selections and coordinates can lead to a situation where the results do not match the selections."
        },
        "fileSettings": {
            "import": "Import from file",
            "export": "Save to file",
            "rows": "rows",
            "columns": "columns",
            "previewTitle": "Preview of the coordinates",
            "options": {
                "fileName": "File name",
                "decimalSeparator": "Decimal separator",
                "delimiter": "Column separator",
                "headerLineCount": "Number of header rows",
                "decimalCount": "Decimal precision",
                "axisFlip": "Reverse coordinates",
                "writeCardinals": "Add cardinals (N,E,W,S) to the end of the coordinate values.",
                "writeLineEndings": "Add end-of-lines from input file",
                "lineSeparator": "Line separator", // Row separator
                "unit": "Angle format and unit", // Angle format/unit type/unit
                "createHeader": "Add nformation about the used coordinate and height reference systems into the bginning of the file.",
                "writeHeaders": "Add header rows from input file", // (${count})??
                "prefixes": { // Use identifier, Use id infront
                    "input": "Coordinates contain identifiers",
                    "generate": "Create identifiers for coordinate rows.",
                    "fromFile": "Add identifiers from input file"
                },
                "degrees":{
                    "degree": "Degree",
                    "gradian": "Grade",
                    "radian": "Radian"
                },
                "delimiters":{
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
            "epsgSearch": {
                "title": "Search using EPSG code",
                "info": "A geodetic reference system may be searched with the EPSG code. Give the code as a numerical value, such as 3067.",
                "listItems": []
            },
            "geodeticDatum": {
                "title": "Geodetic datum",
                "info": "Choose whether the coordinates are defined in the KKJ, EUREF-FIN or ETRS89 datum.",
                "listItems" : [
                    "Geodetic datum is a set of parameters used to determine the origin, scale and orientation of a coordinate system in relation to the surface of the Earth.",
                    "In the Finnish Geoportal you can choose whether the coordinates are defined in the KKJ, EUREF-FIN or ETRS89 datum."
                ]
            },
            "coordinateSystem":{
                "title": "Coordinate system",
                "info": "Choose whether the coordinates are indicated in a rectangular or geographical coordinate system and in 2D or 3D (height included). ",
                "listItems" : [
                    "Coordinate system defines, how the coordinates will be defined to the points.",
                    "In the Finnish Geoportal you can choose whether the coordinates are indicated in a rectangular or geographical coordinate system and in 2D or 3D (height included).",
                    "If you select \"Rectangular 2D (Plane)\" as the coordinate system, you can filter the options by selecting the map projection system."
                ]
            },
            "mapProjection":{
                "title": "Map projection system",
                "info": "Choose a map projection to describe a 3D feature on the 2D map layer.",
                "listItems" : [
                    "Map projection is a method to describe three-dimensional Earth surface on the two-dimensional map layer.",
                    "You can select a map projection only if you have chosen \"Rectangular 2D (Plane)\" as a coordinate system."
                ]
            },
            "geodeticCoordinateSystem":{
                "title": "Coordinate reference system",
                "info": "Choose a coordinate reference system in which coordinates are represented.",
                "listItems" : [
                    "Coordinate refence system is a reference system which is related to the Earth with a geodetic datum.",
                    "The national projected coordinate system in Finland is ETRS-TM35FIN. It is used also in the Finnish Geoportal.",
                    "The commonly used WGS84 coordinate system is not available in this service. Instead, select the EUREF-FIN-G80 coordinate system. The deviation in coordinate values between these systems is less than one metre."
                ]
            },
            "heightSystem":{
                "title":"Vertical coordinate reference system",
                "info": "Choose in which vertical coordiante reference system heights and depths are represented.",
                "listItems" : [
                    "Vertical coordinate reference system is a system defining the point elevation in relation to the Earth.",
                    "In Finland, the national height system is N2000. The N2000 system used in the Finnish Geoportal has been updated to the new geoid model published in 2024.",
                    "Please note that the N43 height system does not cover the whole of Northern Finland."
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
                "info": "Select the desired decimal place precision for the coordinates.",
                "paragraphs": [
                    "Select the desired decimal place precision for the coordinates.",
                    "By default, coordinates are displayed with a resolution of 1 mm."
                ],
                "listItems" : [],
                "precisionTable": {
                    "title": "Number of decimal for different angle forms and units:",
                    "unit": "Angle format and unit", // Angle shape/unit
                    "degree": "Degrees and grades (DD)",
                    "radian": "Radians",
                    "min": "Degrees and minutes (DDMM and DD MM)",
                    "sec": "Degrees, minutes and seconds (DDMMSS ja DD MM SS)"
                }
            },
            "delimiter":{
                "title":"Column separator",
                "info": "A column separator separates different columns, such as different coordinates of the same point, from each other in a text file.",
                "paragraphs": [
                    "The file may also contain columns other than coordinates. They are separated by the same character.",
                    "The column separator cannot be the same character as the decimal separator."
                ],
                "listItems" : []
            },
            "headerLineCount":{
                "title":"Number of header rows",
                "info": "Header rows are those rows that do not have coordinate data and that are in the file before the coordinate rows.",
                "paragraphs": [
                    "For example, header rows may have a verbal description of the contents of a file."
                ],
                "listItems" : []
            },
            "unit":{
                "title":"Angle format and unit",
                "info": "Angle format and unit defines the unit and format where the angle values of the coordinates are in the file.",
                "paragraphs": [
                    "The unit of angle can be degrees, gon, or radians.",
                    "In addition, coordinates can be expressed in degrees, seconds and minutes."
                ],
                "listItems" : []
            },
            "decimalSeparator":{
                "title":"Decimal separator",
                "info": "In the decimal number a decimal separator separates an integer and a decimal part from each other.",
                "paragraphs": [
                    "The decimal separator cannot be the same character as the column separator.",
                    "For example, a decimal separator must be a point if a comma is used as a column separator."
                ],
                "listItems" : []
            },
            "lineSeparator":{
                "title":"Operating system",
                "info": "The end-of-line character in the file is determined by the operating system.",
                "paragraphs": [
                    "The end-of-line character is automatically added to the file to separate lines from each other.",
                    "The end-of-line character is not visible to users."
                ],
                "listItems" : []
            },
            "prefixColCount":{
                "title":"Identifiers for coordinate rows",
                "info": "At the beginning of each row is an identifier that separates the locations from each other.",
                "paragraphs": [
                    "One row of coordinates corresponds to one point.",
                    "The identifier and coordinates are separated by the column separator.",
                    "Identifier can contain both letters and numbers."
                ],
                "listItems" : []
            },
            "axisFlip":{
                "title":"Reverse coordinates",
                "info": "Coordinates will be written into the file in the reverse order compared to the coordinates in the table.",
                "paragraphs": [
                    "Coordinates will be written into the file in the reverse order compared to the coordinates in the table.",
                    "For example, if the X-coordinate in the table comes before the Y-coordinate, the Y-coordinate is written in the file before the X-coordinate."
                ],
                "listItems" : []
            },
            "createHeader": {
                "title":"Add information about the used coordinate and height reference systems into the bginning of the file.",
                "info": "At the beginning of the file will be added the EPSG code, name and coordinate and height units of the coordinate and height reference systems used in the file.",
                "paragraphs": [
                    "At the beginning of the file will be added the EPSG code, name and coordinate and height units of the coordinate and height reference systems used in the file.",
                    "Example of information about coordinate reference system:  \"Coordinate Reference System: EPSG:2393 - KKJ / Finland Uniform Coordinate System - axes: N,E - unit: metre\""
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
                "title":"Add cardinals (N,E,W,S)",
                "info": "A cardinal is a letter indicating the cardinal direction (N = North, E = East, W = West, S = South).",
                "paragraphs": [
                    "A cardinal is a letter indicating the cardinal direction (N = North, E = East, W = West, S = South).",
                    "If a coordinate is negative, the opposite cardinal direction letter will be added in front of it. East is the opposite direction of west, and north is the opposite direction of south.",
                    "For example, the value of the East coordinate 325418 becomes 325418E and the value of the East coordinate -325418 becomes 325418W."
                ],
                "listItems" : []
            }
        }
    }
});
