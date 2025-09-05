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
                    "title": "Utgångsuppgifter om referenssystemet för koordinater"
                },
                "output": {
                    "title": "Resultatuppgifter om referenssystemet för koordinater"
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
                    "label": "Geodetiskt referenssystem för koordinater", // Geodetiskt koordinatsystem
                    "choose": "Välj",
                    "kkj": "KKS zon {zone, number}",
                    "ykj": "KKS zon 3 / EKS"
                },
                "heightSystem":{
                    "label": "Höjdsystem",
                    "none": "Ingenting",
                    "n43": {
                        "info": "Observera, att deltanätet N43 inte täcker hela Norra Finland, och transformationen kan p.g.a detta eventuellt inte utföras. Tilläggsinformation (endast på finska, se Liite 2, bild 3) på sidan:",
                        "url": "https://www.suomidigi.fi/ohjeet-ja-tuki/jhs-suositukset/jhs-163-suomen-korkeusjarjestelma-n2000"
                    }
                }
            },
            "coordinateAxes": {
                "N":"Nord-koordinat [m]",
                "E":"Öst-koordinat [m]",
                "φ":"Latitud",
                "λ":"Longitud",
                "X":"Geocentriskt X [m]",
                "Y":"Geocentriskt Y [m]",
                "Z":"Geocentriskt Z [m]",
                "H": "Höjd [m]",
                "h":"Höjd över ellipsoiden [m]"
            },
            "coordinateTable": {
                "input": "Koordinater som ska transformeras",
                "output": "Resultatkoordinater",
                "rows": "Rader",
                "outdated": "Valen eller koordinaterna har ändrats. Transformera koordinaterna för att få uppdaterade resultat.",
                "clearTables": "Ta bort alla koordinater",
                "confirmClear": "Är du säker på att du vill ta bort alla koordinater från tabellerna?"
            },
            "transform": {
                "warnings": {
                    "title": "Observera!",
                    "message": "Observera följande begränsningar för val eller koordinater före transformationen. Vill du fortsätta?",
                    "3DTo2D": "I de utgångsuppgifter du valt finns höjdvärden, men inte i resultatuppgifterna. Höjvärden ingår alltså inte i resultatkoordinaterna.",
                    "2DTo3D": "I de resultatuppgifter du valt finns höjdvärden, men inte i utgångsuppgifterna. Utgångsmaterialet ges höjdvärdet 0 och höjdsystemet N2000.",
                    "coordinates": "Det finns ogiltiga rader i koordinaterna som ska transformeras. De ogiltiga raderna kommer att tas bort före transformationen.",
                    "bbox": "Koordinaterna som ska transformeras ligger utanför täckningsområde av referenssystemet för koordinater. Koordinatvärdena måste vara i den axelordning som definieras av referenssystemet för koordinater.",
                    "largeFile": "Transformation av stora filer kan ta flera minuter."
                },
                "validateErrors": {
                    "title": "Fel!",
                    "message": "Det finns brister eller fel i valen. Beakta följande krav och försök på nytt.",
                    "xyz": "I valen som berör utgångsreferenssystemet för koordinater finns inget höjdsystem. En omvandling till ett kartesiskt 3D-system kan inte göras.",
                    "crs": "Ett geodetiskt referenssystem för koordinater ska vara valt både i utgångs- och resultatuppgifterna.",
                    "noInputData": "Det finns inga koordinater som kan transformeras.",
                    "noInputFile": "Filen som innehåller utgångsmaterial ska vara vald.",
                    "noFileName": "Filen som bildas ska ges ett filnamn.",
                    "decimalCount": "Decimalernas antalet ska vara 0 eller ett positivt heltal.",
                    "headerCount": "Antalet rubrikrader ska vara 0 eller ett positivt heltal.",
                    "doubleComma": "Skiljetecknen för decimaler och koordinater kan inte båda vara kommatecken.",
                    "doubleSpace": "Vinkelns form/enhet kan inte innehålla mellanslag, om koordinatskiljetecknet är Mellanslag.",
                    "noFileSettings": "Inga filinställningar har angetts..",
                    "noCoordinateSeparator": "Skiljetecknet för koordinater ska vara valt.",
                    "noDecimalSeparator": "Skiljetecknet för decimaler ska vara valt."
                },
                "responseErrors": {
                    "titleTransform": "Fel i transformation!",
                    "titleRead": "Fel i inläsningen av filen!",
                    "readFileError" : "Inläsningen av alla rader i filen lyckades inte.",
                    "transformFileError": "Transformationen av koordinater i filen lyckades inte.",
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
                },
                "responseFile": {
                    "title": "Observera!",
                    "hasMoreCoordinates": "Det är inte möjligt att från utgångsmaterialet transformera fler än {maxCoordsToArray, number} koordinater i tabellen. Om du vill transformera alla koordinater, använd funktionen För in resultaten i en fil."
                }
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
                "label": "Välj lägen på kartan",
                "button": "Välj lägen på kartan",
                "info": "Du kan välja koordinater som ska transformeras genom att klicka på kartan",
                "confirmSelect": "Uppgifterna om utgångsreferenssystemet för koordinater väljs automatiskt att vara i ETRS-TM35FIN. Dina val av utgångsreferenssystem för koordinater ersätts. Vill du fortsätta?",
                "action": "välj fler"
            },
            "clipboard": {
                "title": "Importera koordinater från urklipp",
                "button": "Hämta från urklipp",
                "info":  "Valitse lähtöaineiston sisältävä tiedosto ja sen asetukset.",
                "placeholder": "Ange värden från urklippet här. En rad motsvarar ett koordinat. Separera värden med semikolon eller tabulator. Värden kan tilläggas i följande form:\n383699,477;6676232,276;13,4"
            }
        },
        "mapMarkers":{
            "show":{
                "title": "Visa lägen på kartan",
                "info" : "Kartans referenssystem för koordinater är ETRS-TM35FIN. Koordinaterna har placerats på kartan med hjälp av detta referenssystem för koordinater. I samband med lägesanteckningen anges koordinaterna enligt utgångs- och/eller resultatreferenssystemet i siffror.",
                "errorTitle": "Fel i visningen av positioner",
                "noCoordinates": "Det finns inga koordinater att visa på kartan.",
                "noSrs": "Ett geodetiskt referenssystem för koordinater måste ingå i utgångsuppgifterna för att kunna visa punkter på kartan."
            },
            "select":{
                "title": "Välj lägen på kartan",
                "info": "Välj en eller flera punkter på kartan genom att klicka på dem. Kartans referenssystem för koordinater är ETRS-TM35FIN. Detta referenssystem för koordinater väljs automatiskt för de koordinater som omvandlas och kan inte ändras. Beakta vid val av koordinater att valet av läge inte är exakt.",
                "add": "Lägg till punkter",
                "remove": "Ta bort punkter"
            }
        },
        "actions": {
            "transform": "Transformera",
            "export": "Spara till fil",
            "minimizeSrs": "Dölj extra val för koordinatreferenssystem",
            "minimizedSrs": "Visa alla val av koordinatreferenssystem",
            "axisFlip": "Omvända koordinater",
            "search": "Sök med namn eller EPSG-kod",
            "select": "Välj",
            "cancel": "Avbryt", //Ångra
            "done": "Färdig",
            "ok": "Ok",
            "close": "Stäng"
        },
        "confirm": {
            "title": "Val av koordinatuppgifter",
            "reset": "Alla koordinater och val kommer att tas bort. Vill du fortsätta?.",
            "coordinates": "Koordinaterna som ska transformeras töms. Vill du fortsätta?",
            "results": "Resultatkoordinater töms och ny transformation kommer att göras med nya val. Vill du fortsätta?",
            "mapSrs": "Uppgifterna om utgångsreferenssystemet för koordinater väljs automatiskt att vara i ETRS-TM35FIN. Dina val av utgångsreferenssystem för koordinater ersätts. Vill du fortsätta?",
            "change": "Behåll andra val och koordinater",
            "changeTooltip": "Observera att om du behåller valen och koordinaterna kan det leda till att resultaten inte matchar valen."
        },
        "fileSettings": {
            "import" : "Utgångsmaterialets egenskaper",
            "export": "Bildande av datamaterial",
            "rows": "rader",
            "columns": "fält",
            "previewTitle": "Förhandsvy",
            "options": {
                "fileName": "Filnamn",
                "decimalSeparator": "Skiljetecken för decimaler",
                "coordinateSeparator": "Skiljetecken för fält",
                "headerLineCount": "Antal rubrikrader",
                "decimalCount": "Decimalernas precision",
                "axisFlip": "Omvända koordinater",
                "writeCardinals": "Lägg till kardinalväderstreck (N,E,W,S)",
                "writeLineEndings": "Lägg till utgångsfilens radavslutningarna",
                "lineSeparator": "Radavskiljare",
                "unit": "Vinkelns form/enhet",
                "createHeader": "Skapa koordinatuppgifter rubrikraden",
                "writeHeaders": "Lägg till utgångsfilens rubrikraden", // (${count})??
                "prefixes": { // Använd identifierare
                    "input": "Koordinater innehåller identifierare",
                    "generate": "Skapa identifierare för rader",
                    "fromFile": "Lägg till utgångsfilens identifierare"
                },
                "degrees":{
                    "degree": "Grad",
                    "gradian": "Gon (nygrad)",
                    "radian": "Radian"
                },
                "delimeters":{
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
            "table": {
                "title": "Källa för koordinatuppgifter - tabell",
                "paragraphs": [
                    "Mata in utgångsuppgifter i tabellen Koordinater som ska omvandlas."
                ]
            },
            "map": {
                "title": "Källa för koordinatuppgifter - kartan",
                "paragraphs": [
                    "Du kan välja koordinater som ska omvandlas genom att klicka på kartan",
                    "Kartans  referenssystem för koordinater är ETRS-TM35FIN. Detta referenssystem för koordinater väljs automatiskt för de koordinater som omvandlas och kan inte ändras.",
                    "Beakta vid val av koordinater att valet av läge inte är exakt."
                ]
            },
            "file": {
                "title": "Källa för koordinatuppgifter - fil",
                "paragraphs": [
                    "Välj filen med utgångsmaterialet och dess inställningar."
                ]
            },
            "epsgSearch": {
                "title": "Sök med EPSG-kod",
                "info": "Du kan söka ett geodetiskt referenssystem för koordinater med EPSG-kod. Mata in koden enbart i sifferform, t.ex. 3067.",
                "listItems": []
            },
            "geodeticDatum": {
                "title": "Geodetiskt datum",
                "info": "Ett datum som beskriver förhållandet mellan jorden och ett två- eller tredimensionellt koordinatsystem.",
                "listItems" : [
                    "Datum: en parameter eller parametermängd som definierar koordinatsystemets origo, skala och orientation.",
                    "Exempel på geodetiska datum är bl.a. EUREF-FIN och kartverkskoordinatsystemet."
                ]
            },
            "coordinateSystem":{
                "title": "Koordinatsystem",
                "info": "En mängd matematiska regler som bestämmer hur koordinater för punkter definieras.",
                "listItems" : [
                    "Olika typer av koordinatsystem är bl.a. kartesiskt koordinatsystem, plankoordinatsystem, polärt koordinatsystem, geodetiskt koordinatsystem, sfäriskt koordinatsystem och cylindriskt koordinatsystem."
                ]
            },
            "mapProjection":{
                "title": "Kartprojektionssystem",
                "info": "En mängd regler som bestämmer hur ett önskat område beskrivs med hjälp av en mängd kartprojektioner.",
                "listItems" : [
                    "Kartprojektion: en metod för att beskriva jordklotets tredimensionella yta på ett tvådimensionellt kartplan.",
                    "Med hjälp av reglerna kan man bestämma kartprojektioner och projektionszoner. För projektionszoner kan systemet bestämma identiferare, medelmeridianernas eller medelparallellernas skala, bredd, längd och överlappning."
                ]
            },
            "geodeticCoordinateSystem":{
                "title": "Geodetiskt koordinatsystem",
                "info": "Ett referenssystem för koordinater som baserar sig på ett geodetiskt datum.",
                "listItems" : [
                    "Referenssystem för koordinater: ett koordinatsystem som har bundits till den verkliga världen med hjälp av ett datum.",
                    "Finlands riksomfattande projicerade referenssystem för koordinater är ETRS-TM35FIN."
                ]
            },
            "heightSystem":{
                "title":"Höjdsystem",
                "info": "Ett endimensionerat referenssystem för koordinater som baserar sig på ett höjddatum.",
                "listItems" : [
                    "Höjddatum: datum som definierar förhållandet mellan höjder och djup i anslutning till tyngdkraften och Jorden.",
                    "I Finland används höjdsystemet N2000 som är förenlig med rekommendationen JHS 163 i riksomfattande arbeten."
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
                "info": "Antalet decimaler som visas i resultatet.",
                "paragraphs": [
                    "Med denna egenskap kan man ange med hur många decimalers noggrannhet koordinaterna visas i resultatet. Det förvalda värdet motsvarar ett antal decimaler som ger en 1 mm precision." // Det förvalda värdet för gradangivelser är det närmaste antalet decimaler som i det metriska sytemet motsvarar 1 mm."
                ],
                "listItems" : [],
                "precisionTable": {
                    "title": "Antalet decimaler av vinkels form/enhet i metrisk ekvivalent",
                    "unit": "Vinkelns form/enhet",
                    "deg": "Grad, gon och DD",
                    "rad": "Radian",
                    "min": "DDMM och DD MM",
                    "sec": "DDMMSS och DD MM SS"
                }
            },
            "coordinateSeparator":{
                "title":"Skiljetecken för fält",
                "info": "Definierar med vilket skiljetecken fält separeras",
                "paragraphs": [
                    "Definierar med vilket skiljetecken fält separeras i filen.",
                    "Om koordinaterna föregås av en identifierare eller följs av en teckensträng, ska även dessa vara åtskilda med samma skiljetecken."
                ],
                "listItems" : []
            },
            "headerLineCount":{
                "title":"Antal rubrikrader",
                "info": "Antalet rader i början av filen före den första koordinatraden.",
                "paragraphs": [
                    "Med denna egenskap kan man ange hur många rader i början av filen som applikationen kan förbise innan den ska läsa in den första koordinatraden.",
                    "Orsaken till förbiseendet kan vara exempelvis en beskrivning i ord av filens innehåll i början av filen."
                ],
                "listItems" : []
            },
            "unit":{
                "title":"Vinkelns form/enhet",
                "info": "Enhet för geodetiska koordinater",
                "paragraphs": [
                    "Med denna egenskap anges formatet för gradvärden. Gradenheter som applikationen stöder: Grad, Gon (nygrad) och Radian.",
                    "Dessutom stöds sexagesimalformat som härletts ur grader. Om man i dessa format har avskiljt grader, bågminuter och bågsekunder med mellanslag (DD MM och DD MM SS), kan mellanslaget inte användas som skiljetecken för koordinater."
                ],
                "listItems" : []
            },
            "decimalSeparator":{
                "title":"Skiljetecken för decimaler",
                "info": "Med denna egenskap anges skiljetecknet för decimaler.",
                "paragraphs": [
                    "Skiljetecknet för decimaler får inte vara samma som skiljetecknet för koordinatvärden. Om kommatecken använts som skiljetecken för koordinatvärden, ska skiljetecknet för decimaler vara en punkt."
                ],
                "listItems" : []
            },
            "lineSeparator":{
                "title":"Radavskiljare",
                "info": "Tecken som i filen anger radbyte.",
                "paragraphs": [
                    "Med denna egenskap anges vilket tecken eller vilken teckensträng används för att ange radbyte. Detta tecken eller denna teckensträng läggs alltså till slutet av varje rad."
                ],
                "listItems" : []
            },
            "prefixId":{
                "title":"Använd identifierare",
                "info": "Koordinatraden börjar med identifieraruppgift",
                "paragraphs": [
                    "Med denna egenskap anges att koordinatvärdena för respektive punkt föregås av punktens identifierare (ID) på samma rad",
                    "Punktens identifierare ska vara avskilt från koordinatvärdena med samma teckensträng som skiljer koordinatvärdena från varandra.",
                    "Om den importerade filen saknar punktidentifierare eller punkterna har hämtats från en tabell eller karta, ges resultatfilernas punkter identifierare som börjar från 1 och växer med ett heltal per punkt.",
                    "I utgångsfilen behöver identifierare inte vara numeriska."
                ],
                "listItems" : []
            },
            "axisFlip":{
                "title":"Omvända koordinater",
                "info": "X- och Y-koordinataxlarnas ordning avviker från den definierade ordningen.",
                "paragraphs": [
                    "Med denna egenskap kan man definiera om de två första koordinatvärdena för punkterna i filen är i motsatt ordning jämfört med den ordning som anges i koordinatsystemets beskrivning.",
                    "Exempelvis visas KKS-koordinater så att nordkoordinaten är först och östkoordinaten följer. När man väljer omvänd ordning, ska östkoordinaten vara först i filen och sedan nordkoordinaten."
                ],
                "listItems" : []
            },
            "createHeader": {
                "title":"Skriv referenssystemet rubrikraden",
                "info": "info",
                "paragrapsh": [
                    "Rubrikraden som ska läggas till skapas från data i det koordinatsystem du valt. Som visas i följande exempel:"
                ]
            },
            "writeHeaders":{
                "title":"Skriv rubrikraden från utgångsmaterialet",
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
                "title":"Använd kardinalväderstreck",
                "info": "Lägg till väderstrecken (N, E, W eller S) efter koordinatvärdena",
                "paragraphs": [
                    "Med denna egenskap anges om koordinatvärdenas väderstreck skrivs ut efter koordinatvärdena i en utskrift.",
                    "Väderstrecken anges genom att skriva N, E, W eller S efter respektive koordinatvärde.",
                    "På värden med förtecknet minus läggs det motsatta väderstrecket till och minustecknen tas bort från koordinatvärdena.",
                    "Exempel: värdet på östkoordinaten 325418 blir 325418E och på östkoordinaten -325418 blir värdet 325418W."
                ],
                "listItems" : []
            }
        }
    }
});
