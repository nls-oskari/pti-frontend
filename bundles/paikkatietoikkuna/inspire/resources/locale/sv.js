const flyoutTextContent = `
<p>
<a target="_blank" href="https://www.maanmittauslaitos.fi/sv/e-tjanster/geodataportalen-paikkatietoikkuna">Paikkatietoikkuna</a> presenterar kartlager producerade av finländska dataproducenter.
 Dataproducenterna erbjuder dem att bifogas i Paikkatietoikkuna.
  Lantmäteriverket gör kontrakt med dataproducenten innan kartlagren läggs till i Paikkatietoikkuna.
</p>

<p>
Kartlagren i Paikkatietoikkuna baserar sig på gränssnittstjänster publicerade av dataproducenterna,
 vilket gör att de är lika uppdaterade som i dataproducentens egna tjänster.
  Kartlagrens innehåll och uppdatering är på dataproducentens ansvar.
</p>

<p>
Paikkatietoikkuna är en del av implementeringen av INSPIRE-direktivet i Finland.
 Direktivets målsättning är att geodata är lätt tillgängliga och användbara.
  Läs mer på sidan <a target="_blank" href="https://www.maanmittauslaitos.fi/sv/kartor-och-geodata/interoperabla-geodata/inspire/vilket-inspire">Vilket INSPIRE?</a>
</p>

<p>
Följ Paikkatietoikkunas på <a target="_blank" href="https://twitter.com/geoportal_fi"> Twitter</a> och
<a target="_blank" href="https://fi-fi.facebook.com/paikkatietoikkuna/">Facebook</a>,
 så får du snabbt information om Paikkatietoikkuna och INSPIRE, utbildningar och evenemang.
</p>
`;

Oskari.registerLocalization({
    'lang': 'sv',
    'key': 'inspire',
    'value': {
        'tile': {
            'title': 'Information om tjänsten'
        },
        'flyout': {
            'title': 'Information om tjänsten'
        },
        'flyoutContent': {
            'content': flyoutTextContent
        }
    }
});
