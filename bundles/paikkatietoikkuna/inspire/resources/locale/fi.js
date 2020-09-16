const flyoutTextContent = `
<a target="_blank" href="https://www.maanmittauslaitos.fi/asioi-verkossa/paikkatietoikkuna">Paikkatietoikkuna</a> on keskeinen osa Suomen INSPIRE-toimeenpanoa. Se on 
Suomea koskevia paikkatietoaineistoja ja -palveluita esittelevä paikkatietoportaali.<br><br>

INSPIREn tavoitteena on luoda 
eurooppalainen paikkatietoinfrastruktuuri, joka helpottaa paikkatietojen saatavuutta kaikkialla Euroopassa ja edistää niiden 
yhteentoimivuutta. Lue lisää sivulta 
<a target="_blank" href="https://www.maanmittauslaitos.fi/kartat-ja-paikkatieto/paikkatietojen-yhteentoimivuus/inspire/mika-inspire">Mikä INSPIRE?</a><br>

<br>Seuraa INSPIRE-somekanavia, niin saat nopeasti tietoa ajankohtaisista koulutuksista ja tapahtumista sekä Paikkatietoikkunaan liittyvistä asioista: 
Paikkatietoikkunan <a target="_blank" href="https://twitter.com/geoportal_fi">Twitter</a> 
ja <a target="_blank" href="https://fi-fi.facebook.com/paikkatietoikkuna/">Facebook</a>
`;

Oskari.registerLocalization({
    'lang': 'fi',
    'key': 'inspire',
    'value': {
        'tile': {
            'title': 'INSPIRE'
        },
        'flyout': {
            'title': 'INSPIRE tuo paikkatiedot kaikkien saataville'
        },
        'flyoutContent': {
            'content': flyoutTextContent
        }
    }
});
