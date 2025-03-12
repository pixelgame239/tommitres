import React, { useState } from "react";
import PropTypes from "prop-types";
import doAn from "../assets/do-an.jpg";
import duiGaRan from "../assets/dui-ga-ran.png";
import canhGaRan from "../assets/canh-ga-ran.png";
import canhGaSotCay from "../assets/canh-ga-sot-cay.png";
import duiGaSotCay from "../assets/dui-ga-sot-cay.png";
import kimChi from "../assets/kim-chi.png";
import traSuaKhoaiMon from "../assets/tra-sua-khoai-mon.png";
import traSuaNuong from "../assets/tra-sua-nuong.png";
import traThaiXanh from "../assets/tra-thai-xanh.png";
import tranChauDuongDen from "../assets/tran-chau-duong-den.png";
import { useEffect } from "react";
import { db } from "../backend/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";

// Color constants
const COLORS = {
  white: "#ffffff",
  textDark: "#333",
  primary: "#ff5722", // Màu cam nhẹ cho nút
  disabled: "#ccc",
};

// Style definitions
const STYLES = {
  container: {
    margin: 10,
    textAlign: "center",
    border: "1px solid #ddd",
    padding: 10,
    borderRadius: 10,
    minHeight: "350px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  image: {
    width: "100%",
    height: "180px",
    borderRadius: 10,
    maxWidth: "400px",
    objectFit: "cover",
  },
  productName: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    margin: "10px 0 5px",
  },
  description: {
    fontSize: "1rem",
    fontStyle: "italic",
    margin: "0 0 10px",
    color: "#666",
  },
  price: {
    fontSize: "1.2rem",
    margin: "0 0 10px",
  },
  outOfStock: {
    fontSize: "1.25rem",
    color: "red",
    textAlign: "center",
    margin: "10px 0",
  },
  quantityContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    marginTop: "10px",
  },
  quantityButton: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    border: `2px solid ${COLORS.primary}`,
    background: COLORS.white,
    color: COLORS.primary,
    fontSize: "1.2rem",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "background 0.2s ease, color 0.2s ease",
    ":hover": {
      background: COLORS.primary,
      color: COLORS.white,
    },
  },
  disabledButton: {
    border: `2px solid ${COLORS.disabled}`,
    color: COLORS.disabled,
    cursor: "not-allowed",
    ":hover": {
      background: COLORS.white,
      color: COLORS.disabled,
    },
  },
  quantityText: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    minWidth: "30px",
    textAlign: "center",
    color: COLORS.textDark,
  },
};

const FoodItem = ({ productID, productName, unitPrice, description, handlecreateOrder }) => {
  const [orderQuantity, setOrderQuantity] = useState(0);
  const [productQuantity, setProductQuantity] = useState();

  // Chọn ảnh dựa vào productName
  let productImage;
  switch (productName) {
    case "Đùi gà rán":
      productImage = duiGaRan;
      break;
    case "Kim chi":
      productImage = kimChi;
      break;
    case "Cánh gà rán":
      productImage = canhGaRan;
      break;
    case "Cánh gà sốt cay":
      productImage = canhGaSotCay;
      break;
    case "Đùi gà sốt cay":
      productImage = duiGaSotCay;
      break;
    case "Trà thái xanh":
      productImage = traThaiXanh;
      break;
    case "Trà sữa khoai môn tươi":
      productImage = traSuaKhoaiMon;
      break;
    case "Trà sữa nướng":
      productImage = traSuaNuong;
      break;
    case "Sữa tươi trân châu đường đen":
      productImage = tranChauDuongDen;
      break;
    default:
      productImage = doAn; // Ảnh mặc định
  }
    useEffect(() => {
      const unsubscribe = onSnapshot(query(collection(db, "Product"), where("productID","==", Number(productID))),
  async (snapshot)=>{
      const thisProduct = snapshot.docs[0];
      const thisQuantity = thisProduct.data().quantity;
      setProductQuantity(thisQuantity);
      console.log("Realtime product");
      if(orderQuantity>Number(thisQuantity)){
        setOrderQuantity(thisQuantity);
        await handlecreateOrder(productID, productName, thisQuantity, unitPrice, productImage);
        console.log("update when change max");
      }
      return()=>unsubscribe();
  });
  }, [orderQuantity]);

  const handleDecrement = async () => {
    const decreasedQuantity = Math.max(orderQuantity - 1, 0);
    setOrderQuantity(decreasedQuantity);
    await handlecreateOrder(productID, productName, decreasedQuantity, unitPrice, productImage);
  };

  const handleIncrement = async () => {
    const increasedQuantity = orderQuantity + 1;
    if (increasedQuantity <= productQuantity) {
      setOrderQuantity(increasedQuantity);
      await handlecreateOrder(productID, productName, increasedQuantity, unitPrice, productImage);
    }
  };
  return (
    <div style={STYLES.container}>
      {/* Hiển thị ảnh */}
      <img src={productImage} alt={productName} style={STYLES.image} />

      {/* Thông tin sản phẩm */}
      <p style={STYLES.productName}>{productName}</p>
      <p style={STYLES.description}>{description || ""}</p>
      <p style={STYLES.price}>Giá: {unitPrice.toLocaleString()}đ</p>
      {/* Điều khiển số lượng */}
      {productQuantity <= 0 ? (
        <p style={STYLES.outOfStock}>Hết hàng</p>
      ) : (
        <div style={STYLES.quantityContainer}>
          <button
            style={{
              ...STYLES.quantityButton,
              ...(orderQuantity === 0 ? STYLES.disabledButton : {}),
            }}
            onClick={handleDecrement}
            disabled={orderQuantity === 0}
          >
            -
          </button>
          <span style={STYLES.quantityText}>{orderQuantity}</span>
          <button
            style={{
              ...STYLES.quantityButton,
              ...(orderQuantity >= productQuantity ? STYLES.disabledButton : {}),
            }}
            onClick={handleIncrement}
            disabled={orderQuantity >= productQuantity}
          >
            +
          </button>
        </div>
      )}
    </div>
  );
};

FoodItem.propTypes = {
  productName: PropTypes.string.isRequired,
  unitPrice: PropTypes.number.isRequired,
  description: PropTypes.string,
  handlecreateOrder: PropTypes.func.isRequired,
};

export default FoodItem;