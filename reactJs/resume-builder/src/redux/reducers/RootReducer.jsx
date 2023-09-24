import { combineReducers } from "redux";
import DocumentReducer from "./DocumentReducer";
import ContactReducer from "./ContactReducer";
import EducationReducer from "./EducationReducer";
const RootReducer = combineReducers({
    document: DocumentReducer,
    contact: ContactReducer,
    education: EducationReducer
});
export default RootReducer;