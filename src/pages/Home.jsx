/* eslint-disable no-unused-vars */
// import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";
import CarouselSlider from "../components/MainCarousel";
import ActionButtons from "../components/ActionButtons";
import fbLogo from '../assets/Facebook-logo.png'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import ReservationScreen from "./ReservationScreen"; 
import DetailedRevenueScreen from "./DetailedRevenueScreen";

const Home = () => {
  return (
    <div style={{ overflowX: "hidden" }}>
      <div style={{ overflowX: "hidden" }}>
        <Header />
        <CarouselSlider />
        <ActionButtons />
        <div style={{
          position: "fixed",
          bottom: "20px",         
          right: "15px",         
          zIndex: 1000
        }}>
          <a href="https://www.facebook.com/TOM.MIT.88/?locale=vi_VN" target="_blank">
            <img src={fbLogo} width={100}></img>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
