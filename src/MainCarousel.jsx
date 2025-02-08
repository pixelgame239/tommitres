// import React from "react";
import { Carousel } from "react-bootstrap";

const MainCarousel = () => {
  const carouselItems = [
    {
      src: "https://via.placeholder.com/800x400",
      title: "Món Ngon 1",
      description: "Mô tả ngắn gọn về món ăn.",
    },
    {
      src: "https://via.placeholder.com/800x400",
      title: "Món Ngon 2",
      description: "Mô tả ngắn gọn về món ăn.",
    },
    {
      src: "https://via.placeholder.com/800x400",
      title: "Món Ngon 3",
      description: "Mô tả ngắn gọn về món ăn.",
    },
  ];

  return (
    <Carousel>
      {carouselItems.map((item, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100"
            src={item.src}
            alt={`Slide ${index + 1}`}
            style={{ height: "400px", objectFit: "cover" }}
          />
          <Carousel.Caption>
            <h5>{item.title}</h5>
            <p>{item.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default MainCarousel;
