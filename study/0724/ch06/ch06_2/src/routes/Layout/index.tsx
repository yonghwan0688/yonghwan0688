import { Outlet } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div>
      <NavigationBar />
      <Outlet />
      <Footer />
    </div>
  );
}
