import type { Action } from "redux";

export type SetTodayAction = Action<"SET_TODAY"> & {
  today: Date;
};

export type Actions = SetTodayAction;
