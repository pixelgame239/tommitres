import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AddProductButton from "../backend/AddProductButton";
import ResponsiveScreen from "../styles/responsiveScreen";

const ActionButtons = () => {
  const navigate = useNavigate();
  const { width, height } = ResponsiveScreen();
  const isMobile = width <=768;
  return (
    <div
      className="d-flex justify-content-center align-items-center gap-3 mt-4 flex-wrap"
      style={{ paddingBottom: "20px", paddingTop: "20px"}}
    >
      <Button
        variant="success"
        className="px-4 py-2"
        onClick={() => navigate("/tommitres/Order")}
      >
        Order
      </Button>
      <Button
        variant="warning"
        className="px-4 py-2"
        onClick={() => navigate("/tommitres/Reservation")}
      >
        Đặt Bàn
      </Button>
      <Button variant="info" className="px-4 py-2">
        Trạng Thái Bàn
      </Button>
      <AddProductButton />
      <Button variant="warning" className="px-4 py-2" onClick={()=>navigate("/tommitres/DetailedRevenue")}> 
        Doanh Thu
      </Button>
    </div>
  );
};

export default ActionButtons;
