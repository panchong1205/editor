/**created by panchong on 2018/2/24**/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Dropdown, Modal } from 'antd';
import UndoRedo from './component/undoRedo';
import store from '../store';
import TextComponent from './component/text/textComponent';
import textModal from './component/text/textModal';
import ImageComponent from './component/image/imageComponent';
import imageModal from './component/image/imageModal';
import InputComponent from './component/input/inputComponent';
import inputModal from './component/input/inputModal';
import { addElement, deleteElement, changeFocus, setTop, setBottom, changeImageSrc, changeStyle } from '../actions/actions';
import UploadFile from '../components/uploadFile';
import './editor.less';

class Editor extends Component{
    constructor() {
        super();
        this.state = {
            visible: false,
        }
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
    addInput = e => {
        if (e.key === '1') {
            const newInput = new inputModal('line');
            newInput.style = Object.assign({}, newInput.style, {
                width: 100,
                borderBottom: 'solid 3px #000',
            });
            store.dispatch(addElement(newInput));
            return;
        }
        if (e.key === '2') {
            const newInput = new inputModal('square');
            newInput.style = Object.assign({}, newInput.style, {
                border: 'solid 3px #000',
            });
            store.dispatch(addElement(newInput));
            return;
        }
        if (e.key === '3') {
            const newInput = new inputModal('circle');
            newInput.style = Object.assign({}, newInput.style, {
                border: 'solid 3px #000',
                borderRadius: 30,
            });
            store.dispatch(addElement(newInput));
            return;
        }
        if (e.key === '4') {
            const newInput = new inputModal('clarity');
            store.dispatch(addElement(newInput));
            return;
        }
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
    preview = () => {
        localStorage.stem = JSON.stringify(this.props.elements);
        this.setState({
            visible: true,
        })
    };
    blur = e => {
        if (e.target === e.currentTarget) {// 防止其他click事件影响
            store.dispatch(changeFocus(''));
        }
    };
    render() {
        const inputMenu = (<Menu onClick={this.addInput}>
            <Menu.Item key="1">
                横线
            </Menu.Item>
            <Menu.Item key="2">
                方框
            </Menu.Item>
            <Menu.Item key="3">
                圆圈
            </Menu.Item>
            <Menu.Item key="4">
                透明
            </Menu.Item>
        </Menu>);
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
            <Dropdown overlay={inputMenu} trigger={['click']} placement="bottomCenter">
                <button type="button">填空</button>
            </Dropdown>,
            <button type="button" onClick={this.setTop} disabled={!this.props.focusId}>
                设为顶层
            </button>,
            <button type="button" onClick={this.setBottom} disabled={!this.props.focusId}>
                设为底层
            </button>,
            <button type="button" onClick={this.del} disabled={!this.props.focusId}>
                删除
            </button>,
            <button type="button" onClick={this.preview}>预览</button>,
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
                            case 'input': return <InputComponent
                                focusId={this.props.focusId}
                                item={item}
                                key={`element${index}`}
                            />;
                            default: break;
                        }
                    })
                }
            </div>,
            <Modal
                title="Basic Modal"
                visible={this.state.visible}
                onCancel={() => {
                    this.setState({
                        visible: false,
                    })
                }}
            >
                <iframe src="questionHtml/fill.html" style={{
                    width: 500,
                    height: 400,
                }} />
            </Modal>,
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
