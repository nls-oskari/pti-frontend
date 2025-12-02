import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Message, TextAreaInput } from 'oskari-ui';
import { PrimaryButton, ButtonContainer, SecondaryButton } from 'oskari-ui/components/buttons';
import { showPopup } from 'oskari-ui/components/window';
import { BUNDLE } from '../constants';

const POPUP_OPTIONS = {
    id: BUNDLE + '-clipboard'
};

const Content = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    min-width: 365px;
`;

const ClipboardPopup = ({ controller, onClose }) => {
    const [data, setData] = useState('');
    const onAdd = () => {
        controller.pasteCoordinates(data);
        onClose();
    };
    return (
        <Content>
            <TextAreaInput
                placeholder={Oskari.getMsg(BUNDLE, 'dataSource.clipboard.placeholder')}
                rows={8}
                value={data}
                onChange={(e) => setData(e.target.value)}/>
            <ButtonContainer>
                <SecondaryButton type='cancel' onClick={onClose}/>
                <PrimaryButton type='import' onClick={onAdd}/>
            </ButtonContainer>
        </Content>
    );
};
ClipboardPopup.propTypes = {
    controller: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired
};

export const showClipboardPopup = (controller, onClose) => {
    const controls = showPopup(
        <Message messageKey='dataSource.clipboard.title' bundleKey={BUNDLE} />,
        <ClipboardPopup controller={controller} onClose={onClose} />,
        onClose,
        POPUP_OPTIONS
    );
    return {
        ...controls,
        update: state => {} // noop
    };
};