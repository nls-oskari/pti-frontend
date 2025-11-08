import React from 'react';
import styled from 'styled-components';
import { Message, Checkbox } from 'oskari-ui';
import { FileInput } from 'oskari-ui/components/FileInput';
import { LabeledSelect, LabeledInput } from './LabeledFields';
import { FilePreview } from './FilePreview';
import { ImportSrsSelect } from './SrsSelect';
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
   ...SEPARATORS,
    decimalCount: DECIMAL,
    unit: DEGREE
};

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

// locPath is used if options.[id] loc doesn't exist
const CheckboxOption = ({id, values, onChange, controller, locPath}) => (
    <Wrapper className={`t_${id}`}>
        <Checkbox checked={values[id]} onChange={evt => onChange(id, evt.target.checked)}>
            <Message messageKey={`fileSettings.options.${locPath || id}`} />
        </Checkbox>
        <span onClick={() => controller.showInfo(id)}>
            <InfoIcon title={<Message messageKey={`infoPopup.${id}.info`}/>}/>
        </span>
    </Wrapper>
);

const SelectOption = ({id, values, onChange, controller, mandatory = true}) =>
    <LabeledSelect localize mandatory={mandatory} label={`fileSettings.options.${id}`} info={id} value={values[id]} options={OPTIONS[id]} onChange={value => onChange(id, value)} controller={controller}/>

export const ImportFile = ({ import: values, inputSrs, inputHeightSrs, importSrs, importHeightSrs, files, fileContents, controller }) => {
    const onChange = (key, value) => controller.setFileSetting('import', key, value);
    // file parser handles count instead of boolean TODO: change to number input ?
    const onPrefix = (key, checked) => controller.setFileSetting('import', 'prefixColCount', checked ? 1 : 0);
    // Note: handler.getImportDimension
    const srs = importSrs === null ? inputSrs : importSrs;
    const heightSrs = importHeightSrs === null ? inputHeightSrs : importHeightSrs;
    return (
        <Content>
            <FileInput mandatory onFiles={controller.setFiles} files={files} { ...FILE_INPUT_PROPS } />
            <ImportSrsSelect type='import' srs={srs} heightSrs={heightSrs} controller={controller} />
            <LabeledInput info='headerLineCount' number min={0} label='fileSettings.options.headerLineCount' value={values.headerLineCount} onChange={value => onChange('headerLineCount', value)} controller={controller}/>
            <SelectOption id='coordinateSeparator' controller={controller} onChange={onChange} values={values}/>
            <SelectOption id='decimalSeparator' controller={controller} onChange={onChange} values={values}/>
            { isDegreeSystem(srs) && <SelectOption id='unit' mandatory controller={controller} onChange={onChange} values={values}/> }
            <CheckboxOption id='prefixColCount' locPath='prefixes.input' controller={controller} onChange={onPrefix} values={values}/>
            <FilePreview fileContents={fileContents} dataFormat={values.unit} />
        </Content>
    );
};

export const ExportFile = ({ export: values, outputSrs, controller, fileContents }) => {
    const onChange = (key, value) => controller.setFileSetting('export', key, value);
    // file writer handles count instead of boolean TODO: change to number input ?
    const onPrefix = (key, checked) => controller.setFileSetting('export', 'prefixColCount', checked ? 1 : 0);
    const { lineEndings = [], headerLines = [], prefixes = [] } = fileContents || {};
    const prefixLocPath = prefixes.length > 0 ? 'prefixes.fromFile' : 'prefixes.generate';
    const hasLineEndings = lineEndings.length > 0;
    const hasHeaders = headerLines.length > 0;
    return (
        <Content>
            <LabeledInput label='fileSettings.options.fileName' value={values.fileName} onChange={evt => onChange('fileName', evt.target.value)} controller={controller}/>
            <SelectOption id='coordinateSeparator' controller={controller} onChange={onChange} values={values}/>
            <SelectOption id='decimalSeparator' controller={controller} onChange={onChange} values={values}/>
            <SelectOption id='decimalCount' controller={controller} onChange={onChange} values={values}/>
            { showDegreeUnit(outputSrs) && <SelectOption id='unit' controller={controller} onChange={onChange} values={values}/> }
            <SelectOption id='lineSeparator' controller={controller} onChange={onChange} values={values}/>
            <CheckboxOption id='createHeader' controller={controller} onChange={onChange} values={values}/>
            { hasHeaders && <CheckboxOption id='writeHeaders' controller={controller} onChange={onChange} values={values}/> }
            <CheckboxOption id='prefixColCount' locPath={prefixLocPath} controller={controller} onChange={onPrefix} values={values}/>
            <CheckboxOption id='axisFlip' controller={controller} onChange={onChange} values={values}/>
            <CheckboxOption id='writeCardinals' controller={controller} onChange={onChange} values={values}/>
            { hasLineEndings && <CheckboxOption id='writeLineEndings' controller={controller} onChange={onChange} values={values}/> }
        </Content>
    );
};
