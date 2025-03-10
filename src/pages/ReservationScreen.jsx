import React, { useState } from "react";

const initialOrders = [
  {
    orderID: "DH12345", // Vẫn giữ trong dữ liệu nhưng không hiển thị
    customerName: "Nguyễn Văn A",
    status: "Đang xử lý",
    orderDate: "2023-10-20 14:30",
    tableNumber: "Bàn 1",
    totalAmount: 345000,
    items: [
      { productID: 1, productName: "Pizza Margherita", unitPrice: 150000, quantity: 2 },
      { productID: 2, productName: "Trà Sữa Trân Châu", unitPrice: 45000, quantity: 1 },
    ],
    paymentMethod: "Tiền mặt",
  },
  {
    orderID: "DH12346", // Vẫn giữ trong dữ liệu nhưng không hiển thị
    customerName: "Trần Thị B",
    status: "Đang xử lý",
    orderDate: "2023-10-20 15:00",
    tableNumber: "Bàn 2",
    totalAmount: 195000,
    items: [
      { productID: 3, productName: "Burger Bò Phô Mai", unitPrice: 120000, quantity: 1 },
      { productID: 4, productName: "Coca Cola", unitPrice: 15000, quantity: 5 },
    ],
    paymentMethod: "Chuyển khoản",
  },
];

const SellerOrderStatus = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [filterStatus, setFilterStatus] = useState("Tất cả");

  const updateOrderStatus = (orderID, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.orderID === orderID ? { ...order, status: newStatus } : order
      )
    );
    alert(`Đã cập nhật trạng thái đơn hàng ${orderID} thành "${newStatus}"`);
  };

  const filteredOrders = filterStatus === "Tất cả"
    ? orders
    : orders.filter((order) => order.status === filterStatus);

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "100%",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
        overflowX: "auto",
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
      }}
    >
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
              fontSize: "14px",
              fontWeight: "500",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = filterStatus === status ? "#e64a19" : "#f0f0f0")}
            onMouseOut={(e) => (e.target.style.backgroundColor = filterStatus === status ? "#ff5722" : "#fff")}
          >
            {status}
          </button>
        ))}
      </div>

      <div style={{ minWidth: "980px", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
        <div
          style={{
            display: "flex",
            backgroundColor: "#fafafa",
            padding: "15px",
            fontWeight: "600",
            borderBottom: "1px solid #e0e0e0",
            color: "#555",
            fontSize: "14px",
          }}
        >
          <div style={{ width: "100px", textAlign: "center" }}>Bàn</div>
          <div style={{ width: "280px", textAlign: "left" }}>Món ăn</div>
          <div style={{ width: "140px", textAlign: "center" }}>Thanh toán</div>
          <div style={{ width: "150px", textAlign: "right" }}>Tổng tiền</div>
          <div style={{ width: "160px", textAlign: "center" }}>Ngày đặt</div>
          <div style={{ width: "100px", textAlign: "center" }}>Trạng thái</div>
          <div style={{ width: "120px", textAlign: "center" }}>Hành động</div>
        </div>

        {filteredOrders.length === 0 ? (
          <p style={{ textAlign: "center", padding: "20px", color: "#666", fontSize: "14px" }}>
            Không có đơn hàng nào!
          </p>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.orderID}
              style={{
                display: "flex",
                padding: "15px",
                borderBottom: "1px solid #e0e0e0",
                alignItems: "center",
                fontSize: "14px",
                color: "#333",
              }}
            >
              <div style={{ width: "100px", textAlign: "center" }}>{order.tableNumber}</div>
              <div style={{ width: "280px" }}>
                {order.items.map((item) => (
                  <div key={item.productID} style={{ marginBottom: "5px" }}>
                    {item.productName} x {item.quantity}
                  </div>
                ))}
              </div>
              <div style={{ width: "140px", textAlign: "center" }}>{order.paymentMethod}</div>
              <div style={{ width: "150px", textAlign: "right" }}>
                {order.totalAmount.toLocaleString("vi-VN")} VNĐ
              </div>
              <div style={{ width: "160px", textAlign: "center" }}>{order.orderDate}</div>
              <div
                style={{
                  width: "100px",
                  textAlign: "center",
                  color: order.status === "Hoàn thành" ? "#4caf50" : "#f44336",
                  fontWeight: "500",
                }}
              >
                {order.status}
              </div>
              <div style={{ width: "120px", textAlign: "center" }}>
                {order.status !== "Hoàn thành" && (
                  <button
                    onClick={() => updateOrderStatus(order.orderID, "Hoàn thành")}
                    style={{
                      padding: "6px 16px",
                      backgroundColor: "#4caf50",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "13px",
                      fontWeight: "500",
                      transition: "background-color 0.3s",
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#4caf50")}
                  >
                    Hoàn thành
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SellerOrderStatus;