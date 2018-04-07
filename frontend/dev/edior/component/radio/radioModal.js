/**created by panchong on 2018/4/2**/
import baseModal from '../baseModal';
import { EDITORELEMENTS } from '../../enumerate';

export default class RadioModal extends baseModal {
    constructor(num) {
        super();
        this.name = EDITORELEMENTS.radio;
        this.radioNum = num;
        this.radioAnswer = null;
        this.raidoIndex = '';
        this.style = Object.assign({}, this.style, {
            width: 200,
            height: 35,
        });
    }
}