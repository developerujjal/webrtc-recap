import { configureStore } from '@reduxjs/toolkit'
import callStateReducer from '../reducers/CallStateSlice';

const store = configureStore({
  reducer: {
    callState: callStateReducer,
  },
});

export default store;