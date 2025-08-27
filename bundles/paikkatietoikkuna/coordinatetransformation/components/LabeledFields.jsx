import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Message, Label, Select, TextInput, NumberInput } from 'oskari-ui';
import { InfoIcon, MandatoryIcon } from 'oskari-ui/components/icons';

const Wrapper = styled.div`
    display: flex;
    flex-flow: ${props => props.$block ? 'column' : 'row'} nowrap;
    gap: ${props => props.$block ? 0 : '1em'};
`;
const StyledLabel = styled(Label)`
    width: ${props => props.$block ? 360 : 160}px;
`;
const StyledSelect = styled(Select)`
    width: 240px;
`;
const StyledTextInput = styled(TextInput)`
    width: 240px;
`;
const StyledNumberInput = styled(NumberInput)`
    width: 240px;
`;

const phMandatory = <Message messageKey='actions.select' />;
const phOptional = <Message messageKey='flyout.coordinateSystem.noFilter' />;
const phNone = <Message messageKey='flyout.coordinateSystem.heightSystem.none' />;
const getLocalized = options => options.map(opt => opt.label ? opt : ({ ...opt, label: <Message messageKey={opt.loc} messageArgs={opt.args} /> }));

const Info = ({ info, controller }) => (
    <span onClick={() => controller.showInfo(info)}>
        <InfoIcon space={false} title={<Message messageKey={`infoPopup.${info}.title`}/>}/>
    </span>
);

// placeholder is used as value for using same styling as selected value for mandatory fields
export const LabeledSelect = ({ 
    label,
    block,
    value,
    info,
    mandatory,
    localize,
    options,
    controller,
    placeholder = mandatory ? phMandatory : phOptional,
    ...restForSelect
}) => (
    <Wrapper $block={block} className={`t_${info}`}>
        <StyledLabel $block={block}>
            <Message messageKey={label} />
            &nbsp;
            { mandatory &&  <MandatoryIcon isValid={value === 0 || !!value} /> }
            &nbsp;
            { (info && block) && <Info info={info} controller={controller}/> }
        </StyledLabel>
        <StyledSelect
            { ...restForSelect }
            value={mandatory && !value ? placeholder : value}
            allowClear={!mandatory}
            options={localize ? getLocalized(options) : options}
            placeholder={placeholder}/>
        { (info && !block) && <Info info={info} controller={controller}/> }
    </Wrapper>
);

LabeledSelect.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    mandatory: PropTypes.bool,
    localize: PropTypes.bool,
    info: PropTypes.string,
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
};

export const LabeledInput = ({ label, mandatory, value, info, number, placeholder, controller, ...restForInput }) => {
    const Input = number ? StyledNumberInput : StyledTextInput;
    const isValid = !mandatory || number || ( value && value.trim().length > 0 );
    return (
        <Wrapper className={`t_${info}`}>
            <StyledLabel>
                <Message messageKey={label} />
                &nbsp;
                { mandatory &&  <MandatoryIcon isValid={isValid} /> }
            </StyledLabel>
            <Input
                { ...restForInput }
                value={value}
                placeholder={placeholder}/>
            { info && <Info info={info} controller={controller}/> }
        </Wrapper>
    );
};
LabeledInput.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    number: PropTypes.bool,
    localize: PropTypes.bool,
    info: PropTypes.string,
    onChange: PropTypes.func.isRequired
};
