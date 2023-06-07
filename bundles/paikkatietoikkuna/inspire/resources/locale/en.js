const flyoutTextContent = `
<p>
Finnish National Geoportal <a target="_blank" href="https://www.maanmittauslaitos.fi/en/e-services/geodata-portal-paikkatietoikkuna">Paikkatietoikkuna</a> presents map layers produced by Finnish data providers.
 Data providers offer map layers to be attached to Paikkatietoikkuna.
  National Land Survey makes a contract with the data providers before the map layer is being added to Paikkatietoikkuna.
</p>
<p>
The map layers of Paikkatietoikkuna are based on service interfaces published by the data providers, which means that they are as up-to-date as in the services of the data providers.
</p>
<p>
Paikkatietoikkuna is part of the implementation of the INSPIRE Directive in Finland.
 The goal of the Directive is to make geospatial data easily accessable and usable.
 More about <a href="https://inspire.ec.europa.eu/" target="_blank">INSPIRE</a>.
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
