import React from "react";
import GetData from "../components/sheet_retriever";
import "../components/css/page.css";
import CoverIcon from "../images/cover-icon.png";
import { useProSidebar } from "react-pro-sidebar";
import IconButton from "@mui/material/IconButton";
import TalentCard from "../components/talentCard";
export function Ame() {
  return (
    <div>
      <TalentCard name="Ame" fname="Watson Amelia" />
    </div>
  );
}

export function Calli() {
  return (
    <div>
      <div>
        <TalentCard name="Calli" fname="Mori Calliope" />
      </div>
    </div>
  );
}

export function Gura() {
  return (
    <div>
      <div>
        <TalentCard name="Gura" fname="Gawr Gura" />
      </div>
    </div>
  );
}

export function Ina() {
  return (
    <div>
      <div>
        <TalentCard name="Ina" fname="Ninomae Ina'nis" />
      </div>
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
  return (
    <div className="talent">
      <h1>Home</h1>
    </div>
  );
}
