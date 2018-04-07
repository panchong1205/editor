/** created by panchong on 2018/2/24* */
import undoable from 'redux-undo';
import { fromJS } from 'immutable';
import {
    ADD_ELEMENTS,
    DELETE_ELEMENTS,
    CHANGE_FOCUS,
    CHANGE_STYLE,
    SET_TOP,
    SET_BOTTOM,
    CHANGE_TEXT_EDITABLE,
    CHANGE_TEXT_CONTENT,
    CHANGE_IMAGE_SRC,
    COPY_ELEMENTS,
    CLEAR_ALL,
    CHANGE_INPUT_ANSWER,
    QUESTION_DETAIL,
    CHANGE_OPTION_STATE,
    CHANGE_CHECK_STATE,
    CHANGE_RADIO_ANSWER,
} from '../actions/types';
import newElementId from './component/newElementId';
import { EDITORELEMENTS } from './enumerate';

const initialState = {
    elements: [],
    focus: {},
};
const todo = (state = initialState, action) => {
    let newElements = null;
    const { elements, focus } = state;
    if (action.type === ADD_ELEMENTS) {
        newElements = elements.concat(action.addElements);
        if (action.addElements.name === EDITORELEMENTS.checkbox) {
            let checkElements = newElements.filter(item => item.name === EDITORELEMENTS.checkbox);
            newElements = newElements.filter(item => item.name !== EDITORELEMENTS.checkbox);
            checkElements = checkElements.map((item, index) => {
                item.checkIndex = index + '';
                return item;
            });
            newElements = newElements.concat(checkElements);
        }
        if (action.addElements.name === EDITORELEMENTS.radio) {
            let radioElements = newElements.filter(item => item.name === EDITORELEMENTS.radio);
            newElements = newElements.filter(item => item.name !== EDITORELEMENTS.radio);
            radioElements = radioElements.map((item, index) => {
                item.radioIndex = index + '';
                return item;
            });
            newElements = newElements.concat(radioElements);
        }
        return Object.assign({}, state, {
            elements: newElements,
            focus: {},
        });
    }
    if (action.type === COPY_ELEMENTS) {
        const style = Object.assign({}, action.copyElements.style, {
            top: action.copyElements.style.top + 20,
            left: action.copyElements.style.left + 20,
        });
        let newElement = Object.assign({}, action.copyElements, {
            id: newElementId(),
            key: newElementId(),
            style,
        });
        const optionElements = elements.filter(item => item.name === EDITORELEMENTS.option);
        if (action.copyElements.name === EDITORELEMENTS.option && optionElements.length < 5) {
            newElement = Object.assign({}, newElement, {
                optionIndex: optionElements.length.toString(),
            });
            newElements = elements.concat(newElement);
            return Object.assign({}, state, {
                elements: newElements,
                focus: newElement,
            });
        }
        if (action.copyElements.name === EDITORELEMENTS.option && optionElements.length >= 5) {
            return Object.assign({}, state, {
                elements,
                focus,
            });
        }
        newElements = elements.concat(newElement);
        if (action.copyElements.name === EDITORELEMENTS.checkbox) {
            let checkElements = newElements.filter(item => item.name === EDITORELEMENTS.checkbox);
            newElements = newElements.filter(item => item.name !== EDITORELEMENTS.checkbox);
            checkElements = checkElements.map((item, index) => {
                item.checkIndex = index + '';
                return item;
            });
            newElements = newElements.concat(checkElements);
        }
        if (action.copyElements.name === EDITORELEMENTS.radio) {
            let radioElements = newElements.filter(item => item.name === EDITORELEMENTS.radio);
            newElements = newElements.filter(item => item.name !== EDITORELEMENTS.radio);
            radioElements = radioElements.map((item, index) => {
                item.radioIndex = index + '';
                return item;
            });
            newElements = newElements.concat(radioElements);
        }
        return Object.assign({}, state, {
            elements: newElements,
            focus: newElement,
        });
    }
    if (action.type === DELETE_ELEMENTS) {
        newElements = elements.filter(item => item.id !== focus.id);
        if (focus.name === EDITORELEMENTS.checkbox) {
            let checkElements = newElements.filter(item => item.name === EDITORELEMENTS.checkbox);
            newElements = newElements.filter(item => item.name !== EDITORELEMENTS.checkbox);
            checkElements = checkElements.map((item, index) => {
                item.checkIndex = index + '';
                return item;
            });
            newElements = newElements.concat(checkElements);
        }
        if (focus.name === EDITORELEMENTS.radio) {
            let radioElements = newElements.filter(item => item.name === EDITORELEMENTS.radio);
            newElements = newElements.filter(item => item.name !== EDITORELEMENTS.radio);
            radioElements = radioElements.map((item, index) => {
                item.radioIndex = index + '';
                return item;
            });
            newElements = newElements.concat(radioElements);
        }
        return Object.assign({}, state, {
            elements: newElements,
            focus: {},
        });
    }
    if (action.type === CLEAR_ALL) {
        return {
            elements: [],
            focus: {},
        };
    }
    if (action.type === CHANGE_FOCUS) {
        const newFocus = elements.find(item => item.id === action.focusId);
        return Object.assign({}, state, {
            focus: newFocus || {},
        });
    }
    if (action.type === CHANGE_STYLE) {
        let idx = elements.findIndex(item => item.id === focus.id);
        let current = focus;
        if (action.id) {
            idx = elements.findIndex(item => item.id === action.id);
            current = elements.find(item => item.id === action.id);
        }
        const style = Object.assign({}, current.style, action.style);
        const newElement = Object.assign({}, current, { style });
        newElements = fromJS(elements).set(idx, newElement);
        if (action.id) {
            return Object.assign({}, state, {
                elements: newElements.toJS(),
            });
        }
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
        const style = Object.assign({}, focus.style, { zIndex: elements.length });
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
            item.style.zIndex = item.style.zIndex <= 0 ? item.style.zIndex + 1 : item.style.zIndex;
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
        const element = elements.find(item => item.id === action.id);
        const newElement = Object.assign({}, element, { contentEditable: action.contentEditable });
        newElements = fromJS(elements).set(idx, newElement);
        if (action.contentEditable) {
            return Object.assign({}, state, {
                elements: newElements.toJS(),
                focus: newElement,
            });
        }
        return Object.assign({}, state, {
            elements: newElements.toJS(),
        });
    }
    if (action.type === CHANGE_TEXT_CONTENT) {
        const idx = elements.findIndex(item => item.id === action.id);
        const element = elements.find(item => item.id === action.id);
        const newElement = Object.assign({}, element, { content: action.content });
        newElements = fromJS(elements).set(idx, newElement);
        if (action.id !== focus.id) {
            return Object.assign({}, state, {
                elements: newElements.toJS(),
            });
        }
        return Object.assign({}, state, {
            elements: newElements.toJS(),
            focus: newElement,
        });
    }
    if (action.type === CHANGE_IMAGE_SRC) {
        const idx = elements.findIndex(item => item.id === focus.id);
        const element = elements.find(item => item.id === focus.id);
        const newElement = Object.assign({}, element, { src: action.src });
        newElements = fromJS(elements).set(idx, newElement);
        return Object.assign({}, state, {
            elements: newElements.toJS(),
            focus: newElement,
        });
    }
    if (action.type === CHANGE_INPUT_ANSWER) {
        const idx = elements.findIndex(item => item.id === focus.id);
        const element = elements.find(item => item.id === focus.id);
        const newElement = Object.assign({}, element, { rightAnswer: action.rightAnswer });
        newElements = fromJS(elements).set(idx, newElement);
        return Object.assign({}, state, {
            elements: newElements.toJS(),
            focus: newElement,
        });
    }
    if (action.type === CHANGE_OPTION_STATE) {
        const idx = elements.findIndex(item => item.optionIndex === action.optionIndex);
        const element = elements.find(item => item.optionIndex === action.optionIndex);
        const newElement = Object.assign({}, element, { optionState: action.optionState });
        newElements = fromJS(elements).set(idx, newElement);
        return Object.assign({}, state, {
            elements: newElements.toJS(),
            focus: newElement,
        });
    }
    if (action.type === CHANGE_CHECK_STATE) {
        const idx = elements.findIndex(item => item.checkIndex === action.checkIndex);
        const element = elements.find(item => item.checkIndex === action.checkIndex);
        const newElement = Object.assign({}, element, { checkState: action.checkState });
        newElements = fromJS(elements).set(idx, newElement);
        return Object.assign({}, state, {
            elements: newElements.toJS(),
            focus: newElement,
        });
    }
    if (action.type === QUESTION_DETAIL) {
        return {
            elements: action.elements,
            focus: {},
        };
    }
    return state;
};
const editorTodos = undoable(todo, {
    neverSkipReducer: false,
    filter: (action, currentState, previousHistory) => {
        return action.type !== QUESTION_DETAIL;
    },
});
export default editorTodos;
