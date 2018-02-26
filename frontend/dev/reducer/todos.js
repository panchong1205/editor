/**created by panchong on 2018/2/24**/
import undoable from 'redux-undo';
import { fromJS, Map, List} from 'immutable';
import { ADD_ELEMENTS,
    DELETE_ELEMENTS,
    CHANGE_FOCUS,
    CHANGE_SIZE,
} from '../actions/types';


const initialState = {
    elements: [],
    focus: {},
};
const todo = (state = initialState, action) => {
    let newElements = null;
    const elements = state.elements;
    const focus = state.focus;
    if (action.type === ADD_ELEMENTS) {
        newElements = elements.concat(action.addElements);
        return Object.assign({}, state, {
            elements: newElements,
            focus: action.addElements,
        });
    }
    if (action.type === DELETE_ELEMENTS) {
        newElements = elements.filter(item => item.id !== focus.id);
        return Object.assign({}, state, {
            elements: newElements,
            focus: {},
        });
    }
    if (action.type === CHANGE_FOCUS) {
        const newFocus = elements.find(item => item.id === action.focusId);
        return Object.assign({}, state, {
            focus: newFocus ? newFocus : {},
        });
    }
    if (action.type === CHANGE_SIZE) {
        const idx = elements.findIndex(item => item.id === focus.id);
        const element = elements.find(item => item.id === focus.id);
        const style = Object.assign({}, element.style, action.styleSize);
        const newElement = Object.assign({}, element, { style });
        newElements = fromJS(elements).set(idx, newElement);
        return Object.assign({}, state, {
            elements: newElements.toJS(),
        });
    }
    return state;
}
const undoableTodos = undoable(todo);
export default undoableTodos;