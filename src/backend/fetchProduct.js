import { db } from "./firebase"; // Import Firestore instance
import { collection, getDocs } from "firebase/firestore";

/**
 * Hàm lấy tất cả sản phẩm từ Firestore
 * @returns {Promise<Array>} - Danh sách sản phẩm
 */
const fetchProduct = async () => {
  try {
    const productRef = collection(db, "Product"); // Tham chiếu collection "Product"
    const querySnapshot = await getDocs(productRef); // Lấy dữ liệu

    // Chuyển dữ liệu thành mảng object
    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id, // ID của document
      ...doc.data(), // Dữ liệu của document
    }));

    console.log("Danh sách sản phẩm:", products);
    return products;
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm:", error);
    return [];
  }
};

export default fetchProduct;
