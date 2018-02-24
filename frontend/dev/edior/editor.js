/**created by panchong on 2018/2/24**/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd'
import UndoRedo from './component/undoRedo';
import store from '../store';
import TextComponent from './component/text/textComponent';
import { addElement, deleteElement, changeFocus } from '../actions/actions';
import textModal from './component/text/textModal';
import './editor.less';

class Editor extends Component{
    add = () => {
        store.dispatch(addElement(new textModal()));
    };
    del = () => {
        if (!this.props.focusId) {
            message.error('请选择要删除的元素');
            return;
        }
        store.dispatch(deleteElement(this.props.focusId));
    };
    blur = e => {
        if (e.target === e.currentTarget) {// 防止其他click事件影响
            store.dispatch(changeFocus(''));
        }
    };
    render() {
        return [
            <UndoRedo/>,
            <button type="button" onClick={this.add}>
                add
            </button>,
            <button type="button" onClick={this.del}>
                delete
            </button>,
            <div className="editorContainer" onClick={this.blur}>
                {
                    this.props.elements.map((item, index) => {
                        switch (item.name) {
                            case 'text': return <TextComponent
                                    focusId={this.props.focusId}
                                    item={item}
                                    key={`element${index}`}
                                />;
                            default: break;
                        }
                    })
                }
            </div>
        ];
    }
}
const mapStateToProps = state => {
    return {
        elements: state.todos.present.elements,
        focus: state.todos.present.focus,
        focusId: state.todos.present.focus.id,
    };
};
export default connect(mapStateToProps)(Editor)
