import React, { Fragment } from 'react';
import styled from 'styled-components';
import { showPopup } from 'oskari-ui/components/window';
import { Message, Button, Tooltip } from 'oskari-ui';
import { ButtonContainer, PrimaryButton, SecondaryButton } from 'oskari-ui/components/buttons';
import { BUNDLE } from '../constants';

const POPUP_OPTIONS = {
    id: BUNDLE + '-confirm'
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
        <Fragment>
            <StyledList>
                { items.map((item, i) => <Message key={`li_${i}`} messageKey={item} bundleKey={BUNDLE} LabelComponent={Item}/>) }
            </StyledList>
            <Message messageKey='confirm.continue' bundleKey={BUNDLE} />
        </Fragment>
    );
};

export const showConfirmPopup = (title, content, actions, onClose) => {
    const { message, listItems = [] } = content;
    const change = typeof actions.onChange === 'function';
    const onConfirm = () => {
        actions?.onConfirm();
        onClose();
    };
    const onChange = () => {
        actions?.onChange();
        onClose();
    };
    return showPopup(
        <Message messageKey={title} bundleKey={BUNDLE} />,
        (<Content>
            <Message messageKey={message} bundleKey={BUNDLE} />
            <List items={listItems} />
            <ButtonContainer>
                <SecondaryButton type='cancel' onClick={() => onClose()} />
                { change &&
                    <Tooltip title={<Message messageKey='confirm.changeTooltip' bundleKey={BUNDLE} />}>
                        <Button className='t_change' onClick={() => onChange()}>
                            <Message messageKey='confirm.change' bundleKey={BUNDLE}/>
                        </Button>
                    </Tooltip>
                }
                <PrimaryButton type='yes' onClick={() => onConfirm()}/>
            </ButtonContainer>
        </Content>),
        onClose,
        POPUP_OPTIONS
    );
};
