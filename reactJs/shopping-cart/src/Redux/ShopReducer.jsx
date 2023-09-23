import products from '../ProductData';
import { ADD_TO_CART, DELETE_ITEM_FROM_CART, SET_CURRENT_PRODUCT, UPDATE_ITEM_QTY_IN_CART } from '../Actions'

const initialState = {
    products:products,
    currentItem:null,
    cart:[]
}

const ShopReducer = (state=initialState,action) => {
    switch(action.type){
        case ADD_TO_CART:
            const item = state.products.find((product)=>{return product.proId===action.payload.proId});
            const inCart = ( state.cart.find((product)=>{return product.proId===action.payload.proId}) ) ? true : false;
            if(!inCart){
                return {...state,cart:[...state.cart,{...item,qty:1}]};
            }else{
                return {...state,cart:[...state.cart.map((product)=>{return (product.proId===item.proId) ? {...product,qty:product.qty+1} : {...product}})]};
            }
        case SET_CURRENT_PRODUCT:
            const setItem = state.products.find((product)=>{return product.proId===action.payload.proId});
            return {...state,currentItem:setItem}; 
        case UPDATE_ITEM_QTY_IN_CART:
            const updateItem = state.products.find((product)=>{return product.proId===action.payload.proId});
            return {...state,cart:[...state.cart.map((product)=>{return (product.proId===updateItem.proId) ? {...product,qty:action.payload.qty} : {...product}})]};
        case DELETE_ITEM_FROM_CART:
            const cartFilter = state.cart.filter((product)=>{return product.proId!==action.payload.proId});
            return {...state,cart:cartFilter};    
        default:
            return state;
    }
}

export default ShopReducer;