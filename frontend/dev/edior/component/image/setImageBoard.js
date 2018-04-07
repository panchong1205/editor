/**created by panchong on 2018/3/9**/
import React, { Component } from 'react';
import { Card } from 'antd';
import store from '../../../store';
import { changeStyle } from '../../../actions/actions';
import * as device from '../../deviceSize';

class SetImageBoard extends Component {
    handleSize = (label, e) => {
        const value = e.target ? e.target.value : e;
        if (Number.parseInt(value) <= 0 || Number.parseInt(value) > device.width) {
            return;
        }
        store.dispatch(changeStyle({
            [label]: Number.parseInt(value),
        }));
    };
    handleKeyDown = (label, e) => {
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
    render() {
        const { style } = this.props.focus;
        return (
            <Card title="设置图片" style={{ width: 150 }} className="setBoard fs14 image">
                <div>
                    <p className="blackFont">宽高设置</p>
                    <div className="flex_row_start flex_vertical_middle">
                        宽：<input
                            type="number"
                            value={Number.parseInt(style.width)}
                            onChange={args => this.handleSize('width', args)}
                            onKeyDown={args => this.handleKeyDown('width', args)}
                        />px
                    </div>
                    <div className="flex_row_start flex_vertical_middle">
                        高：<input
                            type="number"
                            value={Number.parseInt(style.height)}
                            onChange={args => this.handleSize('height', args)}
                            onKeyDown={args => this.handleKeyDown('height', args)}
                        />px
                    </div>
                </div>
            </Card>
        );
    }
}
export default SetImageBoard;
