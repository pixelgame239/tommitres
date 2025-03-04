import React, { useState } from 'react';
import Header from "../components/Header";

const RevenueExcelLikeScreen = () => {
  const [date, setDate] = useState('');
  const [customerSearch, setCustomerSearch] = useState('');
  const [initialRows] = useState([
    { date: '2025-02-17', customerName: 'Nguyễn Văn A', thuTien: 150000 },
    { date: '2025-02-17', customerName: 'Trần Thị B', thuTien: 120000 },
    { date: '2025-02-17', customerName: 'Lê Văn C', thuTien: 180000 },
    { date: '2025-02-18', customerName: 'Phạm Thị D', thuTien: 200000 },
    { date: '2025-02-18', customerName: 'Hoàng Văn E', thuTien: 130000 },
    { date: '2025-02-19', customerName: 'Đỗ Thị F', thuTien: 160000 },
    { date: '2025-02-19', customerName: 'Bùi Văn G', thuTien: 140000 },
    { date: '2025-02-19', customerName: 'Vũ Thị H', thuTien: 190000 },
  ]);
  const [rows, setRows] = useState(initialRows);

  const handleSearch = () => {
    let filteredRows = [...initialRows];

    if (date.trim() !== '') {
      filteredRows = filteredRows.filter(row => row.date === date);
    }

    if (customerSearch.trim() !== '') {
      filteredRows = filteredRows.filter(row => 
        row.customerName.toLowerCase().includes(customerSearch.toLowerCase())
      );
    }

    if (filteredRows.length > 0) {
      setRows(filteredRows);
    } else {
      alert('Không có dữ liệu khớp với tìm kiếm!');
    }
  };

  const handleReload = () => {
    setRows(initialRows);
    setDate('');
    setCustomerSearch('');
  };

  const groupedData = rows.reduce((acc, row) => {
    if (!acc[row.date]) {
      acc[row.date] = { customers: [], total: 0 };
    }
    acc[row.date].customers.push({ name: row.customerName, amount: row.thuTien });
    acc[row.date].total += row.thuTien;
    return acc;
  }, {});

  return (
    <div className="container">
      <Header />
      <div className="spacer" />
      <h2 className="title">Doanh Thu Theo Ngày</h2>

      {/* Form */}
      <div className="search-form">
        <div className="form-group">
          <label htmlFor="dateInput" className="form-label">Chọn ngày:</label>
          <input
            id="dateInput"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="date-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="customerInput" className="form-label">Tên khách hàng:</label>
          <input
            id="customerInput"
            type="text"
            value={customerSearch}
            onChange={(e) => setCustomerSearch(e.target.value)}
            className="text-input"
            placeholder="Nhập tên khách hàng..."
          />
        </div>
        <div className="button-group">
          <button onClick={handleSearch} className="button search-button">Tìm kiếm</button>
          <button onClick={handleReload} className="button reload-button">Reload</button>
        </div>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th className="date-header">Ngày</th>
              <th className="customer-header">Tên Khách Hàng</th>
              <th className="amount-header">Số Tiền</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(groupedData).map(([date, { customers, total }]) => (
              <React.Fragment key={date}>
                {customers.map((customer, index) => (
                  <tr key={`${date}-${index}`}>
                    {index === 0 && <td rowSpan={customers.length + 1} className="date-cell">{date}</td>}
                    <td className="customer-cell">{customer.name}</td>
                    <td className="amount">{customer.amount.toLocaleString('vi-VN')} VNĐ</td>
                  </tr>
                ))}
                <tr className="total-row">
                  <td className="total-label">Tổng cộng</td>
                  <td className="amount total-amount">{total.toLocaleString('vi-VN')} VNĐ</td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Inline CSS */}
      <style jsx>{`
        .container {
          padding: 15px;
          margin: 0 auto;
          width: 100%;
          box-sizing: border-box;
        }

        .spacer {
          height: 70px;
        }

        .title {
          text-align: center;
          margin-bottom: 20px;
          color: #333;
          font-size: 24px;
          font-weight: bold;
        }

        .search-form {
          display: flex;
          flex-direction: column; /* Đặt hàng dọc */
          gap: 15px; /* Khoảng cách giữa các phần tử */
          background: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px; /* Giới hạn chiều rộng form */
          margin: 0 auto; /* Căn giữa form */
        }

        .form-group {
          display: flex;
          flex-direction: column;
          width: 100%; /* Đảm bảo ô nhập liệu full chiều rộng */
        }

        .form-label {
          margin-bottom: 8px;
          font-weight: 500;
          color: #555;
        }

        .date-input, .text-input {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 6px;
          background-color: #fff;
          color: #333;
          width: 100%; /* Full chiều rộng của container cha */
          font-size: 14px;
          box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .date-input:focus, .text-input:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
        }

        .text-input::placeholder {
          color: #aaa;
          font-style: italic;
        }

        .button-group {
          display: flex;
          gap: 10px;
          justify-content: center; /* Căn giữa hai nút */
          width: 100%;
        }

        .button {
          padding: 10px 20px;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s ease, transform 0.2s ease;
          flex: 1; /* Hai nút chia đều chiều rộng */
        }

        .search-button {
          background-color: #007bff;
          color: white;
        }

        .search-button:hover {
          background-color: #0056b3;
          transform: translateY(-2px);
        }

        .reload-button {
          background-color: #28a745;
          color: white;
        }

        .reload-button:hover {
          background-color: #218838;
          transform: translateY(-2px);
        }

        .table-wrapper {
          overflow-x: auto;
          margin-top: 20px;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }

        th, td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }

        .amount-header, .amount, .total-amount {
          text-align: right;
        }

        .total-row {
          background: #f8f9fa;
          font-weight: 600;
        }

        .total-label {
          text-align: left;
          font-weight: bold;
        }

        .total-row td {
          border-top: 2px solid #ddd;
        }
      `}</style>
    </div>
  );
};

export default RevenueExcelLikeScreen;