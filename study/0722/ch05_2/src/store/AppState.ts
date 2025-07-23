import * as Clock from "./Clock";
import * as Counter from "./Counter";
import * as R from "./remoteUser";
import * as Cards from "./Cards";

export type AppState = {
  clock: Clock.ClockState;
  counter: Counter.CounterState;
  remoteUser: R.RemoteUserState;
  cards: Cards.CardsState;
};
