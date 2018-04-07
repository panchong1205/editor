/** created by panchong on 2018/2/24* */
import { combineReducers } from 'redux';
import editorTodos from './edior/editorTodos';

const todoApp = combineReducers({
    editorState: editorTodos,
});

export default todoApp;
