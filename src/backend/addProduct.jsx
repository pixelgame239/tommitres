import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

/**
 * Hàm thêm sản phẩm mới vào collection "Product"
 * @param {string} category - Danh mục sản phẩm
 * @param {string} description - Mô tả sản phẩm
 * @param {string} productID - ID sản phẩm (có thể là UUID hoặc mã riêng)
 * @param {string} productName - Tên sản phẩm
 * @param {number} unitPrice - Giá sản phẩm
 * @returns {Promise<void>}
 */
const addProduct = async (
  category,
  description,
  productID,
  productName,
  unitPrice
) => {
  try {
    // Tham chiếu đến collection "Product"
    const productRef = collection(db, "Product");

    // Dữ liệu sản phẩm
    const newProduct = {
      category,
      description,
      productID,
      productName,
      unitPrice,
    };

    // Thêm document vào Firestore
    const docRef = await addDoc(productRef, newProduct);
    console.log("Sản phẩm đã được thêm với ID:", docRef.id);
  } catch (error) {
    console.error("Lỗi khi thêm sản phẩm:", error);
  }
};

export { addProduct };
