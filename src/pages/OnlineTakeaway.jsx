import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
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

  // Xác định nếu màn hình là điện thoại (dưới 768px)
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <div
      style={{
        // height: "100vh",
        overflow: "auto",
        padding: 10,
        // paddingLeft: 0,
        // marginLeft: 0,
      }}
    >
      <h2>Đồ ăn 🍕</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", // 2 cột trên điện thoại, 4 cột trên màn hình lớn
          gap: 10,
          justifyItems: "left", // Căn giữa các phần tử con trong grid theo chiều ngang
          alignItems: "center", // Căn các phần tử con theo chiều dọc (top alignment)
          paddingLeft: 0,
          marginLeft: 0,
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
          gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", // 2 cột trên điện thoại, 4 cột trên màn hình lớn
          gap: 10,
          justifyItems: "left", // Căn giữa các phần tử con trong grid theo chiều ngang
          alignItems: "center", // Căn các phần tử con theo chiều dọc (top alignment)
          paddingLeft: 0,
          marginLeft: 0,
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
