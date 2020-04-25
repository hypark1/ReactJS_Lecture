import React from 'react';
import ReactDom from 'react-dom';
import { hot } from 'react-hot-loader/root';

import responseCheck from './RSP';

const Hot = hot(responseCheck);

ReactDom.render(<Hot />, document.querySelector('#root'));