/**created by panchong on 2018/2/24**/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import UndoRedo from './component/undoRedo';
import store from '../store';
import TextComponent from './component/text/textComponent';
import textModal from './component/text/textModal';
import ImageComponent from './component/image/imageComponent';
import imageModal from './component/image/imageModal';
import { addElement, deleteElement, changeFocus } from '../actions/actions';
import UploadFile from '../components/uploadFile';
import './editor.less';

class Editor extends Component{
    addText = () => {
        store.dispatch(addElement(new textModal()));
    };
    addImage = src => {
        store.dispatch(addElement(new imageModal(src)));
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
    handleStart = (event, ui) =>  {
        console.log('Event: ', event);
        console.log('Position: ', ui.position);
    };

    handleDrag = (event, ui) => {
        console.log('Event: ', event);
        console.log('Position: ', ui.position);
    };

    handleStop = (event, ui) => {
        console.log('Event: ', event);
        console.log('Position: ', ui.position);
    };
    render() {
        return [
            <UndoRedo/>,
            <button type="button" onClick={this.addText}>
                添加文字
            </button>,
            <UploadFile
                type="button"
                accept=".png, .jpeg, .jpg"
                fileSize={100}
                onChangeUrl={this.addImage}
            >
                <button type="button">添加图片</button>
            </UploadFile>,
            <button type="button" onClick={this.del}>
                删除
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
                            case 'image': return <ImageComponent
                                focusId={this.props.focusId}
                                item={item}
                                key={`element${index}`}
                            />;
                            default: break;
                        }
                    })
                }
            </div>,
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
