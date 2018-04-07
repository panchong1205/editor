/** created by panchong on 2018/2/23* */
import { createStore } from 'redux';
import todoApp from './reducer';

const store = createStore(todoApp);
export default store;
