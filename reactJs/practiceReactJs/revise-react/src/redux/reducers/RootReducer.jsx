import { combineReducers } from "redux";
import BatReducer from "./BatReducer";
import BallReducer from "./BallReducer";
const RootReducer = combineReducers({bat:BatReducer,ball:BallReducer});
export default RootReducer;