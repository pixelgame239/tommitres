/* eslint-disable no-unused-vars */
// import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";
import CarouselSlider from "../components/MainCarousel";
import ActionButtons from "../components/ActionButtons";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Login" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
