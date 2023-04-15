import { AppBar, Typography, Toolbar, Grid } from "@mui/material";
import NavLinks from "../NavLinks/NavLinks";
import SideDrawer from "../SideDrawer/SideDrawer";
import "./MainNavigation.css";
import AnimatedLogo from "../AnimatedLogo/AnimatedLogo";

const MainNavigation = () => {
  return (
    <AppBar color="default">
      <Toolbar>
        <Grid container justifyContent="space-between">
          <Grid xs={1} item>
            {/* <AnimatedLogo /> */}
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
          <SideDrawer />
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default MainNavigation;
