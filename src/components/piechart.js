import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import ReactApexChart from "react-apexcharts";

export default function PieChart(props) {
  const [selected, setSelected] = useState(false);
  const [series, setSeries] = useState([44, 55, 13, 33]);

  const sheetURL = `https://docs.google.com/spreadsheets/d/${
    props.sheet
  }/gviz/tq?tqx=out:csv&sheet=${props.name + (+[props.selected] + 1)}`;

  useEffect(() => {
    fetch(sheetURL)
      .then((response) => response.text())
      .then((csvText) => handleResponse(csvText))
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
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
  }

  function csvSplit(row) {
    return row.split(",").map((val) => val.substring(1, val.length - 1));
  }

  const options = {
    chart: {
      width: 380,
      type: "donut",
    },
    dataLabels: {
      enabled: true,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
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
      height: 230,
    },
  };

  const appendData = () => {
    var arr = series.slice();
    arr.push(Math.floor(Math.random() * (100 - 1 + 1)) + 1);

    setSeries(arr);
  };

  const removeData = () => {
    if (series.legend === 1) return;

    var arr = series.slice();
    arr.pop();
    setSeries(arr);
  };

  const randomize = () => {
    setSeries(
      series.map(function () {
        return Math.floor(Math.random() * (100 - 1 + 1)) + 1;
      })
    );
  };

  const reset = () => {
    setSeries([44, 45, 13, 33]);
  };
  return (
    <div>
      <div className="chart-wrap">
        <div id="chart">
          <ReactApexChart
            options={options}
            series={series}
            type="donut"
            width={380}
          />
        </div>
      </div>
      <div className="actions">
        <button onClick={() => appendData()}>+ ADD</button>
        &nbsp;
        <button onClick={() => removeData()}>- REMOVE</button>
        &nbsp;
        <button onClick={() => randomize()}>RANDOMIZE</button>
        &nbsp;
        <button onClick={() => reset()}>RESET</button>
      </div>
    </div>
  );
}
