/** created by panchong on 2018/2/24* */
import React, { Component } from 'react';
import DragAndResize from '../dragAndResize';
import {
    changeTextEditable,
    changeFocus,
    changeTextContent,
    changeStyle,
} from '../../../actions/actions';
import store from '../../../store';

class TextComponent extends Component {
    componentWillReceiveProps(nextProps) {
        const { focusId } = nextProps;
        const { item } = nextProps;
        const { id, style, content } = item;
        if (focusId !== item.id && item.contentEditable) {
            this.changeEditableFalse(content, id);
        }
    }
    changeEditableTrue = e => {
        if (!this.props.item.contentEditable) {
            store.dispatch(changeTextEditable(this.props.item.id, true));
        }
    };
    changeEditableFalse = (inner, id) => {
        if (this.props.item.contentEditable) {
            store.dispatch(changeTextContent(id, inner));
            store.dispatch(changeTextEditable(id, false));
        }
    };
    handleInput = e => {
        const { style, id } = this.props.item;
        store.dispatch(changeTextContent(id, e.target.value));
    };
    handleBlur = e => {
        const { style, id } = this.props.item;
        this.changeEditableFalse(e.target.value, id);
    };
    render() {
        const { focusId, item } = this.props;
        const {
            style, content, contentEditable, id,
        } = item;
        const {
            fontSize, color, textAlign, position, width, height,
            fontWeight, textDecoration, fontStyle, fontFamily, lineHeight,
        } = style;
        return (
            <DragAndResize
                disableDragging={contentEditable}
                focusId={focusId}
                item={item}
                style={style}
                className={`${contentEditable ? 'cursor-text' : 'cursor-default'}`}
            >
                <div
                    onDoubleClick={this.changeEditableTrue}
                    onKeyDown={e => { e.stopPropagation(); }}
                    onMouseMove={e => { if (!contentEditable) { e.preventDefault(); } }}
                >
                    <textarea
                        style={{
                            width: '100%',
                            height: '100%',
                            lineHeight,
                            fontSize,
                            color,
                            textAlign,
                            position,
                            fontWeight,
                            textDecoration,
                            fontStyle,
                            fontFamily,
                        }}
                        className={`${id === focusId ? 'focus' : ''}`}
                        placeholder="双击文字编辑"
                        disabled={!contentEditable}
                        autoFocus
                        value={content}
                        onChange={this.handleInput}
                        onBlur={this.handleBlur}
                    />
                </div>
            </DragAndResize>
        );
    }
}
export default TextComponent;
