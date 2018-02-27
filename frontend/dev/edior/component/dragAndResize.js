/**created by panchong on 2018/2/27**/
import React, { Component } from 'react';
import Rnd from 'react-rnd';
import store from '../../store';
import { changeFocus, changeSize, changePosition } from '../../actions/actions';

export default class DragAndResize extends Component{
    handleFocus = () => {
        store.dispatch(changeFocus(this.props.item.id));
    };
    handleStop = (e, data) => {
        store.dispatch(changePosition({
            top: data.y,
            left: data.x,
        }));
    };
    handleResize = (e, dir, ref, delta, position) => {
        store.dispatch(changeSize({
            width: ref.offsetWidth,
            height: ref.offsetHeight,
        }));
    };
    render() {
        const { focusId, item } = this.props;
        const { id, style } = item;
        const { left, top, width, height, zIndex} = style;
        return (
            <Rnd
                className={`${id === focusId ? 'focus' : ''}`}
                style={{backgroundColor: '#fff'}}
                dragAxis="both"
                size={{ width,  height }}
                position={{ x: left, y: top }}
                z={zIndex}
                minWidth={20}
                minHeight={20}
                resizeGrid={[1, 1]}
                dragGrid={[1, 1]}
                bounds="parent"
                onResizeStart={this.handleFocus}
                onResize={this.handleResize}
                onDragStart={this.handleFocus}
                onDragStop={this.handleStop}
            >
                {this.props.children}
            </Rnd>
        );
    }
}