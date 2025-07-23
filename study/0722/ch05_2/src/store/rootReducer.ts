import { combineReducers } from "redux";
import * as Clock from "./clock";
import * as Counter from "./counter";
import * as R from "./remoteUser";
import * as Cards from "./cards";
export const rootReducer = combineReducers({
  clock: Clock.clockReducer,
  counter: Counter.counterReducer,
  remoteUser: R.remoteUserReducer,
  cards: Cards.cardsReducer,
});
