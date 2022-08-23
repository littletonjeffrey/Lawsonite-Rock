import React from "react";
import ReactDOM from "react-dom/client";
import Sidebar from "./components/sidebar/Sidebar";
import "./styles/index.css";
import { Page } from "./components/templates/Page";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Page currentPage="Home">

    </Page>
  </React.StrictMode>
);
