import React from 'react';
import styled from 'styled-components';
import { showPopup } from 'oskari-ui/components/window';
import { ButtonContainer, PrimaryButton, SecondaryButton } from 'oskari-ui/components/buttons';
import { BUNDLE } from '../constants';

const POPUP_OPTIONS = {
    id: BUNDLE + '-info'
};

const Content = styled.div`
    padding: 20px;
`;
const Paragraph = styled.p`
    padding-bottom: 12px;
`;

const List = ({ items }) => {
    if (!items.length) {
        return null;
    }
    return (
        <ul>
            {items.map((item, i) => <li key={`li_${i}`}>{item}</li>)}
        </ul>
    )
};
const getContent = (paragraphs, listItems, onClose, onConfirm) => {
    const renderButtons = typeof onClose === 'function' && typeof onConfirm === 'function';
    const confirm = () => {
        onConfirm();
        onClose();
    };
    return(
        <Content>
            {paragraphs.map((p,i) => <Paragraph key={`p_${i}`}>{p}</Paragraph>)}
            <List items={listItems} />
            { renderButtons && (
                <ButtonContainer>
                    <SecondaryButton type='cancel' onClick={() => onClose()} />
                    <PrimaryButton type='yes' onClick={() => confirm()}/>
                </ButtonContainer>
            )}
        </Content>
    );
};

export const showInfoPopup = (title, paragraphs, listItems, onClose, onConfirm) => {
    const controls = showPopup(
        title,
        getContent(paragraphs, listItems, onClose, onConfirm),
        onClose,
        POPUP_OPTIONS
    );
    return {
        ...controls,
        update: (title, paragraphs, listItems) => controls.update(title, getContent(paragraphs, listItems))
    };
};
