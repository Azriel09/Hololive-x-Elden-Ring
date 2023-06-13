import { IconButton } from "@mui/material";
import { useProSidebar } from "react-pro-sidebar";
import CoverIcon from "../../images/cover-icon.png";
import BossRetriever from "./retriever";

export default function BossContainer() {
  const { toggleSidebar } = useProSidebar();
  return (
    <div>
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
        <BossRetriever />
      </div>
    </div>
  );
}
