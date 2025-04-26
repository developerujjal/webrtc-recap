import { combineReducers } from "@reduxjs/toolkit";
import callStateReducer from "./callStateReducer";
import streamsReducer from "./streamsReducer";

const rootReducer = combineReducers({
  callStatus: callStateReducer, 
  streams: streamsReducer,
});

export default rootReducer;