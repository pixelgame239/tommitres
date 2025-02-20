/* eslint-disable no-unused-vars */
import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import tommittitle from "../assets/title.png";
import phoneCall from "../assets/call.png";
import ResponsiveScreen from "../styles/responsiveScreen";

const Header = () => {
  const navigate = useNavigate();
  const { width } = ResponsiveScreen();
  const isMobile = width <= 768;
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "white",
        zIndex: 1000,
        padding: "5px 10px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
        height: isMobile ? 80 : 100
      }}
    >
      <h1 style={{ margin: 0 }}>
        <a
          onClick={() => navigate("/tommitres")}
          style={{
            cursor: "pointer",
          }}
        >
          <img src={tommittitle} width={isMobile ? width/2.5 : width/3} alt="Tôm & Mít Restaurant"></img>
        </a>
      </h1>
      <a href="tel:0862051226">
        <div>
          <img src={phoneCall} height= {isMobile ?"50px": "80px"} style={{ margin: 5 }}></img>
          <p style={{ display: "inline-block", fontSize: isMobile ? '12px' : '18px' }}>Gọi ngay</p>
        </div>
      </a>
      <Button variant="primary" onClick={() => navigate("/tommitres/Login")}>
        Đăng Nhập
      </Button>
    </div>
  );
};

export default Header;
