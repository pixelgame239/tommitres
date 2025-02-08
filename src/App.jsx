import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import CarouselSlider from "./MainCarousel";
import ActionButtons from "./ActionButtons";

const RestaurantApp = () => {
  return (
    <div style={{ overflowX: "hidden" }}>
      <Header />
      <CarouselSlider />
      <ActionButtons />
    </div>
  );
};

export default RestaurantApp;
