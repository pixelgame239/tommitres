import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import Header from "../components/Header";
import UserProfile from "../backend/userProfile";
import { db } from "../backend/firebase";
import "./orderStatusScreen.css";
import { confirmOrder } from "../backend/orderObject";
import {
  changeStatusToSuccess,
  markOrderAsReady,
} from "../backend/orderObject"; // Import hàm mới

const OrderStatusScreen = () => {
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState("Tất cả");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userType } = UserProfile();

  useEffect(() => {
    const fetchOrders = () => {
      try {
        const ordersCollection = collection(db, "Order");

        const unsubscribe = onSnapshot(ordersCollection, (orderSnapshot) => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          let orderList = orderSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            buyDate: doc.data().buyDate?.toDate() || null,
          }));

          // Lọc theo ngày hôm nay
          orderList = orderList.filter((order) => {
            if (!order.buyDate) return false;
            return (
              order.buyDate.getFullYear() === today.getFullYear() &&
              order.buyDate.getMonth() === today.getMonth() &&
              order.buyDate.getDate() === today.getDate()
            );
          });

          // Nếu userType bắt đầu bằng "C", chỉ giữ lại đơn hàng có status là "Đã xác nhận"
          if (userType.startsWith("C")) {
            orderList = orderList.filter(
              (order) => order.status === "Đã xác nhận"
            );
          }

          // Sắp xếp danh sách trước khi cập nhật state
          setOrders(sortOrders(orderList));
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
  }, [userType]);

  // ✅ Xử lý xác nhận đơn hàng hoặc tiếp nhận đơn hàng
  const handleConfirmOrReceiveOrder = async (order) => {
    try {
      if (userType.startsWith("C")) {
        // Nếu userType bắt đầu bằng "C", đổi trạng thái thành "Sẵn sàng giao"
        await changeStatusToSuccess(order.orderID, userType);
      } else {
        if (order.status === "Sẵn sàng giao") {
          await changeStatusToSuccess(order.orderID, userType);
          setOrders((prevOrders) =>
            prevOrders.map((o) =>
              o.id === order.id ? { ...o, status: "Hoàn thành" } : o
            )
          );
        } else {
          await confirmOrder(order.orderID, userType);
          setOrders((prevOrders) =>
            prevOrders.map((o) =>
              o.id === order.id ? { ...o, status: "Đã xác nhận" } : o
            )
          );
        }
      }
    } catch (error) {
      console.error("❌ Lỗi khi cập nhật đơn hàng:", error);
    }
  };

  // ✅ Hàm sắp xếp theo trạng thái ưu tiên
  const sortOrders = (ordersList) => {
    const statusPriority = {
      "Sẵn sàng giao": 1,
      "Đang xử lý": 2,
      "Đã xác nhận": 3,
      "Hoàn thành": 99, // Luôn nằm cuối danh sách
    };

    return [...ordersList].sort((a, b) => {
      const statusA = statusPriority[a.status] || 98;
      const statusB = statusPriority[b.status] || 98;

      if (statusA !== statusB) {
        return statusA - statusB; // Sắp xếp theo trạng thái
      }

      return b.buyDate - a.buyDate; // Nếu cùng trạng thái, sắp xếp theo ngày mua (mới trước)
    });
  };

  const handleMarkAsReady = async (order) => {
    try {
      if (order.status === "Hoàn thành") {
        alert("Không thể cập nhật đơn hàng đã hoàn thành.");
        return;
      }
      await markOrderAsReady(order.id); // Gọi hàm mới
    } catch (error) {
      alert(error.message);
    }
  };

  // ✅ Xóa đơn hàng
  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này?")) return;

    try {
      await deleteDoc(doc(db, "Order", orderId));
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.id !== orderId)
      );
      alert("Đã hủy đơn hàng thành công!");
    } catch (error) {
      console.error("❌ Lỗi khi xóa đơn hàng:", error);
      alert("Xóa đơn hàng thất bại!");
    }
  };

  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div>Lỗi: {error}</div>;

  const filteredOrders =
    filterStatus === "Tất cả"
      ? orders
      : orders.filter((order) => order.status === filterStatus);

  return (
    <div>
      <Header />
      <h1 style={{ marginTop: 80 }}>Quản lý trạng thái đơn hàng - Hôm nay</h1>

      <br />

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
                <td data-label="Phương thức thanh toán:">
                  {order.paymentMethod}
                </td>
                <td data-label="Sản phẩm:">
                  {order.products?.map((item, index) => (
                    <div key={index}>
                      {item.productName} x {item.orderQuantity}
                    </div>
                  ))}
                </td>
                <td data-label="Tổng tiền:">
                  {order.totalPrice?.toLocaleString("vi-VN")} VNĐ
                </td>
                <td data-label="Ngày mua:">
                  {order.buyDate
                    ? order.buyDate.toLocaleString("vi-VN")
                    : "Không có dữ liệu"}
                </td>
                <td data-label="Thao tác:">
                  {order.status !== "Hoàn thành" && (
                    <div className="action-buttons">
                      {userType.startsWith("C") ? (
                        <button
                          className="confirm-btn"
                          onClick={() => handleMarkAsReady(order)}
                        >
                          Đánh dấu sẵn sàng giao
                        </button>
                      ) : (
                        <>
                          <button
                            className="confirm-btn"
                            onClick={() => handleConfirmOrReceiveOrder(order)}
                          >
                            {order.status === "Sẵn sàng giao"
                              ? "Tiếp nhận"
                              : "Xác nhận"}
                          </button>
                          <button
                            className="edit-btn"
                            onClick={() =>
                              alert(`Chỉnh sửa đơn hàng: ${order.id}`)
                            }
                          >
                            Chỉnh sửa
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() => handleDeleteOrder(order.id)}
                          >
                            Hủy đơn
                          </button>
                        </>
                      )}
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
