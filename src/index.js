import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./pages/landing/landing.css";
import "./pages/about/about.css";
import "./pages/articles/articles.css";
import "./pages/teaching/teaching.css";
import "./pages/experience/experience.css";
import "./pages/software/software.css";
import "./pages/contact/contact.css";

import App from "./App";
import { HelmetProvider } from "react-helmet-async";

import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
);
