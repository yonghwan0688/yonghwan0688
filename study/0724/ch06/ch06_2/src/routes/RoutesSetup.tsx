import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import LandingPage from "./LandingPage";
import Board from "./Board";
import NoMatch from "./NoMatch";

export default function RoutesSetup() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Board />} />
        <Route path="/board" element={<Board />} />
      </Route>
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}
