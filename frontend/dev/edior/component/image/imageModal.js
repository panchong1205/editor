/** created by panchong on 2018/2/26* */
import baseModal from '../baseModal';
import { EDITORELEMENTS } from '../../enumerate';

export default class ImageModal extends baseModal {
    constructor(src = '') {
        super();
        this.name = EDITORELEMENTS.image;
        this.src = `${src}?m=${Math.random()}`;
        this.style = Object.assign({}, this.style, {
            width: 100,
            height: 100,
        });
    }
}
