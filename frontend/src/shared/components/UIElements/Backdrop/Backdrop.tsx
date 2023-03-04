import React from "react";
import ReactDOM from "react-dom";

import "./Backdrop.css";

const Backdrop = (props: any) => {
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={props.onClick}></div>,
    document.getElementById("backdrop-hook")!
  );
};

export default Backdrop;
