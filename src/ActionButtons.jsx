// import React from "react";
import { Button } from "react-bootstrap";

const ActionButtons = () => {
  return (
    <div className="text-center">
      <div className="d-inline-flex justify-content-center gap-3 mt-4">
        <Button variant="success" style={{ width: "150px", height: "50px" }}>
          Order
        </Button>
        <Button variant="warning" style={{ width: "150px", height: "50px" }}>
          Đặt Bàn
        </Button>
        <Button variant="info" style={{ width: "150px", height: "50px" }}>
          Trạng Thái Bàn
        </Button>
      </div>
    </div>
  );
};

export default ActionButtons;
