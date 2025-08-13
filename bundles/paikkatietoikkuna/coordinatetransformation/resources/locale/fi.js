Oskari.registerLocalization(
{
    "lang": "fi",
    "key": "coordinatetransformation",
    "value": {
        "title": "Koordinaattimuunnos",
        "tile": {
            "title": "Koordinaatti- muunnos"
        },
        "flyout": {
            "title":"Koordinaattimuunnos",
            "mandatory": {
                "symbol": "Tähdellä (",
                "desc": ") merkityt ovat pakollisia kenttiä."
            },
            "filterSystems": {
                "title": "Suodata koordinaattijärjestelmiä",
                "epsg": "EPSG-koodilla",
                "systems": "Datumilla ja koordinaatistolla"
            },
            "steps": {
                "inputSrs": "Lähtökoordinaattijärjestelmä",
                "outputSrs": "Tuloskoordinaattijärjestelmä",
                "srs": "Koordinaattijärjestelmät",
                "importFile": "Lähtöaineisto",
                "exportFile": "Tulosaineisto",
                "mapSelect": "Valitse sijainnit",
                "inputTable": "Lähtökoordinaatit",
                "mapInputTable": "Kartan koordinaatit",
                "resultTable": "Tuloskoordinaatit",
                "resultTable2": "Lähtö ja tuloskoordinaatit"
            },
            "coordinateSystem": {
                "title": "Koordinaattijärjestelmän tiedot",
                "input": {
                    "title": "Anna lähtökoordinaattijärjestelmän tiedot"
                },
                "output": {
                    "title": "Anna tuloskoordinaattijärjestelmän tiedot"
                },
                "noFilter": "Mikä tahansa",
                "epsgSearch": {
                    "label": "Hae EPSG-koodilla"
                },
                "geodeticDatum": {
                    "label": "Geodeettinen datumi"
                },
                "coordinateSystem":{
                    "label": "Koordinaatisto",
                    "proj2D": "Suorakulmainen 2D (Taso)",
                    "proj3D": "Suorakulmainen 3D",
                    "geo2D": "Maantieteellinen 2D",
                    "geo3D": "Maantieteellinen 3D"
                },
                "mapProjection":{
                    "label": "Karttaprojektiojärjestelmä"
                },
                "geodeticCoordinateSystem":{
                    "label": "Geodeettinen koordinaattijärjestelmä",
                    "choose": "Valitse",
                    "kkj": "KKJ kaista {zone, number}",
                    "ykj": "KKJ kaista 3 / YKJ"
                },
                "heightSystem":{
                    "label": "Korkeusjärjestelmä",
                    "none": "Ei mitään",
                    "n43": {
                        "info": "Huomaa, että N43 kolmioverkko ei kata koko Pohjois-Suomea, eikä muunnosta siksi voida välttämättä tehdä. Katso lisätietoja N60-N43 muunnospisteistön kolmioverkon kattavuudesta: JHS163 Suomen korkeusjärjestelmä N2000 Liite 2 (kuva 3):",
                        "url": "https://www.suomidigi.fi/ohjeet-ja-tuki/jhs-suositukset/jhs-163-suomen-korkeusjarjestelma-n2000"
                    }
                }
            },
            "coordinateAxes": {
                'N': 'Pohjois-koordinaatti [m]',
                'E': 'Itä-koordinaatti [m]',
                'φ': 'Leveysaste',
                'λ': 'Pituusaste',
                'X': 'Geosentrinen X [m]',
                'Y': 'Geosentrinen Y [m]',
                'Z': 'Geosentrinen Z [m]',
                'H': 'Korkeus [m]',
                'h': 'Ellipsoidinen korkeus [m]'
            },
            "coordinateTable": {
                "input": "Muunnettavat koordinaatit",
                "output": "Tuloskoordinaatit",
                "metric": {
                    "x":"Pohjois-koordinaatti [m]",
                    "y":"Itä-koordinaatti [m]",
                    "z": "Korkeus [m]"
                },
                "degree": {
                    "x":"Leveysaste",
                    "y":"Pituusaste",
                    "z": "Korkeus [m]",
                },
                "degree3D": {
                    "x":"Leveysaste",
                    "y":"Pituusaste",
                    "z": "Ellipsoidinen korkeus [m]",
                },
                "geocentric": {
                    "x":"Geosentrinen X [m]",
                    "y":"Geosentrinen Y [m]",
                    "z":"Geosentrinen Z [m]"
                },
                "height": {
                    "elevation": "Korkeus [m]",
                    "ellipse":"Ellipsoidinen korkeus [m]",
                    "geocentric": "Geosentrinen Z [m]"
                },
                "rows": "Riviä",
                "clearTables": "Tyhjennä taulukot",
                "confirmClear": "Haluatko tyhjentää taulukot?"
            },
            "transform": {
                "warnings": {
                    "title": "Huomio!",
                    "3DTo2D": "Valitsemissasi lähtötiedoissa on mukana korkeusarvoja, mutta tulostiedoissa ei. Tuloskoordinaatteihin ei siis tule korkeusarvoja mukaan. Haluatko jatkaa?",
                    "2DTo3D": "Valitsemissasi lähtötiedoissa ei ole korkeusarvoja, mutta tulostiedoissa on. Lähtöaineiston korkeusarvoiksi lisätään 0 ja korkeusjärjestelmäksi N2000. Haluatko jatkaa?",
                    "xyz": "Lähtökoordinaattijärjestelmän valinnoissa ei ole korkeusjärjestelmää. Muunnos suorakulmaiseen 3D -järjestelmään ei ole mahdollinen.",
                    "largeFile": "Isojen tiedostojen muuntaminen voi kestää useita minuutteja."
                },
                "validateErrors": {
                    "title": "Virhe!",
                    "message": "Valinnoissa on puutteita tai virheitä. Ota huomioon seuraavat vaatimukset ja yritä uudelleen.",
                    "crs": "Geodeettinen koordinaattijärjestelmä pitää olla valittuna sekä lähtö- että tulostiedoissa.",
                    "srs": "Geodeettinen koordinaattijärjestelmä pitää olla valittuna.",
                    "noInputData": "Ei muunnettavia koordinaatteja.",
                    "noInputFile": "Lähtöaineiston sisältävä tiedosto pitää olla valittuna.",
                    "noFileName": "Muodostettavalle tiedostolle pitää antaa tiedostonimi.",
                    "decimalCount": "Desimaalien määrän pitää olla 0 tai positiivinen kokonaisluku.",
                    "headerCount": "Otsakerivien määrän pitää olla 0 tai positiivinen kokonaisluku.",
                    "doubleComma": "Desimaali- ja koordinaattierotin eivät voi molemmat olla pilkkuja.",
                    "doubleSpace": "Kulman muoto/yksikkö ei voi sisältää välilyöntejä, jos koordinaattierotin on Välilyönti.",
                    "noFileSettings": "Tiedostoasetuksia ei ole annettu.",
                    "noCoordinateSeparator": "Koordinaattierotin pitää olla valittuna.",
                    "noDecimalSeparator":"Desimaalierotin pitää olla valittuna."
                },
                "responseErrors": {
                    "titleTransform": "Virhe muunnoksessa!",
                    "titleRead": "Virhe tiedoston lukemisessa!",
                    "readFileError" : "Tiedostosta ei onnistuttu lukemaan kaikkia rivejä.",
                    "transformFileError": "Tiedoston koordinaatteja ei onnistuttu muuntamaan.",
                    "invalidLine": "Tiedostossa on rivillä: {index, number} virheellinen koordinaattirivi: {line} <br /> Tarkasta, että kyseinen rivi on kelvollinen ja vastaa lähtöaineiston ominaisuuksien valintoja.",
                    "generic": "Koordinaattimuunnos epäonnistui.",
                    //error codes
                    "invalid_coord": "Koordinaatti virheellinen. Tarkasta, että muunnettavat koordinaatit ovat oikeassa muodossa sekä geodeettinen koordinaatti- ja korkeusjärjestelmä ovat oikein.",
                    "invalid_number": "Koordinaatti virheellinen.",
                    "invalid_coord_in_array": "Koordinaatti virheellinen.",
                    "no_coordinates": "Tiedostosta ei löytynyt koordinaatteja. Tarkasta tiedosto sekä asetettu otsakerivien määrä.",
                    "invalid_file_settings": "Tiedoston asetukset virheelliset.",
                    "no_file": "Lähetetystä pyynnöstä ei löytynyt tiedostoa.",
                    "invalid_first_coord": "Tiedostosta ei saatu muodostettua koordinaattia annetuilla asetuksilla. Tarkasta, että koordinaattierotin, otsakerivien määrä, käytä tunnistetta sekä geodeettinen koordinaatti- ja korkeusjärjestelmä (dimensio) -valinnat vastaavat tiedoston sisältöä.",
                    "transformation_error": "Koordinaattimuunnos epäonnistui. Koordinaattimuunnospalvelusta palautui virhe:",
                    "service_busy": "Palvelussa on ruuhkaa juuri nyt, ole hyvä ja yritä myöhemmin uudelleen."
                },
                "responseFile": {
                    "title": "Huomio!",
                    "hasMoreCoordinates": "Lähtöaineistosta ei voida muuntaa käyttöliittymän taulukkoon yli {maxCoordsToArray, number} koordinaattia. Jos haluat muuntaa kaikki koordinaatit, käytä Muunna tiedostoon -toimintoa."
                }
            }
        },
        "dataSource": {
            "title": "Koordinaattitietojen lähde",
            "select": "Valitse koordinaattitietojen lähde",
            "change": "Vaihda lähde",
            "confirmChange": "Muunnettavat koordinaatit tyhjennetään. Haluatko jatkaa?",
            "file": {
                "label": "Tiedosto",
                "info":  "Valitse lähtöaineiston sisältävä tiedosto ja sen asetukset.",
                "action": "muokkaa valintoja"
            },
            "table": {
                "label": "Taulukko",
                "info": "Syötä lähtötiedot Muunnettavat koordinaatit -taulukkoon."
            },
            "map": {
                "label": "Valitse sijainnit kartalta",
                "info": "Voit valita muunnettavia koordinaatteja kartalta klikkaamalla.",
                "confirmSelect": "Lähtökoordinaattijärjestelmän tiedot valitaan automaattisesti kartan käyttämän ETRS-TM35FIN-koordinaattijärjestelmän mukaisiksi. Tekemäsi lähtökoordinaattijärjestelmän valinnat korvataan. Haluatko jatkaa?",
                "action": "valitse lisää"
            }
        },
        "mapMarkers":{
            "show":{
                "title": "Näytä sijainnit kartalla",
                "info": "Kartta on ETRS-TM35FIN-koordinaattijärjestelmässä. Koordinaatit on sijoitettu kartalle kyseistä koordinaattijärjestelmää käyttäen. Sijaintimerkinnän yhteydessä näytään lähtö- ja/tai tuloskoordinaattijärjestelmän mukaiset koordinaatit lukemina. ",
                "errorTitle": "Virhe sijaintien näyttämisessä",
                "noCoordinates": "Ei koordinaatteja näytettäväksi kartalla",
                "noSrs": "Geodeettinen koordinaattijärjestelmä pitää olla valittuna lähtötiedoissa, jotta pisteet voidaan näyttää kartalla.",
                "lon": "Lon",
                "lat": "Lat",
                "north": "N",
                "east": "E"
            },
            "select":{
                "title": "Valitse sijainnit kartalta",
                "info": "Valitse yksi tai useampi piste kartalta klikkaamalla. Kartta on ETRS-TM35FIN-koordinaattijärjestelmässä. Tämä koordinaattijärjestelmä valitaan automaattisesti eikä sitä voi muuttaa. Valinnoissa on syytä huomioida, että kartalta sijaintien valinta ei ole tarkka ja valitut koordinaatit pyöristetään kokonaisluvuiksi.",
                "add": "Lisää merkintöjä",
                "remove": "Poista merkintöjä"
            }
        },
        "actions": {
            "convert": "Tee muunnos",
            "export": "Tee muunnos tiedostoon",
            "minimizeSrs": "Piilota koordinaattjijärjestelmän lisävalinnat",
            "minimizedSrs": "Näytä kaikki koordinaattjijärjestelmän valinnat",
            "search": "Hae nimellä tai EPSG-koodilla",
            "select": "Valitse",
            "cancel": "Peruuta",
            "done": "Valmis",
            "ok": "Ok",
            "close": "Sulje"
        },
        "fileSettings": {
            "options": {
                "decimalSeparator": "Desimaalierotin",
                "coordinateSeparator": "Sarake-erotin",
                "headerLineCount": "Otsakerivien määrä",
                "decimalCount": "Desimaalien tarkkuus",
                "axisFlip": "Koordinaatit käänteisesti",
                "prefixId": "Koordinaatit sisältävät tunnisteet",
                "useId": {
                    "generate": "Luo tunnisteet",
                    "add": "Lisää tunnisteet",
                    "fromFile": "Lisää tunnisteet lähtötiedostosta"
                },
                "writeHeader": "Kirjoita otsakerivi tiedostoon",
                "writeCardinals": "Käytä kardinaaleja (N,E,W,S)",
                "writeLineEndings": "Rivin loput tulokseen",
                "lineSeparator": "Rivierotin",
                "unit": "Kulman muoto/yksikkö",
                "choose": "Valitse",
                "degreeFormat":{
                    "degree": "Aste",
                    "gradian": "Gooni (graadi)",
                    "radian": "Radiaani"
                },
                "delimeters":{
                    "point": "Piste",
                    "comma": "Pilkku",
                    "tab": "Tabulaattori",
                    "space": "Välilyönti",
                    "semicolon": "Puolipiste"
                }
            },
            "export": {
                "title": "Aineiston muodostaminen",
                "fileName": "Tiedoston nimi"
            },
            "import": {
                "title": "Lähtöaineiston ominaisuudet"
            }
        },
        "infoPopup": {
            "description": "Kuvaus",
            "table": {
                "title": "Koordinaattitietojen lähde - taulukko",
                "paragraphs": [
                    "Syötä lähtötiedot Muunnettavat koordinaatit -taulukkoon."
                ]
            },
            "map": {
                "title": "Koordinaattitietojen lähde - kartta",
                "paragraphs": [
                    "Voit valita muunnettavia koordinaatteja kartalta klikkaamalla.",
                    "Kartta on ETRS-TM35FIN-koordinaattijärjestelmässä. Tämä koordinaattijärjestelmä valitaan automaattisesti eikä sitä voi muutta.",
                    "Valinnoissa on syytä huomioida, että kartalta sijaintien valinta ei ole tarkkaa ja valitut koordinaatit pyöristetään kokonaisluvuiksi."
                ]
            },
            "file": {
                "title": "Koordinaattitietojen lähde - tiedosto",
                "paragraphs": [
                    "Valitse lähtöaineiston sisältävä tiedosto ja sen asetukset."
                ]
            },
            "epsgSearch": {
                "title": "Haku EPSG-koodin perusteella",
                "info": "Voit hakea geodeettisen koordinaattijärjestelmän EPSG-koodin avulla. Syötä koodi pelkkänä numerona esim. 3067.",
                "listItems": []
            },
            "geodeticDatum": {
                "title": "Geodeettinen datumi",
                "info": "Datumi, joka kuvaa kaksi- tai kolmiulotteisen koordinaatiston suhdetta Maahan.",
                "listItems" : [
                    "Datumi: parametri tai parametrijoukko, joka määrittelee koordinaatiston origon, mittakaavan ja orientaation.",
                    "Esimerkkejä geodeettisesta datumista ovat mm. EUREF-FIN ja kartastokoordinaattijärjestelmä."
                ]
            },
            "coordinateSystem":{
                "title": "Koordinaatisto",
                "info": "Matemaattisten sääntöjen joukko, jolla määritellään se, miten pisteille annetaan koordinaatit.",
                "listItems" : [
                    "Erityyppisiä koordinaatistoja ovat esimerkiksi suorakulmainen koordinaatisto, tasokoordinaatisto, napakoordinaatisto, geodeettinen koordinaatisto, pallokoordinaatisto ja lieriökoordinaatisto."
                ]
            },
            "mapProjection":{
                "title": "Karttaprojektiojärjestelmä",
                "info": "Joukko sääntöjä, joiden avulla määrätään, kuinka haluttu alue kuvataan joukolla karttaprojektioita",
                "listItems" : [
                    "Karttaprojektio: menetelmä, jolla maapallon kolmiulotteinen pinta kuvataan kaksiulotteiselle karttatasolle.",
                    "Säännöillä voidaan esimerkiksi sitoa käytettävät karttaprojektiot ja projektiokaistat. Projektiokaistojen osalta järjestelmä voi määrittää kaistoille esimerkiksi tunnisteet, keskimeridiaanien tai -paralleelien mittakaavan, leveyden, pituuden ja päällekkäisyyden."
                ]
            },
            "geodeticCoordinateSystem":{
                "title": "Geodeettinen koordinaattijärjestelmä",
                "info": "Koordinaattijärjestelmä, joka perustuu geodeettiseen datumiin.",
                "listItems" : [
                    "Koordinaattijärjestelmä: järjestelmä, joka muodostuu datumin avulla reaalimaailmaan kiinnitetystä koordinaatistosta.",
                    "Suomen valtakunnallinen tasokoordinaattijärjestelmä on ETRS-TM35FIN."
                ]
            },
            "heightSystem":{
                "title":"Korkeusjärjestelmä",
                "info": "Yksiulotteinen koordinaattijärjestelmä, joka perustuu korkeusdatumiin.",
                "listItems" : [
                    "Korkeusdatumi: datumi, joka määrittelee painovoimaan liittyvien korkeuksien tai syvyyksien suhteen Maahan.",
                    "Suomessa käytetään valtakunnallisissa töissä JHS 163-suosituksen mukaista N2000-korkeusjärjestelmää."
                ]
            },
            "fileName":{
                "title":"Tiedoston nimi",
                "info": "",
                "paragraphs" : [],
                "listItems" : []
            },
            "decimalPrecision":{
                "title":"Desimaalien tarkkuus",
                "info": "Tulokseen tulevien desimaalien määrä",
                "paragraphs": [
                    "Ominaisuuden avulla kerrotaan ohjelmalle millä tarkkuudella koordinaatit halutaan tulokseen. Oletusarvona on 1mm tarkkuutta vastaava desimaalimäärä." // Asteen esitysmuodoille oletusarvo on metristä järjestelmää vastaava lähin desimaalimäärä 1mm tarkkuuteen."
                ],
                "listItems": [],
                "precisionTable": {
                    "title": "Kulman muodon/yksikön desimaalien määrä metrisenä tarkkuutena",
                    "unit": "Kulman muoto/yksikkö",
                    "deg": "Aste, gooni ja DD",
                    "rad": "Radiaanit",
                    "min": "DDMM ja DD MM",
                    "sec": "DDMMSS ja DD MM SS"
                }
            },
            "coordinateSeparator":{
                "title":"Sarake-erotin",
                "info": "Sarakkeiden erottamiseen käytetty merkki",
                "paragraphs": [
                    "Määrittää millä erotinmerkillä sarakkeet on eroteltu tiedostossa toisistaan.",
                    "Jos koordinaatteja edeltää jokin tunniste tai seuraa jokin merkkijono, tulee nämäkin olla erotettuna samalla erottimella."
                ],
                "listItems" : []
            },
            "headerLineCount":{
                "title":"Otsakerivien määrä",
                "info": "Montako riviä tiedoston alussa on ennen ensimmäistä koordinaattiriviä",
                "paragraphs": [
                    "Ominaisuuden avulla pystyy ohjelmalle kertomaan kuinka monta riviä tiedoston alusta ohitetaan ennen ensimmäisen koordinaattirivin lukemista.",
                    "Ohittamisen syynä voi olla, että tiedoston alussa on esimerkiksi sanallinen kuvaus tiedoston sisällöstä."
                ],
                "listItems" : []
            },
            "unitFormat":{
                "title":"Kulman muoto/yksikkö",
                "info": "Geodeettisten koordinaattien yksikkö",
                "paragraphs": [
                    "Ominaisuuden avulla kerrotaan ohjelmalle missä muodossa kulma-arvot ovat. Tuettuja kulmayksikköjä ovat: Aste, Gooni (graadi) ja Radiaani.",
                    "Lisäksi asteesta johdetut sexagesimaalimuodot ovat tuettuja. Jos näissä muodoissa esimerkiksi asteet, kaariminuutit ja kaarisekunnit ovat erotettuina, hyväksyy ohjelma erottimena tabulaattorin, pilkun ja puolipisteen, mutta ei välilyöntiä."
                ],
                "listItems" : []
            },
            "decimalSeparator":{
                "title":"Desimaalierotin",
                "info": "Desimaaliosan erottamiseen käytetty merkki",
                "paragraphs": [
                    "Ominaisuuden avulla pystyy kertomaan mikä merkki toimii desimaalierotimena.",
                    "Desimaalierottimen tulee poiketa koordinaattiarvot erottavasta merkistä. Kun koordinaattiarvot erottaa esimerkiksi pilkku sekä joukko välilyöntejä, niin desimaalierottimen on oltava piste."
                ],
                "listItems" : []
            },
            "lineSeparator":{
                "title":"Rivin erotin",
                "info": "Tiedostossa rivinvaihtona käytetty merkki",
                "paragraphs": [
                    "Ominaisuuden avulla kerrotaan ohjelmalle mitä merkkiä/merkkijonoa käytetään erottamaan toisistaan rivit (pisteet)."
                ],
                "listItems" : []
            },
            "prefixId":{
                "title":"Koordinaattiarvoja edeltää pisteen tunniste",
                "info": "Koordinaattirivi alkaa tunnistetiedolla",
                "paragraphs": [
                    "Ominaisuuden avulla pystyy ohjelmalle kertomaan, että jokaisen pisteen koordinaattiarvoja edeltää samalla rivillä pisteen tunniste (ID).",
                    "Pisteen tunnisteen tulee olla erotettuna koordinaattiarvoista samalla merkkijonolla kuin koordinaattiarvot ovat erotettuina toisistaan.",
                    "Jos tuodussa tiedostossa ei ole pisteiden tunnisteita tai pisteet on tuotu taulukosta tai kartalta, niin tulostiedoston pisteiden tunnisteiksi luodaan yhdellä kasvava kokonaisluku alkaen arvosta 1.",
                    "Tunnisteen ei tarvitse olla numeerinen."
                ],
                "listItems" : []
            },
            "axisFlip":{
                "title":"Koordinaatit käänteisesti",
                "info": "X- ja Y-koordinaattiakselien järjestys poikkeaa määritetystä järjestyksestä",
                "paragraphs": [
                    "Ominaisuuden avulla pystyy määrittämään ovatko tiedoston pisteiden kaksi ensimmäistä koordinaattiarvoa käänteisessä järjestyksessä suhteessa koordinaatiston kuvailussa annettuun järjestykseen.",
                    "Esimerkiksi kkj:n koordinaatit ovat lähtökohtaisesti järjestyksessä, jossa ensimmäisenä on x-koordinaatti ja sitä seuraa y-koordinaatti. x-akseli osoittaa pohjoiseen ja y-akseli itään. Kun valitsee käänteisen järjestyksen, tulee tiedostossa y-koordinaatin edeltää x-koordinaattia."
                ],
                "listItems" : []
            },
            "writeHeader":{
                "title":"Lisää otsakerivit",
                "info": "Tuloksen alkuun otsakerivit mukaan",
                "paragraphs": [
                    "Ominaisuuden avulla käyttäjä voi kertoa haluaako tulostiedostoon metatietoa koordinaateista otsakeriville.",
                    "Tiedostosta tiedostoon muunnoksessa alkuperäisen tiedoston mahdolliset otsakerivit tulevat myös mukaan"
                ],
                "listItems" : []
            },
            "writeLineEndings":{
                "title":"Rivin loput tulokseen",
                "info": "Lähtötiedoston rivin loput lisätään tulostiedostoon",
                "paragraphs": [
                    "Ominaisuuden avulla pystyy kertomaan haluaako tulokseen kirjoitettavan myös jokaisella rivillä annetun pisteen koordinaatteja seuraavan merkkijonon.",
                    "Ominaisuus vaikuttaa vain tiedostosta tiedostoon muunnoksessa, jolloin tuodun tiedoston rivin loput lisätään myös tulostiedostoon."
                ],
                "listItems" : []
            },
            "writeCardinals":{
                "title":"Kardinaalien käyttö",
                "info": "Koordinaattiarvojen perään lisätään ilmansuunnat (N, E, W tai S)",
                "paragraphs": [
                    "Ominaisuudella määritetään kirjoitetaanko tulosteeseen koordinaattiarvojen perään niiden ilmansuunnat.",
                    "Ilmansuunnat annetaan kirjoittamalla joko N, E, W tai S koordinaattiarvon perään.",
                    "Miinusmerkkisille arvoille lisätään vastailmansuunta, jolloin miinusmerkit poistetaan koordinaattiarvoista.",
                    "Esimerkiksi itäkoordinaatin 325418 arvoksi tulee 325418E ja itäkoordinaatin -325418 arvoksi tulee 325418W."
                ],
                "listItems" : []
            }
        }
    }
});
