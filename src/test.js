import React, { useEffect, useState } from "react";
import useGoogleSheets from "use-google-sheets";

export default function Test() {
  const [loading, setLoading] = useState(false);
  const [timestamps, setTimestamps] = useState([]);
  const [causes, setCauses] = useState([]);
  const sheedID = "1RbmeWv7zdmLIvQoOiKZYOkHlcMfBsMxs7nj5C2nCjYg";
  const sheetName = encodeURIComponent("All_Ame");
  const sheetURL = `https://docs.google.com/spreadsheets/d/${sheedID}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;

  useEffect(() => {
    setLoading(true);
    fetch(sheetURL)
      .then((response) => response.text())
      .then((csvText) => handleResponse(csvText))
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  function handleResponse(csvText) {
    let sheetObjects = csvToObjects(csvText);
  }

  function csvToObjects(csv) {
    const csvRows = csv.split("\n");
    const propertyNames = csvSplit(csvRows[0]);

    let objects = [];
    let time = [];
    let cause = [];

    for (let i = 0, max = csvRows.length; i < max; i++) {
      let thisObject = {};
      let row = csvSplit(csvRows[i]);

      for (let j = 0, max = row.length; j < max; j++) {
        thisObject[propertyNames[j]] = row[j];
        if (j === 0) {
          time.push(row[j]);
        } else {
          cause.push(row[j]);
        }
      }

      objects.push(thisObject);
    }
    setTimestamps(time);
    setCauses(cause);
    setLoading(false);
  }

  function csvSplit(row) {
    return row.split(",").map((val) => val.substring(1, val.length - 1));
  }
  return <div></div>;
}
