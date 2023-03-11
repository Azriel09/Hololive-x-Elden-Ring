import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function Hololiver() {
  const talents = ["Amelia", "Gura", "Calli", "Ina", "IRyS", "Kronii"];
  const [talent, setTalent] = useState("");

  const handleChange = (event) => {
    setTalent(event.target.value);
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Talents</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={talent}
          onChange={handleChange}
          label="Age"
        >
          {talents.map((x) => {
            return (
              <MenuItem value={x}>
                <em>{x}</em>
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}

export default Hololiver;
