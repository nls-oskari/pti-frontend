import React from 'react';
import { Message } from 'oskari-ui';
import { MandatoryIcon } from 'oskari-ui/components/icons';

export const MandatoryDescription = () => (
    <div>
        <Message messageKey='flyout.mandatory.symbol' />
            <MandatoryIcon isValid={false}/>
        <Message messageKey='flyout.mandatory.desc' />
    </div>
);
