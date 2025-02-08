import React from "react";
import { Button } from "react-bootstrap";

const Header = () => {
  return (
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
  );
};

export default Header;
