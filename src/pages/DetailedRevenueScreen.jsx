import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../backend/firebase";
import "./orderStatusScreen.css";

const RevenueExcelLikeScreen = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchDate, setSearchDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        console.log("📌 Đang lấy danh sách đơn hàng từ Firestore...");
        const ordersCollection = collection(db, "Order");
        const orderSnapshot = await getDocs(ordersCollection);

        let orderList = orderSnapshot.docs.map((doc) => {
          const orderData = doc.data();
          return {
            id: doc.id,
            ...orderData,
            buyDate: orderData.buyDate?.toDate() || null, // Chuyển timestamp thành Date
          };
        });

        orderList = orderList
          .filter((order) => order.status === "Hoàn thành")
          .sort((a, b) => b.buyDate - a.buyDate);

        // Nhóm đơn hàng theo ngày và tính tổng doanh thu
        const groupedOrders = [];
        const revenueByDate = {};

        orderList.forEach((order) => {
          if (!order.buyDate) return;
          const orderDate = order.buyDate.toISOString().split("T")[0];

          if (!revenueByDate[orderDate]) {
            revenueByDate[orderDate] = { total: 0, orders: [] };
          }
          revenueByDate[orderDate].total += order.totalPrice || 0;
          revenueByDate[orderDate].orders.push(order);
        });

        // Sắp xếp lại danh sách để mỗi nhóm ngày có dòng tổng doanh thu ở cuối
        Object.keys(revenueByDate).forEach((date) => {
          groupedOrders.push(...revenueByDate[date].orders);
          groupedOrders.push({
            id: `total-${date}`,
            isTotalRow: true,
            buyDate: date,
            totalRevenue: revenueByDate[date].total,
          });
        });

        setOrders(groupedOrders);
        setFilteredOrders(groupedOrders); // Ban đầu hiển thị tất cả
      } catch (err) {
        console.error("❌ Lỗi khi lấy đơn hàng:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Cập nhật danh sách khi searchDate thay đổi
  useEffect(() => {
    if (!searchDate) {
      setFilteredOrders(orders);
      return;
    }

    const filtered = orders.filter((order) => {
      if (!order.buyDate) return false;
      const orderDate =
        order.buyDate instanceof Date
          ? order.buyDate.toISOString().split("T")[0]
          : order.buyDate;

      // Chỉ lấy đơn hàng của ngày tìm kiếm
      if (orderDate === searchDate) return true;

      // Chỉ lấy tổng doanh thu của ngày tìm kiếm, bỏ tổng các ngày khác
      if (order.isTotalRow && order.buyDate === searchDate) return true;

      return false;
    });

    setFilteredOrders(filtered);
  }, [searchDate, orders]);

  const handleSearchDateChange = (e) => {
    setSearchDate(e.target.value);
  };

  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div>Lỗi: {error}</div>;

  return (
    <div>
      <br />
      <h1>Quản lý doanh thu</h1>

      {/* Ô tìm kiếm ngày */}
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="searchDate" style={{ marginRight: "10px" }}>
          Tìm đơn hàng theo ngày:
        </label>
        <input
          type="date"
          id="searchDate"
          value={searchDate}
          onChange={handleSearchDateChange}
        />
      </div>

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
          {filteredOrders.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                Không có đơn hàng nào!
              </td>
            </tr>
          ) : (
            filteredOrders.map((order) =>
              order.isTotalRow ? (
                <tr key={order.id} className="total-row">
                  <td
                    colSpan="4"
                    style={{ fontWeight: "bold", textAlign: "right" }}
                  >
                    Tổng doanh thu ngày{" "}
                    {new Date(order.buyDate).toLocaleDateString("vi-VN")}:
                  </td>
                  <td
                    style={{
                      fontWeight: "bold",
                      color: "red",
                      textAlign: "center",
                    }}
                  >
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
                    {order.buyDate instanceof Date
                      ? order.buyDate.toLocaleDateString("vi-VN")
                      : order.buyDate}
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
