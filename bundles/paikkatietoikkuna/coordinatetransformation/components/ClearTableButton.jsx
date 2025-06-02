import React from 'react';
import PropTypes from 'prop-types';
import { Message, Button, Confirm } from 'oskari-ui';

export const ClearTableButton = ({ controller }) => (
    <Confirm
        title={<Message messageKey='flyout.coordinateTable.confirmClear'/>}
        onConfirm={() => controller.clearTables()}>
        <Button>
            <Message messageKey='flyout.coordinateTable.clearTables'/>
        </Button>
    </Confirm>
);

ClearTableButton.propTypes = {
    controller: PropTypes.object.isRequired
};
