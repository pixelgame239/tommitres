import React, { useState } from 'react';
import Header from "../components/Header";

const RevenueExcelLikeScreen = () => {
  const [date, setDate] = useState('');
  const [rows, setRows] = useState([
    { date: '2025-02-17', thuTien: 150000 },
    { date: '2025-02-18', thuTien: 120000 },
    { date: '2025-02-19', thuTien: 180000 },
  ]);

  const handleSearch = () => {
    if (date.trim() === '') {
      alert('Vui lòng chọn ngày!');
      return;
    }

    const filteredRows = rows.filter(row => row.date === date);
    if (filteredRows.length > 0) {
      setRows(filteredRows);
    } else {
      alert('Không có dữ liệu cho ngày này!');
    }
  };

  const handleReload = () => {
    // Reload lại trang để khôi phục trạng thái ban đầu
    window.location.reload();
  };

  return (
    <div>
      <Header />
      <div style={{ marginTop: 90 }} />
      <h2 className="title">Doanh Thu Theo Ngày</h2>

      {/* Form to enter date for searching */}
      <div className="search-container">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="input-field"
        />
        <button onClick={handleSearch} className="button search-button">
          Tìm kiếm
        </button>
        <button onClick={handleReload} className="button reload-button">
          Reload
        </button>
      </div>

      {/* Table to show revenue data */}
      <table className="data-table">
        <thead>
          <tr>
            <th>Ngày</th>
            <th>Thu Tiền</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{row.date}</td>
              <td>{row.thuTien}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RevenueExcelLikeScreen;
