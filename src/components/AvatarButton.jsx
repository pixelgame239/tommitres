import ResponsiveScreen from "../styles/responsiveScreen";
import UserProfile from "../backend/userProfile";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import staffAvt from "../assets/staffAvt.png";
import manAvt from "../assets/managerAvt.png";
import chefAvt from "../assets/chefAvt.png";
import "../styles/avatarStyle.css";

const AvatarButton = () =>{
    const navigate = useNavigate();
    const { width } = ResponsiveScreen();
    const { userType } = UserProfile();
    const isMobile = width <= 768;
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(prevState => !prevState);
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/tommitres');
        window.location.reload(); 
    };

    const handleRequest = () => {
        // Implement your settings logic here
        console.log("Go to settings");
    };
    if(userType===null||userType===undefined){
        return  <Button variant="primary" style = {{fontSize: isMobile ? '12px' : '18px'}} onClick={()=>navigate('/tommitres/Login')}>
        Đăng nhập
      </Button>
    }
    else if(userType.startsWith("ST")||userType.startsWith('C')){
        return <div className="user-avatar-container" onClick={toggleDropdown} ><img className="user-avatar" src= {userType.startsWith("ST")?staffAvt:chefAvt}></img>
        {isDropdownOpen?<div className="dropdown-menu">
            <button className="dropdown-item" onClick={handleRequest}>
                Yêu cầu đổi mật khẩu
            </button>
            <button className="dropdown-item" onClick={handleLogout}>
                Đăng xuất
            </button>
        </div>
        :null}
        </div>
    }
    else{
        return <div  className="user-avatar-container" onClick={toggleDropdown}><img src={manAvt} className="user-avatar"></img>
        {isDropdownOpen?<div className="dropdown-menu">
            <button className="dropdown-item">
                Xem tài khoản
            </button>
            <button className="dropdown-item" onClick={handleRequest}>
                Đổi mật khẩu
            </button>
            <button className="dropdown-item" onClick={handleLogout}>
                Đăng xuất
            </button>
        </div>
        :null}
        </div>
    }
}
export default AvatarButton;