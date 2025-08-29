import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Message, Radio, Button } from 'oskari-ui';
import { ComponentLabel } from './ComponentLabel';
import { InfoIcon } from 'oskari-ui/components/icons';
import { SOURCE, ACTIONS } from '../constants';

const Content = styled.div`
    display: flex;
    flex-flow: row nowrap;
    gap: 1em;
`;

const style = {
    display: 'flex',
    flexDirection: 'column',
    gap: 8
};

const BUTTONS = Object.values(ACTIONS);

const Option = ({ id, value, controller }) => {
    const showAction = id === value && id !== 'table';
    const onClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        controller.showInfo(id);
    };
    return (
        <Content className={`t_${id}`}>
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

export const SourceSelect = ({ value, controller }) => {
    return(
        <div className='t_source'>
            <ComponentLabel label='dataSource.select'/>
            <Radio.Group
                value={value}
                style={style}
                onChange={evt => controller.setSource(evt.target.value)}
                options={SOURCE.map(id => ({label: <Option id={id} value={value} controller={controller}/>, value: id }))}/>
        </div>
    );
};

SourceSelect.propTypes = {
    value: PropTypes.string,
    controller: PropTypes.object.isRequired
};

// color='primary' variant='outlined'
export const SourceButtons = ({ controller }) => {
    return(
        <Content className='t_source'>
            { BUTTONS.map(id =>
                <Button key={id} className={`t_${id}`} onClick={() => controller.addFromSource(id)}>
                    <Message messageKey={`dataSource.${id}.button`}/>
                </Button>
            )}
        </Content>
    );
};

SourceButtons.propTypes = {
    controller: PropTypes.object.isRequired
};
