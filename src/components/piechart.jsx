import React, { useState, useEffect } from "react";
import { Box, ListItem, ListItemText, List } from "@mui/material/";
import ReactApexChart from "react-apexcharts";
import { useLocation } from "react-router-dom";
import "./css/font.css";
const sheetID = import.meta.env.VITE_SHEET_ID;
export default function PieChart(props) {
  const path = useLocation().pathname;
  const location = path.split("/")[1];

  const [series, setSeries] = useState([]);
  const [unique, setUnique] = useState([]);

  const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:csv&sheet=${
    props.name + (+[props.selected] + 1)
  }`;

  useEffect(() => {
    fetch(sheetURL)
      .then((response) => response.text())
      .then((csvText) => handleResponse(csvText))
      .catch((err) => {
        console.log(err.message);
      });
  }, [props.selected]);

  function handleResponse(csvText, e) {
    csvToObjects(csvText, e);
  }

  // Idk what this specifically do, I just copied it, something something that formats the spreadsheet data to be readable
  function csvToObjects(csv, e) {
    const csvRows = csv.split("\n");
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
    countOccurences(killer);
  }

  // Idk what this specifically do, I just copied it, something something that formats the spreadsheet data to be readable
  function csvSplit(row) {
    return row.split(",").map((val) => val.substring(1, val.length - 1));
  }

  // Counts how many times a holomem had died to the same enemy
  function countOccurences(arr) {
    const count = {};
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];
      if (count[item]) {
        count[item]++;
      } else {
        count[item] = 1;
      }
    }
    let tempoUnique = [];
    let tempoSeries = [];

    const sortable = Object.fromEntries(
      Object.entries(count).sort(([, a], [, b]) => b - a)
    );
    for (const [key, value] of Object.entries(sortable)) {
      const tempoKey = key;
      if (tempoKey.includes("Boss")) {
        let tempoBoss = tempoKey.replace("Boss", "");
        tempoUnique.push(tempoBoss);
      } else if (tempoKey.includes("NPC")) {
        let tempoNPC = tempoKey.replace("NPC", "");
        tempoUnique.push(tempoNPC);
      } else {
        tempoUnique.push(tempoKey);
      }
      tempoSeries.push(value);
    }
    setUnique(tempoUnique);
    setSeries(tempoSeries);
    console.log(tempoUnique);
    console.log(tempoSeries);
  }

  function chartColor() {
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

  function chartValueFontColor() {
    const black = ["ame"];
    if (black.includes(location)) {
      return "black";
    } else {
      return "white";
    }
  }
  const barSeries = [
    {
      data: series,
    },
  ];
  //Chart Config
  const options = {
    chart: {
      width: 300,
      type: "bar",
      foreColor: "#b9b9bb",
    },
    labels: unique,
    theme: {
      monochrome: {
        enabled: true,
        color: chartColor(),
        shadeTo: "dark",
        shadeIntensity: 0.5,
      },
    },
    tooltip: {
      color: "#b9b9bb",
      style: {
        fontSize: "20px",
        color: "#b9b9bb",
      },
    },
    dataLabels: {
      enabledOnSeries: true,
      offset: -5,
      style: {
        fontSize: "20px",
        foreColor: "#b9b9bb",
        color: "#b9b9bb",
      },
      textAnchor: "middle",
      distributed: false,
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 1,
        color: "#000",
        opacity: 1,
      },
      formatter: function (val, opts) {
        return opts.w.config.series[opts.seriesIndex];
      },
    },
    responsive: [
      {
        breakpoint: 1921,
        options: {
          chart: {
            width: "110%",
          },
          legend: {
            position: "bottom",
            offsetY: 0,
            height: 110,

            fontSize: "15px",
          },
        },
      },
      {
        breakpoint: 1710,
        options: {
          chart: {
            width: "250%",
            height: "600px",
          },
          legend: {
            position: "right",
            offsetY: 0,
            height: 300,
            fontSize: "25px",
          },
        },
      },
      {
        breakpoint: 1130,
        options: {
          chart: {
            width: "200%",
            height: "500px",
          },
          legend: {
            position: "right",
            offsetY: 0,
            height: 220,
            fontSize: "20px",
          },
        },
      },
      {
        breakpoint: 700,
        options: {
          chart: {
            width: "200%",
            height: "500px",
          },
          legend: {
            position: "right",
            offsetY: 0,
            height: 225,
            fontSize: "15px",
          },
        },
      },
      {
        breakpoint: 650,
        options: {
          chart: {
            width: "175%",
            height: "500px",
          },
          legend: {
            position: "right",
            offsetY: 0,
            height: 225,
            fontSize: "15px",
          },
        },
      },
      {
        breakpoint: 570,
        options: {
          chart: {
            width: "150%",
            height: "600px",
          },
          legend: {
            position: "right",
            offsetY: 0,
            height: 150,
            fontSize: "13px",
          },
        },
      },
      {
        breakpoint: 490,
        options: {
          chart: {
            width: "90%",
            height: "600px",
          },
          legend: {
            position: "bottom",
            offsetY: 0,
            height: 85,
            fontSize: "13px",
          },
        },
      },
    ],
    legend: {
      position: "bottom",
      offsetY: 0,
      height: "25%",
      fontSize: "15px",
    },
  };

  const barOptions = {
    chart: {
      type: "bar",
      height: 350,
      width: 1000,
      foreColor: "white",
      fontFamily: "Elden Ring",
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
        height: "100%",
        dataLabels: {
          position: "bottom",
        },
      },
    },
    dataLabels: {
      enabled: true,
      textAnchor: "start",
      style: {
        colors: [`#FFF`],
        textAlign: "center",
        fontSize: "1.5em",
      },
      formatter: function (val, opt) {
        return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
      },
      offsetX: 0,
    },
    xaxis: {
      categories: unique,
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    colors: "gray",

    responsive: [
      {
        breakpoint: 1921,
        options: {
          chart: {
            height: "700px",
            width: "185%",
            position: "bottom",
          },
        },
      },
      {
        breakpoint: 1710,
        options: {
          chart: {
            width: "270%",
            height: "600px",
          },
          dataLabels: {
            style: {
              fontSize: "1.5em",
            },
          },
        },
      },
      {
        breakpoint: 1130,
        options: {
          chart: {
            width: "210%",
            height: "500px",
          },
          dataLabels: {
            style: {
              fontSize: "1.5em",
            },
          },
        },
      },
      {
        breakpoint: 700,
        options: {
          chart: {
            width: "200%",
            height: "500px",
          },
        },
      },
      {
        breakpoint: 650,
        options: {
          chart: {
            width: "175%",
            height: "500px",
          },
        },
      },
      {
        breakpoint: 570,
        options: {
          chart: {
            width: "150%",
            height: "600px",
          },
          dataLabels: {
            style: {
              fontSize: "1.3em",
            },
          },
        },
      },
      {
        breakpoint: 490,
        options: {
          chart: {
            width: "115%",
            height: "400px",
          },
          dataLabels: {
            style: {
              fontSize: "1.2em",
            },
          },
        },
      },
      {
        breakpoint: 365,
        options: {
          chart: {
            width: "90%",
            height: "400px",
          },
          dataLabels: {
            style: {
              fontSize: "1.2em",
            },
          },
        },
      },
    ],
  };

  return (
    <div>
      {" "}
      <Box
        sx={{
          ".apexcharts-tooltip span": {
            color: `${chartValueFontColor()}`,
          },
          ".apexcharts-data-labels": {
            marginTop: "10px",
          },
          "#SvgjsG1551": {
            marginTop: "10px",
          },
        }}
      >
        <ReactApexChart
          options={barOptions}
          series={barSeries}
          type="bar"
          width="175%"
          height="600px"
          style={{}}
        />
      </Box>
    </div>
  );
}
