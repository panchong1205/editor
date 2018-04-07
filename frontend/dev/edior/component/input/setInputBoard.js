/** created by panchong on 2018/3/9* */
import React, { Component } from 'react';
import { Card, Slider } from 'antd';
import store from '../../../store';
import { changeStyle, changeInputAnswer } from '../../../actions/actions';
import * as device from '../../deviceSize';

class SetInputBoard extends Component {
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
    changeAnswer = e => {
        const value = e.target ? e.target.value : e;
        store.dispatch(changeInputAnswer(value));
    };
    handleSize = (label, e) => {
        const value = e.target ? e.target.value : e;
        if (Number.parseInt(value) <= 0 || Number.parseInt(value) > device.width) {
            return;
        }
        store.dispatch(changeStyle({
            [label]: Number.parseInt(value),
        }));
    };
    handleSizeKeyDown = (label, e) => {
        const { style } = this.props.focus;
        if (e.keyCode === 38) { // 向上
            store.dispatch(changeStyle({
                [label]: Number.parseInt(style[label]) < device.width ? Number.parseInt(style[label]) + 1 : Number.parseInt(style[label]),
            }));
            return;
        }
        if (e.keyCode === 40) { // 向下
            store.dispatch(changeStyle({
                [label]: Number.parseInt(style[label]) > 10 ? Number.parseInt(style[label]) - 1 : Number.parseInt(style[label]),
            }));
        }
    };
    handleFontSize = e => {
        const value = e.target ? e.target.value : e;
        store.dispatch(changeStyle({
            fontSize: Number.parseInt(value),
        }));
    };
    handleFontSizeKeyDown = e => {
        e.preventDefault();
        const { style } = this.props.focus;
        if (e.keyCode === 38) { // 向上
            store.dispatch(changeStyle({
                fontSize: style.fontSize < 50 ? style.fontSize + 1 : style.fontSize,
            }));
            return;
        }
        if (e.keyCode === 40) { // 向下
            store.dispatch(changeStyle({
                fontSize: style.fontSize > 12 ? style.fontSize - 1 : style.fontSize,
            }));
        }
    };
    render() {
        const { focus } = this.props;
        const { style, rightAnswer } = focus;
        return (
            <Card title="设置填空项" style={{ width: 150 }} className="setBoard fs14 image">
                <div>
                    <p className="blackFont">正确答案</p>
                    <input
                        type="text"
                        onChange={this.changeAnswer}
                        value={rightAnswer}
                    />
                </div>
                <div>
                    <p className="blackFont">宽高设置</p>
                    <div className="flex_row_start flex_vertical_middle">
                        宽：<input
                            type="number"
                            value={Number.parseInt(style.width)}
                            onChange={args => this.handleSize('width', args)}
                            onKeyDown={args => this.handleSizeKeyDown('width', args)}
                        />px
                    </div>
                    <div className="flex_row_start flex_vertical_middle">
                        高：<input
                            type="number"
                            value={Number.parseInt(style.height)}
                            onChange={args => this.handleSize('height', args)}
                            onKeyDown={args => this.handleSizeKeyDown('height', args)}
                        />px
                    </div>
                </div>
                <div>
                    <p className="blackFont">字号</p>
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
export default SetInputBoard;
