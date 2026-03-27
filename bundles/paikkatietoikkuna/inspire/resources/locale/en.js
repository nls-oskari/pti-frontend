const flyoutTextContent = `
<p>
<a target="_blank" href="https://www.maanmittauslaitos.fi/en/e-services/geodata-portal-paikkatietoikkuna">Paikkatietoikkuna</a> presents map layers produced by Finnish data providers. In the geoportal spatial data professionals and everyone who is interested in maps and spatial data can look at several superimposed map layers, embed a map on your own website and make statistical thematic maps.
</p>
<p>
Data providers offer map layers to be attached to Paikkatietoikkuna. National Land Survey makes a contract with the data providers before the map layer is being added to Paikkatietoikkuna. The map layers of Paikkatietoikkuna are based on service interfaces published by the data providers, which means that they are as up-to-date as in the services of the data providers. Data producers are responsible for their data.
</p>
<p>
Paikkatietoikkuna is part of the implementation of the <a href="https://knowledge-base.inspire.ec.europa.eu/index_en" target="_blank">INSPIRE Directive</a> in Finland. The goal of the Directive is to make geospatial data easily accessable and usable.
 </p>
`;

Oskari.registerLocalization({
    'lang': 'en',
    'key': 'inspire',
    'value': {
        'tile': {
            'title': 'Service information'
        },
        'flyout': {
            'title': 'Service information'
        },
        'flyoutContent': {
            'content': flyoutTextContent
        }
    }
});
