import React, { useEffect, useState } from "react";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import SwiperBoss from "./swiper";
const bossSheetID = import.meta.env.VITE_SHEET_ID_BOSS;

export default function BossRetriever() {
  const bosslist = [
    "Tree_Sentinel",
    "Margit",
    "Godrick",
    "Wolf of Radagon",
    "Rennala",
    "Radahn",
    "Astel",
    "Rykard",
    "Godfrey Golden Shade",
    "Morgott",
    "Fire Giant",
    "Malenia",
    "Godskin Duo",
    "Maliketh",
    "Gideon",
    "Godfrey",
    "Radagon",
    "Elden Beast",
    "",
    "",
  ];
  const [selectedboss, setSelectedBoss] = useState("");
  const [holomem, setHolomem] = useState([]);
  const [deaths, setDeaths] = useState([]);

  const sheetURL = `https://docs.google.com/spreadsheets/d/${bossSheetID}/gviz/tq?tqx=out:csv&sheet=${selectedboss}`;

  useEffect(() => {
    // setLoading(true);
    console.log("useEffect");
    console.log(selectedboss);
    fetch(sheetURL)
      .then((response) => response.text())
      .then((csvText) => handleResponse(csvText))
      .catch((err) => {
        console.log(err.message);
      });
  }, [selectedboss]);

  function handleResponse(csvText) {
    let sheetObjects = csvToObjects(csvText);
  }

  function csvToObjects(csv) {
    const csvRows = csv.split("\n");
    const propertyNames = csvSplit(csvRows[0]);
    let objects = [];
    let firstColumn = [];
    let secondColumn = [];

    for (let i = 0, max = csvRows.length; i < max; i++) {
      let thisObject = {};
      let row = csvSplit(csvRows[i]);
      for (let j = 0, max = row.length; j < max; j++) {
        thisObject[propertyNames[j]] = row[j];
        if (j === 0) {
          firstColumn.push(row[j]);
        } else {
          secondColumn.push(row[j]);
        }
      }

      objects.push(thisObject);
    }
    if (selectedboss) {
      setHolomem(firstColumn);
      setDeaths(secondColumn);
    }
  }

  function csvSplit(row) {
    return row.split(",").map((val) => val.substring(1, val.length - 1));
  }

  const handleChange = (e) => {
    setSelectedBoss(e);
  };
  return (
    <div>
      {/* <FormControl fullWidth>
        <InputLabel sx={{ color: "white" }}>Select Boss</InputLabel>
        <Select
          value={selectedboss}
          label="Select Stream"
          onChange={(e) => handleChange(e.target.value)}
          MenuProps={{
            style: {
              maxHeight: 500,
            },
          }}
          sx={{
            backgroundColor: "#2e2e2e",
            width: "175px",
            height: "60px",
            color: "rgb(220, 220, 220)",
          }}
        >
          {bosslist.map((boss, index) => {
            return (
              <MenuItem key={index} value={boss}>
                {boss}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl> */}
      <SwiperBoss />
      {selectedboss ? (
        <>
          {holomem.map((name, index) => {
            return (
              <h2 key={index} style={{ color: "white" }}>
                {name}: {deaths[index]}
              </h2>
            );
          })}
        </>
      ) : null}
    </div>
  );
}
