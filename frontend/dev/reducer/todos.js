/**created by panchong on 2018/2/24**/
import undoable from 'redux-undo';
import { fromJS, Map, List} from 'immutable';
import { ADD_ELEMENTS,
    DELETE_ELEMENTS,
    CHANGE_FOCUS,
    CHANGE_STYLE,
    SET_TOP,
    SET_BOTTOM,
    CHANGE_TEXT_EDITABLE,
    CHANGE_TEXT_CONTENT,
    CHANGE_IMAGE_SRC,
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
    if (action.type === CHANGE_STYLE) {
        const idx = elements.findIndex(item => item.id === focus.id);
        const style = Object.assign({}, focus.style, action.style);
        const newElement = Object.assign({}, focus, { style });
        newElements = fromJS(elements).set(idx, newElement);
        return Object.assign({}, state, {
            elements: newElements.toJS(),
            focus: newElement,
        });
    }
    if (action.type === SET_TOP) {
        const idx = elements.findIndex(item => item.id === focus.id);
        elements.map(item => {
            item.style.zIndex = item.style.zIndex >= elements.length ? elements.length - 1 : item.style.zIndex;
            return item;
        });
        const style = Object.assign({}, focus.style, {zIndex: elements.length});
        const newElement = Object.assign({}, focus, { style });
        newElements = fromJS(elements).set(idx, newElement);
        return Object.assign({}, state, {
            elements: newElements.toJS(),
            focus: newElement,
        });
    }
    if (action.type === SET_BOTTOM) {
        const idx = elements.findIndex(item => item.id === focus.id);
        elements.map(item => {
            item.style.zIndex = item.style.zIndex === 0 ? item.style.zIndex + 1 : item.style.zIndex;
            return item;
        });
        const style = Object.assign({}, focus.style, { zIndex: 0 });
        const newElement = Object.assign({}, focus, { style });
        newElements = fromJS(elements).set(idx, newElement);
        return Object.assign({}, state, {
            elements: newElements.toJS(),
            focus: newElement,
        });
    }
    if (action.type === CHANGE_TEXT_EDITABLE) {
        const idx = elements.findIndex(item => item.id === action.id);
        const element = elements.filter(item => item.id === action.id)[0];
        const newElement = Object.assign({}, element, { contentEditable: action.contentEditable });
        newElements = fromJS(elements).set(idx, newElement);
        return Object.assign({}, state, {
            elements: newElements.toJS(),
        });
    }
    if (action.type === CHANGE_TEXT_CONTENT) {
        const idx = elements.findIndex(item => item.id === action.id);
        const element = elements.filter(item => item.id === action.id)[0];
        const newElement = Object.assign({}, element, { content: action.content });
        newElements = fromJS(elements).set(idx, newElement);
        return Object.assign({}, state, {
            elements: newElements.toJS(),
        });
    }
    if (action.type === CHANGE_IMAGE_SRC) {
        const idx = elements.findIndex(item => item.id === focus.id);
        const element = elements.filter(item => item.id === focus.id)[0];
        const newElement = Object.assign({}, element, { src: action.src });
        newElements = fromJS(elements).set(idx, newElement);
        return Object.assign({}, state, {
            elements: newElements.toJS(),
        });
    }
    return state;
};
const undoableTodos = undoable(todo);
export default undoableTodos;