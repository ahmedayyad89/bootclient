import {combineReducers} from "redux";
import userReducer from "./users.reducer";
const rootReducer = combineReducers({
    user: userReducer
});
export default rootReducer;