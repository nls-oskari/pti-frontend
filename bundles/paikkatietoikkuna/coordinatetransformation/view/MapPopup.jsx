import React, { useState } from 'react';
import styled from 'styled-components';
import { showPopup, PLACEMENTS } from 'oskari-ui/components/window';
import { SecondaryButton, ButtonContainer, PrimaryButton } from 'oskari-ui/components/buttons';
import { Message, Label, Radio, Button } from 'oskari-ui';
import { MapSelect } from '../components/MapSelect';
import { BUNDLE, MAP } from '../constants';

const POPUP_OPTIONS = {
    id: BUNDLE + '-map',
    placement: PLACEMENTS.TL
};

const ContentWrapper = styled.div`
    padding: 20px;
`;

const Content = ({ controller, onClose }) => {
    const onPrimary = () => {
        controller.setMapSelectionMode('store');
        onClose();
    };

    return (
        <ContentWrapper>
            <MapSelect controller={controller} />
            <ButtonContainer>
                <SecondaryButton type='cancel' onClick={onClose} />
                <Button type='primary' onClick={onPrimary}>
                    <Message messageKey='actions.done' bundleKey={BUNDLE}/>
                </Button>
            </ButtonContainer>
        </ContentWrapper>
    );
};

export const showMapSelectPopup = (controller, onClose) => {
    return showPopup(
        <Message messageKey='mapMarkers.select.title' bundleKey={BUNDLE} />,
        <Content controller={controller} onClose={onClose} />,
        onClose,
        POPUP_OPTIONS
    );
};

export const showMapPreviewPopup = (onClose) => {
    return showPopup(
        <Message messageKey='mapMarkers.show.title' bundleKey={BUNDLE} />,
        (<ContentWrapper>
            <Message messageKey='mapMarkers.show.info' bundleKey={BUNDLE} />
            <ButtonContainer>
                <PrimaryButton type='close' onClick={onClose} />
            </ButtonContainer>
        </ContentWrapper>),
        onClose,
        POPUP_OPTIONS
    );
};
