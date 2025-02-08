// import React from "react";
import { Button } from "react-bootstrap";

const Header = () => {
  return (
    <header className="mb-4 position-relative">
      <h1>Tôm&Mít Restaurant</h1>
      <div className="top-right">
        <Button variant="primary">Đăng Nhập</Button>
      </div>
    </header>
  );
};

export default Header;
