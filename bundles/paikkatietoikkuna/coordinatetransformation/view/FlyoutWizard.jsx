import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Message, Button, Steps, Confirm } from 'oskari-ui';
import { ComponentLabel } from '../components/ComponentLabel';
import { InfoIcon } from 'oskari-ui/components/icons';
import { SecondaryButton, PrimaryButton, ButtonContainer } from 'oskari-ui/components/buttons';
import { MapSelect } from '../components/MapSelect';
import { InputCoordinates, OutputCoordinates } from '../components/CoordinateTable.jsx';
import { InputSrs, OutputSrs } from '../components/SrsSelect';
import { ImportFile, ExportFile } from '../components/FileSettings';
import { ClearTableButton } from '../components/ClearTableButton';
import { SOURCE } from '../constants';

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2em;
`;
const SourceButtons = styled.div`
    display: flex;
    gap: 2em;
`;
// TODO: mobile column
const Spitter = styled.div`
    display: flex;
    flex-flow: row nowrap;
    gap: 1em;
`;
const StyledButtonContainer = styled(ButtonContainer)`
    justify-content: space-between;
`;

const ResultTable = (props) => (
    <Spitter>
        <InputCoordinates {...props} />
        <OutputCoordinates {...props} />
    </Spitter>
);

const CONTENT = {
    mapSelect: { component: MapSelect, onNext: 'store' },
    inputSrs: { component: InputSrs },
    outputSrs: { component: OutputSrs },
    importFile: { component: ImportFile, onNext: 'preview' },
    exportFile: { component: ExportFile },
    inputTable: { component: InputCoordinates  },
    mapInputTable: { component: InputCoordinates, onPrevious: 'selectFromMap' },
    resultTable: { component: ResultTable }
};

const STEPS = {
    map: ['mapSelect', 'mapInputTable', 'outputSrs'],
    file: ['inputSrs', 'importFile', 'inputTable', 'outputSrs'],
    table: ['inputSrs', 'inputTable', 'outputSrs']
};

export const FlyoutWizard = ({
    state,
    controller
}) => {
    const [stepIndex, setStepIndex] = useState(-1);
    const [showExport, setShowExport] = useState(false);
    const lastStep = showExport ? 'exportFile' : 'resultTable';
    const steps = STEPS[state.source] ? [ ...STEPS[state.source], lastStep ] : [];
    const step = steps[stepIndex];
    const { component: Content, type, onNext, onPrevious } = CONTENT[step] || {};

    if (!Content) {
        const onSourceClick = id => {
            controller.setSource(id);
            setStepIndex(0);
        };
        const onInfoClick = (event, id) => {
            event.preventDefault();
            event.stopPropagation();
            controller.showInfo(id);
        };
        return (
            <ContentWrapper>
                <ComponentLabel label='dataSource.title'/>
                <SourceButtons>
                    { SOURCE.map( id => (
                        <Button key={id} onClick={() => onSourceClick(id)}>
                            <Message messageKey={`dataSource.${id}.label`} />
                            <span onClick={(evt) => onInfoClick(evt, id)}>
                                <InfoIcon title={<Message messageKey={`dataSource.${id}.info`} />} />
                            </span>
                        </Button>
                    ))}
                </SourceButtons>
            </ContentWrapper>
        );
    }

    const nextStep = () => {
        if (controller.validate(step)) {
            return;
        }
        if (onNext) {
            controller.onAction(onNext);
        }
        setStepIndex(stepIndex + 1);
    };

    const previousStep = () => {
        if (onPrevious) {
            controller.onAction(onPrevious);
        }
        setStepIndex(stepIndex - 1);
    };
    const exportToFile = () => {
        setShowExport(true);
        nextStep();
    };
    const trasnformToTable = () => {
        const transformType = state.source === 'file' ? 'F2A' : 'A2A';
        controller.transformToArray(transformType);
        nextStep();
    };
    const onSourceChangeConfirm = () => {
        controller.reset();
        setStepIndex(-1);
    };
    const lastIndex = stepIndex >= steps.length - 1;
    const showMapMarkers = step === 'resultTable' || step === 'inputTable';
    // TODO: result tab to own jsx if wizard is used
    // TODO: getter or component for secondary and primary button (actions, steps)
    // TODO: Steps items is required prop, but it doesn't work (antd examples uses items also) => map items to Step in oskari-ui??
    if (true) {
        return (
            <ContentWrapper>
                <Steps size='small' current={stepIndex} >
                    {steps.map(id =>
                        <Steps.Step key={id} title={<Message messageKey={`flyout.steps.${id}`} />} />
                    )}
                </Steps>
                <Content { ...state } type={type} controller={controller} />
                <StyledButtonContainer>
                    <div className='t_actions'>
                    <Confirm
                        title={<Message messageKey='dataSource.confirmChange'/>}
                        onConfirm={onSourceChangeConfirm}>
                        <Button>
                            <Message messageKey='dataSource.change'/>
                        </Button>
                    </Confirm>
                    { showMapMarkers &&
                        <Button onClick={() => controller.onAction('showOnMap')}>
                            <Message messageKey='mapMarkers.show.title'/>
                        </Button>
                    }
                    </div>
                    <div className='t_steps'>
                        { stepIndex > 0 && <SecondaryButton type='previous' onClick={previousStep}/> }
                        { stepIndex < steps.length - 2  && <PrimaryButton type='next' onClick={nextStep}/> }
                        { stepIndex === steps.length - 2 &&
                            <Fragment>
                                <Button type='primary' onClick={trasnformToTable}>
                                    <Message messageKey='actions.convert'/>
                                </Button>
                                <Button type='primary' onClick={exportToFile}>
                                    <Message messageKey='actions.export'/>
                                </Button>
                            </Fragment>
                        }
                        { stepIndex >= steps.length - 1 && <PrimaryButton type='close' onClick={() => controller.reset(true)}/> }
                        { step === 'exportFile' && 
                            <Button type='primary' onClick={() => controller.transformToFile(state.source === 'file' ? 'F2F' : 'A2F')}>
                                <Message messageKey='actions.export'/>
                            </Button>
                        }
                    </div>
                </StyledButtonContainer>
            </ContentWrapper>
        );
    }
};
FlyoutWizard.propTypes = {
    state: PropTypes.object.isRequired,
    controller: PropTypes.object.isRequired
};
