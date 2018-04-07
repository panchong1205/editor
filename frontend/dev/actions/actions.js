/** created by panchong on 2018/2/24* */
import * as types from './types';

export function addElement(addElements) {
    return {
        type: types.ADD_ELEMENTS,
        addElements,
    };
}
export function copyElement(copyElements) {
    return {
        type: types.COPY_ELEMENTS,
        copyElements,
    };
}

export function deleteElement() {
    return {
        type: types.DELETE_ELEMENTS,
    };
}

export function clearAll() {
    return {
        type: types.CLEAR_ALL,
    };
}
export function changeFocus(focusId) {
    return {
        type: types.CHANGE_FOCUS,
        focusId,
    };
}

export function changeStyle(style, id = '') {
    return {
        type: types.CHANGE_STYLE,
        style,
        id,
    };
}

export function setTop() {
    return {
        type: types.SET_TOP,
    };
}

export function setBottom() {
    return {
        type: types.SET_BOTTOM,
    };
}

export function changeTextEditable(id, contentEditable) {
    return {
        type: types.CHANGE_TEXT_EDITABLE,
        id,
        contentEditable,
    };
}

export function changeTextContent(id, content) {
    return {
        type: types.CHANGE_TEXT_CONTENT,
        id,
        content,
    };
}

export function changeImageSrc(src) {
    return {
        type: types.CHANGE_IMAGE_SRC,
        src,
    };
}

export function changeInputAnswer(rightAnswer) {
    return {
        type: types.CHANGE_INPUT_ANSWER,
        rightAnswer,
    };
}
export function changeOptionState(optionIndex, optionState) {
    return {
        type: types.CHANGE_OPTION_STATE,
        optionIndex,
        optionState,
    };
}
export function changeCheckState(checkIndex, checkState) {
    return {
        type: types.CHANGE_CHECK_STATE,
        checkState,
        checkIndex,
    };
}
export function changeRadioNum(num) {
    return {
        type: types.CHANGE_RADIO_NUM,
        num,
    }
}
export function changeRadioAnswer(answer, id) {
    return {
        type: types.CHANGE_RADIO_ANSWER,
        answer,
        id,
    }
}
export function getQuestionDetail(elements) {
    return {
        type: types.QUESTION_DETAIL,
        elements,
    };
}
