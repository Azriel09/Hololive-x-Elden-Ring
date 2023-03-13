import React, { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Iframe from "react-iframe";
import Loading from "./loading";

export default function Selections(props) {
  const [selected, setSelected] = useState("");
  const [timestamps, setTimestamps] = useState([]);
  const [killers, setKillers] = useState([]);
  const streams = props.stream;
  const links = [];
  const deaths = props.death;
  props.link.forEach((x) => links.push(x + "?autoplay=1"));
  // console.log(props.name + (+[selected] + 1));
  useEffect(() => {
    const sheetID = "1RbmeWv7zdmLIvQoOiKZYOkHlcMfBsMxs7nj5C2nCjYg";
    const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:csv&sheet=${
      props.name + (+[selected] + 1)
    }`;
    fetch(sheetURL)
      .then((response) => response.text())
      .then((csvText) => handleResponse(csvText))
      .catch((err) => {
        console.log(err.message);
      });
  }, [selected]);
  function handleResponse(csvText) {
    let sheetObjects = csvToObjects(csvText);
  }
  function csvToObjects(csv) {
    const csvRows = csv.split("\n");
    const propertyNames = csvSplit(csvRows[0]);
    let objects = [];
    let timestamp = [];
    let killer = [];

    for (let i = 0, max = csvRows.length; i < max; i++) {
      let thisObject = {};
      let row = csvSplit(csvRows[i]);
      for (let j = 0, max = row.length; j < max; j++) {
        thisObject[propertyNames[j]] = row[j];
        if (j === 0) {
          timestamp.push(row[j]);
        } else {
          killer.push(row[j]);
        }
      }

      objects.push(thisObject);
    }
    setTimestamps(timestamp);
    setKillers(killer);
  }

  function csvSplit(row) {
    return row.split(",").map((val) => val.substring(1, val.length - 1));
  }
  console.log(timestamps);
  return (
    <div>
      <FormControl fullWidth sx={{ display: "block", marginBottom: "10px" }}>
        <InputLabel id="demo-simple-select-helper-label">
          Select Stream
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selected}
          label="Select Stream"
          onChange={(e) => setSelected(e.target.value)}
          sx={{
            backgroundColor: "rgba(255, 255, 255, 01)",
            border: "3px solid lightblue",
            width: "175px",
            height: "60px",
          }}
        >
          {streams.map((stream, index) => {
            return (
              <MenuItem key={index} value={index}>
                {stream}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      {selected || selected === 0 ? (
        <Iframe
          url={links[selected].replace("watch?v=", "embed/")}
          width="1000px"
          height="500px"
        />
      ) : (
        <Iframe url="" width="1000px" height="500px" />
      )}
      {timestamps.map((timestamp, index) => {
        return (
          <li key={index} value={index}>
            {timestamp}
          </li>
        );
      })}
    </div>
  );
}
