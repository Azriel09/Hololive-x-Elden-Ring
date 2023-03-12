import React, { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Iframe from "react-iframe";
import Loading from "./loading";

export default function Selections(props) {
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(true);
  const [change, setChange] = useState(false);
  const streams = props.stream;
  const links = props.link;
  const deaths = props.death;

  useEffect(() => {}, [selected]);
  return (
    <div>
      <FormControl>
        <InputLabel id="demo-simple-select-helper-label">
          Select Stream
        </InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value=""
          label="Select Stream"
          onChange={(e) => setSelected(e.target.value)}
          sx={{
            backgroundColor: "rgba(255, 255, 255, 01)",
            border: "3px solid lightblue",
            width: "200px",
            height: "70px",
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
      ) : null}
    </div>
  );
}
