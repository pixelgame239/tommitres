import React, { useState, useEffect } from "react";
import { db } from "./firebase"; // Import db từ firebase.jsx
import { collection, getDocs } from "firebase/firestore"; // Sử dụng Firestore API để lấy danh sách tài liệu

const Account = () => {
  const [accountsMap, setAccountsMap] = useState(new Map()); // Sử dụng Map để lưu tài khoản theo username
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hàm fetchAccount để lấy toàn bộ các tài khoản
  const fetchAccount = async () => {
    try {
      setLoading(true);

      // Truy vấn Firestore để lấy tất cả tài khoản từ collection "Account"
      const accountsRef = collection(db, "Account");
      const querySnapshot = await getDocs(accountsRef); // Lấy danh sách tài liệu trong collection

      if (!querySnapshot.empty) {
        const newAccountsMap = new Map();
        querySnapshot.forEach((doc) => {
          const accountData = doc.data();
          const newAccount = {
            username: accountData.Username, // Lấy trường Username
            password: accountData.Password, // Lấy trường Password
          };
          newAccountsMap.set(accountData.Username, newAccount); // Lưu tài khoản vào Map với Username làm key
        });

        setAccountsMap(newAccountsMap); // Cập nhật Map tài khoản
        console.log("Danh sách tài khoản:", newAccountsMap); // Console.log toàn bộ các tài khoản
      } else {
        setError("Không tìm thấy tài khoản.");
        console.log("Không có tài khoản nào trong Firestore.");
      }
    } catch (error) {
      setError("Đã xảy ra lỗi: " + error.message);
      console.error("Lỗi khi lấy tài khoản từ Firestore:", error);
    } finally {
      setLoading(false);
    }
  };

  // Gọi fetchAccount khi component được mount
  useEffect(() => {
    fetchAccount(); // Gọi hàm fetchAccount khi component load
  }, []); // Chỉ gọi 1 lần khi component mount

  if (loading) {
    return <p>Đang tải...</p>;
  }

  if (error) {
    return <p>Lỗi: {error}</p>;
  }

  return (
    <div>
      <h3>Tất cả tài khoản</h3>
      {/* Hiển thị thông tin tài khoản nếu tìm thấy */}
      {accountsMap.size > 0 ? (
        <div>
          {Array.from(accountsMap.values()).map((account, index) => (
            <div key={index}>
              <p>Tên người dùng: {account.username}</p>
              <p>Mật khẩu: {account.password}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Không có thông tin tài khoản</p>
      )}
    </div>
  );
};

export default Account;
