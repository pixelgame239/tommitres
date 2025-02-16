/* eslint-disable no-unused-vars */
// import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";
import CarouselSlider from "../components/MainCarousel";
import ActionButtons from "../components/ActionButtons";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Order from "../pages/Order"
import OnlineTakeAway from "../pages/OnlineTakeaway";
import ReservationScreen from "../pages/ReservationScreen";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/tommitres" element={<Home />} />
      <Route path="/tommitres/Login" element={<Login />} />
      <Route path="/tommitres/Reservation" element={<ReservationScreen />} /> 
      <Route path ="/tommitres/Order" element={<Order />}/>
      <Route path ="/tommitres/Order/Takeaway" element={<OnlineTakeAway />}/>
    </Routes>
  );
};

export default AppRoutes;
