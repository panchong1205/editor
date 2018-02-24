/**created by panchong on 2018/2/24**/
import React, { Component } from 'react';
import store from '../../../store';
import { changeFocus } from '../../../actions/actions';

class TextComponent extends Component{
    handleFocus = id => {
        store.dispatch(changeFocus(id));
    };
    render() {
        const { id, style, content } = this.props.item;
        const { focusId } = this.props;
        return (
            <div
                className={`${id === focusId ? 'focus' : ''}`}
                style={style}
                key={`${Math.random()}`}
                onClick={() => this.handleFocus(id)}
            >{content}</div>
        );
    }
}
export default TextComponent;