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
                <Button type="primary" key="1">Primary</Button>,
                <Button key="2">Default</Button>,
                <Button type="dashed" key="3">Dashed</Button>,
                <Button type="danger" key="4">Danger</Button>,
                <div className="container" key="5">ceshiy</div>,
            <img src={require('../../image/img1.png')} alt="图片加载失败" key="6"/>,
            <img src={require('../../image/img2.png')} alt="图片加载失败" key="7"/>,
            ];
    }
}