import React from "react";
import { Carousel } from "react-bootstrap";

const CarouselSlider = () => {
  return (
    <div style={{ marginTop: "60px", overflow: "hidden" }} className="vw-100">
      <Carousel>
        {["Món Ngon 1", "Món Ngon 2", "Món Ngon 3"].map((title, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src="https://via.placeholder.com/800x400"
              alt={title}
              style={{ height: "400px", objectFit: "cover" }}
            />
            <Carousel.Caption>
              <h5>{title}</h5>
              <p>Mô tả ngắn gọn về món ăn.</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselSlider;
