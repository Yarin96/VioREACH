import React from "react";
import { Outlet } from "react-router-dom";
import MainNavigation from "../Navigation/MainNavigation/MainNavigation";

const RootLayout: React.FC = () => {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
