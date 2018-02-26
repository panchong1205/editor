/**created by panchong on 2018/2/26**/
import React, { Component } from 'react';
import ResizableBox from 'react-resizable'
import Draggable from 'react-draggable';
import store from '../../../store';
import { changeFocus } from '../../../actions/actions';

class ImageComponent extends Component{
    handleFocus = e => {
        e.stopPropagation();
        store.dispatch(changeFocus(this.props.item.id));
    };
    handleStart = (e, ui) =>  {
        console.log('Event: ', e);
        console.log('Position: ', ui.position);
    };

    handleDrag = (e, ui) => {
        e.preventDefault();
        console.log('Event: ', e);
        console.log('Position: ', ui.position);
    };

    handleStop = (e, ui) => {
        console.log('Event: ', e);
        console.log('Position: ', ui.position);
    };
    render() {
        const { id, style, src } = this.props.item;
        const { focusId } = this.props;
        const { left, top} = style;
        return (
            <Draggable
                axis="both"
                handle=".imageHandle"
                defaultPosition={{x: left, y: top}}
                bounds="parent"
                grid={[1, 1]}
                onStart={this.handleStart}
                onDrag={this.handleDrag}
                onStop={this.handleStop}>
                <img className={`imageHandle ${id === focusId ? 'focus' : ''}`}
                     style={style}
                     src={src}
                     onClick={this.handleFocus}/>
            </Draggable>
        );
    }
}
export default ImageComponent;