import React from "react";
import { render } from "react-dom";
import App from "./scenes/App/App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/reset.scss";
import "./styles/common.scss";
import "rsuite/dist/rsuite.min.css";
import "semantic-ui-css/semantic.min.css";
require("dotenv").config();

const target = document.getElementById("root");
render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  target
);
