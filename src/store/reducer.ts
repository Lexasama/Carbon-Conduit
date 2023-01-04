import {combineReducers} from "redux";
import authReducer from "./auth/AuthSlice";

const rootReducer = combineReducers({
    auth: authReducer
});

export default rootReducer;
