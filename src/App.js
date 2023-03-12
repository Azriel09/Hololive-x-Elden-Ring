import "./App.css";
import useGoogleSheets from "use-google-sheets";
import React, { useState, useEffect } from "react";
import Test from "./test";
import SideNav from "./components/Sidenav";

function App() {
  return (
    <>
      <Test />
      <SideNav />
    </>
  );
}

export default App;
