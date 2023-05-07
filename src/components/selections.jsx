import React, { useState } from "react";
import ReactPlayer from "react-player";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Slider from "@mui/material/Slider";

import TotalDeaths from "./total_deaths";
import PieChart from "./piechart";
import { createTheme } from "@mui/material/styles";
import moment from "moment";
import { useLocation } from "react-router-dom";

const theme = createTheme();
const apiKeyYT = import.meta.env.VITE_YOUTUBE_API_KEY;
const apiKeyHolodex = import.meta.env.VITE_HOLODEX_API_KEY;
const sheetID = import.meta.env.VITE_SHEET_ID;

export default function Selections(props) {
  const path = useLocation().pathname;
  const location = path.split("/")[1];
  const ref = React.createRef();
  const [selected, setSelected] = useState("");
  const [sliderData, setSliderData] = useState([]);
  const [killers, setKillers] = useState([]);
  const [max, setMax] = useState();
  const [permaURL, setpermaURL] = useState("");
  const [totalDeaths, setTotalDeaths] = useState();
  const [boss, setBoss] = useState(false);
  const [npc, setNPC] = useState(false);
  const [autoplay, setAutoplay] = useState(false);
  const streams = props.stream;
  const links = props.link;

  const handleChange = (e) => {
    setAutoplay(false);
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

  function borderColor() {
    switch (location) {
      case "ame":
        return "#ffff00";
      case "calli":
        return "#ff0000";
      case "gura":
        return "#008ffb";
      case "ina":
        return "#9400d3";
      case "irys":
        return "#ff00ff";
      case "kronii":
        return "#0000ff";
      default:
        return "ONE";
    }
  }
  // Get Video ID
  function getID(e) {
    let url = links[e].replace("watch?v=", "embed/");
    const id = url.split("/").pop();

    getVideoDuration(id);
  }

  const getVideoDuration = async (id) => {
    // Via Youtube API
    const url = `https://www.googleapis.com/youtube/v3/videos?id=${id}&part=contentDetails&key=${apiKeyYT}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const iso8601Duration = data.items[0].contentDetails.duration;
      const secondsDuration = moment.duration(iso8601Duration).asSeconds();
      setMax(secondsDuration);
    } catch (error) {
      console.error(error);

      // If error, use Holodex API
      const url = `https://holodex.net/api/v2/videos/${id}`;
      const options = {
        method: "GET",
        headers: { Accept: "application/json", "X-APIKEY": apiKeyHolodex },
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        const durationSeconds = data.duration;
        setMax(durationSeconds);
      } catch (error) {
        console.error(error);
      }
    }
  };

  function handleResponse(csvText, e) {
    csvToObjects(csvText, e);
  }
  function csvToObjects(csv, e) {
    const csvRows = csv.split("\n");

    let objects = [];
    let timestamp = [];
    let killah = [];

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
          killah.push(row[j]);
        }
      }
    }
    getID(e);
    setKillers(killah);
    setSliderData(objects);
    setTotalDeaths(objects.length);
    setSelected(e);
    let ytURL = links[e].replace("watch?v=", "embed/") + "?rel=0";

    setpermaURL(ytURL);
  }

  function csvSplit(row) {
    return row.split(",").map((val) => val.substring(1, val.length - 1));
  }

  function valuetext(value) {
    return sliderData.map((mark) => mark.label);
  }
  function valueLabelFormat(value) {
    let index = sliderData.findIndex((mark) => mark.value === value);

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
    } catch (err) {}
  }

  // For Slider Value Label BG Color
  const checkBoss = (e) => {
    setAutoplay(true);
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
    <Box
      className="container"
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "center",
        backgroundColor: "#2f3042",
        borderRadius: "15px",
        width: "100%",
        gap: "10px",
        height: "50%",
        [theme.breakpoints.down("1710")]: {
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        },
      }}
    >
      <Box
        className="video-container"
        sx={{
          borderRadius: "10px",
          padding: "20px 10px 10px",
          // border: `1px solid ${borderColor()}`,
          // backgroundColor: "#23242a",
          width: "65%",
          height: "555px",
          [theme.breakpoints.down("1710")]: {
            width: "97%",
          },
          [theme.breakpoints.down("435")]: {
            width: "95%",
            padding: 0,
          },
        }}
      >
        <div className="selection-player-timestamps">
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",

              [theme.breakpoints.down("850")]: {
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              },
            }}
          >
            <Box
              sx={{
                marginBottom: "20px",
                marginTop: "10px",
                [theme.breakpoints.down("850")]: {
                  width: "auto",
                },
              }}
            >
              <FormControl fullWidth>
                <InputLabel
                  sx={{ color: "white" }}
                  id="demo-simple-select-label"
                >
                  Select Stream
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selected}
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
                  {streams.map((stream, index) => {
                    return (
                      <MenuItem key={index} value={index}>
                        {stream}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
            {totalDeaths ? <TotalDeaths deaths={totalDeaths} /> : null}
            <Box
              sx={{
                ml: "auto",
                [theme.breakpoints.down("850")]: {
                  width: "auto",
                },
              }}
            ></Box>{" "}
            {/*JUST HERE TO CENTER THE TOTAL DEATH COUNT  */}
          </Box>
          {(selected || selected === 0) && sliderData ? (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  position: "relative",
                  paddingTop: "56.25%",
                }}
              >
                <ReactPlayer
                  ref={ref}
                  url={permaURL}
                  playing={autoplay}
                  controls
                  defaultValue={0}
                  width="90%"
                  height="90%"
                  style={{
                    border: "1px gray solid",
                    borderRadius: "10px",
                    position: "absolute",
                    top: 0,
                    left: 0,
                  }}
                />
              </div>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: "20px",
                }}
              >
                <Slider
                  aria-label="Restricted values"
                  valueLabelFormat={valueLabelFormat}
                  getAriaValueText={valuetext}
                  valueLabelDisplay="on"
                  step={null}
                  min={0}
                  max={max}
                  onChange={(e) => checkBoss(e)}
                  marks={sliderData}
                  track={false}
                  sx={[
                    {
                      color: "rgba(0,0,0,0)",
                      // backgroundColor: "#323233",
                      width: "99%",

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
            </>
          ) : (
            <ReactPlayer
              url=""
              width="100%"
              height="100%"
              style={{ border: "1px gray solid", borderRadius: "10px" }}
            />
          )}
        </div>
      </Box>

      {/* PIECHART */}
      {(selected || selected === 0) && sliderData ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            // border: `1px solid ${borderColor()}`,
            // backgroundColor: "#23242a",
            borderRadius: "10px",
            padding: "20px 10px 10px",
            width: "35%",
            height: "100%",
            marginBottom: "40px",
            [theme.breakpoints.down("1710")]: {
              width: "97%",
            },
            [theme.breakpoints.down("435")]: {
              width: "95%",
              padding: 0,
            },
          }}
        >
          <PieChart selected={selected} name={props.name} />
        </Box>
      ) : null}
    </Box>
  );
}
