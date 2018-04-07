/**created by panchong on 2018/3/10**/
import baseModal from '../baseModal';
import { EDITORELEMENTS } from '../../enumerate';

export default class OptionModal extends baseModal {
    constructor(optionIndex = '') {
        super();
        this.name = EDITORELEMENTS.option;
        this.optionIndex = optionIndex;
        this.optionState = false;
        this.style = Object.assign({}, this.style, {
            width: 60,
            height: 38,
            fontSize: 32,
        });
    }
}
