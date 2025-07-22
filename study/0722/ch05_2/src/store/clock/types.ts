import type { Action } from "redux";

export type State = string;

export type SetClockAction = Action<"SET_CLOCK"> & {
  payload: State;
};

export type ClockActions = SetClockAction;
