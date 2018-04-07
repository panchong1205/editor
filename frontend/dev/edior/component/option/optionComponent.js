/**created by panchong on 2018/3/10**/
import React, { Component } from 'react';
import { Checkbox } from 'antd';
import DragAndResize from '../dragAndResize';
import store from '../../../store';
import { changeOptionState } from '../../../actions/actions';

class OptionComponent extends Component {
    changeCheck = (idx, e) => {
        store.dispatch(changeOptionState(idx, e.target.checked));
    };
    render() {
        const { focusId, item } = this.props;
        const { style, id, optionIndex, optionState } = item;
        const { fontSize } = style;
        return (
            <DragAndResize
                enableResizing={false}
                focusId={focusId}
                item={item}
                style={style}
                className={`${id === focusId ? 'focus' : ''}`}
            >
                <Checkbox style={{
                    fontSize: 32,
                    lineHeight: '32px',
                    display: 'inline-block',
                }} onChange={e => this.changeCheck(optionIndex, e)} checked={optionState} />
                <p style={{ fontSize: 32, lineHeight: '32px', display: 'inline-block' }}>{String.fromCharCode(65 + Number.parseInt(optionIndex))}</p>
            </DragAndResize>
        );
    }
}
export default OptionComponent;
