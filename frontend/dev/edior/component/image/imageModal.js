/**created by panchong on 2018/2/26**/
import baseModal from '../baseModal';
export default class imageModal extends baseModal{
    constructor(src = '') {
        super();
        this.name = 'image';
        this.src = src + '?m=' + Math.random();
        this.style = Object.assign({}, this.style, {
            width: 100,
            height: 100,
        });
    }
}