import { AppBar, Typography, Toolbar, Grid } from "@mui/material";
import NavLinks from "../NavLinks/NavLinks";
import SideDrawer from "../SideDrawer/SideDrawer";
import "./MainNavigation.css";

const MainNavigation = () => {
  return (
    <nav>
      <AppBar position="static" color="default">
        <Toolbar>
          <Grid container justifyContent="space-between">
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
            <SideDrawer />
          </Grid>
        </Toolbar>
      </AppBar>
    </nav>
  );
};

export default MainNavigation;
