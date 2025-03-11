import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import Header from "../components/Header";
import UserProfile from "../backend/userProfile";
import { db } from "../backend/firebase";
import "./orderStatusScreen.css";

const OrderStatusScreen = () => {
  const [orders, setOrders] = useState([]);
  const [productsMap, setProductsMap] = useState({});
  const [filterStatus, setFilterStatus] = useState("Tất cả");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userType } = UserProfile();
  const [editingOrder, setEditingOrder] = useState(null);

  // ✅ Lấy danh sách sản phẩm từ Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, "Product");
        const productSnapshot = await getDocs(productsCollection);
        const productMap = {};
        productSnapshot.docs.forEach((doc) => {
          const data = doc.data();
          productMap[data.productID] = data.productName; // Map productID -> productName
        });
        setProductsMap(productMap);
      } catch (err) {
        console.error("❌ Lỗi khi lấy sản phẩm:", err);
      }
    };

    fetchProducts();
  }, []);

  // ✅ Lấy danh sách đơn hàng từ Firestore
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersCollection = collection(db, "Order");
        const orderSnapshot = await getDocs(ordersCollection);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const orderList = orderSnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
            buyDate: doc.data().buyDate?.toDate() || null,
          }))
          .filter((order) => {
            if (!order.buyDate) return false;
            return (
              order.buyDate.getFullYear() === today.getFullYear() &&
              order.buyDate.getMonth() === today.getMonth() &&
              order.buyDate.getDate() === today.getDate()
            );
          })
          .sort((a, b) => b.buyDate - a.buyDate);

        setOrders(orderList);
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
      <h1>Quản lý trạng thái đơn hàng - Hôm nay</h1>

      {/* Bộ lọc trạng thái đơn hàng */}
      <div>
        {["Tất cả", "Đang xử lý", "Hoàn thành"].map((status) => (
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
            <th>Sản phẩm</th> {/* ✅ Cột mới */}
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
                <td>{order.tableNumber}</td>
                <td>{order.status}</td>
                <td>{order.paymentMethod}</td>
                <td>
                  <ul>
                    {order.products?.map((item, index) => (
                      <li key={index}>
                        {item.orderQuantity} x{" "}
                        {productsMap[item.productID] || "Không xác định"} (
                        {item.singleProductPrice?.toLocaleString("vi-VN")} VNĐ)
                      </li>
                    ))}
                  </ul>
                </td>
                <td>{order.totalPrice?.toLocaleString("vi-VN")} VNĐ</td>
                <td>
                  {order.buyDate
                    ? order.buyDate.toLocaleString("vi-VN")
                    : "Không có dữ liệu"}
                </td>
                <td>
                  {order.status !== "Hoàn thành" && (
                    <div className="action-buttons">
                      <button
                        className="confirm-btn"
                        onClick={() => alert(`Xác nhận đơn hàng: ${order.id}`)}
                      >
                        Xác nhận
                      </button>
                      <button
                        className="edit-btn"
                        onClick={() => setEditingOrder(order)}
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
