import { initialState } from "../initialState";
import { SET_CONTACT, UPDATE_CONTACT } from "../actionsConstant";

const ContactReducer = (state=initialState.contact,action) => {
    switch(action.type){
        case SET_CONTACT:
            return {...state,...action.payload}
        case UPDATE_CONTACT:
            return {...state,...action.payload}    
        default : return state;    
    }
}

export default ContactReducer;