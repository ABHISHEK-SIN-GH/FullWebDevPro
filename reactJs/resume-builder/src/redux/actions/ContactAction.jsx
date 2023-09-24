import { SET_CONTACT, UPDATE_CONTACT } from "../actionsConstant"

export const setContact = (contact) => {
    return {
        type:SET_CONTACT,
        payload:contact
    }
}

export const updateContact = (contact) => {
    return {
        type:UPDATE_CONTACT,
        payload:contact
    }
}

