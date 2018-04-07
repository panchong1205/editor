/** created by panchong on 2018/2/28* */
import baseModal from '../baseModal';
import { EDITORELEMENTS } from '../../enumerate';

export default class InputModal extends baseModal {
    constructor(inputShape = '') {
        super();
        this.name = EDITORELEMENTS.input;
        this.inputShape = inputShape;
        this.rightAnswer = '';
        this.userAnswer = '';
        this.isRight = false;
        this.style = Object.assign({}, this.style, {
            width: 60,
            height: 60,
            fontSize: 32,
            textAlign: 'center',
            color: 'blue',
        });
    }
}
