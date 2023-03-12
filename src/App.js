import "./App.css";
import useGoogleSheets from "use-google-sheets";
import React, { useState, useEffect } from "react";
import Selection from "./pages/selections";
import SideNav from "./components/Sidenav";

function App() {
  // const [timestamps, setTimestamps] = useState([]);
  // const [causes, setCauses] = useState([]);

  // const sheedID = "1RbmeWv7zdmLIvQoOiKZYOkHlcMfBsMxs7nj5C2nCjYg";
  // const sheetName = encodeURIComponent("Ame1");
  // const sheetURL = `https://docs.google.com/spreadsheets/d/${sheedID}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;

  // fetch(sheetURL)
  //   .then((response) => response.text())
  //   .then((csvText) => handleResponse(csvText));

  // function handleResponse(csvText) {
  //   let sheetObjects = csvToObjects(csvText);
  // }

  // function csvToObjects(csv) {
  //   const csvRows = csv.split("\n");
  //   const propertyNames = csvSplit(csvRows[0]);
  //   let objects = [];
  //   let time = [];
  //   let cause = [];

  //   for (let i = 1, max = csvRows.length; i < max; i++) {
  //     let thisObject = {};
  //     let row = csvSplit(csvRows[i]);
  //     for (let j = 0, max = row.length; j < max; j++) {
  //       thisObject[propertyNames[j]] = row[j];
  //       if (j === 0) {
  //         time.push(row[j]);
  //       } else {
  //         cause.push(row[j]);
  //       }
  //     }

  //     objects.push(thisObject);
  //   }
  //   setTimestamps(time);
  //   setCauses(cause);
  // }

  // function csvSplit(row) {
  //   return row.split(",").map((val) => val.substring(1, val.length - 1));
  // }

  // return (
  //   <div>
  //     {timestamps.map((time) => {
  //       return <li>{time}</li>;
  //     })}
  //   </div>
  // )

  return <SideNav />;
}

export default App;
