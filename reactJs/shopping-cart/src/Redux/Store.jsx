import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ShopReducer from './ShopReducer';

const Store = createStore(ShopReducer,composeWithDevTools());

export default Store;