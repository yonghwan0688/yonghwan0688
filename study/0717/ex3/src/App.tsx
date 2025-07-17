import React from "react";
import logo from "./logo.svg";
import "./App.css";
import RefTest from "./pages/RefTest";
import { useContext, useState } from "react";
import { UserProvider } from "./contexts/UserContext";
import { UserProfile } from "./contexts/UserContext"; // Import UserProfile if needed

function App() {
  return (
    <div className="App">
      <RefTest />
    </div>
  );
}

export default App;
