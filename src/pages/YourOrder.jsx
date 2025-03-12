import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../backend/firebase.js";
import {
  doc,
  updateDoc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import { confirmOrder, createOrder, getOrderDetail } from "../backend/orderObject.js";
import UserProfile from "../backend/userProfile";

const YourOrder = () => {
  const location = useLocation();
  const { currentOrders } = location.state || {};
  const [cartItems, setCartItems] = useState(currentOrders.products);
  console.log(currentOrders.products);
  const [paymentMethod, setPaymentMethod] = useState("cash"); // State để lưu phương thức thanh toán
  const [showDetails, setShowDetails] = useState(false); // State để hiển thị/ẩn chi tiết tổng cộng
  const [showPaymentMethods, setShowPaymentMethods] = useState(false); // State để hiển thị/ẩn phương thức thanh toán
  const { userType } = UserProfile();
  const navigate = useNavigate();

  console.log(`table: ${JSON.stringify(currentOrders)}`);
  const handlePlaceOrder = async () => {
    if (!paymentMethod) {
      alert("Vui lòng chọn phương thức thanh toán!");
      return;
    }
    for (let changeProduct of cartItems) {
      const productQuery = query(
        collection(db, "Product"),
        where("productID", "==", changeProduct.productID)
      );
      try {
        const querySnapshot = await getDocs(productQuery);
        for (const returnData of querySnapshot.docs) {
          if (returnData.exists()) {
            const currentQuantity = returnData.data().quantity;
            const updatedQuantity =
              currentQuantity - changeProduct.orderQuantity;
            const productRef = doc(db, "Product", returnData.id);
            await updateDoc(productRef, {
              quantity: updatedQuantity,
            });
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
    currentOrders.paymentMethod = paymentMethod;
    createOrder(currentOrders);
    console.log(currentOrders);
  };

  // Hàm toggle hiển thị chi tiết tổng cộng
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  // Hàm toggle hiển thị phương thức thanh toán
  const togglePaymentMethods = () => {
    setShowPaymentMethods(!showPaymentMethods);
  };

  // Hàm chọn phương thức thanh toán
  const selectPaymentMethod = (method) => {
    setPaymentMethod(method);
    setShowPaymentMethods(false); // Đóng danh sách sau khi chọn
  };

  return (
    <div
      style={{
        padding: "15px",
        maxWidth: "100%", // Đảm bảo không vượt quá màn hình
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "clamp(20px, 5vw, 24px)", // Font size linh hoạt
          fontWeight: "bold",
          marginBottom: "15px",
          textAlign: "center",
        }}
      >
        Đơn hàng của bạn
      </h1>

      {/* Danh sách món ăn */}
      <div
        style={{
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          padding: "10px",
          backgroundColor: "#fff",
        }}
      >
        {cartItems.length === 0 ? (
          <p style={{ textAlign: "center" }}>Giỏ hàng trống!</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.productID}
              style={{
                display: "flex",
                flexDirection: "row", // Mặc định là row, trên mobile sẽ thành column
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 0",
                borderBottom: "1px solid #f0f0f0",
                flexWrap: "wrap", // Cho phép xuống dòng trên mobile
                gap: "10px",
              }}
            >
              {/* Hình ảnh và tên món */}
              <div
                style={{
                  flex: "2",
                  display: "flex",
                  alignItems: "center",
                  minWidth: "200px",
                }}
              >
                <img
                  src={item.imageLink}
                  alt={item.productName}
                  style={{
                    width: "40px", // Giảm kích thước ảnh trên mobile
                    height: "40px",
                    marginRight: "10px",
                    objectFit: "cover",
                  }}
                />
                <div>
                  <p
                    style={{
                      fontWeight: "bold",
                      margin: 0,
                      fontSize: "clamp(14px, 3vw, 16px)",
                    }}
                  >
                    {item.productName}
                  </p>
                  <p
                    style={{
                      color: "#888",
                      margin: 0,
                      fontSize: "clamp(12px, 2.5vw, 14px)",
                    }}
                  >
                    {item.unitPrice.toLocaleString("vi-VN")} VNĐ x {item.orderQuantity}
                  </p>
                </div>
              </div>
              {/* Tổng giá của món */}
              <div
                style={{
                  textAlign: "right",
                  minWidth: "80px",
                }}
              >
                <p
                  style={{
                    fontWeight: "bold",
                    color: "#ff5722",
                    fontSize: "clamp(14px, 3vw, 16px)",
                  }}
                >
                  {item.singleProductPrice.toLocaleString("vi-VN")} VNĐ
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Tổng tiền và nút bấm để hiển thị chi tiết */}
      <div
        style={{
          marginTop: "15px",
          padding: "10px",
          backgroundColor: "#fff",
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={toggleDetails}
        >
          <p
            style={{
              fontSize: "clamp(16px, 4vw, 18px)",
              fontWeight: "bold",
            }}
          >
            Tổng cộng:
          </p>
          <p
            style={{
              fontSize: "clamp(18px, 4.5vw, 20px)",
              fontWeight: "bold",
              color: "#ff5722",
            }}
          >
            {currentOrders.totalPrice.toLocaleString("vi-VN")} VNĐ
          </p>
        </div>

        {/* Hiển thị chi tiết khi bấm vào */}
        {showDetails && (
          <div
            style={{
              marginTop: "15px",
              paddingTop: "10px",
              borderTop: "1px solid #e0e0e0",
            }}
          >
            <h3
              style={{
                fontSize: "clamp(14px, 3.5vw, 16px)",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              Chi tiết đơn hàng:
            </h3>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {cartItems.map((item) => (
                <li
                  key={item.productID}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "5px 0",
                    fontSize: "clamp(12px, 3vw, 14px)",
                  }}
                >
                  <span>
                    {item.productName} (x{item.orderQuantity})
                  </span>
                  <span>
                    {item.singleProductPrice.toLocaleString("vi-VN")} VNĐ
                  </span>
                </li>
              ))}
            </ul>

            {/* Tổng cộng trong chi tiết */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 0",
                borderTop: "1px solid #e0e0e0",
                marginTop: "10px",
              }}
            >
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "clamp(14px, 3.5vw, 16px)",
                }}
              >
                Tổng cộng:
              </p>
              <p
                style={{
                  fontWeight: "bold",
                  color: "#ff5722",
                  fontSize: "clamp(14px, 3.5vw, 16px)",
                }}
              >
                {currentOrders.totalPrice.toLocaleString("vi-VN")} VNĐ
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Khung Phương thức thanh toán */}
      <div
        style={{
          marginTop: "15px",
          padding: "10px",
          backgroundColor: "#fff",
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={togglePaymentMethods}
        >
          <p
            style={{
              fontSize: "clamp(16px, 4vw, 18px)",
              fontWeight: "bold",
            }}
          >
            Phương thức thanh toán:
          </p>
          <p
            style={{
              fontSize: "clamp(16px, 4vw, 18px)",
              color: "#ff5722",
            }}
          >
            {paymentMethod
              ? paymentMethod === "cash"
                ? "Tiền mặt"
                : "Chuyển khoản"
              : "Chưa chọn"}
          </p>
        </div>

        {/* Hiển thị danh sách phương thức thanh toán khi bấm vào */}
        {showPaymentMethods && (
          <div
            style={{
              marginTop: "15px",
              paddingTop: "10px",
              borderTop: "1px solid #e0e0e0",
            }}
          >
            <h3
              style={{
                fontSize: "clamp(14px, 3.5vw, 16px)",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              Chọn phương thức thanh toán:
            </h3>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              <li
                style={{
                  padding: "10px 0",
                  cursor: "pointer",
                  borderBottom: "1px solid #e0e0e0",
                  fontSize: "clamp(14px, 3.5vw, 16px)",
                }}
                onClick={() => selectPaymentMethod("cash")}
              >
                Tiền mặt
              </li>
              <li
                style={{
                  padding: "10px 0",
                  cursor: "pointer",
                  fontSize: "clamp(14px, 3.5vw, 16px)",
                }}
                onClick={() => selectPaymentMethod("bank")}
              >
                Chuyển khoản
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Nút đặt hàng */}
      <div style={{ textAlign: "center" }}>
        {(() => {
          if (userType && userType.startsWith("ST")) {
            return (
              <button
                onClick={async () => {
                  await handlePlaceOrder();
                  await confirmOrder(currentOrders.orderID, userType);
                  const billData = await getOrderDetail(currentOrders.orderID);
                  console.log(billData);
                  navigate("/tommitres/Invoice", { state: { billData } });
                }
              }
                style={{
                  width: "100%",
                  padding: "12px",
                  marginTop: "15px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "clamp(16px, 4vw, 18px)",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Xuất Hóa Đơn
              </button>
            );
          } else {
            return (
              <button
                onClick={async() => {
                  await handlePlaceOrder();
                  navigate("/tommitres/ThankYou");
                }}
                style={{
                  width: "100%",
                  padding: "12px",
                  marginTop: "15px",
                  backgroundColor: "#ff5722",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "clamp(16px, 4vw, 18px)",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Yêu Cầu Thanh Toán
              </button>
            );
          }
        })()}
      </div>
    </div>
  );
};

export default YourOrder;
