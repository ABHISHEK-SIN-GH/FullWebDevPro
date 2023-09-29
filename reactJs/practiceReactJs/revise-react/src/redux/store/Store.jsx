import {createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import BatReducer from '../reducers/BatReducer';
import RootReducer from '../reducers/RootReducer';
// const Store = createStore(BatReducer,composeWithDevTools());
const Store = createStore(RootReducer,composeWithDevTools());
export default Store;