/**created by panchong on 2018/2/24**/
import moment from 'moment';

const newElementId = () => moment().format('x') + '' + Math.random();
export default newElementId;