import React from "react";
import { Outlet } from "react-router-dom";
import MainNavigation from "../Navigation/MainNavigation/MainNavigation";
import Footer from "../Footer/Footer";

const RootLayout: React.FC = () => {
  return (
    <div>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
