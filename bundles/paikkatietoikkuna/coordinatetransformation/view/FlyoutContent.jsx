import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Message, Button} from 'oskari-ui';
import { ButtonContainer, SecondaryButton } from 'oskari-ui/components/buttons';
import { SourceButtons } from '../components/SourceSelect.jsx';
import { CoordinatesTable, ResultsTable } from '../components/CoordinateTable.jsx';
import { SrsSelect } from '../components/SrsSelect';
import { MandatoryDescription } from '../components/MandatoryDescription';
import { getDimension, validateCoordinate } from '../helper';
import { Progress as AntProgress } from 'antd';

const Content = styled.div`
    display: flex;
    flex-flow: column;
    gap: 2em;
`;
// TODO: mobile column
const Splitter = styled.div`
    display: flex;
    flex-flow: row nowrap;
    gap: 2em;
`;
const MinimizeButton = styled(Button)`
    justify-content: flex-start;
    padding: 0;
`;
const StyledButtonContainer = styled(ButtonContainer)`
    justify-content: space-between;
`;

export const Progress = ({ progress, abort }) => {
    if (progress === -1) {
        return null;
    }
    return (
        <div>
            <AntProgress percent={progress} size="small" style={{ width: 200 }}/>
            <br/>
            <Button className='t_abort' type='text' onClick={() => abort()}>
                <Message messageKey='actions.cancel'/>
            </Button>
        </div>
    );
};

export const FlyoutContent = ({
    controller,
    sources,
    coordinates,
    results,
    inputSrs,
    inputHeightSrs,
    outputHeightSrs,
    outputSrs,
    transformed,
    pagination
}) => {
    const [ minimalSrs, setMinimalSrs ] = useState(true);
    // Have to check here to use same height for input & output table headers
    const input3D = getDimension(inputSrs, inputHeightSrs) === 3;
    const transform3D = input3D || getDimension(outputSrs, outputHeightSrs) === 3;
    const count = coordinates.filter(coord => validateCoordinate(coord, input3D)).length;
    return (
        <Content>
            <MandatoryDescription/>
            <div>
                <Splitter>
                    <SrsSelect type='input' minimal={minimalSrs} srs={inputSrs} heightSrs={inputHeightSrs} controller={controller}/>
                    <SrsSelect type='output' minimal={minimalSrs} srs={outputSrs} heightSrs={outputHeightSrs} controller={controller}/>
                </Splitter>
                <MinimizeButton className='t_toggle_srs' type='link' onClick={() => setMinimalSrs(!minimalSrs)}>
                    <Message messageKey={`actions.minimize${minimalSrs ? 'd' : ''}Srs`}/>
                </MinimizeButton>
            </div>
            <SourceButtons controller={controller} />
            <Splitter>
                <CoordinatesTable largeHeader={transform3D} pagination={pagination} inputSrs={inputSrs} inputHeightSrs={inputHeightSrs} coordinates={coordinates} sources={sources} controller={controller} />
                <ResultsTable largeHeader={transform3D} pagination={pagination} count={count} outputSrs={outputSrs} outputHeightSrs={outputHeightSrs} coordinates={coordinates} results={results} transformed={transformed} controller={controller}/>
            </Splitter>
            
            <StyledButtonContainer>
                <div className='t_actions'>
                    <SecondaryButton type='reset' onClick={() => controller.confirmReset()}/>
                    <Button className='t_map' onClick={() => controller.showOnMap()}>
                        <Message messageKey='mapMarkers.show.title'/>
                    </Button>
                </div>
                <div className='t_transform'>
                    <Button type='primary' className='t_table' disabled={transformed} onClick={() => controller.transform()}>
                        <Message messageKey='actions.transform'/>
                    </Button>
                    <Button type='primary' className='t_file' disabled={!transformed} onClick={() => controller.showFileSettings('export')}>
                        <Message messageKey='actions.export'/>
                    </Button>
                </div>
            </StyledButtonContainer>
        </Content>
    );
};

FlyoutContent.propTypes = {
    loading: PropTypes.bool,
    transformType: PropTypes.string,
    inputSrs: PropTypes.string,
    outputSrs: PropTypes.string,
    file: PropTypes.any,
    coordinates: PropTypes.array.isRequired,
    results: PropTypes.array.isRequired,
    transformed: PropTypes.bool.isRequired,
    pagination: PropTypes.object.isRequired,
    controller: PropTypes.object.isRequired
};
