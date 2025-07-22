import type { Action } from "redux";
import { Provider as ReduxProvider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import ReduxClock from "./pages/ReduxClock";
import UseReducerClock from "./pages/UseReducerClock";

type AppState = {
  today: Date;
};

const initialState: AppState = {
  today: new Date(),
};

const rootReducer = (state = initialState, action: Action): AppState => state;
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default function App() {
  return (
    <ReduxProvider store={store}>
      <UseReducerClock />
    </ReduxProvider>
  );
}
