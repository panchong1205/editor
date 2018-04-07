/**created by panchong on 2018/3/5**/
import React, { Component } from 'react';
import { Card, Slider } from 'antd';
import store from '../../../store';
import { changeStyle } from '../../../actions/actions';
import * as device from '../../deviceSize';


class SetTextBoard extends Component {
    constructor(props) {
        super();
        this.state = {
            marks: {
                12: '12',
                [Number.parseInt(props.focus.style.fontSize)]: Number.parseInt(props.focus.style.fontSize),
                50: '50',
            },
        };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            marks: {
                12: '12',
                [Number.parseInt(nextProps.focus.style.fontSize)]: `${Number.parseInt(nextProps.focus.style.fontSize)}`,
                50: '50',
            },
        });
    }
    handleSize = () => {
        const { id, style } = this.props.focus;
        const { top, left } = style;
        const width = document.getElementById(`${id}`).scrollWidth;
        const height = document.getElementById(`${id}`).scrollHeight;
        const widthResult = width >= device.width ? device.width : width;
        const heightResult = height >= device.height ? device.height : height;
        store.dispatch(changeStyle({
            width: widthResult,
            height: heightResult,
            top: top < device.height - heightResult ? top : device.height - heightResult,
            left: left < device.width - widthResult ? left : device.width - widthResult,
        }));
    };
    handleBolder = () => {
        const { style } = this.props.focus;
        if (!(style.fontWeight && style.fontWeight === 'bold')) {
            store.dispatch(changeStyle({
                fontWeight: 'bold',
            }));
            // this.handleSize();
            return;
        }
        store.dispatch(changeStyle({
            fontWeight: 'normal',
        }));
        // this.handleSize();
    };
    handleTextDecoration = () => {
        const { style } = this.props.focus;
        if (!(style.textDecoration && style.textDecoration === 'underline')) {
            store.dispatch(changeStyle({
                textDecoration: 'underline',
            }));
            // this.handleSize();
            return;
        }
        store.dispatch(changeStyle({
            textDecoration: 'none',
        }));
        // this.handleSize();
    };
    handleFontStyle = () => {
        const { style } = this.props.focus;
        if (!(style.fontStyle && style.fontStyle === 'italic')) {
            store.dispatch(changeStyle({
                fontStyle: 'italic',
            }));
            // this.handleSize();
            return;
        }
        store.dispatch(changeStyle({
            fontStyle: 'normal',
        }));
        // this.handleSize();
    };
    handleAlign = textAlign => {
        store.dispatch(changeStyle({
            textAlign,
        }));
    };
    handleFontFamily = () => {
        const { style } = this.props.focus;
        if (!(style.fontFamily && style.fontFamily === 'Times New Roman')) {
            store.dispatch(changeStyle({
                fontFamily: 'Times New Roman',
            }));
            // this.handleSize();
            return;
        }
        store.dispatch(changeStyle({
            fontFamily: 'none',
        }));
        // this.handleSize();
    };
    handleFontSize = e => {
        const value = e.target ? e.target.value : e;
        store.dispatch(changeStyle({
            fontSize: Number.parseInt(value),
        }));
        // this.handleSize();
    };
    render() {
        const { style } = this.props.focus;
        return (
            <Card title="设置文本" style={{ width: 150 }} className="setBoard">
                <div>
                    <p className="fs14 blackFont">编辑</p>
                    <ul className="flex_row_around flex_vertical_middle setList">
                        <li className={style.fontWeight && style.fontWeight === 'bold' ? 'active' : ''}
                            onClick={this.handleBolder}>
                            <img src={require('../../../../image/editor/blod.png')} alt="" />
                        </li>
                        <li className={style.textDecoration && style.textDecoration === 'underline' ? 'active' : ''}
                            onClick={this.handleTextDecoration}>
                            <img src={require('../../../../image/editor/underline.png')} alt="" />
                        </li>
                        <li className={style.fontStyle && style.fontStyle === 'italic' ? 'active' : ''}
                            onClick={this.handleFontStyle}>
                            <img src={require('../../../../image/editor/italic.png')} alt="" />
                        </li>
                    </ul>
                </div>
                <div>
                    <p className="fs14 blackFont">对齐方式</p>
                    <ul className="flex_row_around flex_vertical_middle setList">
                        <li className={style.textAlign && style.textAlign === 'left' ? 'active' : ''}
                            onClick={() => this.handleAlign('left')}>
                            <img src={require('../../../../image/editor/text-left.png')} alt="" />
                        </li>
                        <li className={style.textAlign && style.textAlign === 'right' ? 'active' : ''}
                            onClick={() => this.handleAlign('right')}>
                            <img src={require('../../../../image/editor/text-right.png')} alt="" />
                        </li>
                        <li className={style.textAlign && style.textAlign === 'center' ? 'active' : ''}
                            onClick={() => this.handleAlign('center')}>
                            <img src={require('../../../../image/editor/text-center.png')} alt="" />
                        </li>
                        <li className={style.textAlign && style.textAlign === 'justify' ? 'active' : ''}
                            onClick={() => this.handleAlign('justify')}>
                            <img src={require('../../../../image/editor/text-justify.png')} alt="" />
                        </li>
                    </ul>
                </div>
                <div>
                    <p className="fs14 blackFont">字体</p>
                    <ul className="flex_row_start flex_vertical_middle setList">
                        <li className={style.fontFamily && style.fontFamily === 'Times New Roman' ? 'active' : ''}
                            onClick={this.handleFontFamily}>
                            <img src={require('../../../../image/editor/roman.png')} alt="" />
                        </li>
                    </ul>
                </div>
                <div>
                    <p className="fs14 blackFont">字号</p>
                    <Slider
                        marks={this.state.marks}
                        min={12}
                        max={50}
                        tipFormatter={null}
                        onChange={this.handleFontSize}
                        value={style.fontSize}
                        step={1}
                    />
                </div>
            </Card>
        );
    }
}
export default SetTextBoard;
