/* eslint-disable no-unused-vars */
import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Login from "../pages/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "../App";

const Header = () => {
  const navigate = useNavigate();

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
      <Button variant="primary" onClick={() => navigate("/Login")}>
        Đăng Nhập
      </Button>
    </div>
  );
};

export default Header;
