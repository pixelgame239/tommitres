import { collection, getDocs } from "@firebase/firestore";
import React, { useState, useEffect } from "react";
import { db } from "../backend/firebase";
import updatePassword from "../backend/updatePassword";

const AccountScreen = () => {
  const [stAccounts, setStAccounts] = useState([]);
  const [mAccounts, setMAccounts] = useState([]);
  const [cAccounts, setCAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [showDialog, setShowDialog] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const getAccounts = async () => {
      try {
        setLoading(true);
        const accountsRef = collection(db, "Account");
        const querySnapshot = await getDocs(accountsRef);

        if (!querySnapshot.empty) {
          const stList = [];
          const mList = [];
          const cList = [];

          querySnapshot.docs.forEach((doc) => {
            const username = doc.data().Username;
            const account = {
              id: doc.id,
              username,
              password: doc.data().Password,
            };

            if (username.startsWith("ST")) {
              stList.push(account);
            } else if (username.startsWith("M")) {
              mList.push(account);
            } else if (username.startsWith("C")) {
              cList.push(account);
            }
          });

          setStAccounts(stList);
          setMAccounts(mList);
          setCAccounts(cList);
        } else {
          setError("Không tìm thấy tài khoản.");
        }
      } catch (error) {
        setError("Đã xảy ra lỗi: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    getAccounts();
  }, []);

  const togglePasswordVisibility = (id) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleChangePassword = (account) => {
    setSelectedAccount(account);
    setShowDialog(true);
  };

  const handleSubmit = async () => {
    if (!selectedAccount) {
      alert("Không tìm thấy tài khoản để đổi mật khẩu!");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Mật khẩu mới và xác nhận mật khẩu không khớp!");
      return;
    }

    try {
      const response = await updatePassword(
        selectedAccount.username,
        currentPassword,
        newPassword
      );

      alert(response);

      if (response.includes("thành công")) {
        setShowDialog(false);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      alert("Lỗi khi đổi mật khẩu: " + error.message);
    }
  };

  if (loading) {
    return <p style={{ fontSize: "24px", textAlign: "center" }}>Đang tải...</p>;
  }

  if (error) {
    return (
      <p style={{ fontSize: "24px", textAlign: "center", color: "red" }}>
        Lỗi: {error}
      </p>
    );
  }

  const renderTable = (title, accounts) => (
    <div>
      <h3 style={{ fontSize: "28px", marginTop: "20px" }}>{title}</h3>
      {accounts.length > 0 ? (
        <table
          border="1"
          style={{
            width: "700px", // Đảm bảo bảng rộng tối đa
            textAlign: "left",
            fontSize: "20px",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2" }}>
              <th style={{ padding: "12px" }}>Username</th>
              <th style={{ padding: "12px" }}>Mật khẩu</th>
              <th style={{ padding: "12px" }}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account) => (
              <tr key={account.id}>
                <td style={{ padding: "12px" }}>{account.username}</td>
                <td
                  style={{
                    padding: "12px",
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      fontFamily: "monospace",
                      width: "100px", // Đặt chiều rộng cố định
                      display: "inline-block",
                      textAlign: "left",
                    }}
                  >
                    {visiblePasswords[account.id] ? account.password : "●●●●●●"}
                  </span>
                  <button
                    onClick={() => togglePasswordVisibility(account.id)}
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "18px",
                      padding: "5px",
                      marginLeft: "10px",
                    }}
                  >
                    {visiblePasswords[account.id] ? "🙈" : "👁️"}
                  </button>
                </td>

                <td style={{ padding: "12px" }}>
                  <button
                    onClick={() => handleChangePassword(account)}
                    style={{
                      padding: "10px 15px",
                      fontSize: "16px",
                      cursor: "pointer",
                      backgroundColor: "#007bff",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                    }}
                  >
                    Đổi mật khẩu
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ fontSize: "20px", textAlign: "center" }}>
          Không có tài khoản.
        </p>
      )}
    </div>
  );

  return (
    <div style={{ maxWidth: "1400px", margin: "auto", padding: "30px" }}>
      {renderTable("Tài khoản Nhân viên", stAccounts)}
      {renderTable("Tài khoản quản lý", mAccounts)}
      {renderTable("Tài khoản đầu bếp", cAccounts)}

      {showDialog && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0px 0px 15px rgba(0,0,0,0.3)",
            width: "400px",
          }}
        >
          <h3>Đổi mật khẩu</h3>
          <input
            type="text"
            placeholder="Mật khẩu hiện tại"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            style={{
              display: "block",
              margin: "10px 0",
              padding: "12px",
              width: "100%",
            }}
          />
          <input
            type="text"
            placeholder="Mật khẩu mới"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={{
              display: "block",
              margin: "10px 0",
              padding: "12px",
              width: "100%",
            }}
          />
          <input
            type="text"
            placeholder="Xác nhận mật khẩu mới"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{
              display: "block",
              margin: "10px 0",
              padding: "12px",
              width: "100%",
            }}
          />
          <button
            onClick={handleSubmit}
            style={{
              padding: "12px 15px",
              marginRight: "10px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Xác nhận
          </button>
          <button
            onClick={() => {
              setCurrentPassword("");
              setNewPassword("");
              setConfirmPassword("");
              setShowDialog(false);
            }}
            style={{
              padding: "12px 15px",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Hủy
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountScreen;
