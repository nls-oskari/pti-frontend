/**
 * Paikkatietoikkunan vanhojen ilmakuvien esittämiseen GFI-vastauksen muotoiluun tehty koodi.
 * Tason GFI-vastauksen oletetaan olevan Stringinä annettua GeoJSON:ia, josta haetaan
 * kaikista kohteista se, jolla on viimeisin vuosi.
 * 
 * - muotoilun käyttöönotto tasolle: layer.attributes.PTI_GFI_formatter = "latestPhotoYear"
 * - muotoilussa haettavan ominaisuustiedon nimi: layer.attributes.PTI_GFI_property = "[ominaisuustietokentän nimi]", määrittelemättömänä "kuvausvuosi"
 * - käyttäjälle näytettävä teksti: layer.attributes.PTI_GFI_label (voi olla string tai locale object, määrittelemättömänä "Vuosi")
 * 
 * Esim attributes kenttään: 
 * {
    "PTI_GFI_formatter": "latestPhotoYear",
    "PTI_GFI_property": "kuvausvuosi",
    "PTI_GFI_label": {
        "fi": "Vuosi",
        "en": "Year"
    }
   }
 * 
 * Käyttöönotto esim. applications alla index.js:ssä:
 * 
 *     import { PTIOrtophotoTimeseriesGFIformatter } from '../../util/PTIOrtophotoTimeseriesGFIformatter';
 *
 * Oskari.app.startApplication() callbackissä:
 * 
 *     sandbox.findRegisteredModuleInstance('MainMapModuleGetInfoPlugin').addLayerFormatter(new PTIOrtophotoTimeseriesGFIformatter());
 */
export class PTIOrtophotoTimeseriesGFIformatter {
    enabled (data = {}) {
        const layerAttributes = this.getLayerAttributes(data.layerId);
        return layerAttributes.PTI_GFI_formatter === "latestPhotoYear";
    }

    format (data = {}) {
        const layerAttributes = this.getLayerAttributes(data.layerId);
        try {
            const geojson = JSON.parse(data.content);
            const photoYearAttr = layerAttributes.PTI_GFI_property || 'kuvausvuosi';
            const label = Oskari.getLocalized(layerAttributes.PTI_GFI_label || 'Vuosi');
            const years = geojson.features.map(feature => parseInt(feature.properties[photoYearAttr], 10));
            const year = years.length ? Math.max(...years) : '-';
            return `<b>${label}:</b> ${year}`;
        } catch (err) {
            Oskari.log('PTIOrtophotoTimeseriesGFIformatter').warn(`Couldn't format GFI data`, data);
        }
    }

    getLayerAttributes (id) {
        const layer = Oskari.getSandbox().getService('Oskari.mapframework.service.MapLayerService').findMapLayer(id);
        if (!layer) {
            return {};
        }
        return layer.getAttributes() || {};
    }
};
