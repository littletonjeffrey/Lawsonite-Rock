import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Sidebar from "./components/sidebar/Sidebar";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Page currentPage="Home">
    </Page>
  </React.StrictMode>
);
