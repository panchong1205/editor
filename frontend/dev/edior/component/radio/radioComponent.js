/**created by panchong on 2018/4/2**/
import React, { Component } from 'react';
import { Radio } from 'antd';
import DragAndResize from '../dragAndResize';
import { changeRadioAnswer } from '../../../actions/actions';
import store from '../../../store';

const RadioGroup = Radio.Group;
class RadioComponent extends Component{
    handleChange = e => {
        const { item } = this.props;
        const { id } = item;
        store.dispatch(changeRadioAnswer(e.target.value, id))
    };
    render() {
        const { focusId, item } = this.props;
        const { style, id, radioNum, radioAnswer } = item;
        const { width, height } = style;
        const radioArray = new Array(radioNum).fill('');
        return (
            <DragAndResize
                enableResizing={{
                    top: false,
                    right: true,
                    bottom: false,
                    left: true,
                    topRight: false,
                    bottomRight: false,
                    bottomLeft: false,
                    topLeft: false,
                }}
                focusId={focusId}
                item={item}
                style={style}
                className={`${id === focusId ? 'focus' : ''}`}
            >
                <RadioGroup
                    style={{
                        width,
                        height,
                    }}
                    className="flex_row_around flex_vertical_middle"
                    onChange={this.handleChange}
                    value={radioAnswer}
                >
                    {
                        radioArray.map((item, index) => <Radio value={index + 1}  key={`${index + 1}`}/>)
                    }
                </RadioGroup>
            </DragAndResize>
        );
    }
}
export default RadioComponent;
