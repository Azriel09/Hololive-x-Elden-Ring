import React from "react";
import GetData from "../components/sheet_retriever";
import "../components/css/page.css";
import CoverIcon from "../images/cover-icon.png";
import { useProSidebar } from "react-pro-sidebar";
import IconButton from "@mui/material/IconButton";
export function Ame() {
  const { toggleSidebar } = useProSidebar();
  return (
    <div className="talent">
      <div style={{ height: "100px", display: "flex", flexDirection: "row" }}>
        <IconButton aria-label="Example" onClick={() => toggleSidebar()}>
          <img
            src={CoverIcon}
            style={{ borderRadius: "50%", width: "75px", height: "75px" }}
          />
        </IconButton>
        <h1>Amelia Watson</h1>
      </div>
      <GetData name="Ame" />
    </div>
  );
}

export function Calli() {
  return (
    <div className="talent">
      <div>
        <h1>Mori Calliope</h1>
      </div>
      <GetData name="Calli" />
    </div>
  );
}

export function Gura() {
  return (
    <div className="talent">
      <div>
        <h1>Gawr Gura</h1>
      </div>
      <GetData name="Gura" />
    </div>
  );
}

export function Ina() {
  return (
    <div className="talent">
      <div>
        <h1>Ninomae Ina'nis</h1>
      </div>
      <GetData name="Ina" />
    </div>
  );
}

export function Irys() {
  return (
    <div className="talent">
      <div>
        <h1>IRyS</h1>
      </div>
      <GetData name="Irys" />
    </div>
  );
}

export function Kronii() {
  return (
    <div className="talent">
      <div>
        <h1>Ouro Kronii</h1>
      </div>
      <GetData name="Kronii" />
    </div>
  );
}

export function Home() {
  return (
    <div className="talent">
      <h1>Home</h1>
    </div>
  );
}
