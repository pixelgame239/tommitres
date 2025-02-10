// import React from "react";
import { Carousel } from "react-bootstrap";
import tomMit from "../assets/tom-mit.jpg";
import doAn from "../assets/do-an.jpg";
import nemNuong from "../assets/nem-nuong.jpg";

const images = [tomMit, doAn, nemNuong];

const CarouselSlider = () => {
  return (
    <div style={{ marginTop: "20px", overflow: "hidden" }} className="vw-100">
      <Carousel>
        {images.map((image, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={image}
              alt={image}
              style={{ height: "700px", objectFit: "cover" }}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselSlider;
