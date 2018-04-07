/** created by panchong on 2018/2/28* */
import React, { Component } from 'react';
import DragAndResize from '../dragAndResize';

class InputComponent extends Component {
    render() {
        const { focusId, item } = this.props;
        const { style, id, inputShape, rightAnswer } = item;
        const {
            width, height, fontSize, textAlign, border, color,
        } = style;
        return (<DragAndResize
            focusId={focusId}
            item={item}
            style={style}
            className={`${id === focusId ? 'focus' : ''}`}
        >
            {
                inputShape === 'clarity' ? <div
                    style={{
                        width: '100%',
                        height: '100%',
                        lineHeight: `${height}px`,
                        fontSize,
                        textAlign,
                        color,
                        backgroundColor: '#eeeeee',
                    }}
                >
                    {rightAnswer}
                </div> : null
            }
            {
                inputShape === 'circle' ? <div
                    style={{
                        width: '100%',
                        height: '100%',
                        lineHeight: `${height - 6}px`,
                        fontSize,
                        textAlign,
                        border,
                        color,
                        borderRadius: Number.parseInt((height + 6) / 2),
                    }}
                >
                    {rightAnswer}
                </div> : null
            }
            {
                inputShape === 'line' || inputShape === 'square' ? <div
                    style={{
                        ...style,
                        width: '100%',
                        height: '100%',
                        lineHeight: `${height - 6}px`,
                        top: 0,
                        left: 0,
                        zIndex: 0,
                    }}
                >
                    {rightAnswer}
                </div> : null
            }
        </DragAndResize>);
    }
}
export default InputComponent;
