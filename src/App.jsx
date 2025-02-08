// import React from "react";
import { Carousel, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const RestaurantApp = () => {
  return (
    <div className="container">
      <h1>Tôm&Mít Restaurant</h1>

      {/* Nút đăng nhập */}
      <div style={{ position: "absolute", top: 10, right: 10 }}>
        <Button variant="primary">Đăng Nhập</Button>
      </div>

      {/* Carousel */}
      <Carousel className="vw-100 overflow-hidden">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/800x400"
            alt="First slide"
            style={{ height: "400px", objectFit: "cover" }}
          />
          <Carousel.Caption>
            <h5>Món Ngon 1</h5>
            <p>Mô tả ngắn gọn về món ăn.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/800x400"
            alt="Second slide"
            style={{ height: "400px", objectFit: "cover" }}
          />
          <Carousel.Caption>
            <h5>Món Ngon 2</h5>
            <p>Mô tả ngắn gọn về món ăn.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/800x400"
            alt="Third slide"
            style={{ height: "400px", objectFit: "cover" }}
          />
          <Carousel.Caption>
            <h5>Món Ngon 3</h5>
            <p>Mô tả ngắn gọn về món ăn.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* Các nút hành động căn giữa */}
      <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
        <Button variant="success" className="px-4 py-2">
          Order
        </Button>
        <Button variant="warning" className="px-4 py-2">
          Đặt Bàn
        </Button>
        <Button variant="info" className="px-4 py-2">
          Trạng Thái Bàn
        </Button>
      </div>
    </div>
  );
};
removeEventListener;

export default RestaurantApp;
