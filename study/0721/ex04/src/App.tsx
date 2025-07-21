import React from "react";
import logo from "./logo.svg";
import "./App.css";
import MemoTest from "./pages/MemoTest";
import UseCallbackExample from "./components/UseCallbackExample";
import HookTest from "./pages/HookTest";

function App() {
  return (
    <div className="App">
      {/* <MemoTest /> */}
      {/* <UseCallbackExample /> */}
      <HookTest />
    </div>
  );
}

export default App;
