import React from "react";
import GetData from "../components/sheet_retriever";
import "../components/css/page.css";
import CoverIcon from "../images/cover-icon.png";
import { useProSidebar } from "react-pro-sidebar";
import IconButton from "@mui/material/IconButton";
import TalentCard from "../components/talentCard";

export function Ame() {
  return (
    <div className="talent-page-container">
      <TalentCard name="Ame" fname="Watson Amelia" />
    </div>
  );
}

export function Calli() {
  return (
    <div className="talent-page-container">
      <TalentCard name="Calli" fname="Mori Calliope" />
    </div>
  );
}

export function Gura() {
  return (
    <div className="talent-page-container">
      <TalentCard name="Gura" fname="Gawr Gura" />
    </div>
  );
}

export function Ina() {
  return (
    <div className="talent-page-container">
      <TalentCard name="Ina" fname="Ninomae Ina'nis" />
    </div>
  );
}

export function Irys() {
  return (
    <div>
      <div>
        <TalentCard name="Irys" fname="Irys" />
      </div>
    </div>
  );
}

export function Kronii() {
  return (
    <div>
      <div>
        <TalentCard name="Kronii" fname="Ouro Kronii" />
      </div>
    </div>
  );
}

export function Home() {
  const { toggleSidebar } = useProSidebar();
  return (
    <div
      style={{
        height: "100px",
        display: "flex",
        flexDirection: "row",
        marginBottom: "20px",
      }}
    >
      <IconButton aria-label="Example" onClick={() => toggleSidebar()}>
        <img
          src={CoverIcon}
          alt="talent-bg"
          style={{ borderRadius: "50%", width: "75px", height: "75px" }}
        />
      </IconButton>
      <h1>Home</h1>
    </div>
  );
}
