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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

            if (username.startsWith("ST")) stList.push(account);
            else if (username.startsWith("M")) mList.push(account);
            else if (username.startsWith("C")) cList.push(account);
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
    setVisiblePasswords((prev) => ({ ...prev, [id]: !prev[id] }));
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
      const response = await updatePassword(selectedAccount.username, currentPassword, newPassword);
      alert(response);

      if (response.includes("thành công")) {
        const updateAccounts = (accounts) =>
          accounts.map((acc) =>
            acc.id === selectedAccount.id ? { ...acc, password: newPassword } : acc
          );

        setStAccounts(updateAccounts(stAccounts));
        setMAccounts(updateAccounts(mAccounts));
        setCAccounts(updateAccounts(cAccounts));
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
    return <p style={styles.loading}>Đang tải...</p>;
  }

  if (error) {
    return <p style={styles.error}>Lỗi: {error}</p>;
  }

  const renderTableDesktop = (title, accounts) => (
    <div style={styles.section}>
      <h3 style={styles.sectionTitle}>{title}</h3>
      {accounts.length > 0 ? (
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.th}>Tên đăng nhập</th>
                <th style={styles.th}>Mật khẩu</th>
                <th style={styles.th}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account) => (
                <tr key={account.id} style={styles.tr}>
                  <td style={styles.td}>{account.username}</td>
                  <td style={styles.td}>
                    <div style={styles.passwordContainer}>
                      <span style={styles.password}>
                        {visiblePasswords[account.id] ? account.password : "●●●●●●"}
                      </span>
                      <button onClick={() => togglePasswordVisibility(account.id)} style={styles.iconButton}>
                        {visiblePasswords[account.id] ? "🙈" : "👁️"}
                      </button>
                    </div>
                  </td>
                  <td style={styles.td}>
                    <button onClick={() => handleChangePassword(account)} style={styles.actionButton}>
                      Đổi mật khẩu
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p style={styles.noData}>Không có tài khoản.</p>
      )}
    </div>
  );

  const renderTableMobile = (title, accounts) => (
    <div style={styles.section}>
      <h3 style={styles.sectionTitle}>{title}</h3>
      {accounts.length > 0 ? (
        <div style={styles.cardContainer}>
          {accounts.map((account) => (
            <div key={account.id} style={styles.card}>
              <div style={styles.cardRow}>
                <span style={styles.label}>Tên đăng nhập:</span>
                <span>{account.username}</span>
              </div>
              <div style={styles.cardRow}>
                <span style={styles.label}>Mật khẩu:</span>
                <div style={styles.passwordContainer}>
                  <span style={styles.password}>
                    {visiblePasswords[account.id] ? account.password : "●●●●●●"}
                  </span>
                  <button onClick={() => togglePasswordVisibility(account.id)} style={styles.iconButton}>
                    {visiblePasswords[account.id] ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>
              <button onClick={() => handleChangePassword(account)} style={styles.actionButton}>
                Đổi mật khẩu
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p style={styles.noData}>Không có tài khoản.</p>
      )}
    </div>
  );

  return (
    <div style={styles.container}>
      {isMobile ? (
        <>
          {renderTableMobile("Tài khoản Nhân viên", stAccounts)}
          {renderTableMobile("Tài khoản Quản lý", mAccounts)}
          {renderTableMobile("Tài khoản Đầu bếp", cAccounts)}
        </>
      ) : (
        <>
          {renderTableDesktop("Tài khoản Nhân viên", stAccounts)}
          {renderTableDesktop("Tài khoản Quản lý", mAccounts)}
          {renderTableDesktop("Tài khoản Đầu bếp", cAccounts)}
        </>
      )}

      {showDialog && (
        <div style={styles.dialogOverlay}>
          <div style={isMobile ? styles.dialogMobile : styles.dialogDesktop}>
            <h3 style={styles.dialogTitle}>Đổi mật khẩu</h3>
            <input
              type="password"
              placeholder="Mật khẩu hiện tại"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              style={styles.input}
            />
            <input
              type="password"
              placeholder="Mật khẩu mới"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={styles.input}
            />
            <input
              type="password"
              placeholder="Xác nhận mật khẩu mới"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={styles.input}
            />
            <div style={styles.dialogButtons}>
              <button onClick={handleSubmit} style={styles.confirmButton}>
                Xác nhận
              </button>
              <button
                onClick={() => {
                  setCurrentPassword("");
                  setNewPassword("");
                  setConfirmPassword("");
                  setShowDialog(false);
                }}
                style={styles.cancelButton}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "1rem",
    maxWidth: "1200px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
  },
  section: {
    marginBottom: "2rem",
  },
  sectionTitle: {
    fontSize: "1.75rem",
    fontWeight: "bold",
    margin: "1rem 0",
    color: "#333",
  },
  tableContainer: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "1.25rem",
  },
  tableHeader: {
    backgroundColor: "#f2f2f2",
  },
  th: {
    padding: "0.75rem",
    textAlign: "left",
    borderBottom: "2px solid #ddd",
  },
  tr: {
    borderBottom: "1px solid #ddd",
  },
  td: {
    padding: "0.75rem",
    verticalAlign: "middle",
  },
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "1rem",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    border: "1px solid #e0e0e0",
  },
  cardRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "0.75rem",
  },
  label: {
    fontWeight: "bold",
    color: "#555",
  },
  passwordContainer: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  password: {
    fontFamily: "monospace",
  },
  iconButton: {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "1.25rem",
  },
  actionButton: {
    padding: "0.625rem 1rem",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "1rem",
    cursor: "pointer",
    width: "100%",
    transition: "background-color 0.3s",
  },
  noData: {
    fontSize: "1.25rem",
    textAlign: "center",
    color: "#666",
  },
  loading: {
    fontSize: "1.5rem",
    textAlign: "center",
    color: "#007bff",
  },
  error: {
    fontSize: "1.25rem",
    textAlign: "center",
    color: "#dc3545",
  },
  dialogOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  dialogDesktop: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "15px",
    width: "400px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
  },
  dialogMobile: {
    backgroundColor: "#fff",
    padding: "1.5rem",
    borderRadius: "15px",
    width: "90%",
    maxWidth: "400px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
  },
  dialogTitle: {
    fontSize: "1.5rem",
    marginBottom: "1rem",
    color: "#333",
  },
  input: {
    display: "block",
    width: "100%",
    padding: "0.75rem",
    marginBottom: "1rem",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #4a90e2", // Blue border
    backgroundColor: "#f0f8ff", // Light blue background
    color: "#333", // Dark text for contrast
    boxSizing: "border-box",
    outline: "none",
    transition: "border-color 0.3s, box-shadow 0.3s",
  },
  dialogButtons: {
    display: "flex",
    gap: "0.5rem",
  },
  confirmButton: {
    flex: 1,
    padding: "0.75rem",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  cancelButton: {
    flex: 1,
    padding: "0.75rem",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

// Add hover/focus styles using a separate CSS approach if needed
const additionalStyles = `
  input:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

export default AccountScreen;