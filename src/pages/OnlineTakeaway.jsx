import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import FoodItem from "../components/FoodItem";
import fetchProduct from "../backend/fetchProduct"; // Hàm fetch dữ liệu từ bảng Product

import myImage from "../assets/call.png";

const OnlineTakeAway = () => {
  const [foodData, setFoodData] = useState([]);
  const [drinkData, setDrinkData] = useState([]);
  const navigate = useNavigate(); // Hook điều hướng

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

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <div style={{ overflow: "auto", padding: 10 }}>
      <h2>Đồ ăn 🍕</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
          gap: 10,
          justifyItems: "center",
          alignItems: "stretch", // Căn tất cả items cho cùng chiều cao
          minHeight: "300px",
          paddingBottom: "160px",
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
          gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
          gap: 10,
          justifyItems: "center",
          alignItems: "stretch", // Căn tất cả items cho cùng chiều cao
          minHeight: "300px",
          paddingBottom: "60px",
        }}
      >
        {drinkData.map((item) => (
          <FoodItem
            key={item.productID}
            productName={item.productName}
            unitPrice={item.unitPrice}
            description={item.description}
            image={myImage} // Đảm bảo ảnh nằm trong thư mục public/images
          />
        ))}
      </div>

      <button
        onClick={() => navigate("/tommitres/yourorder")}
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          padding: 20,
          backgroundColor: "white",
          borderColor: "blue",
          color: "green",
        }}
      >
        Đặt hàng
      </button>
    </div>
  );
};

export default OnlineTakeAway;
