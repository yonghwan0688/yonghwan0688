import { useReducer } from "react";
import type { AppState } from "../store";
import type { SetTodayAction } from "../store/actions";
import { Div, Title, Subtitle } from "../components";
import { useInterval } from "../hooks";

export default function ReduxClock() {
  const [state, dispatch] = useReducer(
    (state: AppState, action: SetTodayAction) => {
      switch (action.type) {
        case "SET_TODAY":
          return { ...state, today: action.today };
        default:
          return state;
      }
    },
    { today: new Date() }
  );

  useInterval(() => {
    dispatch({ type: "SET_TODAY", today: new Date() });
  }, 1000);

  return (
    <Div className="flex flex-col items-center justify-center mt-16">
      <Title className="text-2xl">Reducer Clock</Title>
      <Title className="text-xl font-semibold mt-2">
        {state.today.toDateString()}
      </Title>
      <Subtitle className="text-lg font-medium mt-1">
        Current Time: {state.today.toLocaleTimeString()}
      </Subtitle>
    </Div>
  );
}
