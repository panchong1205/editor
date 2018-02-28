/**created by panchong on 2018/2/24**/
import * as types from './types';

export function addElement(addElements) {
    return {
        type: types.ADD_ELEMENTS,
        addElements,
    }
}

export function deleteElement() {
    return {
        type: types.DELETE_ELEMENTS,
    }
}

export function changeFocus(focusId) {
    return {
        type: types.CHANGE_FOCUS,
        focusId,
    }
}

export function changeStyle(style) {
    return {
        type: types.CHANGE_STYLE,
        style,
    }
}

export function setTop() {
    return {
        type: types.SET_TOP,
    }
}

export function setBottom() {
    return {
        type: types.SET_BOTTOM,
    }
}

export function changeTextEditable(id, contentEditable) {
    return {
        type: types.CHANGE_TEXT_EDITABLE,
        id,
        contentEditable,
    }
}

export function changeTextContent(id, content) {
    return {
        type: types.CHANGE_TEXT_CONTENT,
        id,
        content,
    }
}

export function changeImageSrc(src) {
    return {
        type: types.CHANGE_IMAGE_SRC,
        src
    }
}