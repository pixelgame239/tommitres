import React, { useState } from 'react';
import Header from "../components/Header";

const RevenueExcelLikeScreen = () => {
  const [date, setDate] = useState('');
  const [initialRows] = useState([
    { date: '2025-02-17', thuTien: 150000 },
    { date: '2025-02-17', thuTien: 120000 },
    { date: '2025-02-17', thuTien: 180000 },
    { date: '2025-02-18', thuTien: 200000 },
    { date: '2025-02-18', thuTien: 130000 },
    { date: '2025-02-19', thuTien: 160000 },
    { date: '2025-02-19', thuTien: 140000 },
    { date: '2025-02-19', thuTien: 190000 },
  ]);
  const [rows, setRows] = useState(initialRows);

  const handleSearch = () => {
    let filteredRows = [...initialRows];
    if (date.trim() !== '') {
      filteredRows = filteredRows.filter(row => row.date === date);
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
  };

  const groupedData = rows.reduce((acc, row) => {
    if (!acc[row.date]) {
      acc[row.date] = { amounts: [], total: 0 };
    }
    acc[row.date].amounts.push(row.thuTien);
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
              <th className="amount-header">Số Tiền</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(groupedData).map(([date, { amounts, total }]) => (
              <React.Fragment key={date}>
                {amounts.map((amount, index) => (
                  <tr key={`${date}-${index}`}>
                    {index === 0 && <td rowSpan={amounts.length + 1} className="date-cell">{date}</td>}
                    <td className="amount-cell">{amount.toLocaleString('vi-VN')} VNĐ</td>
                  </tr>
                ))}
                <tr className="total-row">
                  <td className="total-label">Tổng cộng</td>
                  <td className="amount-cell total-amount">{total.toLocaleString('vi-VN')} VNĐ</td>
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
          max-width: 1200px;
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
          flex-direction: column;
          gap: 15px;
          background: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .form-label {
          margin-bottom: 8px;
          font-weight: 500;
          color: #555;
        }

        .date-input {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 6px;
          background-color: #fff;
          color: #333;
          width: 100%;
          font-size: 14px;
          box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .date-input:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
        }

        .button-group {
          display: flex;
          gap: 10px;
          justify-content: center;
          width: 100%;
        }

        .button {
          padding: 12px 20px;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s ease, transform 0.2s ease;
          flex: 1;
          min-height: 44px;
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
          width: 100%;
          -webkit-overflow-scrolling: touch;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }

        th, td {
          padding: 12px;
          border-bottom: 1px solid #ddd;
        }

        .date-header {
          text-align: left;
          width: 30%;
          min-width: 120px;
        }

        .amount-header {
          text-align: right;
          width: 70%;
          min-width: 200px;
        }

        .date-cell {
          text-align: left;
          vertical-align: middle;
          width: 30%;
          min-width: 120px;
        }

        .amount-cell {
          text-align: right;
          padding-right: 20px;
          width: 70%; /* Chiếm toàn bộ chiều rộng còn lại */
          min-width: 200px;
        }

        .total-row {
          background: #f8f9fa;
          font-weight: 600;
        }

        .total-label {
          text-align: left;
          font-weight: bold;
          width: 30%;
          min-width: 120px;
        }

        .total-amount {
          font-weight: bold;
          text-align: right;
          padding-right: 20px;
          width: auto; /* Giữ nguyên kích thước tự nhiên */
          min-width: 200px; /* Đảm bảo không bị co lại quá nhỏ */
        }

        /* Responsive design cho điện thoại */
        @media (max-width: 600px) {
          .spacer {
            height: 50px;
          }

          .title {
            font-size: 20px;
          }

          .search-form {
            padding: 15px;
            max-width: 100%;
            box-sizing: border-box;
          }

          .form-label {
            font-size: 14px;
          }

          .date-input {
            padding: 8px;
            font-size: 14px;
            box-sizing: border-box;
          }

          .button {
            padding: 10px 15px;
            font-size: 14px;
            min-height: 44px;
          }

          .table-wrapper {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
          }

          .data-table {
            min-width: 100%;
            border-collapse: collapse;
          }

          th, td {
            padding: 8px;
            font-size: 12px;
          }

          .date-header {
            width: 40%;
            min-width: 100px;
          }

          .amount-header {
            width: 60%;
            min-width: 150px;
          }

          .date-cell {
            width: 40%;
            min-width: 100px;
          }

          .amount-cell {
            width: 60%; /* Chiếm toàn bộ chiều rộng còn lại */
            min-width: 150px;
            padding-right: 15px;
          }

          .total-label {
            width: 40%;
            min-width: 100px;
          }

          .total-amount {
            width: auto; /* Giữ nguyên kích thước tự nhiên */
            min-width: 150px;
            padding-right: 15px;
          }
        }

        /* Tối ưu cho màn hình rất nhỏ (dưới 400px) */
        @media (max-width: 400px) {
          .title {
            font-size: 18px;
          }

          .form-label {
            font-size: 12px;
          }

          .date-input {
            font-size: 12px;
            padding: 6px;
          }

          .button {
            padding: 8px 10px;
            font-size: 12px;
            min-height: 40px;
          }

          th, td {
            padding: 6px;
            font-size: 11px;
          }

          .date-header,
          .date-cell,
          .total-label {
            min-width: 80px;
          }

          .amount-header,
          .amount-cell {
            min-width: 120px;
          }

          .total-amount {
            min-width: 120px;
          }
        }
      `}</style>
    </div>
  );
};

export default RevenueExcelLikeScreen;