/**created by panchong on 2018/3/14**/
import React, { Component } from 'react';
import { Checkbox } from 'antd';
import DragAndResize from '../dragAndResize';
import { changeCheckState } from '../../../actions/actions';
import store from '../../../store';

class CheckboxComponent extends Component {
    changeCheck = (idx, e) => {
        store.dispatch(changeCheckState(idx, e.target.checked));
    };
    render() {
        const { focusId, item } = this.props;
        const { style, id, checkIndex, checkState } = item;
        return (
            <DragAndResize
                enableResizing={false}
                focusId={focusId}
                item={item}
                style={style}
                className={`${id === focusId ? 'focus' : ''}`}
            >
                <Checkbox checked={checkState} onChange={e => this.changeCheck(checkIndex, e)}>
                    {`勾选${Number.parseInt(checkIndex) + 1}`}
                </Checkbox>
            </DragAndResize>
        );
    }
}
export default CheckboxComponent;
