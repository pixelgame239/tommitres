import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ResponsiveScreen from "../styles/responsiveScreen";
import UserProfile from "../backend/userProfile";

const ActionButtons = () => {
  const navigate = useNavigate();
  const { width, height } = ResponsiveScreen();
  const isMobile = width <= 768;
  const { userType } = UserProfile();

  if (userType === null || userType === undefined) {
    return null; // Return nothing if userType is null or undefined
  }

  let buttons;
  if (userType.startsWith("ST")) {
    buttons = (
      <>
        <Button
          variant="success"
          className="px-4 py-2"
          onClick={() => navigate("/tommitres/Order")}
        >
          Order
        </Button>
        <Button variant="warning" className="px-4 py-2">
          Trạng thái đơn hàng
        </Button>
      </>
    );
  } else if (userType.startsWith("C")) {
    buttons = (
      <Button variant="info" className="px-4 py-2">
        Đơn đang chờ
      </Button>
    );
  } else {
    buttons = (
      <>
        <Button
          variant="warning"
          className="px-4 py-2"
          onClick={() => navigate("/tommitres/manageAccount")}
        >
          Manage accounts
        </Button>
        <Button
          variant="warning"
          className="px-4 py-2"
          onClick={() => navigate("/tommitres/DetailedRevenue")}
        >
          Doanh Thu
        </Button>
      </>
    );
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center gap-3 mt-4 flex-wrap"
      style={{ paddingBottom: "20px", paddingTop: "20px" }}
    >
      {buttons}
    </div>
  );
};

export default ActionButtons;
