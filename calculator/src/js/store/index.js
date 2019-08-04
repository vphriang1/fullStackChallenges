import rootReducer from '../reducers/index';
import { createStore } from 'Redux';

const store = createStore(rootReducer);
export default store;
