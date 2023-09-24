import { SET_DOCUMENT, UPDATE_DOCUMENT } from "../actionsConstant"
import { v4 } from 'uuid';

export const setDocument = (skinId) => {
    return {
        type:SET_DOCUMENT,
        payload:{
            id:v4(),
            skinId:skinId
        }
    }
}

export const updateDocument = (skinId) => {
    return {
        type:UPDATE_DOCUMENT,
        payload:skinId
    }
}

