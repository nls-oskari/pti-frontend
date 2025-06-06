import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Message } from 'oskari-ui';
import { LabeledSelect } from './Lableled';
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

export const InputSrs = ({ inputSrs, inputHeightSrs, controller }) => 
    <SrsSelect type='input' srs={inputSrs} heightSrs={inputHeightSrs} controller={controller} />;

export const OutputSrs = ({ outputSrs, outputHeightSrs, controller }) => 
    <SrsSelect type='output' srs={outputSrs} heightSrs={outputHeightSrs} controller={controller} />;

export const SrsSelect = ({ srs, heightSrs, type, minimal, controller }) => {
    const heightDisabled = getDimension(srs) === 3;
    const searchPH = <Message messageKey='flyout.coordinateSystem.epsgSearch.label' />
    // TODO: disable or hide height on 3D
    if (minimal) {
        return (
            <Content>
                <ComponentLabel label={`flyout.coordinateSystem.${type}.title`}/>
                <LabeledSelect block mandatory localize showSearch placeholder={searchPH} filterOption={filter} label='flyout.coordinateSystem.geodeticCoordinateSystem.label' info='geodeticCoordinateSystem' value={srs} options={SRS} onChange={val => controller.setSrs(type, val)} controller={controller}/>
                <LabeledSelect block label='flyout.coordinateSystem.heightSystem.label' value={heightSrs} disabled={heightDisabled} info='heightSystem' options={SRS_H} onChange={val => controller.setSrs(`${type}Height`, val)} controller={controller}/>
            </Content>
        );
    }
    const [datum, setDatum] = useState(null);
    const [system, setSystem] = useState(null);
    const [projection, setProjection] = useState(null);
    
    const onSystem = system => {
        if (system !== 'COORD_PROJ_2D') {
            // reset hidden select
            setProjection(null);
        }
        setSystem(system);
    };
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
    // TODO: SYSTEM showProjection, helper showProjection ??
    const filter = (input, {label, value, reversedEpsg}) => `${label} ${value} ${reversedEpsg}`.toLowerCase().includes(input.toLowerCase());
    return (
        <Content>
            <ComponentLabel label={`flyout.coordinateSystem.${type}.title`}/>
            <LabeledSelect label='flyout.coordinateSystem.geodeticDatum.label' info='geodeticDatum' value={datum} options={DATUM} onChange={setDatum} controller={controller}/>
            <LabeledSelect localize label='flyout.coordinateSystem.coordinateSystem.label' info='coordinateSystem' value={system} options={SYSTEM} onChange={onSystem} controller={controller}/>
            { system === 'COORD_PROJ_2D' && <LabeledSelect label='flyout.coordinateSystem.mapProjection.label' info='mapProjection' value={projection} options={PROJECTION} onChange={setProjection} controller={controller}/> }
            <LabeledSelect mandatory localize showSearch filterOption={filter} label='flyout.coordinateSystem.geodeticCoordinateSystem.label' info='geodeticCoordinateSystem' value={srs} options={srsOptions} onChange={val => controller.setSrs(type, val)} controller={controller}/>
            <LabeledSelect label='flyout.coordinateSystem.heightSystem.label' value={heightSrs} disabled={heightDisabled} info='heightSystem' options={SRS_H} onChange={val => controller.setSrs(`${type}Height`, val)} controller={controller}/>
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
