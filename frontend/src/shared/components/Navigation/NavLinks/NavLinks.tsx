import { useState } from "react";
import { Tab } from "@mui/material";
import { Form, NavLink, useRouteLoaderData } from "react-router-dom";
import { TabContext, TabList } from "@mui/lab";
import "./NavLinks.css";

const NavLinks = () => {
  const token: any = useRouteLoaderData("root");
  const [tabValue, setTabValue] = useState("1");

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const resetTabValue = () => {
    setTabValue("1");
  };

  return (
    <>
      <TabContext value={tabValue}>
        <TabList onChange={handleTabChange} aria-label="Navigation Links">
          <Tab label="HOME" component={NavLink} to="/" value="1" />
          <Tab label="ABOUT" component={NavLink} to="/about" value="2" />
          {token && (
            <Tab
              label="DETECTION"
              component={NavLink}
              to="/detection"
              className="nav_links"
              value="3"
            />
          )}
          {!token && (
            <Tab
              label="LOGIN"
              component={NavLink}
              to="/auth?mode=login"
              className="nav_links"
              value="3"
            />
          )}
        </TabList>
      </TabContext>
      {token && (
        <Form action="/logout" method="post" className="nav_links">
          <button onClick={resetTabValue}>LOGOUT</button>
        </Form>
      )}
    </>
  );
};

export default NavLinks;
