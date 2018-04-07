/** created by panchong on 2018/2/24* */
import baseModal from '../baseModal';
import { EDITORELEMENTS } from '../../enumerate';

export default class TextModal extends baseModal {
    constructor(content = '') {
        super();
        this.name = EDITORELEMENTS.text;
        this.content = content;
        this.contentEditable = false;
        this.style = Object.assign({}, this.style, {
            width: 200,
            height: 40,
            fontSize: 30,
            color: '#333',
            fontWeight: 'normal',
            textDecoration: 'none',
            fontStyle: 'normal',
            fontFamily: 'none',
            textAlign: 'left',
            lineHeight: 1.3,
        });
    }
}
