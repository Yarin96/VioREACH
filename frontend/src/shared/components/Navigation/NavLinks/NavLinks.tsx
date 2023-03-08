import React, { useContext } from "react";
import "./NavLinks.css";
import { NavLink } from "react-router-dom";
// import { AuthContext } from "../../../context/auth-context";

const NavLinks = (props: any) => {
  //   const authContext = useContext(AuthContext);

  return (
    <ul className="nav_links">
      {/* {authContext.isLoggedIn && ( */}
      <li>
        <NavLink to="/about">ABOUT</NavLink>
      </li>
      {/* )} */}
      {/* {authContext.isLoggedIn && ( */}
      <li>
        <NavLink to="/detection">DETECT VIOLENCE</NavLink>
      </li>
      {/* )}
      {authContext.isLoggedIn && (
      <li>
        onClick={authContext.logout}
        <NavLink to="/auth">LOG OUT</NavLink>
      </li>
      )} */}
      {/* {!authContext.isLoggedIn && ( */}
      <li>
        <NavLink to="/auth?mode=login">SIGN IN</NavLink>
      </li>
      {/* )}  */}
    </ul>
  );
};

export default NavLinks;
