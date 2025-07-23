import * as T from "./types";

const initialState: T.State = new Date().toISOString();

export const reducer = (
  state: T.State = initialState,
  action: T.ClockActions
): T.State => {
  switch (action.type) {
    case "@clock/SET_CLOCK":
      return action.payload;
  }
  return state;
};
