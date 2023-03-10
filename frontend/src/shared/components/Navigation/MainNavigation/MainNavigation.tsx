import { useState } from "react";
import MainHeader from "../MainHeader/MainHeader";
import NavLinks from "../NavLinks/NavLinks";
import SideDrawer from "../SideDrawer/SideDrawer";
import Backdrop from "../../UIElements/Backdrop/Backdrop";
import { FiMenu } from "react-icons/fi";
import "./MainNavigation.css";
import { Link } from "react-router-dom";

const MainNavigation = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  return (
    <>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <nav className="drawer_navigation">
          <NavLinks />
        </nav>
      </SideDrawer>
      <MainHeader>
        <Link to="/">
          <img className="logo" src="/assets/images/logo.png" alt="logo" />
        </Link>
        <nav className="links">
          <NavLinks />
        </nav>
        <button className="main_navigation_btn" onClick={openDrawerHandler}>
          <FiMenu />
        </button>
      </MainHeader>
    </>
  );
};

export default MainNavigation;
