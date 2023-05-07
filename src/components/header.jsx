import React from "react";
import { useLocation } from "react-router-dom";

export default function TalentHeader(props) {
  const path = useLocation().pathname;
  const location = path.split("/")[1];

  return <div></div>;
}
