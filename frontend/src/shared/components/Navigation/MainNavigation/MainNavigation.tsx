import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { AppBar, Typography, Toolbar, Grid } from "@mui/material";
import NavLinks from "../NavLinks/NavLinks";
import SideDrawer from "../SideDrawer/SideDrawer";
import Backdrop from "../../UIElements/Backdrop/Backdrop";
import "./MainNavigation.css";

const MainNavigation = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  return (
    <nav>
      <AppBar position="static" color="default">
        <Toolbar>
          {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
          <Grid container justifyContent="space-between">
            <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
              <nav className="drawer_navigation">
                <NavLinks />
              </nav>
            </SideDrawer>
            <Grid xs={1} item>
              <Typography variant="h4" className="logo">
                VioREACH
              </Typography>
            </Grid>
            <Grid xs={6} item className="links">
              <Grid container justifyContent="center">
                <NavLinks />
              </Grid>
            </Grid>
            <Grid item xs={1} />
            <button className="main_navigation_btn" onClick={openDrawerHandler}>
              <FiMenu />
            </button>
          </Grid>
        </Toolbar>
      </AppBar>
    </nav>
  );
};

export default MainNavigation;
