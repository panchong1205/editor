/**created by panchong on 2018/2/24**/
import React, { Component } from 'react';
import DragAndResize from '../dragAndResize';

class TextComponent extends Component{
    constructor() {
        super();
    }
    disableDrag = e => {
        e.preventDefault();
    };
    render() {
        const { focusId, item } = this.props;
        const { style, content } = item;
        const {width, height, linHeight, fontSize, color, textAlign} = style;
        return (
            <DragAndResize
                focusId={focusId}
                item={item}
            >
                <div
                     style={{
                         width,
                         height,
                         linHeight,
                         fontSize,
                         color,
                         textAlign,
                     }}
                     onMouseDown={this.disableDrag}>
                    {content}
                </div>
            </DragAndResize>
        );
    }
}
export default TextComponent;