import React, { useState } from "react";
import ReactPlayer from "react-player";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Slider from "@mui/material/Slider";
import Stats from "./piechart";
import TotalDeaths from "./total_deaths";

export default function Selections(props) {
  const ref = React.createRef();
  const [selected, setSelected] = useState("");
  const [sliderData, setSliderData] = useState([]);
  const [killers, setKillers] = useState([]);
  const [max, setMax] = useState();
  const [permaURL, setpermaURL] = useState("");
  const [totalDeaths, setTotalDeaths] = useState();
  const [boss, setBoss] = useState(false);
  const [npc, setNPC] = useState(false);
  const streams = props.stream;
  const links = props.link;
  const deaths = props.death;

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
      objects.push(tempo);
      for (let j = 0, max = row.length; j < max; j++) {
        if (j === 0) {
          timestamp.push(row[j]);
        } else {
          killer.push(row[j]);
        }
      }
    }
    getID(e);
    setKillers(killer);
    setSliderData(objects);
    setSelected(e);
    setpermaURL(links[e].replace("watch?v=", "embed/"));
  }

  function csvSplit(row) {
    return row.split(",").map((val) => val.substring(1, val.length - 1));
  }

  function valuetext(value) {
    return sliderData.map((mark) => mark.label);
  }
  function valueLabelFormat(value) {
    let index = sliderData.findIndex((mark) => mark.value === value);
    setTotalDeaths(sliderData.length);
    try {
      if (killers[index].includes("Boss")) {
        let death = killers[index].replace("Boss", "");
        return death;
      } else if (killers[index].includes("NPC")) {
        let death = killers[index].replace("NPC", "");
        return death;
      } else {
        return killers[index];
      }
    } catch (err) {
      console.log(err);
    }
  }

  const checkBoss = (e) => {
    let index = sliderData.findIndex((mark) => mark.value === e.target.value);
    ref.current.seekTo(e.target.value - 2);
    if (killers[index].includes("Boss")) {
      setBoss(true);
      setNPC(false);
    } else if (killers[index].includes("NPC")) {
      setNPC(true);
      setBoss(false);
    } else {
      setBoss(false);
      setNPC(false);
    }
  };

  return (
    <div>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <div className="selection-player-timestamps">
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <FormControl
              fullWidth
              sx={{ marginBottom: "20px", width: "300px" }}
            >
              <InputLabel sx={{ color: "white" }} id="demo-simple-select-label">
                Select Stream
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selected}
                label="Select Stream"
                onChange={(e) => handleChange(e.target.value)}
                sx={{
                  backgroundColor: "#2e2e2e",
                  width: "175px",
                  height: "60px",
                  color: "rgb(220, 220, 220)",
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
            {totalDeaths ? <TotalDeaths deaths={totalDeaths} /> : null}
          </Box>
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
                defaultValue={0}
                width="1000px"
                height="562.5px"
                style={{ border: "1px gray solid", borderRadius: "10px" }}
              />
              <Box
                sx={{
                  width: 1000,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: "30px",
                }}
              >
                <Slider
                  aria-label="Restricted values"
                  valueLabelFormat={valueLabelFormat}
                  getAriaValueText={valuetext}
                  valueLabelDisplay="on"
                  step={null}
                  defaultValue={0}
                  min={0}
                  max={max}
                  onChange={(e) => checkBoss(e)}
                  marks={sliderData}
                  track={false}
                  sx={[
                    {
                      color: "rgba(0,0,0,0)",
                      // backgroundColor: "#323233",
                      width: "980px",

                      "& .MuiSlider-mark": {
                        backgroundColor: "red",
                        height: "17px",
                        width: "1px",
                        borderRadius: "1px",
                        "&:hover": {
                          width: "2px",
                          height: "20px",
                        },
                      },
                      "& .MuiSlider-thumb": {
                        color: "#b9b9bb",
                        height: 25,
                        width: "3px",
                      },
                      "& .MuiSlider-valueLabel": {
                        backgroundColor: "gray",
                      },
                    },
                    boss && {
                      "& .MuiSlider-valueLabel": {
                        backgroundColor: "lightblue",
                        color: "black",
                      },
                    },
                    npc && {
                      "& .MuiSlider-valueLabel": {
                        backgroundColor: "green",
                        color: "white",
                      },
                    },
                  ]}
                />
              </Box>
            </div>
          ) : (
            <ReactPlayer
              url=""
              width="1000px"
              height="562.5px"
              style={{ border: "1px gray solid", borderRadius: "10px" }}
            />
          )}
        </div>
      </Box>
    </div>
  );
}
