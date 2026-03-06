Oskari.registerLocalization(
{
    "lang": "sv",
    "key": "coordinatetransformation",
    "value": {
        "title": "Koordinattransformation",
        "tile": {
            "title": "Koordinat- transformation"
        },
        "flyout": {
            "title":"Koordinattransformation",
            "mandatory": {
                "symbol": "Fält markerade med en asterisk (",
                "desc": ") är obligatoriska."
            },
            "filterSystems": {
                "title": "Filtrera referenssystem för koordinater",
                "epsg": "Med EPSG-kod",
                "systems": "Med datum och koordinatsystem"
            },
            "coordinateSystem": {
                "title": "Uppgifter om referenssystemet för koordinater",
                "input": {
                    "title": "Utgångskoordinatsystemet"
                },
                "output": {
                    "title": "Målkoordinatsystemet"
                },
                "noFilter": "Vad som helst",
                "epsgSearch": {
                    "label": "Sök med EPSG-kod"
                },
                "geodeticDatum": {
                    "label": "Geodetiskt datum"
                },
                "coordinateSystem":{
                    "label": "Koordinatsystem",
                    "proj2D": "Kartesiskt 2D (Plan)",
                    "proj3D": "Kartesiskt 3D",
                    "geo2D": "Geografiskt 2D",
                    "geo3D": "Geografiskt 3D"
                },
                "mapProjection":{
                    "label": "Kartprojektionssystem"
                },
                "geodeticCoordinateSystem":{
                    "label": "Referenssystem för koordinater", // Geodetiskt koordinatsystem
                    "choose": "Välj",
                    "kkj": "KKS zon {zone, number}",
                    "ykj": "KKS zon 3 / EKS"
                },
                "heightSystem":{
                    "label": "Höjdsystem",
                    "none": "Ingenting",
                    "n43": {
                        "info": "Observera, att deltanätet N43 inte täcker hela Norra Finland, och transformationen kan p.g.a. detta eventuellt inte utföras.",
                        "label": "Tilläggsinformation (endast på finska) på sidan:",
                        "link": "JHS163 Finlands höjdsystem N2000, bilaga 2 (bild 3)",
                        "url": "https://geoforum.fi/jhs-163-suomen-korkeusjarjestelma-n2000/"
                    }
                }
            },
            "coordinateAxes": {
                "N":"Nordkoordinat [m]",
                "E":"Östkoordinat [m]",
                "φ":"Latitud",
                "λ":"Longitud",
                "X":"Geocentriskt X [m]",
                "Y":"Geocentriskt Y [m]",
                "Z":"Geocentriskt Z [m]",
                "H": "Höjd [m]",
                "h":"Höjd över ellipsoiden [m]"
            },
            "coordinateTable": {
                "input": "Utgångskoordinater",
                "output": "Målkoordinater",
                "rows": "Rader",
                "outdated": "Valen eller koordinaterna har ändrats. Transformera koordinaterna för att få uppdaterade resultat.",
                "clearTables": "Ta bort alla koordinater",
                "confirmClear": "Är du säker på att du vill ta bort alla koordinater från tabellerna?"
            }
        },
        "transform": {
            "warnings": {
                "title": "Observera!",
                "message": "Observera följande begränsningar för val eller koordinater före transformationen.",
                "3DTo2D": "I de utgångsuppgifter du valt finns höjdvärden, men inte i resultatuppgifterna. Höjvärden ingår alltså inte i resultatkoordinaterna.",
                "coordinates": "Det finns ogiltiga rader i koordinaterna som ska transformeras. De ogiltiga raderna kommer att tas bort före transformationen.",
                "bbox": "Koordinaterna som ska transformeras ligger utanför täckningsområde av referenssystemet för koordinater. Koordinatvärdena måste vara i den axelordning som definieras av referenssystemet för koordinater.",
                "largeFile": "Transformation av stora filer kan ta flera minuter."
            },
            "validate": {
                "title": "Fel!",
                "message": "Det finns brister eller fel i valen. Beakta följande krav och försök på nytt.",
                "2DTo3D": "I valen som berör utgångsreferenssystemet för koordinater finns inget höjdsystem. En omvandling till ett 3D-system kan inte göras.",
                "crs": "Ett geodetiskt referenssystem för koordinater ska vara valt både i utgångs- och resultatuppgifterna.",
                "noInputData": "Det finns inga koordinater som kan transformeras.",
                "noInputFile": "Filen som innehåller utgångsmaterial ska vara vald.",
                "noFileName": "Filen som bildas ska ges ett filnamn.",
                "decimalCount": "Decimalernas antalet ska vara 0 eller ett positivt heltal.",
                "headerCount": "Antalet rubrikrader ska vara 0 eller ett positivt heltal.",
                "doubleComma": "Skiljetecknen för decimaler och koordinater kan inte båda vara kommatecken.",
                "doubleSpace": "Vinkelns form/enhet kan inte innehålla mellanslag, om koordinatskiljetecknet är Mellanslag.",
                "noFileSettings": "Inga filinställningar har angetts.",
                "noDelimiter": "Skiljetecknet för koordinater ska vara valt.",
                "noDecimalSeparator": "Skiljetecknet för decimaler ska vara valt."
            },
            "errors": {
                "transform": "Fel i transformation!",
                "import": "Fel i inläsningen av filen!", // Inläsningen av alla rader i filen lyckades inte.
                "paste" : "Importera koordinater från urklipp lyckades inte!",
                "export": "Utskrift koordinater i filen lyckades inte.",
                "invalidLine": "I filen finns på rad: {index, number} felaktig koordinatrad: {line} Kontrollera att valen av skiljetecknen för decimaler och koordinater samt antalet rubrikrader motsvarar filens innehåll.",
                "generic": "Koordinattransformationen misslyckades.",
                //error codes
                "invalid_coord": "Fel i koordinaten. Kontrollera att koordinaterna som ska omvandlas är i rätt format och att de geodetiska referenssystemen för koordinater och höjder är korrekta.",
                //"invalid_number": "",
                //"invalid_coord_in_array": "",
                "no_coordinates": "Inga koordinater",
                "invalid_file_settings": "Felaktiga filinställningar.",
                "no_file": "Det fanns ingen fil för begäran.",
                "invalid_first_coord": "Det var inte möjligt att bilda en koordinat med de angivna inställningarna. Kontrollera att valen av skiljetecken för koordinater, antalet rubrikrader, huruvida identifierare används eller inte samt geodetiska referenssystem för koordinater och höjdsystem (dimension) motsvarar filens innehåll.",
                "transformation_error": "Koordinatomvandlingen misslyckades. Koordinattransformation service respons:", //TODO
                "service_busy": "Det finns trängsel i tjänsten. Var så vänlig och prova åter senare."
            }
        },
        "dataSource": {
            "title": "Källa för koordinatuppgifter",
            "select": "Välj källa för koordinatuppgifter",
            "confirmChange": "Koordinaterna som ska transformeras töms. Vill du fortsätta?",
            "file": {
                "label": "Från fil",
                "button": "Från fil",
                "info":  "Välj filen med utgångsmaterialet och dess inställningar.",
                "action": "redigera dina val"
            },
            "table": {
                "label": "Med tabellen",
                "info": "Mata in utgångsuppgifter i tabellen Koordinater som ska transformeras."
            },
            "map": {
                "label": "Välj positioner på kartan",
                "button": "Välj positioner på kartan",
                "info": "Du kan välja koordinater som ska transformeras genom att klicka på kartan",
                "confirmSelect": "Uppgifterna om utgångsreferenssystemet för koordinater väljs automatiskt att vara i ETRS-TM35FIN. Dina val av utgångsreferenssystem för koordinater ersätts. Vill du fortsätta?",
                "action": "välj fler"
            },
            "clipboard": {
                "title": "Hämta från urklipp",
                "button": "Hämta från urklipp",
                "info":  "Importera koordinater från urklipp (csv, excel)",
                "placeholder": "Klistra in koordinaterna från urklipp exempelvis med CTRL+V-knappen. Skriv koordinater av en punkt till en rad. Separera koordinaterna med semikolon eller tabulator. Koordinater kan vara exempelvis i denna form: \n383699,477;6676232,276;13,4"
            }
        },
        "mapMarkers":{
            "show":{
                "title": "Visa positioner på kartan",
                "info" : "Visa punkter i tabellen på kartan. Koordinaterna anges enligt koordinatsystemet ETRS-TM35FIN. Vid varje punkt visas punktens öst- och nordkoordinat (E, N).",
                "errorTitle": "Fel i visningen av positioner",
                "noCoordinates": "Det finns inga koordinater att visa på kartan.",
                "noSrs": "Ett geodetiskt referenssystem för koordinater måste ingå i utgångsuppgifterna för att kunna visa punkter på kartan."
            },
            "select":{
                "title": "Välj positioner på kartan",
                "info": "Klicka en eller mera punkter på kartan. Koordinaterna för de punkter som du har klickat på visas i tabellen på huvussidan för koordinattransformationen. Koordinaterna anges enligt koordinatsystemet ETRS-TM35FIN och avrundas till heltal. Om du vill lägga till eller ta bort punkter, iklicka på Välj positioner positioner på kartan igen.",
                "add": "Lägg till punkter",
                "remove": "Ta bort punkter"
            }
        },
        "actions": {
            "transform": "Transformera",
            "export": "Spara till fil",
            "minimizeSrs": "Dölj extra val",
            "minimizedSrs": "Visa alla val",
            "axisFlip": "Byt koordinaternas ordning",
            "search": "Sök med namn eller EPSG-kod",
            "select": "Välj",
            "cancel": "Avbryt", //Ångra
            "done": "Färdig",
            "ok": "Ok",
            "close": "Stäng"
        },
        "confirm": {
            "title": "Val av koordinatuppgifter",
            "continue": "Vill du fortsätta?",
            "reset": "Alla koordinater och val kommer att tas bort. Vill du fortsätta?",
            "coordinates": "Koordinaterna som ska transformeras töms. Vill du fortsätta?",
            "results": "Resultatkoordinater töms och ny transformation kommer att göras med nya val. Vill du fortsätta?",
            "mapSrs": "Uppgifterna om utgångsreferenssystemet för koordinater väljs automatiskt att vara i ETRS-TM35FIN. Dina val av utgångsreferenssystem för koordinater ersätts. Vill du fortsätta?",
            "change": "Behåll andra val och koordinater",
            "changeTooltip": "Observera att om du behåller valen och koordinaterna kan det leda till att resultaten inte matchar valen."
        },
        "fileSettings": {
            "import" : "Utgångsmaterialets egenskaper",
            "export": "Spara till fil",
            "rows": "rader",
            "columns": "fält",
            "previewTitle": "Förhandsvy av koordinaterna",
            "options": {
                "fileName": "Filnamn",
                "decimalSeparator": "Decimalseparator",
                "delimiter": "Kolumnseparator",
                "headerLineCount": "Antal rubrikrader",
                "decimalCount": "Decimalernas precision",
                "axisFlip": "Byt koordinaternas ordning.",
                "writeCardinals": "Lägg till kardinalväderstreck (N,E,W,S) i slutet av koordinatvärdena.",
                "writeLineEndings": "Lägg till utgångsfilens radavslutningarna",
                "lineSeparator": "Radavskiljare",
                "unit": "Vinkelns form/enhet",
                "createHeader": "Lägg till information om använda koordinat- och höjdsystemet i borjan av filen.",
                "writeHeaders": "Lägg till utgångsfilens rubrikraden", // (${count})??
                "prefixes": { // Använd identifierare
                    "input": "Koordinater innehåller identifierare",
                    "generate": "Skapa identifierare till koordinatrader.",
                    "fromFile": "Lägg till utgångsfilens identifierare"
                },
                "degrees":{
                    "degree": "Grad",
                    "gradian": "Gon (nygrad)",
                    "radian": "Radian"
                },
                "delimiters":{
                    "point": "Punkt",
                    "comma": "Kommatecken",
                    "tab": "Tabulator",
                    "space": "Mellanslag", //Utslutning
                    "semicolon": "Semikolon",
                    "pipe": "Vertikalstreck"
                }
            }
        },
        "infoPopup": {
            "description": "Beskrivning",
            "epsgSearch": {
                "title": "Sök med EPSG-kod",
                "info": "Du kan söka ett geodetiskt referenssystem för koordinater med EPSG-kod. Mata in koden enbart i sifferform, t.ex. 3067.",
                "listItems": []
            },
            "geodeticDatum": {
                "title": "Geodetiskt datum",
                "info": "Välj om koordinaterna ska anges i datumet KKJ, EUREF-FIN eller ETRS89.",
                "listItems" : [
                    "Geodetiskt datum är en uppsättning parametrar som används för att definiera koordinatsystemets origo, skala och orientering i förhållande till jordens yta.",
                    "I Paikkatietoikkuna du kan välja om koordinaterna ska anges i datumet KKJ, EUREF-FIN eller ETRS89."
                ]
            },
            "coordinateSystem":{
                "title": "Koordinatsystem",
                "info": "Välj om koordinaterna ska anges i ett kartesiskt eller geografiskt koordinatsystem och om koordinatsystemet ska vara två- eller tredimensionellt (inklusive höjd).",
                "listItems" : [
                    "Koordinatsystem definierar, hur man ange koordinater till positioner.",
                    "I Paikkatietoikkuna kan man välja, om koordinaterna ska anges i ett kartesiskt eller geografiskt koordinatsystem och om koordinatsystemet ska vara två- eller tredimensionellt (inklusive höjd).",
                    "Om du väljer koordinatsystemet ”Kartesiskt 2D (Plan)”, kan du filtrera alternativen genom att välja kartprojektionssystem."
                ]
            },
            "mapProjection":{
                "title": "Kartprojektionssystem",
                "info": "Välj en kartprojektion för att avbilda ett tredimensionellt objekt på ett tvådimensionellt kartplan.",
                "listItems" : [
                    "Kartprojektion är en metod för att avbilda jordens tredimensionella yta på ett tvådimensionellt kartplan.",
                    "Kartprojektionen kan endast väljas för koordinatsystemet som är kartesiskt och tvådimensionellt (2D). "
                ]
            },
            "geodeticCoordinateSystem":{
                "title": "Referenssystem för koordinater",
                "info": "Välj ett referenssystemet för koordinater där du vill visa koordinater.",
                "listItems" : [
                    "Referenssystem för koordinater är ett koordinatsystem som är fäst vid den verkliga världen med hjälp av datum.",
                    "Det nationella plankoordinatsystemet i Finland är ETRS-TM35FIN. Det används också i Paikkatietoikkuna.",
                    "Det allmänt förekommande koordinatsystemet WGS84 kan inte väljas i tjänsten. Välj i stället koordinatsystemet EUREF-FIN-G80. Koordinaternas värden skiljer sig mindre än en meter mellan dessa system."
                ]
            },
            "heightSystem":{
                "title":"Höjdsystem",
                "info": "Välj i vilket höjdsystem höjdkoordinaten visas.",
                "listItems" : [
                    "Höjdsystemet är ett system som definierar punktens höjd i förhållande till jorden.",
                    "Det nationella höjdsystemet i Finland är N2000. Det N2000-system som används i Paikkatietoikkuna baserar på den nya geoidmodell som publicerades 2024.",
                    "N43-höjdsystemet omfattar inte hela norra Finland."
                ]
            },
            "fileName":{
                "title":"Filnamn",
                "info": "",
                "paragraphs" : [],
                "listItems" : []
            },
            "decimalCount":{
                "title":"Decimalernas precision",
                "info": "Välj med vilken precision du vill ange koordinaternas decimaler.",
                "paragraphs": [
                    "Välj med vilken precision du vill ange koordinaternas decimaler.",
                    "Koordinaterna anges som standard med en precision på 1 mm."
                ],
                "listItems" : [],
                "precisionTable": {
                    "title": "Antalet decimaler i olika formater av koordinater:",
                    "unit": "Format av koordinater",
                    "degree": "Grader och goner (DD)",
                    "radian": "Radianer",
                    "min": "Grader och minuter (DDMM tai DD MM)",
                    "sec": "Grader, minuter och sekunder (DDMMSS ja DD MM SS)"
                }
            },
            "delimiter":{
                "title":"Kolumnseparator",
                "info": "En kolumnseparator skiljer mellan olika kolumner, till exempel olika koordinater för samma punkt, i en textfil.",
                "paragraphs": [
                    "Filen kan även innehålla andra kolumner än koordinater. De skiljs åt av samma märke.",
                    "Kolumnseparatorn kan inte vara samma tecken som decimalseparatorn."
                ],
                "listItems" : []
            },
            "headerLineCount":{
                "title":"Antal rubrikrader",
                "info": "Som rubrikrader räknas de rader som saknar koordinatinformation och som finns i filen före koordinatraderna.",
                "paragraphs": [
                    "Rubrikrader kan till exempel ha en verbal beskrivning av innehållet i en fil."
                ],
                "listItems" : []
            },
            "unit":{
                "title":"Vinkelns form och enhet",
                "info": "Vinkelns form och enhet berättar i vilken enhet och vilket format koordinaternas vinkelvärden har angetts i filen.",
                "paragraphs": [
                    "Vinkelenheten kan vara grad, gon eller radian.",
                    "Koordinaterna kan dessutom anges i grader, sekunder och minuter."
                ],
                "listItems" : []
            },
            "decimalSeparator":{
                "title":"Decimalseparator",
                "info": "I ett decimaltal decimalseparator skiljer ett heltal åt en decimaldel.",
                "paragraphs": [
                    "Decimalseparator och kolumnseparator kan inte vara samma tecken.",
                    "Till exempel måste decimalseparatoren vara en punkt, om kolumnseparatoren är en komma."
                ],
                "listItems" : []
            },
            "lineSeparator":{
                "title":"Operativsystem",
                "info": "Radslutstecknet i filen bestäms av operativsystemet.",
                "paragraphs": [
                    "Ett radslutstecken läggs automatiskt till i filen för att skilja raderna åt.",
                    "Radslutstecknet är inte synligt för användaren."
                ],
                "listItems" : []
            },
            "prefixColCount":{
                "title":"Skapa identifierare för rader",
                "info": "Koordinatraden börjar med identifieraruppgift",
                "paragraphs": [
                    "En koordinatrad motsvarar en punkt.",
                    "Idenfieringsnummer separeras från koordinater med skiljetecken för fält.",
                    "Du kan också definiera själva identifierare. Då kan den innehålla både bokstäver och siffror."
                ],
                "listItems" : []
            },
            "axisFlip":{
                "title":"Byt koordinaternas ordning.",
                "info": "Koordinater skrivas i filen i omvänd ordning jämfört med hur de har angetts i tabellen.",
                "paragraphs": [
                    "Koordinater skrivas i filen i omvänd ordning jämfört med hur de har angetts i tabellen.",
                    "Till exempel ifall: Om X-koordinaten står före Y-koordinaten i tabellen, skrivs Y-koordinaten före X-koordinaten i filen."
                ],
                "listItems" : []
            },
            "createHeader": {
                "title":"Skriv referenssystemet rubrikraden",
                "info": "I början av filen läggs EPSG-koden och namnet på det koordinat- och höjdsystem som används samt de koordinat- och höjdenheter som används i dessa.",
                "paragraphs": [
                    "I början av filen läggs EPSG-koden och namnet på det koordinat- och höjdsystem som används samt de koordinat- och höjdenheter som används i dessa.",
                    "Exempel på information om koordinatsystemet: \"Coordinate Reference System: EPSG:2393 - KKJ / Finland Uniform Coordinate System - axes: N,E - unit: metre\""
                ]
            },
            "writeHeaders":{
                "title":"Lägg till information om använda koordinat- och höjdsystemet i borjan av filen.",
                "info": "Inkludera rubrikraderna i början av resultatfilen",
                "paragraphs": [
                    "Med denna egenskap kan användaren ta med metadata om koordinaterna på rubrikraden i resultatfilen. Namnet på referenssystemet för koordinater läggs till på rubrikraden.",
                    "I omvandlingen från en fil till en annan läggs utöver uppgifterna om referenssystemet för koordinater även eventuella rubrikrader i utgångsfilen till i resultatfilen."
                ],
                "listItems" : []
            },
            "writeLineEndings":{
                "title":"Ta med radavslutningarna i resultatet",
                "info": "Inkludera radsluten i utgångsfilen i resultatfilen",
                "paragraphs": [
                    "Med denna egenskap kan man ange om man vill ha eventuella radslut i utgångsfilen i resultatfilen. Som radslut läser applikationen in alla tecken efter punktens koordinatvärden på raden. Radslutet ska vara avskilt från koordinatvärdena med samma tecken som skiljer koordinatvärdena från varandra.",
                    "Denna egenskap påverkar endast transformationer från en fil till en annan."
                    
                ],
                "listItems" : []
            },
            "writeCardinals":{
                "title":"Lägg till kardinalväderstreck (N,E,W,S)",
                "info": "Kardinal är en bokstav som anger väderstrecket (N=nord, E=öst, W=väst, S=syd).",
                "paragraphs": [
                    "Kardinal är en bokstav som anger väderstrecket (N=nord, E=öst, W=väst, S=syd).",
                    "Om koordinaten har förtecknet minus i tabellen, läggs motsatt väderstreck till för den. Det motsatta väderstrecket till öst är väst, och det motsatta väderstrecket till nord är syd.",
                    "Till exempel östkoordinatens 325418 värde blir 325418E och östkoordinatens -325418 värde blir 325418W."
                ],
                "listItems" : []
            }
        }
    }
});
