import React, { useState } from "react";
import PropTypes from "prop-types";

// Import ảnh local vào component
import doAn from "../assets/do-an.jpg";
import duiGaRan from "../assets/dui-ga-ran.png";
import canhGaRan from "../assets/canh-ga-ran.png";
import canhGaSotCay from "../assets/canh-ga-sot-cay.png";
import duiGaSotCay from "../assets/dui-ga-sot-cay.png";
import kimChi from "../assets/kim-chi.png";
import traSuaKhoaiMon from "../assets/tra-sua-khoai-mon.png";
import traSuaNuong from "../assets/tra-sua-nuong.png";
import traThaiXanh from "../assets/tra-thai-xanh.png";
import tranChauDuongDen from "../assets/tran-chau-duong-den.png";

const FoodItem = ({ productName, unitPrice, description }) => {
  const [quantity, setQuantity] = useState(0);

  // Chọn ảnh dựa vào productName
  let productImage;
  if (productName === "Đùi gà rán") {
    productImage = duiGaRan;
  } else if (productName === "Kim chi") {
    productImage = kimChi;
  } else if (productName === "Cánh gà rán") {
    productImage = canhGaRan;
  } else if (productName === "Cánh gà sốt cay") {
    productImage = canhGaSotCay;
  } else if (productName === "Đùi gà sốt cay") {
    productImage = duiGaSotCay;
  } else if (productName === "Trà thái xanh") {
    productImage = traThaiXanh;
  } else if (productName === "Trà sữa khoai môn tươi") {
    productImage = traSuaKhoaiMon;
  } else if (productName === "Trà sữa nướng") {
    productImage = traSuaNuong;
  } else if (productName === "sữa tươi trân châu đường đen") {
    productImage = tranChauDuongDen;
  } else {
    productImage = doAn; // Ảnh mặc định nếu không khớp
  }

  return (
    <div
      style={{
        margin: 10,
        textAlign: "center",
        border: "1px solid #ddd",
        padding: 10,
        borderRadius: 10,
        minHeight: "350px", // Đảm bảo chiều cao tối thiểu đồng nhất
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between", // Giữ các phần tử cách đều nhau
      }}
    >
      {/* Hiển thị ảnh với kích thước thay đổi tùy vào màn hình */}
      <img
        src={productImage}
        alt={productName}
        style={{
          width: "100%",
          height: "180px", // Đặt chiều cao cố định cho ảnh
          borderRadius: 10,
          maxWidth: "400px",
          objectFit: "cover",
        }}
      />

      {/* Tăng kích thước chữ cho tên sản phẩm */}
      <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{productName}</p>
      {/* Tăng kích thước chữ cho mô tả */}
      <p style={{ fontSize: "1rem", fontStyle: "italic" }}>
        {description || ""}
      </p>
      {/* Tăng kích thước chữ cho giá */}
      <p style={{ fontSize: "1.2rem" }}>Giá: {unitPrice.toLocaleString()}đ</p>
      <div>
        {/* Tăng kích thước chữ cho button */}
        <button
          style={{
            marginRight: 10,
            backgroundColor: "lightblue",
            padding: 10,
            fontSize: "1.2rem",
          }}
          onClick={() => setQuantity(Math.max(quantity - 1, 0))}
        >
          ➖
        </button>
        <strong style={{ fontSize: "1.5rem" }}>{quantity}</strong>
        <button
          style={{
            marginLeft: 10,
            backgroundColor: "lightblue",
            padding: 10,
            fontSize: "1.2rem",
          }}
          onClick={() => setQuantity(quantity + 1)}
        >
          ➕
        </button>
      </div>
    </div>
  );
};

FoodItem.propTypes = {
  productName: PropTypes.string.isRequired,
  unitPrice: PropTypes.number.isRequired,
  description: PropTypes.string,
};

export default FoodItem;
