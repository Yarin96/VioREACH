import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

window.addEventListener("resize", function () {
  window.resizeTo(window.innerWidth, window.innerHeight);
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
