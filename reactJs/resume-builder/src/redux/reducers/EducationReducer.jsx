import { initialState } from "../initialState";
import { SET_EDUCATION, UPDATE_EDUCATION } from "../actionsConstant";

const EducationReducer = (state=initialState.education,action) => {
    switch(action.type){
        case SET_EDUCATION:
            return {...state,...action.payload}
        case UPDATE_EDUCATION:
            return {...state,...action.payload}
        default : return state;        
    }
}

export default EducationReducer;