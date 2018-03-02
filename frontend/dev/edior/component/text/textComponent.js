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
        const html_content = e.target.innerHTML;
        const dom_now = document.createElement('div');
        dom_now.innerHTML = html_content;
        const dom_span = dom_now.childNodes;
        console.log(dom_span);
        let text_show = '';
        dom_span.forEach(item=>{
            console.log('nodeName', item.nodeName);
            console.log('nodeValue', item.nodeValue);
            console.log('innerText', item.innerText);
            text_show += this.contentChange(item);
        });
        store.dispatch(changeTextContent(this.props.item.id, text_show));
        this.changeEditableFalse();
    };
    contentChange = (item) => {
        let text_show = '';
        item.nodeName === '#text' ? text_show += item.nodeValue : null;
        item.nodeName === 'BR' ? text_show += '<br/ >' : null;
        item.nodeName === 'P' ? text_show += item.innerText + '<br/ >' : null;
        item.nodeName === 'SPAN' ? text_show += item.innerText + '<br/ >' : null;
        item.nodeName === 'DIV' ? text_show += item.innerText + '<br/ >' : null;
        return text_show
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