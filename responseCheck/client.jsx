import React from 'react';
import ReactDom from 'react-dom';
import { hot } from 'react-hot-loader/root';

import responseCheck from './responseCheck';

const Hot = hot(responseCheck);

ReactDom.render(<Hot />, document.querySelector('#root'));