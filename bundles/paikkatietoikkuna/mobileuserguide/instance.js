import React from 'react';
import ReactDOM from 'react-dom';
import { Message } from 'oskari-ui';
import { Link } from './Link';
import styled from 'styled-components';

const LINKS = {
    fi: 'https://www.maanmittauslaitos.fi/asioi-verkossa/palveluiden-kayttoohjeet/paikkatietoikkuna/mobiili',
    sv: 'https://www.maanmittauslaitos.fi/sv/e-tjanster/bruksanvisningar-av-e-tjanster/paikkatietoikkuna/mobil',
    en: 'https://www.maanmittauslaitos.fi/en/e-services/instructions-use-our-services/paikkatietoikkuna/mobile'
};

const DesktopLink = styled('a')`
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
    color: white;
    display: block;
    &:focus {
        color: white;
    }
    &:visited {
        color: white;
    }
    &:hover {
        color: white;
    }
    div {
        text-decoration: underline;
    }
`;
/**
 * @class Oskari.mapframework.bundle.mobileuserguide.UserGuideBundleInstance
 *
 * Link to user guide for mobile users
 */
Oskari.clazz.define('Oskari.pti.mobileuserguide.UserGuideBundleInstance',
    function () {
    },
    {
        /**
         * @method getName
         * @return {String} the name for the component
         */
        getName: function () {
            return 'mobileuserguide';
        },

        _startImpl: function () {
            const nav = Oskari.dom.getNavigationEl();
            if (!nav) {
                return;
            }
            const linksContainer = nav.querySelector('.linksContainer');
            if (linksContainer) {
                const container = document.createElement('div');
                linksContainer.append(container);
                this.addLink(container);
            }
            this.addDesktopRequestLink();
        },

        getHref: function () {
            return LINKS[Oskari.getLang()] || LINKS.fi;
        },

        addLink: function (root) {
            ReactDOM.render(<div>
                <Link href={ this.getHref() }><Message bundleKey={ this.getName() } messageKey='title' /></Link>
            </div>, root);
        },

        addDesktopRequestLink: function () {
            // generate root for React
            const linkContainer = document.createElement('div');
            // attach under the disclaimer
            const disclaimerEl = document.getElementById('pti_disclaimer');
            disclaimerEl.after(linkContainer);
            // render the link
            ReactDOM.render(<DesktopLink href={ this.createLinkHref() }>
                <Message bundleKey={ this.getName() } messageKey='requestDesktop' />
            </DesktopLink>, linkContainer);
        },
        createLinkHref: function () {
            const url = new URL(window.location.href);
            const params = new URLSearchParams(url.search);
            // remove possible mobile param
            params.delete('mobile');
            // add request for desktop mode
            params.append('mobile', 'false');
            return url.pathname + '?' + params.toString();
        }
    },
    {
        extend: ['Oskari.BasicBundle']
    });
