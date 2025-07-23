import * as T from "./types";
const initializedState: T.State = {};

export const SET_CLOCK = (payload: T.State): T.SetClockAction => ({
  type: "SET_CLOCK",
  payload,
});
