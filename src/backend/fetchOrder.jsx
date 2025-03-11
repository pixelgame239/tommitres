// OrderList.js
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "./firebase";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      console.log("Fetching orders...");

      try {
        const ordersCollection = collection(db, "Order");
        console.log("Orders collection reference:", ordersCollection);

        const orderSnapshot = await getDocs(ordersCollection);
        console.log("Order snapshot:", orderSnapshot);

        const orderList = orderSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("Fetched orders:", orderList);
        setOrders(orderList);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError(err.message);
      } finally {
        console.log("Finished fetching orders.");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    console.log("Loading state: true");
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Error state:", error);
    return <div>Error: {error}</div>;
  }

  console.log("Final orders state:", orders);

  return (
    <div>
      <h1>Order List</h1>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            {/* Hiển thị thông tin đơn hàng ở đây */}
            <p>ID: {order.id}</p>
            <p>Details: {JSON.stringify(order)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
