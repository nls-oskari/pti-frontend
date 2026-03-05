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
            "coordinateSystem": {
                "title": "Koordinaattijärjestelmän tiedot",
                "input": {
                    "title": "Lähtökoordinaattijärjestelmä"
                },
                "output": {
                    "title": "Tuloskoordinaattijärjestelmä"
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
                    "label": "Koordinaattijärjestelmä",
                    "choose": "Valitse",
                    "kkj": "KKJ kaista {zone, number}",
                    "ykj": "KKJ kaista 3 / YKJ"
                },
                "heightSystem":{
                    "label": "Korkeusjärjestelmä",
                    "none": "Ei mitään",
                    "n43": {
                        "info": "Huomaa, että N43 kolmioverkko ei kata koko Pohjois-Suomea, eikä muunnosta siksi voida välttämättä tehdä.",
                        "label": "Katso lisätietoja N60-N43 muunnospisteistön kolmioverkon kattavuudesta:",
                        "link": "JHS163 Suomen korkeusjärjestelmä N2000 Liite 2 (kuva 3)",
                        "url": "https://geoforum.fi/jhs-163-suomen-korkeusjarjestelma-n2000/"
                    }
                }
            },
            "coordinateAxes": {
                'N': 'Pohjoiskoordinaatti [m]',
                'E': 'Itäkoordinaatti [m]',
                'φ': 'Leveysaste',
                'λ': 'Pituusaste',
                'X': 'Geosentrinen X [m]',
                'Y': 'Geosentrinen Y [m]',
                'Z': 'Geosentrinen Z [m]',
                'H': 'Korkeus [m]',
                'h': 'Ellipsoidinen korkeus [m]'
            },
            "coordinateTable": {
                "input": "Lähtökoordinaatit",
                "output": "Tuloskoordinaatit",
                "rows": "Riviä",
                "outdated": "Valinnat tai koordinaatit ovat muuttuneet. Muunna koordinaatit, jotta tulokset päivittyvät.",
                "clearTables": "Poista kaikki koordinaatit",
                "confirmClear": "Haluatko poistaa taulukoista kaikki koordinaatit?"
            }
        },
        "transform": {
            "warnings": {
                "title": "Huomio!",
                "message": "Huomioi seuraavat rajoitukset valinnoissa tai koordinaateissa ennen kuin teet muunnoksen.",
                "3DTo2D": "Valitsemissasi lähtötiedoissa on mukana korkeusarvoja, mutta tulostiedoissa ei. Tuloskoordinaatteihin ei siis tule korkeusarvoja mukaan.",
                "coordinates": "Muunnettavissa koordinaateissa on virheellisiä rivejä. Virheelliset rivit poistetaan ennen muunnosta.",
                "bbox": "Muunnettavia koordinaatteja on lähtökoordinaattijärjestelmän kattavuusalueen ulkopuolella. Koordinaattien arvot tulee olla lähdejärjestelmän määrittelemässä järjestyksessä.",
                "largeFile": "Isojen tiedostojen muuntaminen voi kestää useita minuutteja."
            },
            "validate": {
                "title": "Virhe!",
                "message": "Valinnoissa on puutteita tai virheitä. Ota huomioon seuraavat vaatimukset ja yritä uudelleen.",
                "2DTo3D": "Lähtökoordinaattijärjestelmän valinnoissa ei ole korkeusjärjestelmää. Muunnos 3D-järjestelmään ei ole mahdollinen.",
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
                "noDelimiter": "Koordinaattierotin pitää olla valittuna.",
                "noDecimalSeparator":"Desimaalierotin pitää olla valittuna."
            },
            "errors": {
                "transform": "Virhe muunnoksessa!",
                "import": "Virhe tiedoston lukemisessa!", // Tiedostosta ei onnistuttu lukemaan kaikkia rivejä.
                "paste": "Koordinaattien tuominen leikepöydältä epäonnistui.",
                "export": "Koordinaattien kirjoittaminen tiedostoon epäonnistui.",
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
            }
        },
        "dataSource": {
            "title": "Koordinaattitietojen lähde",
            "select": "Valitse koordinaattitietojen lähde",
            "change": "Vaihda lähde",
            "confirmChange": "Muunnettavat koordinaatit tyhjennetään. Haluatko jatkaa?",
            "file": {
                "label": "Tiedosto",
                "button": "Tuo tiedostosta",
                "info":  "Valitse lähtöaineiston sisältävä tiedosto ja sen asetukset.",
                "action": "muokkaa valintoja"
            },
            "table": {
                "label": "Taulukko",
                "info": "Syötä lähtötiedot Muunnettavat koordinaatit -taulukkoon."
            },
            "map": {
                "label": "Osoita pisteet kartalta",
                "button": "Osoita pisteet kartalta",
                "info": "Voit valita muunnettavia koordinaatteja kartalta klikkaamalla.",
                "confirmSelect": "Lähtökoordinaattijärjestelmän tiedot valitaan automaattisesti kartan käyttämän ETRS-TM35FIN-koordinaattijärjestelmän mukaisiksi. Tekemäsi lähtökoordinaattijärjestelmän valinnat korvataan. Haluatko jatkaa?",
                "action": "valitse lisää"
            },
            "clipboard": {
                "title": "Tuo leikepöydältä",
                "button": "Tuo leikepöydältä",
                "info":  "Voit tuoda koordinaatteja leikepöydältä (csv, excel)",
                "placeholder": "Liitä koordinaatit tähän leikepöydältä esimerkiksi CTRL+V-painikkeella. Kirjoita yhden pisteen koordinaatit yhdelle riville. Erota koordinaatit toisistaan puolipisteellä tai tabulaattorilla.  Tiedot voivat olla esimerkiksi tässä muodossa:\n383699,477;6676232,276;13,4"
            }
        },
        "mapMarkers":{
            "show":{
                "title": "Näytä sijainnit kartalla",
                "info": "Kartta on ETRS-TM35FIN-koordinaattijärjestelmässä. Koordinaatit on sijoitettu kartalle kyseistä koordinaattijärjestelmää käyttäen. Sijaintimerkinnän yhteydessä näytään lähtö- ja/tai tuloskoordinaattijärjestelmän mukaiset koordinaatit lukemina. ",
                "errorTitle": "Virhe sijaintien näyttämisessä",
                "noCoordinates": "Ei koordinaatteja näytettäväksi kartalla",
                "noSrs": "Geodeettinen koordinaattijärjestelmä pitää olla valittuna lähtötiedoissa, jotta pisteet voidaan näyttää kartalla."
            },
            "select":{
                "title": "Osoita pisteet kartalta",
                "info": "Klikkaa kartalla yhtä tai useampaa pistettä. Klikkaamiesi pisteiden koordinaatit näkyvät taulukossa Koordinaattimuunnoksen pääsivulla. Koordinaatit ovat ETRS-TM35FIN-koordinaattijärjestelmän mukaisia ja pyöristetty kokonaisluvuiksi. Voit muuttaa pisteitä taulukkoon klikkaamalla uudestaan Valitse sijainnit kartalta. Valitse avautuvasta ikkunasta, haluatko lisätä vai poistaa pisteitä.",
                "add": "Lisää pisteitä",
                "remove": "Poista pisteitä"
            }
        },
        "actions": {
            "transform": "Tee muunnos",
            "export": "Tallenna tiedostoon",
            "minimizeSrs": "Piilota lisävalinnat",
            "minimizedSrs": "Näytä lisävalinnat",
            "axisFlip": "Vaihda koordinaattien järjestys",
            "search": "Hae nimellä tai EPSG-koodilla",
            "select": "Valitse",
            "cancel": "Peruuta",
            "done": "Valmis",
            "ok": "Ok",
            "close": "Sulje"
        },
        "confirm": {
            "title": "Koordinaattitietojen valinnat",
            "continue": "Haluatko jatkaa?",
            "reset": "Kaikki koordinaatit ja valinnat tyhjennetään. Haluatko jatkaa?",
            "coordinates": "Muunnettavat koordinaatit tyhjennetään. Haluatko jatkaa?",
            "results": "Tuloskoordinaatit tyhjennetään ja muunnos tehdään uusilla valinnoilla. Haluatko jatkaa?",
            "mapSrs": "Lähtökoordinaattijärjestelmän tiedot valitaan automaattisesti kartan käyttämän ETRS-TM35FIN-koordinaattijärjestelmän mukaisiksi. Tekemäsi lähtökoordinaattijärjestelmän valinnat korvataan ja koordinaatit tyhjennetään. Haluatko jatkaa?",
            "change": "Säilytä muut valinnat ja koordinaatit",
            "changeTooltip": "Huomioi, että valintojen ja koordinaattien säilyttäminen voi johtaa tilanteeseen, jossa tulokset eivät vastaa valintoja."
        },
        "fileSettings": {
            "import": "Tuo tiedostosta",
            "export": "Aineiston muodostaminen",
            "rows": "riviä",
            "columns": "saraketta",
            "previewTitle": "Koordinaattien esikatselu",
            "options": {
                "fileName": "Tiedoston nimi",
                "decimalSeparator": "Desimaalierotin",
                "delimiter": "Sarake-erotin",
                "headerLineCount": "Otsakerivien lukumäärä",
                "decimalCount": "Desimaalien tarkkuus",
                "axisFlip": "Koordinaatit käänteisesti",
                "writeCardinals": "Lisää kardinaalit (N,E,W,S)",
                "writeLineEndings": "Lisää lähtötiedoston rivien loput",
                "lineSeparator": "Rivierotin",
                "unit": "Kulman muoto ja yksikkö",
                "createHeader": "Lisää koordinaattijärjestelmä otsakerivi",
                "writeHeaders": "Lisää otsakerivit lähtötiedostosta", // (${count})??
                "prefixes": {
                    "input": "Koordinaatit sisältävät tunnisteet",
                    "generate": "Luo riveille tunnisteet",
                    "fromFile": "Lisää tunnisteet lähtötiedostosta"
                },
                "degrees": {
                    "degree": "Aste",
                    "gradian": "Gooni (graadi)",
                    "radian": "Radiaani"
                },
                "delimiters": {
                    "point": "Piste",
                    "comma": "Pilkku",
                    "tab": "Tabulaattori",
                    "space": "Välilyönti",
                    "semicolon": "Puolipiste",
                    "pipe": "Pystyviiva"
                }
            }
        },
        "infoPopup": {
            "description": "Kuvaus",
            "epsgSearch": {
                "title": "Haku EPSG-koodin perusteella",
                "info": "Voit hakea geodeettisen koordinaattijärjestelmän EPSG-koodin avulla. Syötä koodi pelkkänä numerona esim. 3067.",
                "listItems": []
            },
            "geodeticDatum": {
                "title": "Geodeettinen datumi",
                "info": "Valitse, määritelläänkö koordinaatit KKJ-, EUREF-FIN vai ETRS89-datumissa.",
                "listItems" : [
                    "Geodeettinen datumi on parametrijoukko, jonka avulla määritellään koordinaatiston origo, mittakaava ja orientaatio suhteessa Maan pintaan.",
                    "Paikkatietoikkunassa datumivaihtoehdot ovat KKJ, EUREF-FIN ja ETRS89."
                ]
            },
            "coordinateSystem":{
                "title": "Koordinaatisto",
                "info": "Valitse, ilmoitetaanko koordinaatit suorakulmaisessa vai maantieteellisessä koordinaatistossa ja kaksi- vai kolmiulotteisena (korkeus mukana).",
                "listItems" : [
                    "Koordinaatisto: matemaattisten sääntöjen joukko, jolla määritellään se, miten pisteille annetaan koordinaatit (Lähde: Geoinformatiikan sanasto)",
                    "Jos valitset koordinaatistoksi ”Suorakulmainen 2d (Taso)”, voit suodattaa vaihtoehtoja valitsemalla karttaprojektiojärjestelmän."
                ]
            },
            "mapProjection":{
                "title": "Karttaprojektiojärjestelmä",
                "info": "Valitse karttaprojektio, jonka avulla kolmiulotteinen kohde kuvataan kaksiulotteiselle karttatasolle.",
                "listItems" : [
                    "Karttaprojektio: Menetelmä, jolla maapallon kolmiulotteinen pinta kuvataan kaksiulotteiselle karttatasolle (Lähde: Geoinformatiikan sanasto).",
                    "Karttaprojektio on valittavissa vain koordinaatistolle, joka on suorakulmainen ja kaksiulotteinen (2D)."
                ]
            },
            "geodeticCoordinateSystem":{
                "title": "Koordinaattijärjestelmä",
                "info": "Valitse koordinaattijärjestelmä, jossa haluat esittää koordinaatit.",
                "listItems" : [
                    "Koordinaattijärjestelmä:  Geodeettiseen datumiin perustuva järjestelmä, joka muodostuu datumin avulla reaalimaailmaan kiinnitetystä koordinaatistosta (Lähde: Geoinformatiikan sanasto).",
                    "Valtakunnallinen tasokoordinaattijärjestelmä Suomessa on ETRS-TM35FIN. Se on myös käytössä Paikkatietoikkunassa.",
                    "WGS84-koordinaattijärjestelmää ei ole valittavissa Paikkatietoikkunassa. Voit valita sen sijaan EUREF-FIN-G80-koordinaattijärjestelmän. Poikkeama koordinaattien arvoissa on näiden järjestelmien välillä alle metri."
                ]
            },
            "heightSystem":{
                "title":"Korkeusjärjestelmä",
                "info": "Valitse, missä korkeusjärjestelmässä korkeuskoordinaatti esitetään.",
                "listItems" : [
                    "Korkeusjärjestelmä: Yksiulotteinen koordinaattijärjestelmä, joka perustuu korkeusdatumiin (Lähde: Geoinformatiikan sanasto).",
                    "Suomessa valtakunnallinen korkeusjärjestelmä on N2000. Paikkatietoikkunassa käytössä oleva N2000-järjestelmä perustuu vuonna 2024 päivitettyyn geoidimalliin.",
                    "N43-korkeusjärjestelmä ei kata koko Pohjois-Suomea."
                ]
            },
            "fileName":{
                "title":"Tiedoston nimi",
                "info": "",
                "paragraphs" : [],
                "listItems" : []
            },
            "decimalCount":{
                "title":"Desimaalien tarkkuus",
                "info": "Tulokseen tulevien desimaalien määrä",
                "paragraphs": [
                    "Ominaisuuden avulla kerrotaan ohjelmalle millä tarkkuudella koordinaatit halutaan tulokseen. Oletusarvona on 1mm tarkkuutta vastaava desimaalimäärä." // Asteen esitysmuodoille oletusarvo on metristä järjestelmää vastaava lähin desimaalimäärä 1mm tarkkuuteen."
                ],
                "listItems": [],
                "precisionTable": {
                    "title": "Kulman muodon/yksikön desimaalien määrä metrisenä tarkkuutena",
                    "unit": "Kulman muoto/yksikkö",
                    "degree": "Aste, gooni ja DD",
                    "radian": "Radiaanit",
                    "min": "DDMM ja DD MM",
                    "sec": "DDMMSS ja DD MM SS"
                }
            },
            "delimiter":{
                "title":"Sarake-erotin",
                "info": "Sarake-erotin erottaa eri sarakkeet, kuten saman pisteen eri koordinaatit, toisistaan tekstitiedostossa.",
                "paragraphs": [
                    "Tiedostossa voi olla myös muita sarakkeita kuin koordinaatit. Ne erotetaan samalla merkillä.",
                    "Sarake-erotin ei voi olla sama merkki kuin desimaalierotin.",
                ],
                "listItems" : []
            },
            "headerLineCount":{
                "title":"Otsakerivien lukumäärä",
                "info": "Otsakeriveiksi lasketaan ne rivit, joilla ei ole koordinaattitietoja, ja jotka ovat tiedostossa ennen koordinaattirivejä.",
                "paragraphs": [
                    "Otsakeriveillä voi olla esimerkiksi sanallinen kuvaus tiedoston sisällöstä."
                ],
                "listItems" : []
            },
            "unit":{
                "title":"Kulman muoto ja yksikkö",
                "info": "Kulman yksikkö ja muoto kertovat, miten koordinaattien kulma-arvot esitetään tiedostossa.",
                "paragraphs": [
                    "Kulman yksikkö voi olla aste, gooni tai radiaani.",
                    "Koordinaatit voidaan ilmoittaa myös asteina, sekunteina ja minuutteina."
                ],
                "listItems" : []
            },
            "decimalSeparator":{
                "title":"Desimaalierotin",
                "info": "Desimaaliluvussa desimaalierotin erottaa kokonaisluvun ja desimaaliosan toisistaan.",
                "paragraphs": [
                    "Desimaalierotin ei voi olla sama merkki kuin sarake-erotin.",
                    "Esimerkiksi desimaalierottimen on oltava piste, jos sarake-erottimena on käytetty pilkkua."
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
            "prefixColCount":{
                "title":"Koordinaattirivien alussa on tunniste.",
                "info": "Koordinaattirivi alkaa tunnistetiedolla",
                "paragraphs": [
                    "Yksi koordinaattirivi vastaa yhtä pistettä.",
                    "Tunniste erotetaan koordinaattiarvoista sarake-erottimella.",
                    "Voit myös itse määritellä tunnisteet. Tällöin ne voivat sisältää sekä kirjaimia että numeroita."
                ],
                "listItems" : []
            },
            "axisFlip":{
                "title":"Koordinaatit käänteisesti",
                "info": "X- ja Y-koordinaattiakselien järjestys poikkeaa määritetystä järjestyksestä",
                "paragraphs": [
                    "Ominaisuuden avulla pystyy määrittämään ovatko tiedoston pisteiden kaksi ensimmäistä koordinaattiarvoa käänteisessä järjestyksessä suhteessa koordinaatiston kuvailussa annettuun järjestykseen.",
                    "Esimerkiksi KKJ:n koordinaatit ovat lähtökohtaisesti järjestyksessä, jossa ensimmäisenä on x-koordinaatti ja sitä seuraa y-koordinaatti. x-akseli osoittaa pohjoiseen ja y-akseli itään. Kun valitsee käänteisen järjestyksen, tulee tiedostossa y-koordinaatin edeltää x-koordinaattia."
                ],
                "listItems" : []
            },
            "createHeader": {
                "title":"Luo otsakerivi",
                "info": "Lisättävä otsakerivi luodaan valitsemasi koordinaattijärjestelmän tiedoista",
                "paragrapsh": [
                    "Lisättävä otsakerivi luodaan valitsemasi koordinaattijärjestelmän tiedoista. Seuraavan esimerkin mukaisesti:"
                ]
            },
            "writeHeaders":{
                "title":"Lisää otsakerivit tulokseen",
                "info": "Lisää tulokseen otsakerivit tuodusta tiedostosta",
                "paragraphs": [
                    "Ominaisuuden avulla käyttäjä voi kertoa haluaako tulostiedostoon metatietoa koordinaateista otsakeriville.",
                    "Tiedostosta tiedostoon muunnoksessa alkuperäisen tiedoston mahdolliset otsakerivit tulevat myös mukaan"
                ],
                "listItems" : []
            },
            "writeLineEndings":{
                "title": "Rivin loput tulokseen",
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
