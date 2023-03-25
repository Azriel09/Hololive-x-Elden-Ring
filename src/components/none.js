import React, { useState } from "react";

export default function None() {
  const [series, setSeries] = useState[(44, 55, 13, 33)];
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
      <div class="chart-wrap">
        <div id="chart">
          <ReactApexChart
            options={options}
            series={series}
            type="donut"
            width={380}
          />
        </div>
      </div>
      <div class="actions">
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
