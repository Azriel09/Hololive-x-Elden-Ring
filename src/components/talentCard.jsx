import React from "react";
import IconButton from "@mui/material/IconButton";
import CoverIcon from "../images/cover-icon.png";
import { useProSidebar } from "react-pro-sidebar";
import GetData from "./sheet_retriever";
import "./css/page.css";
export default function TalentCard(props) {
  const { toggleSidebar } = useProSidebar();
  return (
    <div className="talent">
      <div
        style={{
          height: "100px",
          display: "flex",
          flexDirection: "row",
          marginBottom: "20px",
          width: "75%",
        }}
      >
        <IconButton aria-label="Example" onClick={() => toggleSidebar()}>
          <img
            src={CoverIcon}
            alt="talent-bg"
            style={{ borderRadius: "50%", width: "75px", height: "75px" }}
          />
        </IconButton>
        <h1 className={props.name}>{props.fname}</h1>
      </div>
      <GetData name={props.name} />
    </div>
  );
}
