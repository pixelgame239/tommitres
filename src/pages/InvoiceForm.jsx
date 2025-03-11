import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../backend/firebase";

const Invoice = () => {
  const [table, setTable] = useState();
  const location = useLocation();
  const { billData } = location.state || {};
  const navigate = useNavigate();
  
  console.log(billData.buyDate);
  
  const dateStamp = billData.buyDate;
  const buyDate = new Date(dateStamp.seconds * 1000);
  const currentBuyDate = buyDate.toLocaleDateString("vi-VN");

  const handlePrint = () => {
    window.print();
  };

  const handleBack = () => {
    navigate("/tommitres/manageOrder"); // Chuyển hướng về OrderStatusScreen
  };

  return (
    <div className="container w-75 mx-auto p-4">
      {/* Invoice Container */}
      <div className="border bg-white shadow rounded p-4">
        <h2 className="text-center fw-bold fs-4">HÓA ĐƠN THANH TOÁN</h2>
        <hr className="my-2" />
        
        <div className="row text-start">
          <p className="col-12 d-flex justify-content-between fw-semibold">
            <span className="text-end">NV: {billData.userName}</span>
          </p>
          <p className="col-12 d-flex justify-content-between align-items-center">
            <span className="d-flex align-items-center gap-2">
              {billData.tableNumber}
            </span>
            <span className="text-end">Ngày: {currentBuyDate}</span>
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
            {billData.products.map((product, index) => (
              <tr key={index}>
                <td className="text-center">{index + 1}</td>
                <td className="text-center">{product.productName}</td>
                <td className="text-center">{product.orderQuantity}</td>
                <td className="text-center">{product.unitPrice.toLocaleString()}đ</td>
                <td className="text-center">
                  {(product.singleProductPrice).toLocaleString()}đ
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
              {billData.totalPrice.toLocaleString()}đ
            </span>
          </div>
          <div className="d-flex justify-content-between fw-bold">
            <span className="text-start">Tổng tiền:</span>
            <span className="text-end">
              {billData.totalPrice.toLocaleString()}đ
            </span>
          </div>
          <div className="d-flex justify-content-between fw-bold">
            <span className="text-start">+ {billData.paymentMethod}</span>
            <span className="text-end">
              {billData.totalPrice.toLocaleString()}đ
            </span>
          </div>
          <p className="fw-bold text-center mt-2">Quán Tôm & Mít</p>
          <p className="text-center text-muted">Địa chỉ: Trục hồ Văn Khê, Nguyễn Du, Thường Tín, HN</p>
        </div>
      </div>
      
      {/* Buttons Container */}
      <div className="text-center mt-3">
        <button
          onClick={handleBack}
          className="btn btn-secondary me-2"
        >
          Quay lại
        </button>
        <button
          onClick={handlePrint}
          className="btn btn-primary"
        >
          In hóa đơn
        </button>
      </div>
    </div>
  );
};

export default Invoice;
