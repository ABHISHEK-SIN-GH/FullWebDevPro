import { initialState } from "../initialState";
import { SET_DOCUMENT,UPDATE_DOCUMENT } from "../actionsConstant";

const DocumentReducer = (state=initialState.document,action) => {
    switch(action.type){
        case SET_DOCUMENT:
            return {...state,id:action.payload.id,skinId:action.payload.skinId}
        case UPDATE_DOCUMENT:
            return {...state,skinId:action.payload}
        default : return state;     
    }
}

export default DocumentReducer;