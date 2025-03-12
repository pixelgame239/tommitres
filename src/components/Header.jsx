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
import { collection, onSnapshot, deleteDoc, doc, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../backend/firebase";
import addNotification from "../backend/addNotification"; 
import { acceptPasswordChange } from "../backend/updatePassword";

const SuccessIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#52c41a"
    strokeWidth="2"
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const InfoIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#1890ff"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4m0-4h.01" />
  </svg>
);

const WarningIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#faad14"
    strokeWidth="2"
  >
    <path d="M12 2L2 20h20L12 2zm0 16v-2m0-4v-4" />
  </svg>
);
const DeclineIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#f5222d"
    strokeWidth="2"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
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
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    if (userType) {
      const unsubscribe = onSnapshot(query(
        collection(db, "Notification"),
        where("Receiver", "==", `${userType}`),
        orderBy("CreatedAt", "desc")
      ),
        (snapshot) => {
          const notiList = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id, 
          }));
          console.log("Fetched Notifications:", notiList);
          setNotifications(notiList);
        }
      );
      return () => unsubscribe();
    }
  }, [userType]);
  const deleteNotificationByMessage = async (message) => {
    try {
      const snapshot = await getDocs(collection(db, "Notification"));
      const notificationsToDelete = snapshot.docs.filter(
        (doc) => doc.data().Message.includes(message) // Find notifications that match the message
      );

      if (notificationsToDelete.length > 0) {
        // Delete each notification that matches
        for (const notificationDoc of notificationsToDelete) {
          await deleteDoc(doc(db, "Notification", notificationDoc.id));
          console.log(
            `Notification with message "${message}" deleted from Firestore`
          );
        }

        // Remove the deleted notifications from the local state
        const updatedNotifications = notifications.filter(
          (noti) => !noti.Message.includes(message)
        );
        setNotifications(updatedNotifications);
      } else {
        console.log("No notifications found with this message");
      }
    } catch (error) {
      console.error("Error deleting notification by message:", error);
    }
  };
  const toggleDropdown = () => {
    console.log("Toggling dropdown, current state:", isDropdownOpen); // Debug
    setIsDropdownOpen(!isDropdownOpen);
  };

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
        height: isMobile ? 80 : 85,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <a
          onClick={() => navigate("/tommitres")}
          style={{
            cursor: "pointer",
          }}
        >
          <img
            src={tommittitle}
            width={isMobile ? width / 3 : width / 2.5}
            alt="Tôm & Mít Restaurant"
          ></img>
        </a>
      </h1>
      <a href="tel:0862051226">
        <div>
          <img
            src={phoneCall}
            height={isMobile ? "50px" : "80px"}
            style={{ marginRight: 5 }}
          ></img>
          <p
            style={{
              display: "inline-block",
              fontSize: isMobile ? "12px" : "18px",
            }}
          >
            Gọi ngay
          </p>
        </div>
      </a>
      {/* Thông báo & Avatar */}
      {userType && (
        <div
          className="noti-icon-container"
          style={{ position: "relative", cursor: "pointer" }}
          ref={dropdownRef}
          onClick={toggleDropdown}
        >
          {/* Icon thông báo chính (notiIcon)
          <div
            style={{
              position: "relative",
              padding: isMobile ? "5px" : "8px",
              borderRadius: "50%",
              backgroundColor: isDropdownOpen ? "#f0f0f0" : "transparent",
              transition: "background-color 0.2s",
            }}
            onClick={toggleDropdown}
          > */}
            <img
              src={notiIcon}
              className="noti-icon"
              alt="Thông báo"
              style={{
                transition: "transform 0.2s",
                filter: isDropdownOpen ? "brightness(0.8)" : "none",
              }}
              onTouchStart={(e) =>
                (e.currentTarget.style.transform = "scale(0.95)")
              }
              onTouchEnd={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
            {notifications.length===0?null:<NotificationSign />}
          {/* </div> */}

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
                  onTouchStart={(e) =>
                    (e.currentTarget.style.color = "#ff4d4f")
                  }
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
                    onTouchStart={(e) =>
                      (e.currentTarget.style.backgroundColor = "#f0f0f0")
                    }
                    onTouchEnd={(e) =>
                      (e.currentTarget.style.backgroundColor = "#fff")
                    }
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
                      {noti.Type === "Accept" ? (
                        <SuccessIcon />
                      // ) : noti.Type === "Order" ? (
                      //   <InfoIcon />
                      ) 
                      : noti.Type === "Refuse"? (
                        <DeclineIcon />)
                        :(
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
                        {noti.Message}
                      </span>
                    </div>
                    <div
                      className="noti-buttons"
                      style={{
                        display: "flex",
                        gap: isMobile ? "5px" : "10px",
                      }}
                    >
                      <button
                        onClick={() =>{
                          if(userType==="M0001"){
                            addNotification(userType, noti.Sender, "Accept", "Mật khẩu đã được đổi thành công", "");
                            acceptPasswordChange(noti.Sender, noti.data);
                          }
                          deleteNotificationByMessage(noti.Message)
                        }}
                        style={{
                          border: "none",
                          background: "none",
                          cursor: "pointer",
                          width: isMobile ? "50px" : "60px",
                          height: isMobile ? "50px" : "10px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "50%",
                          transition: "background-color 0.2s",
                        }}
                        onTouchStart={(e) =>
                          (e.currentTarget.style.backgroundColor = "#d9f7be")
                        }
                        onTouchEnd={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            "transparent")
                        }
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
                        onClick={() => {
                          if(userType==="M0001"){
                            addNotification(userType, noti.Sender, "Refuse", "Yêu cầu không được chấp thuận", "");
                          }
                          deleteNotificationByMessage(noti.Message)}
                        }
                        style={{
                          border: "none",
                          background: "none",
                          cursor: "pointer",
                          width: isMobile ? "50px" : "60px",
                          height: isMobile ? "50px" : "10px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "50%",
                          transition: "background-color 0.2s",
                        }}
                        onTouchStart={(e) =>
                          (e.currentTarget.style.backgroundColor = "#ffccc7")
                        }
                        onTouchEnd={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            "transparent")
                        }
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
