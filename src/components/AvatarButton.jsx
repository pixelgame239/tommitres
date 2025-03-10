import ResponsiveScreen from "../styles/responsiveScreen";
import UserProfile from "../backend/userProfile";
import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import addNotification from "../backend/addNotification"; // Import hàm thêm thông báo
import staffAvt from "../assets/staffAvt.png";
import manAvt from "../assets/managerAvt.png";
import chefAvt from "../assets/chefAvt.png";
import "../styles/avatarStyle.css";

const AvatarButton = () => {
  const navigate = useNavigate();
  const { width } = ResponsiveScreen();
  const { userType, userName } = UserProfile();
  const isMobile = width <= 768;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [sender, setSender] = useState("");
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log("UserProfile returned:", userType);
    if (userType) {
      setSender(userType);
      removeEventListener;
    }
  }, [userType]);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/tommitres");
    window.location.reload();
  };

  const handleRequest = () => {
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!sender) {
      alert("Lỗi: Không tìm thấy tên người gửi!");
      console.error("Sender is undefined!");
      return;
    }
    try {
      await addNotification(sender, type, message);
      alert("Thông báo đã được gửi!");
      setShowModal(false);
      setType("");
      setMessage("");
    } catch (error) {
      alert("Lỗi khi gửi thông báo!");
      console.error(error);
    }
  };

  return (
    <>
      {userType === null || userType === undefined ? (
        <Button
          variant="primary"
          style={{ fontSize: isMobile ? "12px" : "18px" }}
          onClick={() => navigate("/tommitres/Login")}
        >
          Đăng nhập
        </Button>
      ) : (
        <div className="user-avatar-container" onClick={toggleDropdown}>
          <img
            className="user-avatar"
            src={
              userType.startsWith("ST")
                ? staffAvt
                : userType.startsWith("C")
                ? chefAvt
                : manAvt
            }
            alt="User Avatar"
          />
          {isDropdownOpen && (
            <div className="dropdown-menu">
              {(userType.startsWith("ST") || userType.startsWith("C")) && (
                <button className="dropdown-item" onClick={handleRequest}>
                  Yêu cầu đổi mật khẩu
                </button>
              )}
              <button className="dropdown-item" onClick={handleLogout}>
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      )}

      {/* Modal form nhập thông báo */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Yêu cầu đổi mật khẩu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Sender</Form.Label>
              <Form.Control type="text" value={sender} readOnly />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Nhập nội dung"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Gửi yêu cầu
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AvatarButton;
