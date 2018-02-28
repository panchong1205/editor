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
import { addElement, deleteElement, changeFocus, setTop, setBottom, changeImageSrc } from '../actions/actions';
import UploadFile from '../components/uploadFile';
import './editor.less';

class Editor extends Component{
    constructor() {
        super();
    }
    addText = () => {
        store.dispatch(addElement(new textModal()));
    };
    addImage = src => {
        store.dispatch(addElement(new imageModal(src)));
    };
    changeImage = src => {
        store.dispatch(changeImageSrc(src));
    };
    setTop = () => {
        store.dispatch(setTop());
    };
    setBottom = () => {
        store.dispatch(setBottom());
    };
    del = () => {
        store.dispatch(deleteElement());
    };
    blur = e => {
        if (e.target === e.currentTarget) {// 防止其他click事件影响
            store.dispatch(changeFocus(''));
        }
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
            <UploadFile
                type="button"
                accept=".png, .jpeg, .jpg"
                fileSize={100}
                onChangeUrl={this.changeImage}
            >
                <button type="button" disabled={!this.props.focusId}>更换图片</button>
            </UploadFile>,
            <button type="button" onClick={this.setTop} disabled={!this.props.focusId}>
                设为顶层
            </button>,
            <button type="button" onClick={this.setBottom} disabled={!this.props.focusId}>
                设为底层
            </button>,
            <button type="button" onClick={this.del} disabled={!this.props.focusId}>
                删除
            </button>,
            <div className="editorContainer" id="editor" onClick={this.blur}>
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
