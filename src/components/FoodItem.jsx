import React, { useState } from "react";
import PropTypes from "prop-types";

const FoodItem = ({ productName, unitPrice, description }) => {
  const [quantity, setQuantity] = useState(0);

  return (
    <div
      style={{
        margin: 10,
        textAlign: "center",
        border: "1px solid #ddd",
        padding: 10,
        borderRadius: 10,
      }}
    >
      <p>
        <strong>{productName}</strong>
      </p>
      <p style={{ fontStyle: "italic" }}>{description || "Không có mô tả"}</p>
      <p>Giá: {unitPrice.toLocaleString()}đ</p>
      <div>
        <button
          style={{ marginRight: 10, backgroundColor: "lightblue", padding: 5 }}
          onClick={() => setQuantity(Math.max(quantity - 1, 0))}
        >
          ➖
        </button>
        <strong>{quantity}</strong>
        <button
          style={{ marginLeft: 10, backgroundColor: "lightblue", padding: 5 }}
          onClick={() => setQuantity(quantity + 1)}
        >
          ➕
        </button>
      </div>
    </div>
  );
};

// 🚀 Kiểm tra kiểu dữ liệu của props
FoodItem.propTypes = {
  productName: PropTypes.string.isRequired,
  unitPrice: PropTypes.number.isRequired,
  description: PropTypes.string,
};

export default FoodItem;
