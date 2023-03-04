import React from "react";
import "./Button.css";

const Button = (props: any) => {
  return (
    <div className="container">
      <button className="button" onClick={props.onClick}>
        Click me to scan a video from Instagram account!
      </button>
    </div>
  );
};

export default Button;
