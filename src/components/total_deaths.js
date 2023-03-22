import React from "react";
import Typography from "@mui/material/Typography";

export default function TotalDeaths(props) {
  return (
    <div>
      <Typography sx={{ color: "white", fontSize: "3em" }}>
        Total Deaths: {props.deaths}
      </Typography>
    </div>
  );
}
