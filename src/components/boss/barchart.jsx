import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

export default function BossBarChart({ holomem, deaths }) {
  const [overall, setOverall] = useState(true);
  const [genCategories, setGenCategories] = useState([]);

  //   Removes Gen from categories if there's no holomem died from that Gen
  useEffect(() => {
    if (holomem.includes("Kronii")) {
      setGenCategories(["HoloMyth", "Project Hope", "HoloCouncil"]);
    } else if (holomem.includes("Irys")) {
      setGenCategories(["HoloMyth", "Project Hope"]);
    } else {
      setGenCategories(["HoloMyth"]);
    }
  }, [holomem]);

  // Places holomem by Gen category in the bar chart
  const barDataSortByGen = (name, index) => {
    if (holomem.includes("Irys") && holomem.includes("Kronii")) {
      switch (name) {
        case "Gura":
        case "Ame":
        case "Ina":
        case "Calli":
          return [deaths[index], 0, 0];
        case "Irys":
          return [0, deaths[index], 0];
        case "Kronii":
          return [0, 0, deaths[index]];
      }
    } else if (holomem.includes("Irys")) {
      switch (name) {
        case "Gura":
        case "Ame":
        case "Ina":
        case "Calli":
          return [deaths[index], 0];
        case "Irys":
          return [0, deaths[index]];
      }
    } else {
      switch (name) {
        case "Gura":
        case "Ame":
        case "Ina":
        case "Calli":
          return [deaths[index]];
      }
    }
  };

  const barSeries = holomem.map((name, index) => {
    return {
      name: name,
      data: barDataSortByGen(name, index),
    };
  });

  const barOptions = {
    chart: {
      type: "bar",
      height: 200,
      stacked: true,
      fontSize: "25px",
      foreColor: "white",
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          total: {
            enabled: true,
            offsetX: 0,
            style: {
              fontSize: "50px",
              fontWeight: 900,
              color: "white",
            },
          },
        },
      },
    },
    stroke: {
      width: 1,
      colors: ["#fff"],
    },
    title: {
      text: "Fiction Books Sales",
    },
    xaxis: {
      categories: genCategories,
      labels: {
        formatter: function (val) {
          return val;
        },
      },
    },
    yaxis: {
      title: {
        text: undefined,
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      offsetX: 40,
    },
    dataLabels: {
      enabledOnSeries: true,
      offset: -5,
      style: {
        fontSize: "20px",
        foreColor: "#000",
        color: "#000",
        backgroundColor: "#000",
      },
    },
  };

  return (
    <Box>
      {holomem ? (
        <ReactApexChart
          options={barOptions}
          series={barSeries}
          type="bar"
          width="100%"
          height="400px"
          style={{}}
        />
      ) : null}
    </Box>
  );
}
