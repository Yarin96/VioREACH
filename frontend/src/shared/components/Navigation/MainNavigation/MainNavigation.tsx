import { AppBar, Typography, Toolbar, Grid } from "@mui/material";
import NavLinks from "../NavLinks/NavLinks";
import SideDrawer from "../SideDrawer/SideDrawer";
import "./MainNavigation.css";
import AnimatedLogo from "../AnimatedLogo/AnimatedLogo";
import { Link } from "react-router-dom";

const MainNavigation = () => {
  return (
    <AppBar style={{ backgroundColor: "#FEFEFE" }}>
      <Toolbar color="secondary">
        <Grid container justifyContent="space-between">
          <Grid xs={1} item style={{ display: "flex" }}>
            <AnimatedLogo />
            <Typography
              fontFamily={"'Rubik', sans-serif"}
              className="logo"
              style={{ color: "#000000", marginLeft: "20px" }}
            >
              <Link to="/">VioREACH</Link>
            </Typography>
          </Grid>
          <Grid xs={6} item className="links">
            <Grid container justifyContent="center">
              <NavLinks />
            </Grid>
          </Grid>
          <Grid item xs={1} />
          <SideDrawer />
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default MainNavigation;
