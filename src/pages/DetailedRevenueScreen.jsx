import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import Header from "../components/Header";
import UserProfile from "../backend/userProfile";
import { db } from "../backend/firebase";
import "./orderStatusScreen.css";

const RevenueExcelLikeScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userType } = UserProfile();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        console.log("📌 Đang lấy danh sách đơn hàng từ Firestore...");
        const ordersCollection = collection(db, "Order");
        const orderSnapshot = await getDocs(ordersCollection);

        let orderList = orderSnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
            buyDate: doc.data().buyDate?.toDate() || null,
          }))
          .filter((order) => order.status === "Hoàn thành")
          .sort((a, b) => b.buyDate - a.buyDate);

        const groupedOrders = orderList.reduce((acc, order) => {
          if (!order.buyDate) return acc;

          const dateKey = order.buyDate.toLocaleDateString("vi-VN");
          if (!acc[dateKey]) acc[dateKey] = { orders: [], totalRevenue: 0 };

          acc[dateKey].orders.push(order);
          acc[dateKey].totalRevenue += order.totalPrice || 0;

          return acc;
        }, {});

        let finalOrderList = [];
        Object.entries(groupedOrders).forEach(
          ([date, { orders, totalRevenue }]) => {
            finalOrderList.push(...orders);
            finalOrderList.push({
              id: `total-${date}`,
              isTotalRow: true,
              buyDate: date,
              totalRevenue,
            });
          }
        );

        console.log("✅ Danh sách hóa đơn nhóm theo ngày:", finalOrderList);
        setOrders(finalOrderList);
      } catch (err) {
        console.error("❌ Lỗi khi lấy đơn hàng:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này?")) return;

    console.log(`🗑️ Đang xóa đơn hàng có ID: ${orderId}`);
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

  return (
    <div>
      <br />
      <Header />
      <h1>Quản lý trạng thái đơn hàng</h1>
      <br />
      <table className="order-table">
        <thead>
          <tr>
            <th>Bàn</th>
            <th>Nhân viên phụ trách</th>
            <th>Phương thức thanh toán</th>
            <th>Sản phẩm</th>
            <th>Tổng tiền</th>
            <th>Ngày mua</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                Không có đơn hàng nào!
              </td>
            </tr>
          ) : (
            orders.map((order) =>
              order.isTotalRow ? (
                <tr key={order.id} className="total-row">
                  <td
                    colSpan="4"
                    style={{ fontWeight: "bold", textAlign: "right" }}
                  >
                    Tổng doanh thu ngày {order.buyDate}:
                  </td>
                  <td colSpan="2" style={{ fontWeight: "bold", color: "red" }}>
                    {order.totalRevenue.toLocaleString("vi-VN")} VNĐ
                  </td>
                  <td></td>
                </tr>
              ) : (
                <tr key={order.id}>
                  <td>{order.tableNumber}</td>
                  <td>{order.userName}</td>
                  <td>{order.paymentMethod}</td>
                  <td>
                    {order.products?.map((item, index) => (
                      <div key={index}>
                        {item.productName} x {item.orderQuantity}
                      </div>
                    ))}
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
                          onClick={() =>
                            alert(`Xác nhận đơn hàng: ${order.id}`)
                          }
                        >
                          Xác nhận
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
                      </div>
                    )}
                  </td>
                </tr>
              )
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RevenueExcelLikeScreen;
