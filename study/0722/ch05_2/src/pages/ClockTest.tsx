import { useSelector } from "react-redux";
import { Title } from "../components";
import { useInterval } from "../hooks";
import type { AppState } from "../store";
import * as C from "../store/clock";
import App from "../App";

export default function ClockTest() {
  const clock = new Date(
    useSelector<AppState, C.ClockState>((state) => state.clock)
  );
  const dispatch = App.store.dispatch;
  useInterval(() => {
    dispatch({ type: "SET_CLOCK", clock: new Date() });
  }, 1000);

  return (
    <div className="flex flex-col items-center justify-center mt-16">
      <Title className="text-2xl">Clock Test</Title>
      <div className="mt-4">
        <p className="text-lg">Current Time:</p>
        <p className="text-2xl font-bold">{clock.toLocaleTimeString()}</p>
      </div>
    </div>
  );
}
