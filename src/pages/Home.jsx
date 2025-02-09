/* eslint-disable no-unused-vars */
// import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";
import CarouselSlider from "../components/MainCarousel";
import ActionButtons from "../components/ActionButtons";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";

const Home = () => {
  return (
    <div style={{ overflowX: "hidden" }}>
      <div style={{ overflowX: "hidden" }}>
        <Header />
        <CarouselSlider />
        <ActionButtons />
      </div>
    </div>
  );
};

export default Home;
