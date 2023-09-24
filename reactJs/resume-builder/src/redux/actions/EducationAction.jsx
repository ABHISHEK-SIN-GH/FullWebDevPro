import { SET_EDUCATION, UPDATE_EDUCATION } from "../actionsConstant"

export const setEducation = (education) => {
    return {
        type:SET_EDUCATION,
        payload:education
    }
}

export const updateEducation = (education) => {
    return {
        type:UPDATE_EDUCATION,
        payload:education
    }
}

