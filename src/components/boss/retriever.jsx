import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import SwiperBoss from "./swiper";
import Loading from "../loading";
import BossBarChart from "./barchart";

const bossSheetID = import.meta.env.VITE_SHEET_ID_BOSS;

export default function BossRetriever() {
  const bosslist = [
    "Tree Sentinel",
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
    "Mohg",
    "Maliketh",
    "Gideon",
    "Godfrey",
    "Radagon",
    "Elden Beast",
  ];
  const [selectedboss, setSelectedBoss] = useState("Tree Sentinel");
  const [holomem, setHolomem] = useState([]);
  const [deaths, setDeaths] = useState([]);
  const [loading, setLoading] = useState();
  const sheetURL = `https://docs.google.com/spreadsheets/d/${bossSheetID}/gviz/tq?tqx=out:csv&sheet=${selectedboss}`;

  useEffect(() => {
    setLoading(true);

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
      setLoading(false);
    }
  }

  function csvSplit(row) {
    return row.split(",").map((val) => val.substring(1, val.length - 1));
  }

  return (
    <Box
      sx={{
        width: "95%",
        height: "100%",
        ml: "auto",
        mr: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "15px",
          width: "100%",
          gap: "10px",
          height: "50%",
        }}
      >
        <SwiperBoss listBoss={bosslist} selectBoss={setSelectedBoss} />
      </Box>

      <BossBarChart holomem={holomem} deaths={deaths} />
    </Box>
  );
}
