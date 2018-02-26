/**created by panchong on 2018/2/26**/
import React, { Component } from 'react';
import Resizable from 'react-resizable-box';
import Draggable from 'react-draggable';
import store from '../../../store';
import { changeFocus, changeSize } from '../../../actions/actions';

class ImageComponent extends Component{
    constructor(props) {
        super();
        this.state = {
            initialWidth: 100,
            initialHeight: 100,
        }
    }
    handleFocus = e => {
        e.stopPropagation();
        store.dispatch(changeFocus(this.props.item.id));
    };
    disableDrag = e => {
        e.preventDefault();
        this.handleFocus(e);
    };
    handleStart = (e, ui) =>  {
        this.handleFocus(e);
    };

    handleDrag = (e, ui) => {
        console.log(e);
        console.log(ui);
    };

    handleStop = (e, ui) => {
    };
    handleResizeStart = (e, data) => {
        this.handleFocus(e);
    };
    handleResize = (dir, styleSize, clientSize, delta) => {
        store.dispatch(changeSize({
            width: delta.width + this.state.initialWidth,
            height: delta.height + this.state.initialHeight,
            left: this.props.item.style.left + 1,
        }));
    };
    handleResizeStop = (e, data) => {
        this.setState({
            initialWidth: this.props.item.style.width,
            initialHeight: this.props.item.style.height,
        })
    };
    render() {
        const { id, style, src } = this.props.item;
        const { focusId } = this.props;
        const { left, top, width, height} = style;
        return (
            <Draggable
                axis="both"
                handle=".imageHandle"
                defaultPosition={{x: left, y: top}}
                postion={{x: left, y: top}}
                bounds="parent"
                grid={[1, 1]}
                onStart={this.handleStart}
                onDrag={this.handleDrag}
                onStop={this.handleStop}>
                <div className="imageHandle">
                    <Resizable
                        ref={c => { this.resizable = c; }}
                        width={width}
                        height={height}
                        grid={[1, 1]}
                        axis="both"
                        minWidth={100}
                        minHeight={100}
                        onResizeStart={this.handleResizeStart}
                        onResize={this.handleResize}
                        onResizeStop={this.handleResizeStop}
                    >
                        <img className={` ${id === focusId ? 'focus' : ''}`}
                             style={{
                                 width,
                                 height,
                             }}
                             src={`${src}`}
                             alt="图片"
                             onMouseDown={this.disableDrag}
                        />
                    </Resizable>
                </div>
            </Draggable>
        );
    }
}
export default ImageComponent;