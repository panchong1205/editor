/**created by panchong on 2018/2/24**/
import newElementId from './newElementId';

export default class baseModal{
    constructor() {
        this.id = newElementId();
        this.key = newElementId();
        this.style = {
            position: 'absolute',
            zIndex: 0,
            left: 0,
            top: 0,
        };
    }
}