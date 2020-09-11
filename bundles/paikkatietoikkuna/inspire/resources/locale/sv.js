const flyoutTextContent = `
<a target="_blank" href="https://www.maanmittauslaitos.fi/sv/e-tjanster/geodataportalen-paikkatietoikkuna">Paikkatietoikkuna</a> är en central del av Finlands implementering av INSPIRE. Bekanta dig 
med geodataportaltjänsten som presenterar geografiska datamängder och tjänster som omfattar Finland.<br><br>

INSPIRE har som mål att skapa en europeisk geodatainfrastruktur som underlättar tillgången på geografisk information över hela Europa och 
främjar dess interoperabilitet. Läs mer på Vad är INSPIRE?<br><br>

Följ INSPIRE:s sociala mediekanaler så får du snabbt information om aktuella 
utbildningar och evenemang samt frågor som berör Karttjänsten: <a target="_blank" href="https://twitter.com/geoportal_fi"> Twitter</a>
<a target="_blank" href="https://fi-fi.facebook.com/paikkatietoikkuna/"> och Facebook</a><br><br>

Abonnera på <a target="_blank" href="https://maanmittauslaitos.mailpv.net/">Geodatanätverkets nyhetsbrev</a> (på finska), där du i koncentrerad form får 
information om aktuella frågor i geodatabranschen. Du ansluter dig samtidigt till Geodatanätverket där du är med och påverkar och diskuterar 
frågor i anslutning till den nationella geodatainfrastrukturen och genomförandet av INSPIRE.  Nätverket är ett öppet forum för alla som är 
intresserade av geodatafrågor. Vi har redan över 400 medlemmar! Tidigare publicerade nyhetsbrev hittar du på Geodatabranschens nätverk.
`;

Oskari.registerLocalization({
    'lang': 'sv',
    'key': 'inspire',
    'value': {
        'tile': {
            'title': 'INSPIRE'
        },
        'flyout': {
            'title': 'INSPIRE'
        },
        'flyoutContent': {
            'content': flyoutTextContent
        }
    }
});
