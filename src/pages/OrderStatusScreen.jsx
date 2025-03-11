import React, { useState } from "react";
import Header from "../components/Header"; // Giả sử bạn đã có Header component
import UserProfile from "../backend/userProfile";

const initialOrders = [
  {
    orderID: "DH12345",
    customerName: "Nguyễn Văn A",
    status: "Đang xử lý",
    tableNumber: "Bàn 1",
    totalAmount: 345000,
    items: [
      {
        productID: 1,
        productName: "Pizza Margherita",
        unitPrice: 150000,
        quantity: 2,
      },
      {
        productID: 2,
        productName: "Trà Sữa Trân Châu",
        unitPrice: 45000,
        quantity: 1,
      },
    ],
    paymentMethod: "Tiền mặt",
  },
  {
    orderID: "DH12346",
    customerName: "Trần Thị B",
    status: "Đang xử lý",
    tableNumber: "Bàn 2",
    totalAmount: 195000,
    items: [
      {
        productID: 3,
        productName: "Burger Bò Phô Mai",
        unitPrice: 120000,
        quantity: 1,
      },
      { productID: 4, productName: "Coca Cola", unitPrice: 15000, quantity: 5 },
    ],
    paymentMethod: "Chuyển khoản",
  },
];

const OrderStatusScreen = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [filterStatus, setFilterStatus] = useState("Tất cả");
  const { userType } = UserProfile();
  console.log("userTypeeeeee", userType);

  const updateOrderStatus = (orderID, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.orderID === orderID ? { ...order, status: newStatus } : order
      )
    );
    alert(`Đã cập nhật trạng thái đơn hàng ${orderID} thành "${newStatus}"`);
  };

  const filteredOrders =
    filterStatus === "Tất cả"
      ? orders
      : orders.filter((order) => order.status === filterStatus);

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "100%",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
      }}
    >
      <Header />
      <div style={{ height: "clamp(100px, 10vh, 100px)" }} />{" "}
      {/* Spacer responsive */}
      <h1
        style={{
          fontSize: "clamp(20px, 5vw, 24px)",
          fontWeight: "600",
          marginBottom: "20px",
          textAlign: "center",
          color: "#333",
        }}
      >
        Quản lý trạng thái đơn hàng
      </h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "15px",
          marginBottom: "20px",
        }}
      >
        {["Tất cả", "Đang xử lý", "Hoàn thành"].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            style={{
              padding: "8px 20px",
              backgroundColor: filterStatus === status ? "#ff5722" : "#fff",
              color: filterStatus === status ? "#fff" : "#333",
              border: "1px solid #ddd",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "clamp(12px, 2vw, 14px)",
              fontWeight: "500",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) =>
              (e.target.style.backgroundColor =
                filterStatus === status ? "#e64a19" : "#f0f0f0")
            }
            onMouseOut={(e) =>
              (e.target.style.backgroundColor =
                filterStatus === status ? "#ff5722" : "#fff")
            }
          >
            {status}
          </button>
        ))}
      </div>
      <div className="order-container">
        {/* Tiêu đề cột cho web */}
        <div className="order-header">
          <div className="order-field">Số bàn</div>
          <div className="order-field">Chi tiết món</div>
          <div className="order-field">Phương thức thanh toán</div>
          <div className="order-field">Tổng tiền</div>
          <div className="order-field">Trạng thái</div>
          <div className="order-field">Thao tác</div>
        </div>

        {filteredOrders.length === 0 ? (
          <p
            style={{
              textAlign: "center",
              padding: "20px",
              color: "#666",
              fontSize: "clamp(12px, 2vw, 14px)",
            }}
          >
            Không có đơn hàng nào!
          </p>
        ) : (
          filteredOrders.map((order) => (
            <div key={order.orderID} className="order-item">
              <div className="order-field">
                <strong>Bàn:</strong> {order.tableNumber}
              </div>
              <div className="order-field">
                <strong>Món ăn:</strong>
                {order.items.map((item) => (
                  <div key={item.productID} style={{ marginBottom: "5px" }}>
                    {item.productName} x {item.quantity}
                  </div>
                ))}
              </div>
              <div className="order-field">
                <strong>Thanh toán:</strong> {order.paymentMethod}
              </div>
              <div className="order-field">
                <strong>Tổng tiền:</strong>{" "}
                {order.totalAmount.toLocaleString("vi-VN")} VNĐ
              </div>
              <div className="order-field">
                {userType.startsWith("C") ? (
                  <button
                    onClick={() => alert(`Chỉnh sửa đơn hàng ${order.orderID}`)}
                    style={{
                      padding: "6px 16px",
                      backgroundColor: "#2196F3",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "clamp(11px, 2vw, 13px)",
                      fontWeight: "500",
                      transition: "background-color 0.3s",
                      width: "100%",
                    }}
                  >
                    Chỉnh sửa
                  </button>
                ) : userType.startsWith("ST") ? (
                  <>
                    <button
                      // onClick={() => confirmOrder(order.orderID)}
                      style={{
                        padding: "6px 16px",
                        backgroundColor: "#4caf50",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "clamp(11px, 2vw, 13px)",
                        fontWeight: "500",
                        transition: "background-color 0.3s",
                        width: "100%",
                        marginBottom: "5px",
                      }}
                    >
                      Xác nhận
                    </button>
                    <button
                      onClick={() =>
                        alert(`Chỉnh sửa đơn hàng ${order.orderID}`)
                      }
                      style={{
                        padding: "6px 16px",
                        backgroundColor: "#2196F3",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "clamp(11px, 2vw, 13px)",
                        fontWeight: "500",
                        transition: "background-color 0.3s",
                        width: "100%",
                      }}
                    >
                      Chỉnh sửa
                    </button>
                    <button
                      onClick={() => alert(`Xóa đơn hàng ${order.orderID}`)}
                      style={{
                        padding: "6px 16px",
                        backgroundColor: "#f44336",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "clamp(11px, 2vw, 13px)",
                        fontWeight: "500",
                        transition: "background-color 0.3s",
                        width: "100%",
                      }}
                    >
                      Xóa
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          ))
        )}
      </div>
      {/* CSS Responsive */}
      <style jsx>{`
        /* Bố cục mặc định cho mobile (dọc) */
        .order-container {
          width: 100%;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .order-item {
          padding: 15px;
          border-bottom: 1px solid #e0e0e0;
        }
        .order-field {
          margin-bottom: 10px;
          font-size: clamp(12px, 2vw, 14px);
          color: #333;
        }
        .order-field strong {
          display: inline-block;
          width: 100px;
        }
        .order-header {
          display: none; /* Ẩn tiêu đề trên mobile */
        }

        /* Bố cục cho web (ngang) */
        @media (min-width: 768px) {
          .order-container {
            min-width: 820px;
            overflow-x: auto;
          }
          .order-header {
            display: flex;
            align-items: center;
            background-color: #fafafa;
            padding: 15px;
            font-weight: 600;
            border-bottom: 1px solid #e0e0e0;
            color: #555;
            font-size: 14px;
          }
          .order-item {
            display: flex;
            align-items: center;
            padding: 15px;
            border-bottom: 1px solid #e0e0e0;
          }
          .order-field {
            margin-bottom: 0;
            text-align: center;
          }
          .order-field strong {
            display: none; /* Ẩn nhãn trên web */
          }
          .order-field:nth-child(1) {
            width: 100px;
          }
          .order-field:nth-child(2) {
            width: 280px;
            text-align: left;
          }
          .order-field:nth-child(3) {
            width: 140px;
          }
          .order-field:nth-child(4) {
            width: 150px;
            text-align: right;
          }
          .order-field:nth-child(5) {
            width: 100px;
          }
          .order-field:nth-child(6) {
            width: 120px;
          }
          .order-field button {
            width: auto; /* Nút không full-width trên web */
          }
        }
      `}</style>
    </div>
  );
};

export default OrderStatusScreen;
