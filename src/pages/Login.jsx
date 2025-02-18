import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../backend/firebase"; // Import db từ firebase.jsx
import { collection, getDocs } from "firebase/firestore"; // Sử dụng Firestore API
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchAccounts = async (username, password) => {
    try {
      console.log("Đang thực hiện yêu cầu lấy tất cả tài khoản...");
      setLoading(true);
      const accountsRef = collection(db, "Account"); // Truy vấn tất cả tài khoản trong collection "Account"
      console.log("Truy vấn tất cả tài khoản");

      const querySnapshot = await getDocs(accountsRef); // Lấy tất cả tài khoản trong collection
      console.log("Kết quả từ Firestore:", querySnapshot);

      let isAuthenticated = false; // Biến để kiểm tra nếu tìm thấy tài khoản hợp lệ

      querySnapshot.forEach((doc) => {
        const accountData = doc.data();
        console.log("Dữ liệu tài khoản:", accountData);

        // Kiểm tra nếu tài khoản trùng khớp với username và password
        if (
          accountData.Username === username &&
          accountData.Password === password
        ) {
          isAuthenticated = true; // Đánh dấu là đã tìm thấy tài khoản hợp lệ
          console.log("Đăng nhập thành công.");
          navigate("/tommitres"); // Điều hướng sau khi đăng nhập thành công
        }
      });

      if (!isAuthenticated) {
        setError("Tài khoản hoặc mật khẩu không đúng");
        console.log("Tài khoản hoặc mật khẩu không đúng.");
      }
    } catch (error) {
      setError("Đã xảy ra lỗi khi đăng nhập");
      console.error("Lỗi trong khi lấy tài khoản từ Firestore:", error);
    } finally {
      setLoading(false);
      console.log("Kết thúc quá trình đăng nhập.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form đã được submit.");
    fetchAccounts(username, password); // Gọi hàm fetchAccounts khi người dùng submit form
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 vw-100"
      style={{
        background: "#f0f2f5", // Thay đổi thành một màu đơn
      }}
    >
      <div
        className="card p-5 shadow-lg d-flex flex-column justify-content-center"
        style={{
          width: "450px",
          height: "520px",
          borderRadius: "15px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          backgroundColor: "white",
        }}
      >
        <h3 className="text-center mb-4" style={{ color: "#333" }}>
          Đăng nhập
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Tên người dùng</label>
            <input
              type="text"
              className="form-control p-2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ borderRadius: "10px" }}
            />
          </div>
          <div className="mb-4">
            <label className="form-label fw-semibold">Mật khẩu</label>
            <input
              type="password"
              className="form-control p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ borderRadius: "10px" }}
            />
          </div>
          <button
            type="submit"
            className="btn w-100 p-2 fw-bold"
            style={{
              backgroundColor: "#4A90E2",
              color: "white",
              borderRadius: "10px",
            }}
            disabled={loading} // Disable nút khi đang tải
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        {/* Hiển thị lỗi nếu có */}
        {error && <p className="text-center text-danger mt-3">{error}</p>}

        <p className="text-center mt-3">
          <a
            href="#"
            className="text-decoration-none"
            style={{ color: "#4A90E2" }}
          >
            Quên mật khẩu?
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
