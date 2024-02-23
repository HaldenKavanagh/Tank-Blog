import React from "react";

import { Outlet } from "react-router-dom";
import NavTabs from "./components/NavTabs";
import Footer from "./components/Footer";

function App() {
  return (
    <main>
      <NavTabs />
      <Outlet />
      <Footer />
    </main>
  );
}

export default App;
