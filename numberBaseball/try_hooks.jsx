import React, { memo } from 'react';

const Try = memo(({tryInfo}) => {
    return (
        <li>
            {tryInfo.try} : {tryInfo.result}
        </li>
    )
});

export default Try;