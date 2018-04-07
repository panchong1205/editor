/** created by panchong on 2018/2/27* */
import React, { Component } from 'react';
import Rnd from 'react-rnd';
import store from '../../store';
import { changeFocus, changeStyle } from '../../actions/actions';
import * as device from '../deviceSize';

export default class DragAndResize extends Component {
    static defaultProps = {
        enableResizing: {
            top: true,
            right: true,
            bottom: true,
            left: true,
            topRight: true,
            bottomRight: true,
            bottomLeft: true,
            topLeft: true
        },
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
        const {
            item, enableResizing, disableDragging, className, style,
        } = this.props;
        const {
            left, top, width, height, zIndex,
        } = style;
        return (
            <Rnd
                className={className}
                dragAxis="both"
                size={{ width, height }}
                position={{ x: left, y: top }}
                z={zIndex}
                minWidth={20}
                minHeight={20}
                maxWidth={device.width}
                maxHeight={device.height}
                resizeGrid={[1, 1]}
                dragGrid={[1, 1]}
                bounds="parent"
                onResizeStart={this.handleFocus}
                onResize={this.handleResize}
                onDragStart={this.handleFocus}
                onDragStop={this.handleStop}
                onDrag={e => { e.preventDefault(); }}
                disableDragging={disableDragging}
                enableResizing={enableResizing}
            >
                {this.props.children}
            </Rnd>
        );
    }
}
