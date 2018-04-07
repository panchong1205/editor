/** created by panchong on 2018/2/24* */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Dropdown, message } from 'antd';
import { ActionCreators } from 'redux-undo';
import UndoRedo from './component/undoRedo';
import store from '../store';
import TextComponent from './component/text/textComponent';
import TextModal from './component/text/textModal';
import SetTextBoard from './component/text/setTextBoard';
import ImageComponent from './component/image/imageComponent';
import ImageModal from './component/image/imageModal';
import SetImageBoard from './component/image/setImageBoard';
import InputComponent from './component/input/inputComponent';
import InputModal from './component/input/inputModal';
import SetInputBoard from './component/input/setInputBoard';
import OptionModal from './component/option/optionModal';
import OptionComponent from './component/option/optionComponent';
import CheckboxModal from './component/checkbox/checkboxModal';
import CheckboxComponent from './component/checkbox/checkboxComponent';
import { addElement, deleteElement, changeFocus, setTop, setBottom, changeStyle, copyElement, clearAll } from '../actions/actions';
import UploadFile from '../components/uploadFile';
import * as device from './deviceSize';
import * as enumerate from './enumerate';
import './editor.less';

const SubMenu = Menu.SubMenu;
class Editor extends Component {
    constructor() {
        super();
        this.state = {
            options: [],
            optionVisible: false,
            contextMenuX: 0,
            contextMenuY: 0,
            contextMenuShow: false,
            contextMenuOpen: '',
        };
        this.copy = false;
    }
    componentDidMount() {
        this.handleClearAll();// 清空一下redux存储的编辑器相关内容
        store.dispatch(ActionCreators.clearHistory());
    }
    componentWillReceiveProps(nextProps) {
        const { elements } = nextProps;
        const options = [];
        if (elements.filter(item => item.name === enumerate.EDITORELEMENTS.option).length > 0) {
            elements.filter(item => item.name === enumerate.EDITORELEMENTS.option).map(item => {
                options.push(item.optionIndex);
            });
        }
        this.setState({
            options,
        });
    }
    addText = () => {
        store.dispatch(addElement(new TextModal()));
    };
    addImage = src => {
        store.dispatch(addElement(new ImageModal(src)));
    };
    addInput = e => {
        if (e.key === '1') {
            const newInput = new InputModal('line');
            newInput.style = Object.assign({}, newInput.style, {
                width: 100,
                borderBottom: 'solid 3px #000',
            });
            store.dispatch(addElement(newInput));
            return;
        }
        if (e.key === '2') {
            const newInput = new InputModal('square');
            newInput.style = Object.assign({}, newInput.style, {
                border: 'solid 3px #000',
            });
            store.dispatch(addElement(newInput));
            return;
        }
        if (e.key === '3') {
            const newInput = new InputModal('circle');
            newInput.style = Object.assign({}, newInput.style, {
                border: 'solid 3px #000',
            });
            store.dispatch(addElement(newInput));
            return;
        }
        if (e.key === '4') {
            const newInput = new InputModal('clarity');
            store.dispatch(addElement(newInput));
        }
    };
    addOption = e => {
        this.setState({
            optionVisible: true,
        });
        if (this.state.options.includes(e.key)) {
            return;
        }
        store.dispatch(addElement(new OptionModal(e.key)));
    };
    addCheckbox = () => {
        store.dispatch(addElement(new CheckboxModal()));
    };
    setTop = () => {
        store.dispatch(setTop());
    };
    setBottom = () => {
        store.dispatch(setBottom());
    };
    handleClearAll = () => {
        store.dispatch(clearAll());
    };
    blur = e => {
        if (e.target === e.currentTarget) { // 防止其他click事件影响
            store.dispatch(changeFocus(''));
        }
        this.setState({
            contextMenuShow: false,
        });
    };
    handleMenu = e => {
        e.preventDefault();
        const rect = document.getElementById('editor');
        const x = e.pageX - rect.offsetLeft;
        const y = e.pageY - rect.offsetTop;
        if (e.target === e.currentTarget) {
            this.setState({
                contextMenuShow: true,
                contextMenuX: x,
                contextMenuY: y,
                contextMenuOpen: 'sub1',
            });
            return;
        }
        if (!this.props.focusId) { // 没有选中元素时 直接返回
            message.error('请先选中元素');
            return;
        }
        this.setState({
            contextMenuShow: true,
            contextMenuX: x,
            contextMenuY: y,
            contextMenuOpen: 'sub2',
        });
    };
    handleContextClick = e => {
        if (e.key === '1') {
            this.handleClearAll();
        }
        if (e.key === '2') {
            store.dispatch(deleteElement());
        }
        if (e.key === '3') {
            this.copy = this.props.focus;
        }
        if (e.key === '4') {
            if (this.copy) {
                store.dispatch(copyElement(this.copy));
            }
        }
        this.setState({
            contextMenuShow: false,
        });
    };
    handleKeyDown = e => {
        e.preventDefault();
        if ((e.ctrlKey || e.metaKey) && e.keyCode === 86) { // 粘贴
            if (this.copy) {
                store.dispatch(copyElement(this.copy));
            }
        }
        if (!this.props.focusId) { // 不是粘贴操作时如果没有选中的元素则返回
            return;
        }
        const { name, style } = this.props.focus;
        const {
            width, height, top, left,
        } = style;
        if (e.keyCode === 8 || e.keyCode === 46) { // 删除
            store.dispatch(deleteElement());
            return;
        }
        if (e.keyCode === 38) { // 向上
            store.dispatch(changeStyle({
                top: top > 0 ? top - 1 : 0,
            }));
            return;
        }
        if (e.keyCode === 40) { // 向下
            store.dispatch(changeStyle({
                top: top < device.height - height ? top + 1 : device.height - height,
            }));
            return;
        }
        if (e.keyCode === 37) { // 向左
            store.dispatch(changeStyle({
                left: left > 0 ? left - 1 : 0,
            }));
            return;
        }
        if (e.keyCode === 39) { // 向右
            store.dispatch(changeStyle({
                left: left < device.width - width ? left + 1 : device.width - width,
            }));
            return;
        }
        if ((e.ctrlKey || e.metaKey) && e.keyCode === 67) { // 复制
            if (name === enumerate.EDITORELEMENTS.option) {
                return;
            }
            this.copy = this.props.focus;
        }
    };
    optionVisibleChange = flag => {
        this.setState({ optionVisible: flag });
    };
    render() {
        const { elements, focusId, focus, questionType } = this.props;
        const { contextMenuShow, contextMenuX, contextMenuY } = this.state;
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
        const selectMenu = (<Menu onClick={this.addOption} multiple selectedKeys={this.state.options}>
            <Menu.Item key="0">
                选项A
            </Menu.Item>
            <Menu.Item key="1">
                选项B
            </Menu.Item>
            <Menu.Item key="2">
                选项C
            </Menu.Item>
            <Menu.Item key="3">
                选项D
            </Menu.Item>
            <Menu.Item key="4">
                选项E
            </Menu.Item>
        </Menu>);
        return [
            <div className="flex_row_start flex_vertical_top editor">
                <div
                    className="editorContainer"
                    id="editor"
                    tabIndex={0}
                    onKeyDown={this.handleKeyDown}
                    onClick={this.blur}
                    onContextMenu={this.handleMenu}
                >
                    <div className="editorTool flex_row_around fs14 black">
                        <button type="button" onMouseDown={this.addText}>
                            <img src={require('../../image/editor/icon_1.png')} alt="文本" />
                            <p>文本</p>
                        </button>
                        <UploadFile
                            accept=".png, .jpeg, .jpg"
                            fileSize={2}
                            onChangeUrl={this.addImage}
                        >
                            <button type="button">
                                <img src={require('../../image/editor/icon_2.png')} alt="图片" />
                                <p>图片</p>
                            </button>
                        </UploadFile>
                        <Dropdown overlay={inputMenu} placement="bottomCenter">
                            <button type="button">
                                <img src={require('../../image/editor/icon_5.png')} alt="图片" />
                                <p>填空</p>
                            </button>
                        </Dropdown>
                        <Dropdown
                            overlay={selectMenu}
                            placement="bottomCenter"
                            onVisibleChange={this.optionVisibleChange}
                            visible={this.state.optionVisible}
                        >
                            <button type="button">
                                <img src={require('../../image/editor/icon-12.png')} alt="图片" />
                                <p>选项</p>
                            </button>
                        </Dropdown>
                        <button type="button" onClick={this.addCheckbox}>
                            <img src={require('../../image/editor/icon-11.png')} alt="图片" />
                            <p>勾选</p>
                        </button>
                        <UndoRedo />
                        <button type="button" onClick={this.setTop} disabled={!focusId}>
                            <img src={require('../../image/editor/icon_8.png')} alt="" />
                            <p>置于顶层</p>
                        </button>
                        <button type="button" onClick={this.setBottom} disabled={!focusId}>
                            <img src={require('../../image/editor/icon_9.png')} alt="" />
                            <p>置于底层</p>
                        </button>
                        <button type="button" onClick={this.handleClearAll} disabled={elements.length === 0}>
                            <img src={require('../../image/editor/icon_12.png')} alt="" />
                            <p>清空</p>
                        </button>
                    </div>
                    <Menu
                        onClick={this.handleContextClick}
                        className="contextMenu"
                        mode="inline"
                        style={{
                            width: 120,
                            position: 'absolute',
                            top: contextMenuY,
                            left: contextMenuX,
                            zIndex: elements.length + 1,
                        }}
                        selectedKeys={[]}
                        openKeys={contextMenuShow ? [this.state.contextMenuOpen] : []}
                    >
                        <SubMenu key="sub1">
                            <Menu.Item key="1">清空</Menu.Item>
                            {
                                this.copy ? <Menu.Item key="4">粘贴</Menu.Item> : null
                            }
                        </SubMenu>
                        <SubMenu key="sub2">
                            <Menu.Item key="2">删除</Menu.Item>
                            {
                                focus.name !== enumerate.EDITORELEMENTS.option ? <Menu.Item key="3">复制</Menu.Item> : null
                            }
                            {
                                this.copy ? <Menu.Item key="4">粘贴</Menu.Item> : null
                            }
                        </SubMenu>
                    </Menu>
                    {
                        this.props.elements.map((item, index) => {
                            switch (item.name) {
                                case enumerate.EDITORELEMENTS.text: return (<TextComponent
                                    focusId={focusId}
                                    item={item}
                                    key={`element${index}`}
                                />);
                                case enumerate.EDITORELEMENTS.image: return (<ImageComponent
                                    focusId={focusId}
                                    item={item}
                                    key={`element${index}`}
                                />);
                                case enumerate.EDITORELEMENTS.input: return (<InputComponent
                                    focusId={focusId}
                                    item={item}
                                    key={`element${index}`}
                                />);
                                case enumerate.EDITORELEMENTS.option: return (<OptionComponent
                                    focusId={focusId}
                                    item={item}
                                    key={`element${index}`}
                                />);
                                case enumerate.EDITORELEMENTS.checkbox: return (<CheckboxComponent
                                    focusId={focusId}
                                    item={item}
                                    key={`element${index}`}
                                />);
                                default: break;
                            }
                        })
                    }
                </div>
                {
                    focus.name === enumerate.EDITORELEMENTS.text ? <SetTextBoard focus={focus} /> : null
                }
                {
                    focus.name === enumerate.EDITORELEMENTS.image ? <SetImageBoard focus={focus} /> : null
                }
                {
                    focus.name === enumerate.EDITORELEMENTS.input ? <SetInputBoard focus={focus} /> : null
                }
            </div>,
        ];
    }
}
const mapStateToProps = state => ({
    elements: state.editorState.present.elements,
    focus: state.editorState.present.focus,
    focusId: state.editorState.present.focus.id,
});
export default connect(mapStateToProps)(Editor);
