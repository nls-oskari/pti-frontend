import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Message } from 'oskari-ui';
import { LabeledSelect } from './LabeledFields';
import { ComponentLabel } from './ComponentLabel';
import { BUNDLE, DATUM, SYSTEM, PROJECTION, SRS, SRS_H, SRS_C } from '../constants';
import { getDimension } from '../helper';

// Use EPSG code as data-value (tests) and title for srs options
const mapForOptions = (list, addTitle) => {
    return list.map(({ name, axes, reversed, ...opt }) => { // remove name
        const option = {...opt, 'data-value': opt.value };
        if (addTitle) {
            option.title = opt.value;
        }
        if (reversed && axes) {
            option.label = opt.label + ` (${axes.join()})`
        }
        return option;
    });
};
// Show only E,N option for TMx, TM35FIN
const SIMPLE_SRS = SRS.filter(opt => !opt.reversed || opt.axes[0] === 'E')
    .map(({ value, label, replaced, loc, args }) => ({ value, label, replaced, loc, args, 'data-value': value, title: value }));

const SRS_OPTIONS = mapForOptions([...SRS, ...SRS_C], true);
const HEIGHT_OPTIONS = mapForOptions(SRS_H, true);
const DATUM_OPTIONS = mapForOptions(DATUM);
const SYSTEM_OPTIONS = mapForOptions(SYSTEM);
const PROJECTION_OPTIONS = mapForOptions(PROJECTION);

const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1em;
`;

const filter = (input, {label, value, replaced=''}) => `${label} ${value} ${replaced}`.toLowerCase().includes(input.toLowerCase());

const Srs = ({ srs, options = SIMPLE_SRS, type, controller, block = false, mandatory = true }) => {
    const [isOpen, setOpen] = useState(false);
    const [isSearch, setSearch] = useState(false);
    const placeholder = Oskari.getMsg(BUNDLE, `actions.${isOpen ? 'search': 'select'}`);
    // For some reason onOpenChange={open => setOpen(open)} doesn't work, use focus & blur
    return <LabeledSelect localize showSearch
        mandatory={mandatory}
        idForTests={`${type}_srs`}
        block={block}
        onFocus={()=> setOpen(true)}
        onBlur={() => setOpen(false)}
        filterOption={filter}
        label='flyout.coordinateSystem.geodeticCoordinateSystem.label'
        info='geodeticCoordinateSystem'
        value={srs}
        placeholder={placeholder}
        options={isSearch ? SRS_OPTIONS : options}
        controller={controller}
        onSearch={value => setSearch(value?.length > 1)}
        onSelect={() => setSearch(false)}
        onChange={val => controller.setSrs(type, val)}/>
};

const Height = ({ srs, heightSrs, type, block = false, controller }) => {
    const disabled = getDimension(srs) === 3;
    const placeholder = disabled
        ? SRS_OPTIONS.find(s => s.value === srs)?.label
        : <Message messageKey='flyout.coordinateSystem.heightSystem.none' />;
    return <LabeledSelect
        idForTests={`${type}_height`}
        block={block}
        info='heightSystem'
        label='flyout.coordinateSystem.heightSystem.label'
        value={heightSrs} placeholder={placeholder}
        disabled={disabled}
        options={HEIGHT_OPTIONS}
        onChange={val => controller.setHeightSrs(type, val)}
        controller={controller}/>
};

export const ImportSrsSelect = ({ srs, heightSrs, controller }) => {
    return (
        <Content className='t_srs_import'>
            <Srs mandatory={false} srs={srs} type='import' controller={controller} />
            <Height srs={srs} heightSrs={heightSrs} type='import' controller={controller} />
        </Content>
    );
};

export const SrsSelect = ({ srs, heightSrs, type, minimal, controller }) => {
    if (minimal) {
        return (
            <Content className={`t_srs_${type}`}>
                <ComponentLabel label={`flyout.coordinateSystem.${type}.title`}/>
                <Srs block srs={srs} type={type} controller={controller} />
                <Height block srs={srs} heightSrs={heightSrs} type={type} controller={controller} />
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
            <Height srs={srs} heightSrs={heightSrs} type={type} controller={controller} />
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
