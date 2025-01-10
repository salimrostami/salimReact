import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./pages/landing/landing.css";
import "./pages/about/about.css";
import "./pages/presentation/presentation.css";
import "./pages/research/research.css";
import "./pages/teaching/teaching.css";
import "./pages/software/software.css";
import "./pages/contact/contact.css";

import App from "./App";

import { HashRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter >
      <App />
    </HashRouter >
  </React.StrictMode>
);
