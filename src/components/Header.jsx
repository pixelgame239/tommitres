/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import tommittitle from "../assets/title.png";
import phoneCall from "../assets/call.png";
import ResponsiveScreen from "../styles/responsiveScreen";
import UserProfile from "../backend/userProfile";
import "../styles/avatarStyle.css";
import notiIcon from "../assets/notificationIcon.png";
import AvatarButton from "./AvatarButton";
import NotificationSign from "./NotificationSign";
// SVG icons cho các loại thông báo (thay vì emoji)
const SuccessIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#52c41a" strokeWidth="2">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1890ff" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4m0-4h.01" />
  </svg>
);

const WarningIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#faad14" strokeWidth="2">
    <path d="M12 2L2 20h20L12 2zm0 16v-2m0-4v-4" />
  </svg>
);

const Header = () => {
  const navigate = useNavigate();
  const { width } = ResponsiveScreen();
  const { userType } = UserProfile();
  const isMobile = width <= 768;
// State để kiểm soát dropdown thông báo
const [isDropdownOpen, setIsDropdownOpen] = useState(false);
const dropdownRef = useRef(null);

// State để quản lý danh sách thông báo
const [notifications, setNotifications] = useState([
  { id: 1, message: "Đơn hàng của bạn đã được xác nhận!", time: "5 phút trước", type: "success" },
  { id: 2, message: "Khuyến mãi mới: Giảm 20% hôm nay!", time: "1 giờ trước", type: "info" },
  { id: 3, message: "Bạn có một tin nhắn mới từ Tôm & Mít", time: "2 giờ trước", type: "warning" },
]);

// Hàm toggle dropdown menu
const toggleDropdown = () => {
  console.log("Toggling dropdown, current state:", isDropdownOpen); // Debug
  setIsDropdownOpen(!isDropdownOpen);
};

// Đóng dropdown khi click bên ngoài
useEffect(() => {
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  if (isDropdownOpen) {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
  } else {
    document.removeEventListener("mousedown", handleClickOutside);
    document.removeEventListener("touchstart", handleClickOutside);
  }

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
    document.removeEventListener("touchstart", handleClickOutside);
  };
}, [isDropdownOpen]);

// Hàm xử lý khi nhấn nút "Đánh dấu đã đọc"
const handleMarkAsRead = (id) => {
  console.log(`Đánh dấu thông báo ${id} là đã đọc`); // Debug
};

// Hàm xử lý khi nhấn nút "Xóa"
const handleDelete = (id) => {
  console.log(`Xóa thông báo ${id}`); // Debug
  setNotifications(notifications.filter((noti) => noti.id !== id));
};

