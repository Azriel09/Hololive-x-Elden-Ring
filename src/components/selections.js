import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Iframe from "react-iframe";
import Loading from "./loading";
import Slider from "@mui/material/Slider";

export default function Selections(props) {
  const ref = React.createRef();
  const [selected, setSelected] = useState("");
  const [timestamps, setTimestamps] = useState([]);
  const [showDeaths, setShowDeaths] = useState(false);
  const [played, setPlayed] = useState(0);
  const [sliderData, setSliderData] = useState([]);
  const [firstRun, setFirstRun] = useState(true);
  const [killers, setKillers] = useState([]);
  const [videoID, setvideoID] = useState("");

  const [max, setMax] = useState();
  const [death, setDeath] = useState(0);
  const [permaURL, setpermaURL] = useState("");
  const streams = props.stream;
  const links = [];
  const deaths = props.death;
  props.link.forEach((x) => links.push(x));
  // console.log(props.name + (+[selected] + 1));

  const handleChange = (e) => {
    const sheetID = "1RbmeWv7zdmLIvQoOiKZYOkHlcMfBsMxs7nj5C2nCjYg";
    const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:csv&sheet=${
      props.name + (+[e] + 1)
    }`;
    fetch(sheetURL)
      .then((response) => response.text())
      .then((csvText) => handleResponse(csvText, e))
      .catch((err) => {
        console.log(err.message);
      });
  };

  function getID(e) {
    let url = links[e].replace("watch?v=", "embed/");
    const id = url.split("/").pop();

    getVideoDuration(id);
  }

  const getVideoDuration = (id) => {
    let url = `https://holodex.net/api/v2/videos/${id}`;

    let options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => setMax(json.duration))
      .catch((err) => console.error("error:" + err));
  };

  function handleResponse(csvText, e) {
    let sheetObjects = csvToObjects(csvText, e);
  }
  function csvToObjects(csv, e) {
    const csvRows = csv.split("\n");
    const propertyNames = csvSplit(csvRows[0]);
    let objects = [];
    let timestamp = [];
    let killer = [];

    for (let i = 0, max = csvRows.length; i < max; i++) {
      let tempo = {};
      let row = csvSplit(csvRows[i]);
      let hms = row[0];
      let a = hms.split(":");
      const totalSeconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
      tempo.value = Number(totalSeconds);
      tempo.label = row[1];
      objects.push(tempo);
      for (let j = 0, max = row.length; j < max; j++) {
        if (j === 0) {
          timestamp.push(row[j]);
        } else {
          killer.push(row[j]);
        }
      }
    }
    setTimestamps(timestamp);
    setKillers(killer);
    setSliderData(objects);
    setSelected(e);
    setpermaURL(links[e].replace("watch?v=", "embed/"));

    getID(e);
  }

  function csvSplit(row) {
    return row.split(",").map((val) => val.substring(1, val.length - 1));
  }

  function valuetext(value) {
    return sliderData.map((mark) => mark.label);
  }
  function valueLabelFormat(value) {
    return sliderData.findIndex((mark) => mark.value === value) + 1 + " Deaths";
  }

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
          onChange={(e) => handleChange(e.target.value)}
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

      {(selected || selected === 0) && sliderData ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ReactPlayer
            ref={ref}
            url={permaURL}
            playing
            controls
            width="1000px"
            height="562.5px"
          />
          <Box
            sx={{
              width: 1000,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Slider
              aria-label="Restricted values"
              valueLabelFormat={valueLabelFormat}
              getAriaValueText={valuetext}
              step={null}
              min={0}
              max={max}
              onChange={(e) => ref.current.seekTo(e.target.value)}
              valueLabelDisplay="auto"
              marks={sliderData}
              sx={{
                width: "980px",
                "& .MuiSlider-mark": {
                  backgroundColor: "yellow",
                  height: 15,
                  width: "2px",
                  borderRadius: "1px",
                  "&.MuiSlider-markActive": {
                    opacity: 1,
                    backgroundColor: "red",
                  },
                },
              }}
            />
          </Box>
        </div>
      ) : (
        <Iframe url="" width="1000px" height="500px" />
      )}

      {/* {selected || selected === 0
        ? timestamps.map((timestamp, index) => {
            return (
              <div key={index} value={index} style={{ display: "inline" }}>
                {timestamp}
              </div>
            );
          })
        : null} */}
    </div>
  );
}
