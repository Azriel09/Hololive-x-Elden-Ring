import * as React from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Routes, Route } from "react-router-dom";
import { Gura } from "../pages/Gura";
import { Ame } from "../pages/Ame";
import { Calli } from "../pages/Calli";
import { Ina } from "../pages/Ina";
import { Irys } from "../pages/Irys";
import { Kronii } from "../pages/Kronii";
import { Home } from "../pages/Home";

import {
  Sidebar,
  Menu,
  MenuItem,
  useProSidebar,
  SubMenu,
  menuClasses,
} from "react-pro-sidebar";
import CoverIcon from "../images/cover-icon.png";
import {
  GuraIcon,
  AmeIcon,
  CalliIcon,
  InaIcon,
  IrysIcon,
  KroniiIcon,
  OkayuIcon,
  FlareIcon,
  LuiIcon,
  LunaIcon,
  MikoIcon,
  ChloeIcon,
  KoyoriIcon,
  LamyIcon,
  BotanIcon,
  PekoraIcon,
  NoelIcon,
  AkiroseIcon,
  MoonaIcon,
  ReineIcon,
} from "./icons";

function SideNav() {
  const { toggleSidebar } = useProSidebar();

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <Sidebar
        backgroundColor="rgba(28, 29, 33, 1)"
        breakPoint="always"
        width="350px"
      >
        <Menu
          menuItemStyles={{
            button: ({ level, active, disabled }) => {
              return {
                color: "#b9b9bb",
                backgroundColor: "rgba(28, 29, 33, 1)",
                paddingLeft: "75px",
                fontWeight: "500",
                letterSpacing: "0.5px",
                "&:hover": {
                  backgroundColor: "#2c2d33 !important",
                },
              };
            },
          }}
        >
          <MenuItem disabled></MenuItem>
          <MenuItem disabled></MenuItem>
          <Typography
            sx={{
              backgroundColor: "rgba(28, 29, 33, 1)",
              color: "#b9b9bb",
              fontSize: "12px",
              lineHeight: "18px",
              letterSpacing: "0.5px",
              fontWeight: "600",
              paddingLeft: "30px",
            }}
          >
            Death Timestamps
          </Typography>
          <SubMenu
            label="Hololive EN"
            rootStyles={{
              ["& > ." + menuClasses.button]: {
                backgroundColor: "#1c1d21",
                color: "#b9b9bb",
                letterSpacing: "0.5px",
              },

              ["." + menuClasses.subMenuContent]: {
                backgroundColor: "#1c1d21",
              },
            }}
          >
            <MenuItem
              onClick={() => toggleSidebar()}
              component={<Link to="/ame" />}
              icon={<AmeIcon />}
            >
              Amelia Watson
            </MenuItem>
            <MenuItem
              onClick={() => toggleSidebar()}
              component={<Link to="/gura" />}
              icon={<GuraIcon />}
            >
              Gawr Gura
            </MenuItem>
            <MenuItem
              onClick={() => toggleSidebar()}
              component={<Link to="/irys" />}
              icon={<IrysIcon />}
            >
              IRyS
            </MenuItem>
            <MenuItem
              onClick={() => toggleSidebar()}
              component={<Link to="/calli" />}
              icon={<CalliIcon />}
            >
              Mori Calliope
            </MenuItem>
            <MenuItem
              onClick={() => toggleSidebar()}
              component={<Link to="/ina" />}
              icon={<InaIcon />}
            >
              Ninomae Ina'nis
            </MenuItem>
            <MenuItem
              onClick={() => toggleSidebar()}
              component={<Link to="/kronii" />}
              icon={<KroniiIcon />}
            >
              Ouro Kronii
            </MenuItem>
          </SubMenu>
          <SubMenu
            label="Hololive ID"
            rootStyles={{
              ["& > ." + menuClasses.button]: {
                backgroundColor: "#1c1d21",
                color: "#b9b9bb",
                letterSpacing: "0.5px",
              },

              ["." + menuClasses.subMenuContent]: {
                backgroundColor: "#1c1d21",
              },
            }}
          >
            <MenuItem icon={<MoonaIcon />}>Hoshinova Moona</MenuItem>
            <MenuItem icon={<ReineIcon />}>Murasame Reine</MenuItem>
          </SubMenu>
          <SubMenu
            label="Hololive JP"
            rootStyles={{
              ["& > ." + menuClasses.button]: {
                backgroundColor: "#1c1d21",
                color: "#b9b9bb",
                letterSpacing: "0.5px",
              },

              ["." + menuClasses.subMenuContent]: {
                backgroundColor: "#1c1d21",
              },
            }}
          >
            <MenuItem icon={<AkiroseIcon />}>Aki Rosenthal</MenuItem>
            <MenuItem icon={<KoyoriIcon />}>Hakui Koyori</MenuItem>
            <MenuItem icon={<LunaIcon />}>Himemori Luna</MenuItem>
            <MenuItem icon={<OkayuIcon />}>Nekomata Okayu</MenuItem>
            <MenuItem icon={<ChloeIcon />}>Sakamata Chloe</MenuItem>
            <MenuItem icon={<MikoIcon />}>Sakura Miko</MenuItem>
            <MenuItem icon={<FlareIcon />}>Shiranui Flare</MenuItem>
            <MenuItem icon={<NoelIcon />}>Shirogane Noel</MenuItem>
            <MenuItem icon={<BotanIcon />}>Shishiro Botan</MenuItem>
            <MenuItem icon={<LuiIcon />}>Takane Lui</MenuItem>
            <MenuItem icon={<PekoraIcon />}>Usada Pekora</MenuItem>
            <MenuItem icon={<LamyIcon />}>Yukihana Lamy</MenuItem>
          </SubMenu>
          <MenuItem disabled></MenuItem>
        </Menu>
      </Sidebar>

      <main>
        <IconButton aria-label="Example" onClick={() => toggleSidebar()}>
          <img src={CoverIcon} style={{ borderRadius: "50%", width: "75px" }} />
        </IconButton>
      </main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gura" element={<Gura />} />
        <Route path="/ame" element={<Ame />} />
        <Route path="/calli" element={<Calli />} />
        <Route path="/ina" element={<Ina />} />
        <Route path="/irys" element={<Irys />} />
        <Route path="/kronii" element={<Kronii />} />
      </Routes>
    </div>
  );
}

export default SideNav;
