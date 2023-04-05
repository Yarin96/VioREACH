import React, { useState } from "react";
import { SwipeableDrawer, Button, Divider } from "@mui/material";
import { FiMenu } from "react-icons/fi";
import NavLinks from "../NavLinks/NavLinks";
import "./SideDrawer.css";

type Anchor = "left";

export default function SideDrawer() {
  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, left: open });
    };

  return (
    <div className="side_drawer">
      <React.Fragment key={"left"}>
        <Button onClick={toggleDrawer("left", true)}>
          <FiMenu fontSize="2.2rem" />
        </Button>
        <SwipeableDrawer
          anchor="left"
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
          onOpen={toggleDrawer("left", true)}
        >
          <div className="tabListContainer">
            <NavLinks />
            <Divider />
          </div>
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}
