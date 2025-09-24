import React from 'react';
import styled from 'styled-components';
import { showPopup } from 'oskari-ui/components/window';
import { ButtonContainer, PrimaryButton } from 'oskari-ui/components/buttons';
import { Message, Link } from 'oskari-ui';
import { BUNDLE } from '../constants';

const POPUP_OPTIONS = {
    id: BUNDLE + '-message'
};

const Content = styled.div`
    padding: 20px;
`;
const StyledList = styled.ul`
    padding: 0 1em;
`;
const Item = styled.li``;

const List = ({ items }) => {
    if (!items.length) {
        return null;
    }
    return (
        <StyledList>
            { items.map((item, i) => <Message key={`li_${i}`} messageKey={item} bundleKey={BUNDLE} LabelComponent={Item}/>) }
        </StyledList>
    );
};

const getContent = (content, onClose) => {
    const { message, listItems = [], link } = content || {};
    return(
        <Content>
            <Message messageKey={message} bundleKey={BUNDLE}/>
            { link &&
                <Link url = {link.url} label={link.label}>
                    {link.link}
                </Link>
            }
            <List items={listItems} />
            <ButtonContainer>
                <PrimaryButton type='close' onClick={() => onClose()}/>
            </ButtonContainer>
        </Content>
    );
};

export const showMessagePopup = (title, content, onClose) => {
    const controls = showPopup(
        <Message messageKey={title} bundleKey={BUNDLE} />,
        getContent(content, onClose),
        onClose,
        POPUP_OPTIONS
    );
    return {
        ...controls,
        update: (title, content) =>
            controls.update(
                <Message messageKey={title} bundleKey={BUNDLE} />,
                getContent(content, onClose)
            )
    };
};
