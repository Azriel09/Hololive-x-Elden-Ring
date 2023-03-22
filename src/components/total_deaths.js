import React from "react";
import Typography from "@mui/material/Typography";

export default function TotalDeaths(props) {
  return (
    <div>
      <Typography
        sx={{
          fontWeight: "600",
          color: "#b9b9bb",
          fontSize: "3em",
          fontFamily:
            "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
          letterSpacing: "3px",
        }}
      >
        Total Deaths: {props.deaths}
      </Typography>
    </div>
  );
}
