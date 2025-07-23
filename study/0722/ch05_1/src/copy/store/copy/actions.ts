import * as T from "./types";
const initializedState: T.State = {};

export const reducer = (
  state: T.State = initializedState,
  action: T.ActionType
): T.State => {
  switch (action.type) {
    default:
      return state;
  }
};
