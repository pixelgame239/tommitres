import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import Header from "../components/Header";
import UserProfile from "../backend/userProfile";
import { db } from "../backend/firebase";
import "./orderStatusScreen.css";
import { confirmOrder } from "../backend/orderObject";

const OrderStatusScreen = () => {
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState("Tất cả");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userType } = UserProfile();

  // ✅ Lấy danh sách đơn hàng từ Firestore
  useEffect(() => {
    const fetchOrders = () => {
      try {
        console.log("📌 Đang lấy danh sách đơn hàng từ Firestore...");
        const ordersCollection = collection(db, "Order");

        const unsubscribe = onSnapshot(ordersCollection, (orderSnapshot) => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          let orderList = orderSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            buyDate: doc.data().buyDate?.toDate() || null,
          }));

          console.log("✅ Danh sách đơn hàng lấy được:", orderList);

          // Lọc đơn hàng theo ngày hôm nay
          orderList = orderList
            .filter((order) => {
              if (!order.buyDate) return false;
              return (
                order.buyDate.getFullYear() === today.getFullYear() &&
                order.buyDate.getMonth() === today.getMonth() &&
                order.buyDate.getDate() === today.getDate()
              );
            })
            .sort((a, b) => b.buyDate - a.buyDate);

          console.log("📌 Danh sách đơn hàng sau khi lọc theo ngày hôm nay:", orderList);

          setOrders(orderList);
        });

        return () => unsubscribe();
      } catch (err) {
        console.error("❌ Lỗi khi lấy đơn hàng:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // ✅ Xóa đơn hàng
  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này?")) return;

    console.log(`🗑️ Đang xóa đơn hàng có ID: ${orderId}`);
    try {
      await deleteDoc(doc(db, "Order", orderId));

      setOrders((prevOrders) => {
        const updatedOrders = prevOrders.filter((order) => order.id !== orderId);
        console.log("✅ Danh sách đơn hàng sau khi xóa:", updatedOrders);
        return updatedOrders;
      });

      alert("Đã hủy đơn hàng thành công!");
    } catch (error) {
      console.error("❌ Lỗi khi xóa đơn hàng:", error);
      alert("Xóa đơn hàng thất bại!");
    }
  };

  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div>Lỗi: {error}</div>;

  // ✅ Lọc đơn hàng theo trạng thái
  const filteredOrders =
    filterStatus === "Tất cả"
      ? orders
      : orders.filter((order) => order.status === filterStatus);

  console.log(
    `📌 Danh sách đơn hàng sau khi lọc theo trạng thái "${filterStatus}":`,
    filteredOrders
  );

  return (
    <div>
      <Header />
      <h1 style={{marginTop:80}}>Quản lý trạng thái đơn hàng - Hôm nay</h1>

      {/* Bộ lọc trạng thái đơn hàng */}
      <div style={{top}}>
        {["Tất cả", "Đang xử lý", "Sẵn sàng giao"].map((status) => (
          <button key={status} onClick={() => setFilterStatus(status)}>
            {status}
          </button>
        ))}
      </div>
      <br />

      {/* Bảng đơn hàng */}
      <table className="order-table">
        <thead>
          <tr>
            <th>Bàn</th>
            <th>Trạng thái</th>
            <th>Phương thức thanh toán</th>
            <th>Sản phẩm</th>
            <th>Tổng tiền</th>
            <th>Ngày mua</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                Không có đơn hàng nào hôm nay!
              </td>
            </tr>
          ) : (
            filteredOrders.map((order) => (
              <tr key={order.id}>
                <td data-label="Bàn:">{order.tableNumber}</td>
                <td data-label="Trạng thái:">{order.status}</td>
                <td data-label="Phương thức thanh toán:">{order.paymentMethod}</td>
                <td data-label="Sản phẩm:">
                  {order.products?.map((item, index) => (
                    <div key={index}>
                      {item.productName} x {item.orderQuantity}
                    </div>
                  ))}
                </td>
                <td data-label="Tổng tiền:">{order.totalPrice?.toLocaleString("vi-VN")} VNĐ</td>
                <td data-label="Ngày mua:">
                  {order.buyDate
                    ? order.buyDate.toLocaleString("vi-VN")
                    : "Không có dữ liệu"}
                </td>
                <td data-label="Thao tác:">
                  {order.status !== "Hoàn thành" && (
                    <div className="action-buttons">
                      {order.status !== "Đã xác nhận"?
                      <button
                        className="confirm-btn"
                        onClick={() => confirmOrder(order.orderID, userType)}
                      >
                        Xác nhận
                      </button>
                      :null}
                      <button
                        className="edit-btn"
                        onClick={() => alert(`Chỉnh sửa đơn hàng: ${order.id}`)}
                      >
                        Chỉnh sửa
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteOrder(order.id)}
                      >
                        Hủy đơn
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderStatusScreen;