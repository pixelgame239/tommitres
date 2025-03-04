import React, { useState } from "react";
import QRCodeImage from "../assets/QR-code.png"; // Import ảnh QR từ thư mục assets

// Dummy data với thêm thuộc tính imageUrl
const initialCart = [
  { 
    productID: 1, 
    productName: "Pizza Margherita", 
    unitPrice: 150000, 
    quantity: 2, 
    imageUrl: "https://via.placeholder.com/50" // Thay bằng URL thật
  },
  { 
    productID: 2, 
    productName: "Trà Sữa Trân Châu", 
    unitPrice: 45000, 
    quantity: 1, 
    imageUrl: "https://via.placeholder.com/50" // Thay bằng URL thật
  },
];

const YourOrder = () => {
  const [cartItems, setCartItems] = useState(initialCart);

  // Hàm tăng/giảm số lượng
  const updateQuantity = (id, change) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.productID === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  // Tính tổng tiền
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.unitPrice * item.quantity,
      0
    );
  };

  // Xử lý đặt hàng
  const handlePlaceOrder = () => {
    alert("Đơn hàng của bạn đã được đặt thành công!");
  };

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: "0 auto" }}>
      <h1 style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Đơn hàng của bạn
      </h1>

      {/* Danh sách món ăn */}
      <div
        style={{
          border: "1px solid #e0e0e0",
          borderRadius: 8,
          padding: 15,
          backgroundColor: "#fff",
        }}
      >
        {cartItems.length === 0 ? (
          <p>Giỏ hàng trống!</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.productID}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 0",
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              {/* Hình ảnh và tên món */}
              <div style={{ flex: 2, display: "flex", alignItems: "center" }}>
                <img
                  src={item.imageUrl}
                  alt={item.productName}
                  style={{ width: 50, height: 50, marginRight: 10, objectFit: "cover" }}
                />
                <div>
                  <p style={{ fontWeight: "bold", margin: 0 }}>
                    {item.productName}
                  </p>
                  <p style={{ color: "#888", margin: 0 }}>
                    {item.unitPrice.toLocaleString("vi-VN")} VNĐ
                  </p>
                </div>
              </div>

              {/* Điều chỉnh số lượng */}
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <button
                  onClick={() => updateQuantity(item.productID, -1)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#f0f0f0",
                    border: "none",
                    borderRadius: 4,
                    cursor: "pointer",
                  }}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.productID, 1)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#f0f0f0",
                    border: "none",
                    borderRadius: 4,
                    cursor: "pointer",
                  }}
                >
                  +
                </button>
              </div>

              {/* Tổng giá của món */}
              <div style={{ flex: 1, textAlign: "right" }}>
                <p style={{ fontWeight: "bold", color: "#ff5722" }}>
                  {(item.unitPrice * item.quantity).toLocaleString("vi-VN")} VNĐ
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Tổng tiền */}
      <div
        style={{
          marginTop: 20,
          padding: 15,
          backgroundColor: "#fff",
          border: "1px solid #e0e0e0",
          borderRadius: 8,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p style={{ fontSize: 18, fontWeight: "bold" }}>Tổng cộng:</p>
        <p style={{ fontSize: 20, fontWeight: "bold", color: "#ff5722" }}>
          {calculateTotal().toLocaleString("vi-VN")} VNĐ
        </p>
      </div>

      {/* Nút đặt hàng và QR code */}
      <div style={{ textAlign: "center" }}>
        <button
          onClick={handlePlaceOrder}
          style={{
            width: "100%",
            padding: 15,
            marginTop: 20,
            backgroundColor: "#ff5722",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontSize: 18,
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Xuất Hóa Đơn
        </button>
        <div style={{ marginTop: 20 }}>
          <p style={{ fontSize: 16, color: "#555" }}>Quét mã QR để thanh toán:</p>
          <img
            src={QRCodeImage}
            alt="QR Code Thanh Toán"
            style={{ width: 150, height: 150, marginTop: 10 }}
          />
        </div>
      </div>
    </div>
  );
};

export default YourOrder;