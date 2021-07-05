import { combineReducers } from "redux";


import articleReducer from "./articleReducer";
import authenticationReducer from "./authenticationReducer";

const rootReducer = combineReducers({
  articleState: articleReducer,
  authentication: authenticationReducer,
});


export default rootReducer;
