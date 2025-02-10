/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/Home");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 vw-100"
      style={{
        background: "#f0f2f5", // Thay đổi thành một màu đơn
      }}
    >
      <div
        className="card p-5 shadow-lg d-flex flex-column justify-content-center"
        style={{
          width: "450px",
          height: "520px",
          borderRadius: "15px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          backgroundColor: "white",
        }}
      >
        <h3 className="text-center mb-4" style={{ color: "#333" }}>
          Đăng nhập
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ borderRadius: "10px" }}
            />
          </div>
          <div className="mb-4">
            <label className="form-label fw-semibold">Mật khẩu</label>
            <input
              type="password"
              className="form-control p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ borderRadius: "10px" }}
            />
          </div>
          <button
            type="submit"
            className="btn w-100 p-2 fw-bold"
            style={{
              backgroundColor: "#4A90E2",
              color: "white",
              borderRadius: "10px",
            }}
          >
            Đăng nhập
          </button>
        </form>
        <p className="text-center mt-3">
          <a
            href="#"
            className="text-decoration-none"
            style={{ color: "#4A90E2" }}
          >
            Quên mật khẩu?
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
