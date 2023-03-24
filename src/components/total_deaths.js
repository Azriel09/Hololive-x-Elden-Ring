import React from "react";
import Typography from "@mui/material/Typography";
import "./css/font.css";
export default function TotalDeaths(props) {
  return (
    <div>
      <Typography
        sx={{
          fontWeight: "600",
          color: "#b9b9bb",
          fontSize: "3em",
          // fontFamily:
          //   "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
          fontFamily: "Elden Ring",
          letterSpacing: "3px",
          textShadow: "2px 2px white",
        }}
      >
        Total Deaths: {props.deaths}
      </Typography>
    </div>
  );
}
