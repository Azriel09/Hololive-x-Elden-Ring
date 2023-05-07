import React, { useState, useEffect } from "react";
import Selections from "./selections";
import "./css/loading.css";
import Box from "@mui/material/Box";
import PieChart from "./piechart";
const sheetID = import.meta.env.VITE_SHEET_ID;

export default function GetData(props) {
  const [loading, setLoading] = useState(false);
  const [streams, setStreams] = useState([]);
  const [deaths, setDeaths] = useState([]);
  const [links, setLinks] = useState([]);
  const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:csv&sheet=${`All_${props.name}`}`;

  useEffect(() => {
    setLoading(true);
    fetch(sheetURL)
      .then((response) => response.text())
      .then((csvText) => handleResponse(csvText))
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  function handleResponse(csvText) {
    let sheetObjects = csvToObjects(csvText);
  }

  function csvToObjects(csv) {
    const csvRows = csv.split("\n");
    const propertyNames = csvSplit(csvRows[0]);
    let objects = [];
    let stream = [];
    let death = [];
    let link = [];

    for (let i = 0, max = csvRows.length; i < max; i++) {
      let thisObject = {};
      let row = csvSplit(csvRows[i]);
      for (let j = 0, max = row.length; j < max; j++) {
        thisObject[propertyNames[j]] = row[j];
        if (j === 0) {
          stream.push(row[j]);
        } else if (j === 1) {
          death.push(row[j]);
        } else {
          link.push(row[j]);
        }
      }

      objects.push(thisObject);
    }
    setStreams(stream);
    setDeaths(death);
    setLinks(link);

    setLoading(false);
  }

  function csvSplit(row) {
    return row.split(",").map((val) => val.substring(1, val.length - 1));
  }
  if (loading) {
    return <div className="loader"></div>;
  } else {
    return (
      <div>
        <Box
          className="getData-container"
          sx={{ width: "100%", height: "100%" }}
        >
          <Selections
            name={props.name}
            stream={streams}
            link={links}
            death={deaths}
          ></Selections>
        </Box>
      </div>
    );
  }
}
