const flyoutTextContent = `
Finnish National Geoportal, <a target="_blank" href="https://www.maanmittauslaitos.fi/en/e-services/geodata-portal-paikkatietoikkuna">Paikkatietoikkuna</a>, is in the heart of the Finnish
INSPIRE-implementation. It is a geoportal introducing Finnish spatial data and services.<br><br>

The objective of INSPIRE is to create a European spatial data infrastructure, which will facilitate the accessibility of spatial data
everywhere in Europe while promoting their interoperability. Read more: <a href="https://inspire.ec.europa.eu/" target="_blank">What is INSPIRE?</a><br><br>

Follow our INSPIRE social media channels (in Finnish) to get information on workshops and events as well as things related to Paikkatietoikkuna 
geoportal:Paikkatietoikkuna <a target="_blank" href="https://twitter.com/geoportal_fi">Twitter</a><br> and <a target="_blank" href="https://fi-fi.facebook.com/paikkatietoikkuna/">Facebook</a><br><br>
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
