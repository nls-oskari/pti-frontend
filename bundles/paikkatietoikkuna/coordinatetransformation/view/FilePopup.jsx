import React from 'react';
import styled from 'styled-components';
import { showPopup } from 'oskari-ui/components/window';
import { LocaleProvider } from 'oskari-ui/util';
import { Message, Button } from 'oskari-ui';
import { SecondaryButton, ButtonContainer } from 'oskari-ui/components/buttons';
import { ImportFile, ExportFile } from '../components/FileSettings';

import { BUNDLE } from '../constants';

const POPUP_OPTIONS = {
    id: BUNDLE + '-file'
};

const Content = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 1em;
`;

const getContent = (type, state, controller, onClose) => {
    const Node = type ==='import' ? ImportFile : ExportFile;
    const onPrimary = () => {
        const valid = type ==='import'
            ? controller.importFileContentsToInputTable()
            : controller.exportResultsToFile();
        if (valid) {
            onClose();
        }
    };
    return (
        <LocaleProvider value={{ bundleKey: BUNDLE }}>
            <Content>
                <Node {...state} controller={controller}/>
                <ButtonContainer>
                    <SecondaryButton type='cancel' onClick={onClose} />
                    <Button type='primary' onClick={onPrimary} className='t_done'>
                        <Message messageKey={type ==='import' ? 'actions.done' : 'actions.export'}/>
                    </Button>
                </ButtonContainer>
            </Content>
        </LocaleProvider>
    );
};

export const showFilePopup = (type, state, controller, onClose) => {
    const title = <Message messageKey={`fileSettings.${type}`} bundleKey={BUNDLE} />
    const controls = showPopup(
        title,
        getContent(type, state, controller, onClose),
        onClose,
        POPUP_OPTIONS
    );
    return {
        ...controls,
        update: state => controls.update(title, getContent(type, state, controller, onClose))
    };
};
