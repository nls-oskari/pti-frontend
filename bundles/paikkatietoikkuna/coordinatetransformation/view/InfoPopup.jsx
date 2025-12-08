import React from 'react';
import styled from 'styled-components';
import { showPopup } from 'oskari-ui/components/window';
import { ButtonContainer, PrimaryButton } from 'oskari-ui/components/buttons';
import { Table } from 'oskari-ui/components/Table';
import { Message } from 'oskari-ui';
import { BUNDLE, DECIMAL } from '../constants';
import { getDecimalCount } from '../helper';

const POPUP_OPTIONS = {
    id: BUNDLE + '-info'
};

const PRECISION_UNITS = ['degree', 'radian', 'min', 'sec'];

const Content = styled.div`
    padding: 20px;
`;
const Paragraph = styled.p`
    padding-bottom: 12px;
`;

const StyledList = styled.ul`
    padding: 0 1em;
`;

const StyledTable = styled(Table)`
    margin-top: 1em;
`;

const PrecisionTable = () => {
    const columns = [
        {
            title: <Message messageKey='infoPopup.decimalCount.precisionTable.unit' bundleKey={BUNDLE}/>,
            dataIndex: 'unit'
        },
        ...DECIMAL.map(d => ({ title: d.label, dataIndex: d.value }))
    ];
    const dataSource = PRECISION_UNITS.map(unit => ({
        key: unit,
        unit: <Message messageKey={`infoPopup.decimalCount.precisionTable.${unit}`} bundleKey={BUNDLE}/>,
        ...DECIMAL.reduce((decimals, { value }) => ({ ...decimals, [value]: getDecimalCount(value, unit) }), {})
    }));
    return (
        <StyledTable bordered
            title={() => <Message messageKey='infoPopup.decimalCount.precisionTable.title' bundleKey={BUNDLE}/>}
            columns={columns}
            dataSource={dataSource}
            pagination={false}/>
    );
};

const List = ({ items }) => {
    if (!items.length) {
        return null;
    }
    return (
        <StyledList>
            { items.map((item, i) => <li key={`li_${i}`}>{item}</li>) }
        </StyledList>
    )
};

const getContent = (locObject, onClose) => {
    const { info = '', listItems = [], paragraphs = [info], precisionTable } = locObject;
    return(
        <Content>
            { paragraphs.map((p, i) => <Paragraph key={`p_${i}`}>{p}</Paragraph>) }
            <List items={listItems} />
            { precisionTable && <PrecisionTable /> }
            <ButtonContainer>
                <PrimaryButton type='close' onClick={() => onClose()}/>
            </ButtonContainer>
        </Content>
    );
};

export const showInfoPopup = (loc, onClose) => {
    const controls = showPopup(
        loc.title,
        getContent(loc, onClose),
        onClose,
        POPUP_OPTIONS
    );
    return {
        ...controls,
        update: (loc) => controls.update(loc.title, getContent(loc, onClose))
    };
};
