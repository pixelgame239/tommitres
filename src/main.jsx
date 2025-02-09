/* eslint-disable no-unused-vars */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Login from "./pages/Login.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ReactDOM from "react-dom";

createRoot(document.getElementById("root")).render(
  <Router>
    <App />
  </Router>

  // <Router>
  //   <RestaurantApp />
  // </Router>
);
