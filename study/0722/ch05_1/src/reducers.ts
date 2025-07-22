import { combineReducers } from "redux";

const dummyReducer = (state = {}, action: any) => state;

export default combineReducers({
  dummy: dummyReducer,
});
