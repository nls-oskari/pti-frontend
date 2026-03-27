const flyoutTextContent = `
<p>
<a target="_blank" href="https://www.maanmittauslaitos.fi/sv/e-tjanster/geodataportalen-paikkatietoikkuna">Paikkatietoikkuna</a> presenterar kartlager producerade av finländska dataproducenter. I karttjänsten kan geodataexperter och alla som är intresserade av kartor och geodata bland annat titta på kartlager på varandra, publicera en karta på din egen webbplats och skapa statistiska temakartor.
</p>

<p>
Dataproducenterna erbjuder dem att bifogas i Paikkatietoikkuna. Lantmäteriverket gör kontrakt med dataproducenten innan kartlagren läggs till i Paikkatietoikkuna. Kartlagrens innehåll och uppdatering är på dataproducentens ansvar.
</p>

<p>
Paikkatietoikkuna är en del av implementeringen av <a target="_blank" href="https://www.maanmittauslaitos.fi/sv/kartor-och-geodata/interoperabla-geodata/inspire">INSPIRE-direktivet i Finland</a>. Direktivets målsättning är att geodata är lätt tillgängliga och användbara..
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
