import React from "react";
import { Button } from "react-bootstrap";

const ActionButtons = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center gap-3 mt-4"
      style={{ paddingBottom: "20px" }}
    >
      <Button variant="success" className="px-4 py-2">
        Order
      </Button>
      <Button variant="warning" className="px-4 py-2">
        Đặt Bàn
      </Button>
      <Button variant="info" className="px-4 py-2">
        Trạng Thái Bàn
      </Button>
    </div>
  );
};

export default ActionButtons;
