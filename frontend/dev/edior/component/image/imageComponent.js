/**created by panchong on 2018/2/26**/
import React, { Component } from 'react';
import DragAndResize from '../dragAndResize';

class ImageComponent extends Component{
    constructor() {
        super();
    }
    disableDrag = e => {
        e.preventDefault();
    };
    render() {
        const { focusId, item } = this.props;
        const { style, src, id } = item;
        const { width, height} = style;
        return (
            <DragAndResize
                focusId={focusId}
                item={item}
            >
                <img
                    style={{
                        width,
                        height,
                    }}
                    className={`${id === focusId ? 'focus' : ''}`}
                    src={`${src}`}
                    alt="图片"
                    onMouseDown={this.disableDrag}
                />
            </DragAndResize>
        );
    }
}
export default ImageComponent;