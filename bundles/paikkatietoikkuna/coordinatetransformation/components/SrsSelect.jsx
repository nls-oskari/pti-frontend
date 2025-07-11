import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Message } from 'oskari-ui';
import { LabeledSelect } from './LabeledFields';
import { ComponentLabel } from './ComponentLabel';
import { DATUM, SYSTEM, PROJECTION, SRS, SRS_H } from '../constants';
import { getDimension } from '../helper';

const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1em;
`;
const SelectWrapper = styled.div`
    display: flex;
    flex-flow: row nowrap;
    gap: 1em;
`;
const filter = (input, {label, value, reversedEpsg}) => `${label} ${value} ${reversedEpsg}`.toLowerCase().includes(input.toLowerCase());

export const InputSrs = ({ inputSrs, inputHeightSrs, minimal, controller }) =>
    <SrsSelect type='input' srs={inputSrs} heightSrs={inputHeightSrs} minimal={minimal} controller={controller} />;

export const OutputSrs = ({ outputSrs, outputHeightSrs, minimal, controller }) =>
    <SrsSelect type='output' srs={outputSrs} heightSrs={outputHeightSrs} minimal={minimal} controller={controller} />;

export const SrsSelect = ({ srs, heightSrs, type, minimal, controller }) => {
    const heightDisabled = getDimension(srs) === 3;
    const searchPH = <Message messageKey='flyout.coordinateSystem.epsgSearch.label' />
    const heightPH = <Message messageKey='flyout.coordinateSystem.heightSystem.none' />
    if (minimal) {
        return (
            <Content>
                <ComponentLabel label={`flyout.coordinateSystem.${type}.title`}/>
                <LabeledSelect block mandatory localize showSearch placeholder={searchPH} filterOption={filter} label='flyout.coordinateSystem.geodeticCoordinateSystem.label' info='geodeticCoordinateSystem' value={srs} options={SRS} onChange={val => controller.setSrs(type, val)} controller={controller}/>
                <LabeledSelect block label='flyout.coordinateSystem.heightSystem.label' value={heightSrs} placeholder={heightPH} disabled={heightDisabled} info='heightSystem' options={SRS_H} onChange={val => controller.setHeightSrs(type, val)} controller={controller}/>
            </Content>
        );
    }
    const [datum, setDatum] = useState(null);
    const [system, setSystem] = useState(null);
    const [projection, setProjection] = useState(null);

    const onSystem = system => {
        if (system !== 'PROJ_2D') {
            // reset hidden select
            setProjection(null);
        }
        setSystem(system);
    };
    const onDatum = datum => {
        setProjection(null);
        setSystem(null);
        setDatum(datum);
    };

    const systemOptions = datum ? SYSTEM.filter(opt => opt.datums.includes(datum)) : SYSTEM;
    const projectionOptions = datum ? PROJECTION.filter(opt => opt.datum === datum) : PROJECTION;
    const srsOptions = SRS.filter(srs => {
        if (datum && datum !== srs.datum) {
            return false;
        }
        if (system && system !== srs.system) {
            return false;
        }
        if (projection && projection !== srs.projection) {
            return false;
        }
        return true;
    });

    return (
        <Content>
            <ComponentLabel label={`flyout.coordinateSystem.${type}.title`}/>
            <LabeledSelect label='flyout.coordinateSystem.geodeticDatum.label' info='geodeticDatum' value={datum} options={DATUM} onChange={onDatum} controller={controller}/>
            <LabeledSelect localize label='flyout.coordinateSystem.coordinateSystem.label' info='coordinateSystem' value={system} options={systemOptions} onChange={onSystem} controller={controller}/>
            { system === 'PROJ_2D' && <LabeledSelect label='flyout.coordinateSystem.mapProjection.label' info='mapProjection' value={projection} options={projectionOptions} onChange={setProjection} controller={controller}/> }
            <LabeledSelect mandatory localize showSearch filterOption={filter} label='flyout.coordinateSystem.geodeticCoordinateSystem.label' info='geodeticCoordinateSystem' value={srs} options={srsOptions} onChange={val => controller.setSrs(type, val)} controller={controller}/>
            <LabeledSelect label='flyout.coordinateSystem.heightSystem.label' value={heightSrs} placeholder={heightPH} disabled={heightDisabled} info='heightSystem' options={SRS_H} onChange={val => controller.setHeightSrs(type, val)} controller={controller}/>
        </Content>
    );
};

SrsSelect.propTypes = {
    srs: PropTypes.string,
    minimal: PropTypes.bool,
    heightSrs: PropTypes.string,
    type: PropTypes.string.isRequired,
    controller: PropTypes.object.isRequired
};
