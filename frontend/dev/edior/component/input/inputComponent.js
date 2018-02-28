/**created by panchong on 2018/2/28**/
import React, { Component } from 'react';
import DragAndResize from '../dragAndResize';
import { changeFocus, changeStyle } from '../../../actions/actions';
import store from '../../../store';

class InputComponent extends Component{
    render() {
        const { focusId, item } = this.props;
        const { style, id, inputShape } = item;
        const {width, height, fontSize, textAlign, verticalAlign,} = style;
        if (inputShape === 'clarity') {
            return <DragAndResize
                focusId={focusId}
                item={item}
                className={`${id === focusId ? 'focus' : ''}`}
            >
                <input
                    style={{
                        width: '100%',
                        height: '100%',
                        fontSize,
                        textAlign,
                        verticalAlign,
                        backgroundColor: '#eeeeee',
                    }}
                    disabled={true}
                />
            </DragAndResize>;
        }
        if (inputShape === 'circle') {
            return <DragAndResize
                focusId={focusId}
                item={item}
                className={`${id === focusId ? 'focus' : ''}`}
            >
                <input
                    style={{
                        width: '100%',
                        height: '100%',
                        fontSize,
                        textAlign,
                        verticalAlign,
                        borderRadius: Number.parseInt(height / 2),
                    }}
                    disabled={true}
                />
            </DragAndResize>;
        }
        return <DragAndResize
            focusId={focusId}
            item={item}
            className={`${id === focusId ? 'focus' : ''}`}
        >
            <input
                style={{
                    ...style,
                    width: '100%',
                    height: '100%',
                    top: 0,
                    left: 0,
                    zIndex: 0,
                }}
                disabled={true}
            />
        </DragAndResize>;
    }
}
export default InputComponent;
