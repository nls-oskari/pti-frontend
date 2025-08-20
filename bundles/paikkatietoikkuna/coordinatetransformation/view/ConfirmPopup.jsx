import React from 'react';
import styled from 'styled-components';
import { showPopup } from 'oskari-ui/components/window';
import { Message } from 'oskari-ui';
import { ButtonContainer, PrimaryButton, SecondaryButton } from 'oskari-ui/components/buttons';
import { BUNDLE } from '../constants';

const POPUP_OPTIONS = {
    id: BUNDLE + '-confirm'
};

const Content = styled.div`
    padding: 20px;
`;

export const showConfirmPopup = (title, msg, onConfirm, onClose) => {
    return showPopup(
        <Message messageKey={title} bundleKey={BUNDLE} />,
        (<Content>
            <Message messageKey={msg} bundleKey={BUNDLE} />
            <ButtonContainer>
                <SecondaryButton type='cancel' onClick={() => onClose()} />
                <PrimaryButton type='yes' onClick={() => onConfirm()}/>
            </ButtonContainer>
        </Content>),
        onClose,
        POPUP_OPTIONS
    );
};
