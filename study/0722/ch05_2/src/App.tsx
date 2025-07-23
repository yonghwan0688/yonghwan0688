import { Provider as ReduxProvider } from "react-redux";
import { useStore } from "./store";
import ClockTest from "./pages/ReduxClock";
import CounterTest from "./pages/CounterTest";
import RemoteUserTest from "./pages/RemoteUserTest";
import CardsTest from "./pages/CardsTest";

export default function App() {
  const store = useStore();
  return (
    <ReduxProvider store={store}>
      <ClockTest />
      <CounterTest />
      <RemoteUserTest />
      <CardsTest />
    </ReduxProvider>
  );
}
