/**created by panchong on 2018/2/11**/
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './dev/store';
import Editor from './dev/edior/editor';
import './dev/edior/commonLess/main.less';
import './dev/edior/commonLess/flex.less';
import './dev/edior/commonLess/antdChange.less';

render(
    <Provider store={store}>
        <Editor/>
    </Provider>,
    document.getElementById('app')
);