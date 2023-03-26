import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import ReactApexChart from "react-apexcharts";
import { useLocation } from "react-router-dom";

export default function PieChart(props) {
  const path = useLocation().pathname;
  const location = path.split("/")[1];

  const [selected, setSelected] = useState(false);
  const [series, setSeries] = useState([]);
  const [unique, setUnique] = useState([]);
  const sheetID = "1RbmeWv7zdmLIvQoOiKZYOkHlcMfBsMxs7nj5C2nCjYg";
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
    let sheetObjects = csvToObjects(csvText, e);
  }

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

  function csvSplit(row) {
    return row.split(",").map((val) => val.substring(1, val.length - 1));
  }

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
      if (key.includes("Boss")) {
        let tempoBoss = key.replace("Boss", "");
        tempoUnique.push(tempoBoss);
      } else if (key.includes("NPC")) {
        let tempoNPC = key.replace("NPC", "");
        tempoUnique.push(tempoNPC);
      } else {
        tempoUnique.push(key);
      }
      tempoSeries.push(value);
    }
    setUnique(tempoUnique);
    setSeries(tempoSeries);
  }

  function chartColor() {
    switch (location) {
      case "ame":
        return "#ffff00";
      case "calli":
        return "#ff0000";
      case "gura":
        return "#008ffb";
      case "four":
        return "FOUR";
      default:
        return "ONE";
    }
  }
  chartColor();

  const options = {
    chart: {
      width: 300,
      type: "pie",
      foreColor: "#b9b9bb",
      fontSiz: "30px",
    },
    labels: unique,
    theme: {
      monochrome: {
        enabled: true,
        color: chartColor(),
        shadeTo: "dark",
        shadeIntensity: 0.65,
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
      formater(val, opt) {
        console.log(opt.seriesIndex);
        return series[opt.seriesIndex][opt.dataPointIndex];
      },
      enabledOnSeries: true,
      offset: -5,
      style: {
        fontSize: "20px",
        foreColor: "#b9b9bb",
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
    },
    responsive: [
      {
        breakpoint: 100,
        options: {
          chart: {
            width: 500,
          },
          legend: {
            show: false,
          },
        },
      },
    ],
    legend: {
      position: "right",
      offsetY: 0,
      height: 400,
    },
  };

  return (
    <div>
      <Box>
        <ReactApexChart
          options={options}
          series={series}
          type="pie"
          width={700}
        />
      </Box>
    </div>
  );
}
