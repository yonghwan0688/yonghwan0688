import React from "react";
import logo from "./logo.svg";
import "./App.css";
import MemoTest from "./pages/MemoTest";
import UseCallbackExample from "./components/UseCallbackExample";

function App() {
  return (
    <div className="App">
      <MemoTest />
      <UseCallbackExample />
    </div>
  );
}

export default App;
