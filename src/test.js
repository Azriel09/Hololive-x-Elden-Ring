import React, { useEffect, useState } from "react";
import useGoogleSheets from "use-google-sheets";
import "./test.css";

export default function Test() {
  const object = {
    timestamp: ["123", "456", "789"],
    killer: ["k1", "k2", "k3"],
  };
  const last = object.killer[object.killer.length - 1];
  return <div className="gg" cite="gg"></div>;
}
