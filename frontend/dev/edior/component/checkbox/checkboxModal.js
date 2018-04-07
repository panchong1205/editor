/**created by panchong on 2018/3/14**/
import baseModal from '../baseModal';
import { EDITORELEMENTS } from '../../enumerate';

export default class OptionModal extends baseModal {
    constructor() {
        super();
        this.name = EDITORELEMENTS.checkbox;
        this.checkIndex = '';
        this.checkState = false;
        this.style = Object.assign({}, this.style, {
            width: 100,
            height: 38,
        });
    }
}