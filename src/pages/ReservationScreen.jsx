import React, { useState } from 'react';
import Header from "../components/Header";

const ReservationScreen = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(1);

  // Thông báo lỗi
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  // Kiểm tra tên khách hàng (chỉ cho phép chữ cái và khoảng trắng)
  const handleNameChange = (e) => {
    const input = e.target.value;
    if (/^[a-zA-ZÀ-ỹ\s]*$/.test(input)) {
      setName(input);
      setNameError('');
    } else {
      setNameError('Tên chỉ chứa chữ cái và khoảng trắng!');
    }
  };

  // Kiểm tra số điện thoại theo định dạng Việt Nam
  const handlePhoneChange = (e) => {
    const input = e.target.value;
    setPhone(input);

    // Số điện thoại Việt Nam hợp lệ
    const phonePattern = /^0[3|5|7|8|9][0-9]{8}$/;
    if (phonePattern.test(input)) {
      setPhoneError('');
    } else {
      setPhoneError('Số điện thoại không hợp lệ! (VD: 0987654321)');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra thông tin nhập đầy đủ
    if (name.trim() === '' || phone.trim() === '' || date.trim() === '' || time.trim() === '' || guests < 1) {
      alert('Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    // Kiểm tra lại số điện thoại khi nhấn "Đặt Bàn"
    const phonePattern = /^0[3|5|7|8|9][0-9]{8}$/;
    if (!phonePattern.test(phone)) {
      alert('Số điện thoại không hợp lệ! (VD: 0987654321)');
      return;
    }

    // Hiển thị thông tin trên console và thông báo đặt bàn thành công
    console.log({
      name,
      phone,
      date,
      time,
      guests,
    });
    alert('Đặt bàn thành công!');
  };

  return (
    <div>
      {/* Thêm Header và khoảng cách trên giống như trong Order */}
      <Header />
      <div style={{ marginTop: 90 }} />

      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Thông Tin Đặt Bàn 📅</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '20px',
          padding: '20px',
        }}
      >
        <div style={{ margin: 10 }}>
          <label>Tên khách hàng:</label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Nhập tên khách hàng"
            style={{ 
              width: '100%', 
              padding: '10px', 
              borderRadius: '5px',
              backgroundColor: '#E0FFFF',
              borderColor: '#1E90FF',
              color: 'black'
            }}
            required
          />
          {nameError && (
            <p style={{ color: 'red', fontSize: '14px' }}>{nameError}</p>
          )}
        </div>
        <div style={{ margin: 10 }}>
          <label>Số điện thoại:</label>
          <input
            type="tel"
            value={phone}
            onChange={handlePhoneChange}
            placeholder="Nhập số điện thoại"
            style={{ 
              width: '100%', 
              padding: '10px', 
              borderRadius: '5px',
              backgroundColor: '#E0FFFF',
              borderColor: '#1E90FF',
              color: 'black'
            }}
            required
          />
          {phoneError && (
            <p style={{ color: 'red', fontSize: '14px' }}>{phoneError}</p>
          )}
        </div>
        <div style={{ margin: 10 }}>
          <label>Ngày đặt:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '10px', 
              borderRadius: '5px', 
              backgroundColor: '#E0FFFF', 
              borderColor: '#1E90FF',
              color: 'black',            
              WebkitTextFillColor: 'black' 
            }}
            required
          />
        </div>
        <div style={{ margin: 10 }}>
          <label>Giờ đặt:</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '10px', 
              borderRadius: '5px', 
              backgroundColor: '#E0FFFF', 
              borderColor: '#1E90FF',
              color: 'black',            
              WebkitTextFillColor: 'black' 
            }}
            required
          />
          {/* Thêm ghi chú: Quá 10 phút sẽ hủy bàn */}
          <p style={{ color: 'red', fontWeight: 'bold', fontSize: '14px' }}>
            Lưu ý:Quá 10 phút sẽ hủy thông tin đặt.
          </p>
        </div>
        <div style={{ margin: 10 }}>
          <label>Số lượng khách:</label>
          <input
            type="number"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            min="1"
            style={{ 
              width: '100%', 
              padding: '10px', 
              borderRadius: '5px',
              backgroundColor: '#E0FFFF',
              borderColor: '#1E90FF',
              color: 'black'
            }}
            required
          />
        </div>
      </div>
      <button
        onClick={handleSubmit}
        style={{
          bottom: 20,
          right: 20,
          position: 'fixed',
          color: 'green',
          backgroundColor: 'white',
          borderColor: 'blue',
          padding: '20px',
          borderRadius: '10px',
          cursor: 'pointer',
        }}
      >
        Đặt Bàn
      </button>
    </div>
  );
};

export default ReservationScreen;
