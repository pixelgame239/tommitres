import React, { useState } from "react";

const Invoice = () => {
  const [table, setTable] = useState("MVT - MANG VĂN");

  const invoiceData = {
    invoiceNumber: "080215",
    orderCode: "#5RU20",
    date: "08/03/2025",
    timeIn: "15:02",
    timeOut: "15:02",
    cashier: "Thu Ngân",
    items: [{ name: "Trà sữa ô long", quantity: 1, price: 20000 }],
    total: 20000,
    restaurant: "Quán Tòm & Mít",
    address: "Trục hồ Văn Khê Nguyễn Du, Thường Tín, HN",
  };

  return (
    <div className="p-5 border w-96 mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-center font-bold text-lg">HÓA ĐƠN THANH TOÁN</h2>
      <p className="text-center">Số HD: {invoiceData.invoiceNumber}</p>
      <hr className="my-2" />

      <div className="grid grid-cols-2 gap-2 text-left">
        <p className="col-span-2 flex justify-between font-semibold">
          <span>Mã HD: {invoiceData.orderCode}</span> 
          <span className="text-right">TN: {invoiceData.cashier}</span>
        </p>
        <p className="col-span-2 flex justify-between items-center">
          <span className="flex items-center gap-2">
            Bàn: 
            <input
              type="text"
              value={table}
              onChange={(e) => setTable(e.target.value)}
              className="border border-gray-300 px-2 py-1 rounded-md text-black bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all w-32"
              placeholder="Nhập bàn"
            />
          </span>
          <span className="text-right">Ngày: {invoiceData.date}</span>
        </p>
        <p className="col-span-2 flex justify-between">
          <span>Giờ vào: {invoiceData.timeIn}</span> 
          <span className="text-right">Giờ ra: {invoiceData.timeOut}</span>
        </p>
      </div>

      <hr className="my-2" />
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-5 py-1">STT</th>
            <th className="border px-5 py-1">Tên món</th>
            <th className="border px-5 py-1">SL</th>
            <th className="border px-5 py-1 text-right">Đơn giá</th>
            <th className="border px-5 py-1 text-right">Thành tiền</th>
          </tr>
        </thead>
        <tbody>
          {invoiceData.items.map((item, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border px-3 py-1 text-center">{index + 1}</td>
              <td className="border px-3 py-1">{item.name}</td>
              <td className="border px-3 py-1 text-center">{item.quantity}</td>
              <td className="border px-3 py-1 text-right">{item.price.toLocaleString()}đ</td>
              <td className="border px-3 py-1 text-right">{(item.quantity * item.price).toLocaleString()}đ</td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr className="my-2" />
      <div className="flex justify-between font-bold text-lg">
        <span className="text-left">Thành tiền: </span>
        <span className="w-full text-right">{invoiceData.total.toLocaleString()}đ</span>
      </div>
      <div className="flex justify-between mt-2">
        <span className="text-left">Tổng tiền: </span>
        <span className="w-full text-right font-bold">{invoiceData.total.toLocaleString()}đ</span>
      </div>
      <div className="flex justify-between mt-2">
        <span className="text-left">+ Thanh toán tiền mặt:</span>
        <span className="w-full text-right font-bold">{invoiceData.total.toLocaleString()}đ</span>
      </div>

      <p className="font-bold text-center mt-2">{invoiceData.restaurant}</p>
      <p className="text-center text-sm">{invoiceData.address}</p>
      <p className="text-center text-sm">Powered by iPOS.vn</p>
    </div>
  );
};

export default Invoice;