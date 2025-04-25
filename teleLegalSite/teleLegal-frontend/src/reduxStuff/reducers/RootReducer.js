import { combineReducers } from "@reduxjs/toolkit";
import callStateReducer from "./callStateReducer";

const rootReducer = combineReducers({
  callStatus: callStateReducer, 
});

export default rootReducer;