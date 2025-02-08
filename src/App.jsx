import React from "react";
import { Carousel, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const RestaurantApp = () => {
  return (
    <div style={{ overflowX: "hidden" }}>
      {" "}
      {/* Ngăn chặn thanh cuộn ngang */}
      {/* Header và nút đăng nhập cố định ở trên cùng */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "white",
          zIndex: 1000,
          padding: "10px 20px",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ margin: 0 }}>Tôm&Mít Restaurant</h1>
        <Button variant="primary">Đăng Nhập</Button>
      </div>
      {/* Carousel */}
      <div style={{ marginTop: "20px", overflow: "hidden" }} className="vw-100">
        {" "}
        {/* Thêm margin-top để tránh bị che bởi header */}
        <Carousel>
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
      </div>
      {/* Các nút hành động căn giữa */}
      <div
        className="d-flex justify-content-center align-items-center gap-3 mt-4"
        style={{ paddingBottom: "20px" }}
      >
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

export default RestaurantApp;
