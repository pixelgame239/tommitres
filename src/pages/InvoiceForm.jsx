import React, { useState } from "react";

const Invoice = () => {
  const [table, setTable] = useState("MVT - MANG Về");

  const invoiceData = {
    invoiceNumber: "080215",
    orderCode: "#5RU20",
    date: "08/03/2025",
    timeIn: "15:02",
    timeOut: "15:02",
    cashier: "Thu Ngân",
    items: [{ name: "Trà sữa ô long", quantity: 1, price: 20000 }],
    total: 20000,
    restaurant: "Quán Tôm & Mít",
    address: "Trục hồ Văn Khê Nguyễn Du, Thường Tín, HN",
  };

  return (
    <div className="container w-75 mx-auto p-4 border bg-white shadow rounded">
      <h2 className="text-center fw-bold fs-4">HÓA ĐƠN THANH TOÁN</h2>
      <hr className="my-2" />

      <div className="row text-start">
        <p className="col-12 d-flex justify-content-between fw-semibold">
          <span>Mã HD: {invoiceData.orderCode}</span>
          <span className="text-end">TN: {invoiceData.cashier}</span>
        </p>
        <p className="col-12 d-flex justify-content-between align-items-center">
          <span className="d-flex align-items-center gap-2">
            Bàn:
            <input
              type="text"
              value={table}
              onChange={(e) => setTable(e.target.value)}
              className="form-control form-control-sm w-25"
              placeholder="Nhập bàn"
              readOnly
            />
          </span>
          <span className="text-end">Ngày: {invoiceData.date}</span>
        </p>
        <p className="col-12 d-flex justify-content-between">
          <span>Giờ vào: {invoiceData.timeIn}</span>
          <span className="text-end">Giờ ra: {invoiceData.timeOut}</span>
        </p>
      </div>

      <hr className="my-2" />
      <table className="table-bordered text-start w-100">
        <thead className="table-light">
          <tr>
            <th className="text-center">STT</th>
            <th className="text-center">Tên món</th>
            <th className="text-center">SL</th>
            <th className="text-center">Đơn giá</th>
            <th className="text-center">Thành tiền</th>
          </tr>
        </thead>
        <tbody>
          {invoiceData.items.map((item, index) => (
            <tr key={index}>
              <td className="text-center">{index + 1}</td>
              <td className="text-center">{item.name}</td>
              <td className="text-center">{item.quantity}</td>
              <td className="text-center">{item.price.toLocaleString()}đ</td>
              <td className="text-center">
                {(item.quantity * item.price).toLocaleString()}đ
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr className="my-2" />
      <div className="mt-2">
        <div className="d-flex justify-content-between fw-bold">
          <span className="text-start">Thành tiền:</span>
          <span className="text-end">
            {invoiceData.total.toLocaleString()}đ
          </span>
        </div>
        <div className="d-flex justify-content-between fw-bold">
          <span className="text-start">Tổng tiền:</span>
          <span className="text-end">
            {invoiceData.total.toLocaleString()}đ
          </span>
        </div>
        <div className="d-flex justify-content-between fw-bold">
          <span className="text-start">+ Thanh toán tiền mặt:</span>
          <span className="text-end">
            {invoiceData.total.toLocaleString()}đ
          </span>
        </div>
      </div>

      <p className="fw-bold text-center mt-2">{invoiceData.restaurant}</p>
      <p className="text-center text-muted">{invoiceData.address}</p>
    </div>
  );
};

export default Invoice;
