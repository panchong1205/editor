/**created by panchong on 2018/2/27**/
import React, { Component } from 'react';
import Rnd from 'react-rnd';
import store from '../../store';
import { changeFocus, changeStyle } from '../../actions/actions';

export default class DragAndResize extends Component{
    static defaultProps = {
        enableResizing: true,
        disableDragging: false,
        className: '',
    };
    handleFocus = () => {
        store.dispatch(changeFocus(this.props.item.id));
    };
    handleStop = (e, data) => {
        store.dispatch(changeStyle({
            top: data.y,
            left: data.x,
        }));
    };
    handleResize = (e, dir, ref, delta, position) => {
        store.dispatch(changeStyle({
            width: ref.offsetWidth,
            height: ref.offsetHeight,
        }));
    };
    render() {
        const { item, enableResizing, disableDragging, className } = this.props;
        const { style } = item;
        const { left, top, width, height, zIndex} = style;
        return (
            <Rnd
                className={className}
                style={{backgroundColor: '#fff'}}
                dragAxis="both"
                size={{ width: width + 2,  height: height + 2 }}
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
                disableDragging={disableDragging}
            >
                {this.props.children}
            </Rnd>
        );
    }
}