/**created by panchong on 2018/2/28**/
import baseModal from '../baseModal';
export default class inputModal extends baseModal{
    constructor(inputShape = '') {
        super();
        this.name = 'input';
        this.inputShape = inputShape;
        this.rightAnswer = '';
        this.userAnswer = null;
        this.isRight = false;
        this.style = Object.assign({}, this.style, {
            width: 60,
            height: 60,
            fontSize: 16,
            textAlign: 'center',
            verticalAlign: 'middle',
        });
    }
}