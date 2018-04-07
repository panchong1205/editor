/** created by panchong on 2018/2/24* */
import React, { Component } from 'react';
import { ActionCreators as UndoActionCreators } from 'redux-undo';
import { connect } from 'react-redux';

class UndoRedo extends Component {
    render() {
        return [
            <button type="button" onClick={() => { this.props.onUndo(); }} disabled={!this.props.canUndo}>
                <img src={require('../../../image/editor/icon_6.png')} alt="" />
                <p>撤销</p>
            </button>,
            <button type="button" onClick={() => { this.props.onRedo(); }} disabled={!this.props.canRedo}>
                <img src={require('../../../image/editor/icon_7.png')} alt="" />
                <p>重做</p>
            </button>,
        ];
    }
}
const mapStateToProps = state => ({
    canUndo: state.editorState.past.length > 0,
    canRedo: state.editorState.future.length > 0,
});

const mapDispatchToProps = dispatch => ({
    onUndo: () => dispatch(UndoActionCreators.undo()),
    onRedo: () => dispatch(UndoActionCreators.redo()),
});

UndoRedo = connect(
    mapStateToProps,
    mapDispatchToProps,
)(UndoRedo);

export default UndoRedo;
