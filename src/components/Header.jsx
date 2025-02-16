/* eslint-disable no-unused-vars */
import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Login from "../pages/Login";
import tommittitle from "../assets/title.png";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "../App";
import phoneCall from "../assets/call.png";

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
        marginBottom: 10,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <a
          onClick={() => navigate("/tommitres")}
          style={{
            cursor: "pointer",
          }}
        >
          <img src={tommittitle} width={300} alt="Tôm & Mít Restaurant"></img>
        </a>
      </h1>
      <a href="tel:0862051226" style={{ marginLeft: 400 }}>
        <div>
          <img src={phoneCall} height={50} style={{ margin: 10 }}></img>

          <p style={{ display: "inline-block" }}>Gọi ngay</p>
        </div>

      </a>
      <Button variant="primary" onClick={() => navigate("/tommitres/Login")}>
        Đăng Nhập
      </Button>
    </div>
  );
};

export default Header;
