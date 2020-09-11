const flyoutTextContent = `
Finnish National Geoportal, <a target="_blank" href="https://www.maanmittauslaitos.fi/en/e-services/geodata-portal-paikkatietoikkuna">Paikkatietoikkuna</a>, is in the heart of the Finnish
INSPIRE-implementation. It is a geoportal introducing Finnish spatial data and services.<br><br>

The objective of INSPIRE is to create a European spatial data infrastructure, which will facilitate the accessibility of spatial data
everywhere in Europe while promoting their interoperability. Read more: <a href="https://inspire.ec.europa.eu/" target="_blank">What is INSPIRE?</a><br><br>

Follow our INSPIRE social media channels (in Finnish) to get information on workshops and events as well as things related to Paikkatietoikkuna 
geoportal:<br>
Paikkatietoikkuna <a target="_blank" href="https://twitter.com/geoportal_fi">Twitter</a><br>
Paikkatietoikkuna <a target="_blank" href="https://fi-fi.facebook.com/paikkatietoikkuna/">Facebook</a><br><br>

Subscribe to the newsletter of Paikkatietoverkosto, “Spatial data network” (in Finnish only), to get up-to-date information on what is happening 
in the field of geoinformatics. By subscribing, you join the Spatial data network and get to discuss and share your view on issues related to 
INSPIRE-implementation and national spatial data infrastructure. The network is an open forum for everybody interested in spatial data and 
geoinformatics. We already have 400 members! Earlier newsletters can be found here: Networks in the field of GIS and spatial data.
`;

Oskari.registerLocalization({
    'lang': 'en',
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
