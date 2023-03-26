import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import ReactApexChart from "react-apexcharts";

export default function PieChart(props) {
  const [selected, setSelected] = useState(false);
  const [series, setSeries] = useState([]);
  const [unique, setUnique] = useState([]);
  const sheetID = "1RbmeWv7zdmLIvQoOiKZYOkHlcMfBsMxs7nj5C2nCjYg";
  const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:csv&sheet=${
    props.name + (+[props.selected] + 1)
  }`;
  console.log(sheetURL);
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
    console.log(count);
    for (const [key, value] of Object.entries(count)) {
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

  const options = {
    chart: {
      width: 600,
      type: "donut",
    },
    labels: unique,
    dataLabels: {
      enabledOnSeries: true,
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
      <div className="chart-wrap">
        <div id="chart">
          <ReactApexChart
            options={options}
            series={series}
            type="donut"
            width={700}
          />
        </div>
      </div>
    </div>
  );
}
