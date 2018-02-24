/**created by panchong on 2018/2/24**/
import undoable from 'redux-undo'
import { ADD_ELEMENTS,
    DELETE_ELEMENTS,
    CHANGE_FOCUS,
} from '../actions/types';


const initialState = {
    elements: [],
    focus: {},
};
const todo = (state = initialState, action) => {
    let newElements = null;
    switch (action.type) {
        case ADD_ELEMENTS:
            newElements = state.elements.concat(action.addElements);
            return Object.assign({}, state, {
                elements: newElements,
                focus: action.addElements,
            });
        case DELETE_ELEMENTS:
            newElements = state.elements.filter(item => item.id !== action.deleteId);
            return Object.assign({}, state, {
                elements: newElements,
                focus: {},
            });
        case CHANGE_FOCUS:
            const focus = state.elements.find(item => item.id === action.focusId);
            return Object.assign({}, state, {
                focus: focus ? focus : {},
            });
        default:
            return state
    }
}
const undoableTodos = undoable(todo)
export default undoableTodos