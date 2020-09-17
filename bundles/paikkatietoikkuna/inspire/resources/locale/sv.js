const flyoutTextContent = `
<a target="_blank" href="https://www.maanmittauslaitos.fi/sv/e-tjanster/geodataportalen-paikkatietoikkuna">Paikkatietoikkuna</a> är en central del av Finlands implementering av INSPIRE. Bekanta dig 
med geodataportaltjänsten som presenterar geografiska datamängder och tjänster som omfattar Finland.<br><br>

INSPIRE har som mål att skapa en europeisk geodatainfrastruktur som underlättar tillgången på geografisk information över hela Europa och 
främjar dess interoperabilitet. Läs mer på <a target="_blank" href="https://www.maanmittauslaitos.fi/kartat-ja-paikkatieto/paikkatietojen-yhteentoimivuus/inspire/mika-inspire">Vad är INSPIRE?</a><br><br>

Följ INSPIRE:s sociala mediekanaler så får du snabbt information om aktuella 
utbildningar och evenemang samt frågor som berör Karttjänsten: <a target="_blank" href="https://twitter.com/geoportal_fi"> Twitter</a>  och
<a target="_blank" href="https://fi-fi.facebook.com/paikkatietoikkuna/"> Facebook</a>
`;

Oskari.registerLocalization({
    'lang': 'sv',
    'key': 'inspire',
    'value': {
        'tile': {
            'title': 'INSPIRE'
        },
        'flyout': {
            'title': 'INSPIRE gör geodata tillgängliga för alla'
        },
        'flyoutContent': {
            'content': flyoutTextContent
        }
    }
});
