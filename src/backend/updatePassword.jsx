// import { collection, getDocs, query, where, updateDoc } from "firebase/firestore";
// import { db } from "./firebase";

import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

/**
 * Cập nhật mật khẩu theo username
 * @param {string} username - Username của tài khoản
 * @param {string} currentPassword - Mật khẩu hiện tại
 * @param {string} newPassword - Mật khẩu mới
 * @returns {Promise<string>} - Trả về thông báo thành công hoặc lỗi
 */
const updatePassword = async (username, currentPassword, newPassword) => {
  try {
    const accountsRef = collection(db, "Account");

    // Tìm tài khoản theo Username
    const q = query(accountsRef, where("Username", "==", username));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("Không tìm thấy tài khoản!");
    }

    const userDoc = querySnapshot.docs[0]; // Lấy tài khoản đầu tiên tìm thấy
    const userData = userDoc.data();

    // Kiểm tra mật khẩu hiện tại
    if (userData.Password !== currentPassword) {
      throw new Error("Mật khẩu hiện tại không chính xác!");
    }

    // Cập nhật mật khẩu mới
    await updateDoc(userDoc.ref, { Password: newPassword });

    return "Mật khẩu đã được cập nhật thành công!";
  } catch (error) {
    return `Lỗi: ${error.message}`;
  }
};

export default updatePassword;
export async function acceptPasswordChange(username, newPassword) {
  try {
    const accountsRef = collection(db, "Account");

    // Tìm tài khoản theo Username
    const q = query(accountsRef, where("Username", "==", username));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("Không tìm thấy tài khoản!");
    }
    const userDoc = querySnapshot.docs[0]; 
    await updateDoc(userDoc.ref, { Password: newPassword });

    return "Mật khẩu đã được cập nhật thành công!";
  } catch (error) {
    return `Lỗi: ${error.message}`;
  }
}
