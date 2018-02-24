/**created by panchong on 2018/2/24**/
import * as types from './types';

export function addElement(addElements) {
    return {
        type: types.ADD_ELEMENTS,
        addElements,
    }
}

export function deleteElement(deleteId) {
    return {
        type: types.DELETE_ELEMENTS,
        deleteId,
    }
}

export function changeFocus(focusId) {
    return {
        type: types.CHANGE_FOCUS,
        focusId,
    }
}