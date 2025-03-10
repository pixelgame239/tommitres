import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import FoodItem from "../components/FoodItem";
import fetchProduct from "../backend/fetchProduct"; // Hàm fetch dữ liệu từ bảng Product
import { Product } from "../backend/productObject";
import { Order } from "../backend/orderObject";

const OrderScreen = ({ tableID }) => {
  const [foodData, setFoodData] = useState([]);
  const [drinkData, setDrinkData] = useState([]);
  const navigate = useNavigate(); 
  const handleNavPayment = () => {
    navigate("/tommitres/yourorder", {state: { currentOrders }});
  };
  const currentOrders = new Order();
  const handlecreateOrder= async (productID, productName, orderQuantity, unitPrice, imageLink)=>{
    if(currentOrders.orderID===undefined){
      await currentOrders.getOrderID();
    }
    currentOrders.addProduct(productID, productName, orderQuantity, unitPrice, imageLink);
    currentOrders.calculateTotalPrice();
    if(tableID===null||tableID===undefined){
      currentOrders.tableNumber = "Mang đi";
    }
    else{
      currentOrders.tableNumber = `Bàn ${tableID}`;
    }
    console.log(JSON.stringify(currentOrders,null,2));
  }

  useEffect(() => {
    const getProducts = async () => {
      try {
        const fetchproducts = await fetchProduct(); // Gọi API lấy dữ liệu
        const objectproducts = new Product();
        const products = objectproducts.getProduct(fetchproducts);
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
      <h2 style={{textAlign:"center"}}>{tableID?`Bàn ${tableID}`:null}</h2>
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
            productID={item.productID}
            productName={item.productName}
            unitPrice={item.unitPrice}
            description={item.description}
            quantity = {item.quantity}
            handlecreateOrder = {handlecreateOrder}
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
            productID={item.productID}
            productName={item.productName}
            unitPrice={item.unitPrice}
            description={item.description}
            quantity = {item.quantity}
            handlecreateOrder = {handlecreateOrder}
          />
        ))}
      </div>

      <button
        onClick={() => 
          {
            if(currentOrders.products.length<=0){
              alert("Vui lòng đặt ít nhất 1 món ăn hoặc đồ uống")
            }
            else{
              handleNavPayment();
            }
          }
        }
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

export default OrderScreen;
