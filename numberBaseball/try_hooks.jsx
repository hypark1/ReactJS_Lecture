import React, { memo, useState } from 'react';

const Try = memo(({tryInfo}) => {
    const [result, setResult] = useState(tryInfo.result);

    const onClick = () => {
        setResult('1');
    }

    return (
        <li onClick={onClick}>
            {tryInfo.try} : {tryInfo.result}
        </li>
    )
});

export default Try;