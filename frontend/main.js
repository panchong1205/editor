/**created by panchong on 2018/2/11**/
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './dev/store';
import App from './dev/app';
import Test from './dev/components/test';
import Editor from './dev/edior/editor';
import './font/font.less';

render(
    <Provider store={store}>
        <App>
            <Editor/>
        </App>
    </Provider>,
    document.getElementById('app')
);