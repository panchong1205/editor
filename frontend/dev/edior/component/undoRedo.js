/**created by panchong on 2018/2/24**/
import React, { Component } from 'react'
import { ActionCreators as UndoActionCreators } from 'redux-undo'
import { connect } from 'react-redux'

class UndoRedo extends Component{
    render() {
        return [
            <button onClick={() => { this.props.onUndo(); }} disabled={!this.props.canUndo}>
                Undo
            </button>,
            <button onClick={() => { this.props.onRedo(); }} disabled={!this.props.canRedo}>
                Redo
            </button>,
        ]
    }
}
const mapStateToProps = (state) => {
    return {
        canUndo: state.todos.past.length > 0,
        canRedo: state.todos.future.length > 0
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onUndo: () => dispatch(UndoActionCreators.undo()),
        onRedo: () => dispatch(UndoActionCreators.redo())
    }
}

UndoRedo = connect(
    mapStateToProps,
    mapDispatchToProps
)(UndoRedo)

export default UndoRedo;