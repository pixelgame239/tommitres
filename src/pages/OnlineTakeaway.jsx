import React, { useEffect, useState } from "react";
import FoodItem from "../components/FoodItem";
import fetchProduct from "../backend/fetchProduct"; // Hàm fetch dữ liệu từ bảng Product

const OnlineTakeAway = () => {
  const [foodData, setFoodData] = useState([]);
  const [drinkData, setDrinkData] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const products = await fetchProduct(); // Gọi API lấy dữ liệu

        // Phân loại sản phẩm theo category
        const food = products.filter((item) => item.category === "Food");
        const drinks = products.filter((item) => item.category === "Drink");

        setFoodData(food);
        setDrinkData(drinks);
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
      }
    };

    getProducts();
  }, []);

  return (
    <div style={{ height: "100vh", overflowY: "auto", padding: 20 }}>
      <h2>Đồ ăn 🍕</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
        }}
      >
        {foodData.map((item) => (
          <FoodItem
            key={item.productID}
            productName={item.productName}
            unitPrice={item.unitPrice}
            description={item.description}
          />
        ))}
      </div>

      <h2>Đồ uống 🧋</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
        }}
      >
        {drinkData.map((item) => (
          <FoodItem
            key={item.productID}
            productName={item.productName}
            unitPrice={item.unitPrice}
            description={item.description}
          />
        ))}
      </div>

      <button
        style={{
          bottom: 20,
          right: 20,
          position: "fixed",
          color: "green",
          backgroundColor: "white",
          borderColor: "blue",
          padding: 20,
        }}
      >
        Đặt hàng
      </button>
    </div>
  );
};

export default OnlineTakeAway;
