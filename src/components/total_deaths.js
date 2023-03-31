import React from "react";
import Typography from "@mui/material/Typography";
import "./css/font.css";
import { createTheme } from "@mui/material/styles";
const theme = createTheme();
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
          width: "500px",
          textAlign: "center",
          [theme.breakpoints.down("850")]: {
            fontSize: "30px",
          },
          [theme.breakpoints.down("350")]: {
            fontSize: "20px",
          },
        }}
      >
        Total Deaths: {props.deaths}
      </Typography>
    </div>
  );
}
