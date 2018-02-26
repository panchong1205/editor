/**created by panchong on 2018/2/24**/
import baseModal from '../baseModal';
export default class textModal extends baseModal{
    constructor() {
        super();
        this.name = 'text';
        this.content = '双击文字编辑';
        this.style = Object.assign({}, this.style, {
            width: 100,
            height: 30,
            lineHeight: '30px',
            fontSize: 14,
            color: '#333',
            textAlign: 'left',
        });
    }
}