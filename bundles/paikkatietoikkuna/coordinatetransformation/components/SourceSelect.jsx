import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Message, Radio, Button } from 'oskari-ui';
import { ComponentLabel } from './ComponentLabel';
import { InfoIcon } from 'oskari-ui/components/icons';
import { SOURCE } from '../constants';

const Content = styled.div`
`;

const style = {
    display: 'flex',
    flexDirection: 'column',
    gap: 8
};
const Option = ({ id, value, controller }) => {
    const showAction = id === value && id !== 'table';
    const onClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        controller.showInfo(id);
    };
    return (
        <Content>
            <Message messageKey={`dataSource.${id}.label`} />
            { showAction &&
                <Button type='link' onClick={() => controller.onAction(id)}>
                    <Message messageKey={`dataSource.${id}.action`} />
                </Button>
            }
            <span onClick={onClick}>
                <InfoIcon title={<Message messageKey={`dataSource.${id}.info`} />} />
            </span>
        </Content>
    );
};

// TODO: wrap confirm or confirm popup to handler
export const SourceSelect = ({ value, controller }) => {
    const onSource = source => {
        controller.setSource(source);
        controller.onAction(source)
    };
    return(
        <Content>
            <ComponentLabel label='dataSource.title'/>
            <Radio.Group
                value={value}
                style={style}
                onChange={evt => onSource(evt.target.value)}
                options={SOURCE.map(id => ({label: <Option id={id} value={value} controller={controller}/>, value: id }))}/>
        </Content>
    );
};

SourceSelect.propTypes = {
    value: PropTypes.string,
    controller: PropTypes.object.isRequired
};
