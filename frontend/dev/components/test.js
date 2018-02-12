/**
 * created by panchong on 2018/2/12
 * return 可以返回数组
 * **/
import React, {Component} from 'react';
import { Button } from 'antd';
import './test.less';

export default class Test extends Component{
    render() {
        return [
                <Button type="primary">Primary</Button>,
                <Button>Default</Button>,
                <Button type="dashed">Dashed</Button>,
                <Button type="danger">Danger</Button>,
                <div className="container">ceshiy</div>,
            ];
    }
}