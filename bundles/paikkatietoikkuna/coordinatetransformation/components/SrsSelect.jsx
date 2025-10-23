import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Message } from 'oskari-ui';
import { LabeledSelect } from './LabeledFields';
import { ComponentLabel } from './ComponentLabel';
import { BUNDLE, DATUM, SYSTEM, PROJECTION, SRS, SRS_H } from '../constants';
import { getDimension } from '../helper';

// Use EPSG code as data-value (tests) and title
const SRS_OPTIONS = SRS.map(opt => ({ ...opt, title: opt.value, 'data-value': opt.value }));
const HEIGHT_OPTIONS = SRS_H.map(opt => ({ ...opt, title: opt.value, 'data-value': opt.value }));
// data-value for tests
const DATUM_OPTIONS = DATUM.map(opt => ({ ...opt, 'data-value': opt.value }));
const SYSTEM_OPTIONS = SYSTEM.map(opt => ({ ...opt, 'data-value': opt.value }));
const PROJECTION_OPTIONS = PROJECTION.map(opt => ({ ...opt, 'data-value': opt.value }));

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
const filter = (input, {label, value, replaced=''}) => `${label} ${value} ${replaced}`.toLowerCase().includes(input.toLowerCase());

const Srs = ({ srs, options, type, controller, block = false }) => {
    const [isOpen, setOpen] = useState(false);
    const placeholder = Oskari.getMsg(BUNDLE, `actions.${isOpen ? 'search': 'select'}`);
    // For some reason onOpenChange={open => setOpen(open)} doesn't work, use focus & blur
    return <LabeledSelect localize showSearch mandatory
        idForTests={`${type}_srs`}
        block={block}
        onFocus={()=> setOpen(true)}
        onBlur={() => setOpen(false)}
        filterOption={filter}
        label='flyout.coordinateSystem.geodeticCoordinateSystem.label'
        info='geodeticCoordinateSystem'
        value={srs}
        placeholder={placeholder}
        options={options}
        controller={controller}
        onChange={val => controller.setSrs(type, val)}/>
};

export const SrsSelect = ({ srs, heightSrs, type, minimal, controller }) => {
    const heightDisabled = getDimension(srs) === 3;
    const heightPH = heightDisabled
        ? SRS_OPTIONS.find(s => s.value === srs)?.label
        : <Message messageKey='flyout.coordinateSystem.heightSystem.none' />;
    if (minimal) {
        return (
            <Content className={`t_srs_${type}`}>
                <ComponentLabel label={`flyout.coordinateSystem.${type}.title`}/>
                <Srs block srs={srs} options={SRS_OPTIONS} type={type} controller={controller} />
                <LabeledSelect block idForTests={`${type}_height`} label='flyout.coordinateSystem.heightSystem.label' value={heightSrs} placeholder={heightPH} disabled={heightDisabled} info='heightSystem' options={HEIGHT_OPTIONS} onChange={val => controller.setHeightSrs(type, val)} controller={controller}/>
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

    const systemOptions = datum ? SYSTEM_OPTIONS.filter(opt => opt.datums.includes(datum)) : SYSTEM_OPTIONS;
    const projectionOptions = datum ? PROJECTION_OPTIONS.filter(opt => opt.datums.includes(datum)) : PROJECTION_OPTIONS;
    const srsOptions = SRS_OPTIONS.filter(srs => {
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
        <Content className={`t_srs_${type}`}>
            <ComponentLabel label={`flyout.coordinateSystem.${type}.title`}/>
            <LabeledSelect idForTests={`${type}_datum`} label='flyout.coordinateSystem.geodeticDatum.label' info='geodeticDatum' value={datum} options={DATUM_OPTIONS} onChange={onDatum} controller={controller}/>
            <LabeledSelect idForTests={`${type}_system`} localize label='flyout.coordinateSystem.coordinateSystem.label' info='coordinateSystem' value={system} options={systemOptions} onChange={onSystem} controller={controller}/>
            { system === 'PROJ_2D' && <LabeledSelect idForTests={`${type}_projection`} label='flyout.coordinateSystem.mapProjection.label' info='mapProjection' value={projection} options={projectionOptions} onChange={setProjection} controller={controller}/> }
            <Srs srs={srs} options={srsOptions} type={type} controller={controller}/>
            <LabeledSelect idForTests={`${type}_height`} label='flyout.coordinateSystem.heightSystem.label' value={heightSrs} placeholder={heightPH} disabled={heightDisabled} info='heightSystem' options={HEIGHT_OPTIONS} onChange={val => controller.setHeightSrs(type, val)} controller={controller}/>
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
