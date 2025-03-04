import React, { useState } from 'react';
import Header from "../components/Header";

const ReservationScreen = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(1);

  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  // Kiểm tra tên khách hàng (chữ cái và khoảng trắng)
  const handleNameChange = (e) => {
    const input = e.target.value;
    if (/^[a-zA-ZÀ-ỹ\s]*$/.test(input)) {
      setName(input);
      setNameError('');
    } else {
      setNameError('Tên chỉ chứa chữ cái và khoảng trắng!');
    }
  };

  // Kiểm tra số điện thoại Việt Nam
  const handlePhoneChange = (e) => {
    const input = e.target.value;
    setPhone(input);

    const phonePattern = /^0[3|5|7|8|9][0-9]{8}$/;
    if (phonePattern.test(input)) {
      setPhoneError('');
    } else {
      setPhoneError('Số điện thoại không hợp lệ! (VD: 0987654321)');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === '' || phone.trim() === '' || date.trim() === '' || time.trim() === '' || guests < 1) {
      alert('Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    const phonePattern = /^0[3|5|7|8|9][0-9]{8}$/;
    if (!phonePattern.test(phone)) {
      alert('Số điện thoại không hợp lệ! (VD: 0987654321)');
      return;
    }

    console.log({ name, phone, date, time, guests });
    alert('Đặt bàn thành công!');
  };

  return (
    <div className="reservation-container">
      <Header />
      <div style={{ marginTop: 130 }} />

      <h2 className="title">Thông Tin Đặt Bàn 📅</h2>
      <div className="reservation-form">
        <div className="input-group">
          <label>Tên khách hàng:</label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Nhập tên khách hàng"
            required
          />
          {nameError && (
            <p className="error-text">{nameError}</p>
          )}
        </div>
        <div className="input-group">
          <label>Số điện thoại:</label>
          <input
            type="tel"
            value={phone}
            onChange={handlePhoneChange}
            placeholder="Nhập số điện thoại"
            required
          />
          {phoneError && (
            <p className="error-text">{phoneError}</p>
          )}
        </div>
        <div className="input-group">
          <label>Ngày đặt:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div className="input-group">
          <label>Giờ đặt:</label>
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
          <p className="note">Lưu ý: Quá 10 phút sẽ hủy thông tin đặt.</p>
        </div>
        <div className="input-group">
          <label>Số lượng khách:</label>
          <input
            type="number"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            min="1"
            required
          />
        </div>
      </div>
      <button className="submit-button" onClick={handleSubmit}>
        Đặt Bàn
      </button>

      <style jsx>{`
        .reservation-container {
          max-width: 100vw;
          overflow-x: hidden;
          padding: 10px;
        }

        .title {
          text-align: center;
          color: #2c3e50;
          margin-bottom: 15px;
          font-size: 24px;
        }

        .reservation-form {
          display: grid;
          grid-template-columns: 1fr;
          gap: 15px;
          padding: 20px;
          background-color: #f8f9fa;
          border-radius: 15px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          max-width: 400px;
          margin: 0 auto;
        }

        .input-group {
          margin-bottom: 10px;
        }

        input {
          width: 100%;
          padding: 12px;
          border-radius: 8px;
          border: 1px solid #d1d8e0;
          background-color: #ffffff;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
          transition: border 0.3s;
          color: #000;
        }

        input[type="date"],
        input[type="time"] {
          color: #000;
        }

        input:focus {
          outline: none;
          border: 1px solid #1e90ff;
        }

        .note {
          color: #e74c3c;
          font-weight: bold;
          font-size: 13px;
        }

        .error-text {
          color: #e74c3c;
          font-size: 13px;
        }

        .submit-button {
          width: 90%;
          padding: 15px;
          border-radius: 25px;
          background-color: #1e90ff;
          color: white;
          border: none;
          cursor: pointer;
          margin: 20px auto;
          display: block;
          text-align: center;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .submit-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
        }

        @media (max-width: 480px) {
          .reservation-form {
            padding: 15px;
          }

          input {
            padding: 10px;
          }

          .submit-button {
            width: 100%;
            padding: 12px;
          }
        }
      `}</style>
    </div>
  );
};

export default ReservationScreen;
