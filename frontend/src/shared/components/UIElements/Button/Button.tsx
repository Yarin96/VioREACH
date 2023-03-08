import React from "react";
import "./Button.css";

const Button = (props: any) => {
  return (
    <div>
      <button className="button-82-pushable" onClick={props.onClick}>
        <span className="button-82-shadow"></span>
        <span className="button-82-edge"></span>
        <span className="button-82-front text">Start Scanning...</span>
      </button>
    </div>
  );
};

export default Button;
