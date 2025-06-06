import React from 'react';
import styled from 'styled-components';
import { showPopup } from 'oskari-ui/components/window';
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
const getContent = (paragraphs, listItems) => (
    <Content>
        {paragraphs.map((p,i) => <Paragraph key={`p_${i}`}>{p}</Paragraph>)}
        <List items={listItems} />
    </Content>
);

export const showInfoPopup = (title, paragraphs, listItems, onClose) => {
    const controls = showPopup(
        title,
        getContent(paragraphs, listItems),
        onClose,
        POPUP_OPTIONS
    );
    return {
        ...controls,
        update: (title, paragraphs, listItems) => controls.update(title, getContent(paragraphs, listItems))
    };
};
