/**created by panchong on 2018/2/24**/
import { combineReducers } from 'redux'
import undoableTodos from './todos'

const todoApp = combineReducers({
    todos: undoableTodos,
});

export default todoApp
