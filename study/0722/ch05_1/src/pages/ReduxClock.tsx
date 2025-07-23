import { useSelector } from "react-redux";
import { useStore } from "../store";
import { Div, Title, Subtitle } from "../components";
import { useInterval } from "../hooks";

export default function ReduxClock() {
  const today = useSelector((state: any) => state.today ?? new Date());
  const dispatch = useStore().dispatch;

  useInterval(() => {
    dispatch({ type: "SET_TODAY", today: new Date() });
  }, 1000);

  return (
    <Div className="flex flex-col items-center justify-center mt-16">
      <Title className="text-2xl">Redux Clock</Title>
      <Title className="text-xl font-semibold mt-2">
        {today.toDateString()}
      </Title>
      <Subtitle className="text-lg font-medium mt-1">
        Current Time: {today.toLocaleTimeString()}
      </Subtitle>
    </Div>
  );
}
