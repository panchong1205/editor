/**created by panchong on 2018/2/24**/
import React, { Component } from 'react';
import DragAndResize from '../dragAndResize';
import { changeTextEditable, changeFocus, changeTextContent, changeStyle } from '../../../actions/actions';
import store from '../../../store';

class TextComponent extends Component{
    constructor() {
        super();
    }
    handleFocus = () => {
        store.dispatch(changeFocus(this.props.item.id));
    };
    changeEditableTrue = () => {
        this.handleFocus();
        store.dispatch(changeTextEditable(this.props.item.id, true));
    };
    changeEditableFalse = () => {
        store.dispatch(changeTextEditable(this.props.item.id, false));
    };
    handleBlur = e => {
        const width = document.getElementById(`text${this.props.item.id}`).scrollWidth;
        const height = document.getElementById(`text${this.props.item.id}`).scrollHeight;
        store.dispatch(changeStyle({
            width,
            height,
        }));
        store.dispatch(changeTextContent(this.props.item.id, e.target.innerHTML));
        this.changeEditableFalse();
    };
    render() {
        const { focusId, item } = this.props;
        const { style, content, contentEditable, id } = item;
        const {lineHeight, fontSize, color, textAlign, position} = style;
        return (
            <DragAndResize
                focusId={focusId}
                item={item}
            >
                <div
                    style={{
                        width: 'auto',
                        height: 'auto',
                        lineHeight,
                        fontSize,
                        color,
                        textAlign,
                        whiteSpace: 'nowrap',
                        outline: 'none',
                        position,
                    }}
                    className={`${id === focusId ? 'focus' : ''}`}
                    id={`text${id}`}
                    contentEditable={contentEditable}
                    dangerouslySetInnerHTML={{__html: content}}
                    onBlur={this.handleBlur}
                    onDoubleClick={this.changeEditableTrue}>
                </div>
            </DragAndResize>
        );
    }
}
export default TextComponent;