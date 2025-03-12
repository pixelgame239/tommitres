import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import FoodItem from "../components/FoodItem";
import fetchProduct from "../backend/fetchProduct";
import { Product } from "../backend/productObject";
import { Order } from "../backend/orderObject";

// Color constants
const COLORS = {
  white: "#ffffff",
  textDark: "#333",
  foodPrimary: "#ff5722",
  foodBackground: "#ffebee", // Light red for food section
  drinkPrimary: "#2196f3",
  drinkBackground: "#e3f2fd", // Light blue for drink section
  divider: "#ddd",
  buttonGradientStart: "#ff5722",
  buttonGradientEnd: "#ff9800",
  buttonShadow: "rgba(255, 87, 34, 0.4)"
};

// Style definitions
const STYLES = {
  container: {
    minHeight: "100vh",
    background: COLORS.white,
    padding: "20px",
    fontFamily: "'Roboto', sans-serif"
  },
  header: {
    background: COLORS.white,
    padding: "15px 20px",
    borderRadius: "10px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    marginBottom: "20px"
  },
  headerTitle: {
    margin: 0,
    color: COLORS.textDark,
    fontSize: "24px",
    textAlign: "center"
  },
  section: {
    marginBottom: "40px",
    padding: "15px",
    borderRadius: "10px"
  },
  sectionTitle: {
    fontSize: "40px",
    margin: "0 0 15px 10px",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  divider: {
    height: "1px",
    background: COLORS.divider,
    margin: "20px auto",
    width: "90%"
  },
  desktopGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px",
    padding: "0 20px"
  },
  mobileList: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    padding: "0 10px"
  },
  desktopItem: {
    background: COLORS.white,
    borderRadius: "10px",
    padding: "15px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    transition: "transform 0.2s",
    ":hover": {
      transform: "translateY(-5px)"
    }
  },
  mobileItem: {
    background: COLORS.white,
    borderRadius: "10px",
    padding: "15px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
  },
  orderButton: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    padding: "15px 30px",
    background: `linear-gradient(45deg, ${COLORS.buttonGradientStart}, ${COLORS.buttonGradientEnd})`,
    border: "none",
    borderRadius: "25px",
    color: COLORS.white,
    fontSize: "16px",
    fontWeight: "bold",
    boxShadow: `0 4px 15px ${COLORS.buttonShadow}`,
    cursor: "pointer",
    transition: "transform 0.2s",
    ":hover": {
      transform: "scale(1.05)"
    }
  }
};

const OrderScreen = ({ tableID }) => {
  const [foodData, setFoodData] = useState([]);
  const [drinkData, setDrinkData] = useState([]);
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const currentOrders = new Order();

  // Navigation to payment screen
  const handleNavPayment = () => {
    navigate("/tommitres/yourorder", { state: { currentOrders } });
  };

  // Create order handler
  const handleCreateOrder = async (productID, productName, orderQuantity, unitPrice, imageLink) => {
    if (!currentOrders.orderID) {
      await currentOrders.getOrderID();
    }
    currentOrders.addProduct(productID, productName, orderQuantity, unitPrice, imageLink);
    currentOrders.calculateTotalPrice();
    currentOrders.tableNumber = tableID ? `Bàn ${tableID}` : "";
    console.log(JSON.stringify(currentOrders, null, 2));
  };

  // Fetch products on mount
  useEffect(() => {
    const getProducts = async () => {
      try {
        const fetchedProducts = await fetchProduct();
        const objectProducts = new Product();
        const products = objectProducts.getProduct(fetchedProducts);
        setFoodData(products.filter((item) => item.category === "Food"));
        setDrinkData(products.filter((item) => item.category === "Drink"));
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
      }
    };
    getProducts();
  }, []);

  return (
    <div style={isMobile ? { ...STYLES.container, padding: "10px" } : STYLES.container}>
      {/* Header */}
      <div style={STYLES.header}>
        <h2 style={isMobile ? { ...STYLES.headerTitle, fontSize: "20px" } : STYLES.headerTitle}>
          {tableID ? `Bàn ${tableID}` : ""}
        </h2>
      </div>

      {/* Food Section */}
      <section style={{ ...STYLES.section, background: COLORS.foodBackground }}>
        <h2 style={{ ...STYLES.sectionTitle, color: COLORS.foodPrimary }}>
          <span>🍕</span> Đồ ăn
        </h2>
        <div style={isMobile ? STYLES.mobileList : STYLES.desktopGrid}>
          {foodData.map((item) => (
            <FoodItem
              key={item.productID}
              productID={item.productID}
              productName={item.productName}
              unitPrice={item.unitPrice}
              description={item.description}
              quantity={item.quantity}
              handlecreateOrder={handleCreateOrder}
              style={isMobile ? STYLES.mobileItem : STYLES.desktopItem}
            />
          ))}
        </div>
      </section>

      {/* Divider */}
      <div style={STYLES.divider} />

      {/* Drinks Section */}
      <section style={{ ...STYLES.section, background: COLORS.drinkBackground, marginBottom: "80px" }}>
        <h2 style={{ ...STYLES.sectionTitle, color: COLORS.drinkPrimary }}>
          <span>🧋</span> Đồ uống
        </h2>
        <div style={isMobile ? STYLES.mobileList : STYLES.desktopGrid}>
          {drinkData.map((item) => (
            <FoodItem
              key={item.productID}
              productID={item.productID}
              productName={item.productName}
              unitPrice={item.unitPrice}
              description={item.description}
              quantity={item.quantity}
              handlecreateOrder={handleCreateOrder}
              style={isMobile ? STYLES.mobileItem : STYLES.desktopItem}
            />
          ))}
        </div>
      </section>

      {/* Order Button */}
      <button
        onClick={() => {
          if (currentOrders.products.length <= 0) {
            alert("Vui lòng đặt ít nhất 1 món ăn hoặc đồ uống");
          } else {
            handleNavPayment();
          }
        }}
        style={STYLES.orderButton}
      >
        Đặt hàng
      </button>
    </div>
  );
};

export default OrderScreen;