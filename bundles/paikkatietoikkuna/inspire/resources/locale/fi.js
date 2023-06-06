const flyoutTextContent = `
<p>
    <a target="_blank" href="https://www.maanmittauslaitos.fi/asioi-verkossa/paikkatietoikkuna">Paikkatietoikkuna</a> on näyteikkuna suomalaisten organisaatioiden julkaisemiin karttatasoihin.
    Organisaatiot tarjoavat niitä liitettäviksi Paikkatietoikkunaan. Maanmittauslaitos tekee tiedontuottajaorganisaatioiden kanssa sopimukset ennen kuin lisää karttatasot Paikkatietoikkunaan.
</p>
<p>
Paikkatietoikkunan karttatasot pohjautuvat tiedontuottajien julkaisemiin rajapintapalveluihin, joten ne ovat yhtä ajantasaisia kuin tiedontuottajien omissa palveluissa.
Karttatasojen sisältö ja ajantasaisuus ovat tiedontuottajien vastuulla.
</p>
<p>
Paikkatietoikkuna on osa INSPIRE-direktiivin toimeenpanoa Suomessa. Direktiivi tähtää siihen, että eurooppalaiset paikkatiedot olisivat helposti saatavilla ja hyödynnettävissä.
Lue lisää sivulta <a target="_blank" href="https://www.maanmittauslaitos.fi/kartat-ja-paikkatieto/paikkatietojen-yhteentoimivuus/inspire/mika-inspire">Mikä INSPIRE?</a></p>
<p>
Seuraa Paikkatietoikkunan somekanavia
 <a target="_blank" href="https://twitter.com/geoportal_fi">Twitter</a> ja
 <a target="_blank" href="https://fi-fi.facebook.com/paikkatietoikkuna/">Facebook</a>,
 niin saat nopeasti tietoa Paikkatietoikkunaan ja INSPIREen liittyvistä asioista, ajankohtaisista koulutuksista ja tapahtumista. 
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
