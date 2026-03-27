const flyoutTextContent = `
<p>
    <a target="_blank" href="https://www.maanmittauslaitos.fi/asioi-verkossa/paikkatietoikkuna">Paikkatietoikkuna</a> on näyteikkuna suomalaisten organisaatioiden julkaisemiin karttatasoihin. Palvelussa paikkatietoalan ammattilaiset sekä kaikki kartoista ja paikkatiedoista kiinnostuneet voivat muun muassa katsella eri karttatasoja päällekkäin, julkaista kartan omalla verkkosivullasi ja luoda tilastoteemakarttoja.
</p>
<p>
Organisaatiot tarjoavat karttatasojaan Paikkatietoikkunaan julkaisemiensa rajapintapalvelujen kautta. Ennen tasojen liittämistä palveluun organisaatio laatii tiedontuottajasopimuksen Maanmittauslaitoksen kanssa. Karttatasojen sisältö ja ajantasaisuus ovat tiedontuottajan vastuulla.
</p>
<p>
Paikkatietoikkuna on osa <a target="_blank" href="https://www.maanmittauslaitos.fi/kartat-ja-paikkatieto/paikkatietojen-yhteentoimivuus/inspire">INSPIRE-direktiivin toimeenpanoa</a> Suomessa.
Direktiivi tähtää siihen, että eurooppalaiset paikkatiedot olisivat helposti saatavilla ja hyödynnettävissä.</p>
<p>
Tilaa <a target="_blank" href="https://www.maanmittauslaitos.fi/tietoa-maanmittauslaitoksesta/uutishuone/uutiskirjeet">Maanmittauslaitoksen uutiskirje</a> sähköpostiisi, jos haluat seurata ajankohtaisia Maanmittauslaitoksen ja Paikkatietoikkunan ajankohtaisia kuulumisia.
</p>
`;

Oskari.registerLocalization({
    'lang': 'fi',
    'key': 'inspire',
    'value': {
        'tile': {
            'title': 'Tietoa palvelusta'
        },
        'flyout': {
            'title': 'Tietoa palvelusta'
        },
        'flyoutContent': {
            'content': flyoutTextContent
        }
    }
});
