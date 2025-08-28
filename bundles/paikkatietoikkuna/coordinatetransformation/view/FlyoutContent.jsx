import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Message, Button} from 'oskari-ui';
import { ButtonContainer } from 'oskari-ui/components/buttons';
import { SourceButtons } from '../components/SourceSelect.jsx';
import { CoordinateTable } from '../components/CoordinateTable.jsx';
import { SrsSelect } from '../components/SrsSelect';
import { ClearTableButton } from '../components/ClearTableButton';
import { MandatoryDescription } from '../components/MandatoryDescription';

const Content = styled.div`
    display: flex;
    flex-flow: column;
    gap: 2em;
`;
// TODO: mobile column
const Splitter = styled.div`
    display: flex;
    flex-flow: row nowrap;
    gap: 1em;
`;
const MinimizeButton = styled(Button)`
    justify-content: flex-start;
    padding: 0;
`;
const StyledButtonContainer = styled(ButtonContainer)`
    justify-content: space-between;
`;

export const FlyoutContent = ({
    controller,
    source,
    coordinates,
    results,
    inputSrs,
    inputHeightSrs,
    outputHeightSrs,
    outputSrs
}) => {
    const [ minimalSrs, setMinimalSrs ] = useState(true);
    const transformType = source === 'file' ? 'F2A' : 'A2A';
    const transformed = results.length > 0;
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
                <CoordinateTable type='input' editable={source === 'table'} srs={inputSrs} heightSrs={inputHeightSrs} coordinates={coordinates} controller={controller} />
                <CoordinateTable type='output' srs={outputSrs} heightSrs={outputHeightSrs} coordinates={results} controller={controller} />
            </Splitter>
            
            <StyledButtonContainer>
                <div className='t_actions'>
                    <ClearTableButton controller={controller} />
                    <Button className='t_map' onClick={() => controller.showOnMap()}>
                        <Message messageKey='mapMarkers.show.title'/>
                    </Button>
                </div>
                <div className='t_transform'>
                    <Button type='primary' className='t_table' disabled={transformed} onClick={() => controller.transformToArray(transformType)}>
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
    source: PropTypes.string,
    transformType: PropTypes.string,
    inputSrs: PropTypes.string,
    outputSrs: PropTypes.string,
    file: PropTypes.any,
    coordinates: PropTypes.array.isRequired,
    results: PropTypes.array.isRequired,
    controller: PropTypes.object.isRequired
};