// Debug userType và notifications
console.log("userType:", userType);
console.log("Notifications:", notifications);
  
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
          <img src={tommittitle} width={isMobile ? width/3 : width/2.5} alt="Tôm & Mít Restaurant"></img>
        </a>
      </h1>
      <a href="tel:0862051226">
        <div>
          <img src={phoneCall} height= {isMobile ?'50px': '80px'} style={{marginRight: 5}}></img>
          <p style={{ display: "inline-block", fontSize: isMobile ? '12px' : '18px' }}>Gọi ngay</p>
        </div>
      </a>
      {/* Thông báo & Avatar */}
      {userType && (
        <div
          className="noti-icon-container"
          style={{ position: "relative", cursor: "pointer" }}
          ref={dropdownRef}
        >
          {/* Icon thông báo chính (notiIcon) */}
          <div
            style={{
              position: "relative",
              padding: isMobile ? "5px" : "8px",
              borderRadius: "50%",
              backgroundColor: isDropdownOpen ? "#f0f0f0" : "transparent",
              transition: "background-color 0.2s",
            }}
            onClick={toggleDropdown}
          >
            <img
              src={notiIcon}
              className="noti-icon"
              alt="Thông báo"
              style={{
                width: isMobile ? "28px" : "32px",
                height: isMobile ? "28px" : "32px",
                transition: "transform 0.2s",
                filter: isDropdownOpen ? "brightness(0.8)" : "none",
              }}
              onTouchStart={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
              onTouchEnd={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
            <NotificationSign />
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div
              className="dropdown-menu"
              style={{
                position: "fixed",
                top: isMobile ? 60 : 100,
                left: isMobile ? "5%" : "auto",
                right: isMobile ? "5%" : 0,
                width: isMobile ? "90%" : "400px",
                maxWidth: isMobile ? "90%" : "400px",
                backgroundColor: "#fff",
                boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                borderRadius: "12px",
                padding: 0,
                fontSize: isMobile ? "12px" : "16px",
                overflowY: "auto",
                maxHeight: isMobile ? "70vh" : "350px",
                animation: "fadeInDown 0.3s ease-in-out",
                zIndex: 1001,
                border: "1px solid #e5e5e5",
              }}
            >
              {/* Tiêu đề thông báo */}
              <div
                style={{
                  padding: isMobile ? "10px 15px" : "15px 20px",
                  fontWeight: "600",
                  fontSize: isMobile ? "14px" : "16px",
                  color: "#333",
                  borderBottom: "1px solid #f0f0f0",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "linear-gradient(135deg, #f9f9f9, #fff)",
                  borderTopLeftRadius: "12px",
                  borderTopRightRadius: "12px",
                }}
              >
                Thông báo mới
                <button
                  onClick={() => setIsDropdownOpen(false)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: isMobile ? "14px" : "16px",
                    color: "#888",
                    padding: "0 5px",
                    transition: "color 0.2s",
                  }}
                  onTouchStart={(e) => (e.currentTarget.style.color = "#ff4d4f")}
                  onTouchEnd={(e) => (e.currentTarget.style.color = "#888")}
                >
                  ✕
                </button>
              </div>

              {/* Danh sách thông báo */}
              {notifications.length > 0 ? (
                notifications.map((noti) => (
                  <div
                    key={noti.id}
                    className="noti-item"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: isMobile ? "10px 15px" : "12px 20px",
                      borderBottom: "1px solid #f5f5f5",
                      transition: "background-color 0.2s",
                      backgroundColor: "#fff",
                      cursor: "pointer",
                    }}
                    onTouchStart={(e) => (e.currentTarget.style.backgroundColor = "#f0f0f0")}
                    onTouchEnd={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
                  >
                    {/* Icon theo loại thông báo */}
                    <div
                      style={{
                        marginRight: isMobile ? "8px" : "12px",
                        width: isMobile ? "20px" : "24px",
                        height: isMobile ? "20px" : "24px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {noti.type === "success" ? (
                        <SuccessIcon />
                      ) : noti.type === "info" ? (
                        <InfoIcon />
                      ) : (
                        <WarningIcon />
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <span
                        style={{
                          display: "block",
                          fontWeight: "500",
                          color: "#333",
                          fontSize: isMobile ? "12px" : "14px",
                        }}
                      >
                        {noti.message}
                      </span>
                      <small
                        style={{
                          color: "#888",
                          fontSize: isMobile ? "10px" : "12px",
                          marginTop: "4px",
                          display: "block",
                        }}
                      >
                        {noti.time}
                      </small>
                    </div>
                    <div className="noti-buttons" style={{ display: "flex", gap: isMobile ? "5px" : "10px" }}>
                      <button
                        onClick={() => handleMarkAsRead(noti.id)}
                        style={{
                          border: "none",
                          background: "none",
                          cursor: "pointer",
                          width: isMobile ? "32px" : "36px",
                          height: isMobile ? "32px" : "36px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "50%",
                          transition: "background-color 0.2s",
                        }}
                        onTouchStart={(e) => (e.currentTarget.style.backgroundColor = "#d9f7be")}
                        onTouchEnd={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                        title="Đánh dấu đã đọc"
                      >
                        <svg
                          width={isMobile ? "24" : "28"}
                          height={isMobile ? "24" : "28"}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#389e0d"
                          strokeWidth="2.5"
                        >
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(noti.id)}
                        style={{
                          border: "none",
                          background: "none",
                          cursor: "pointer",
                          width: isMobile ? "32px" : "36px",
                          height: isMobile ? "32px" : "36px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "50%",
                          transition: "background-color 0.2s",
                        }}
                        onTouchStart={(e) => (e.currentTarget.style.backgroundColor = "#ffccc7")}
                        onTouchEnd={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                        title="Xóa"
                      >
                        <svg
                          width={isMobile ? "24" : "28"}
                          height={isMobile ? "24" : "28"}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#cf1322"
                          strokeWidth="2.5"
                        >
                          <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div
                  style={{
                    padding: isMobile ? "15px" : "20px",
                    textAlign: "center",
                    color: "#888",
                    fontSize: isMobile ? "12px" : "14px",
                    backgroundColor: "#fafafa",
                    borderBottomLeftRadius: "12px",
                    borderBottomRightRadius: "12px",
                  }}
                >
                  Không có thông báo nào
                </div>
              )}
            </div>
          )}
        </div>
      )}
          <AvatarButton></AvatarButton>
    </div>
  );
};

export default Header;
