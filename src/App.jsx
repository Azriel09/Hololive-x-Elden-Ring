import "./App.css";
import React from "react";
import Test from "./test";
import SideNav from "./components/Sidenav";

function App() {
  return (
    <div className="app" style={{ backgroundColor: "rgba(33, 31, 31, 0.5)" }}>
      <Test />
      <SideNav />
    </div>
  );
}

export default App;
