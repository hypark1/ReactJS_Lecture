import React from 'react';
import ReactDom from 'react-dom';
import { hot } from 'react-hot-loader/root';

import lotto from './lotto_hooks';

const Hot = hot(lotto);

ReactDom.render(<Hot />, document.querySelector('#root'));