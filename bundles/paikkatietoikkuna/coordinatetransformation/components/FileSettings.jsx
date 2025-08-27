import React from 'react';
import styled from 'styled-components';
import { Message, Checkbox } from 'oskari-ui';
import { FileInput } from 'oskari-ui/components/FileInput';
import { LabeledSelect, LabeledInput } from './LabeledFields';
import { FilePreview } from './FilePreview';
import { InfoIcon } from 'oskari-ui/components/icons';
import { SEPARATORS, DECIMAL, DEGREE } from '../constants';
import { isDegreeSystem } from '../helper';

const FILE_INPUT_PROPS = {
    multiple: false,
    allowedTypes: ['text/plain', 'text/csv'],
    allowedExtensions: ['txt', 'csv'],
    maxSize: 50
};

const OPTIONS = {
    importSelect: ['decimalSeparator', 'coordinateSeparator'],
    importCheckbox: ['prefixId', 'axisFlip'],
    exportSelect: ['decimalCount', 'decimalSeparator', 'coordinateSeparator', 'lineSeparator'],
    exportCheckbox: ['prefixId', 'axisFlip', 'writeHeader', 'writeLineEndings', 'writeCardinals'],
    options: {...SEPARATORS, decimalCount: DECIMAL, unit: DEGREE }
};

const IMPORT = ['headerLineCount', 'prefixId', 'axisFlip'];

const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const Wrapper = styled.div`
    display: flex;
    flex-flow: row nowrap;
    gap: 1em;
`;
const showDegreeUnit = srs => {
    if (!srs) {
        return true;
    }
    return isDegreeSystem(srs);
};

const CheckboxOption = ({id, checked, onChange, controller}) => (
    <Wrapper>
        <Checkbox checked={checked} onChange={evt => onChange(id, evt.target.checked)}>
            <Message messageKey={`fileSettings.options.${id}`} />
        </Checkbox>
        <span onClick={() => controller.showInfo(id)}>
            <InfoIcon title={<Message messageKey={`infoPopup.${id}.title`}/>}/>
        </span>
    </Wrapper>
);

const SelectOption = ({id, value, onChange, controller}) =>
    <LabeledSelect localize mandatory label={`fileSettings.options.${id}`} info={id} value={value} options={OPTIONS.options[id]} onChange={value => onChange(id, value)} controller={controller}/>

export const ImportFile = ({ import: values, inputSrs, files, fileContents, controller }) => {
    const onChange = (key, value) => controller.setFileSetting('import', key, value);
    return (
        <Content>
            <FileInput mandatory onFiles={controller.setFiles} files={files} { ...FILE_INPUT_PROPS } />
            <LabeledInput number min={0} label='fileSettings.options.headerLineCount' value={values.headerLineCount} onChange={value => onChange('headerLineCount', value)} controller={controller}/>
            { showDegreeUnit(inputSrs) && <SelectOption id='unit' controller={controller} onChange={onChange} value={values.unit}/> }
            { OPTIONS.importSelect.map(id => <SelectOption key={id} id={id} controller={controller} onChange={onChange} value={values[id]}/>)}
            { OPTIONS.importCheckbox.map(id => <CheckboxOption key={id} id={id} controller={controller} onChange={onChange} checked={values[id]}/>)}
            <FilePreview fileContents={fileContents} />
        </Content>
    );
};

export const ExportFile = ({ export: values, outputSrs, controller }) => {
    const onChange = (key, value) => controller.setFileSetting('export', key, value);
    return (
        <Content>
            <LabeledInput label='fileSettings.export.fileName' value={values.fileName} onChange={evt => onChange('fileName', evt.target.value)} controller={controller}/>
            { showDegreeUnit(outputSrs) && <SelectOption id='unit' controller={controller} onChange={onChange} value={values.unit}/> }
            { OPTIONS.exportSelect.map(id => <SelectOption key={id} id={id} controller={controller} onChange={onChange} value={values[id]}/>)}
            { OPTIONS.exportCheckbox.map(id => <CheckboxOption key={id} id={id} controller={controller} onChange={onChange} checked={values[id]}/>)}
        </Content>
    );
};
