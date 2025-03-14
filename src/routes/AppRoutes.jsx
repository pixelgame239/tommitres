/* eslint-disable no-unused-vars */
// import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";
import CarouselSlider from "../components/MainCarousel";
import ActionButtons from "../components/ActionButtons";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Order from "../pages/Order";
import OrderScreen from "../pages/OrderScreen";
import ReservationScreen from "../pages/ReservationScreen";
import OrderStatusScreen from "../pages/OrderStatusScreen";
import ChefOrderScreen from "../pages/ChefOrderScreen";
import YourOrder from "../pages/YourOrder"; // Import file mới
import AccountScreen from "../pages/manageAccount";
import RevenueExcelLikeScreen from "../pages/DetailedRevenueScreen";
import InvoiceForm from "../pages/InvoiceForm";
import ThankYouScreen from "../pages/ThankYouScreen";
import { UnreadProvider } from "../backend/notificationOrder";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UnreadProvider><Home /></UnreadProvider>} />
      <Route path="/tommitres/Login" element={<Login />} />
      <Route path="/tommitres/Reservation" element={<ReservationScreen />} />
      <Route path="/tommitres/Order" element={<Order />} />
      <Route path="/tommitres/Order/Takeaway" element={<OrderScreen />} />
      <Route
        path="/tommitres/DetailedRevenue"
        element={<RevenueExcelLikeScreen />}
      />

      <Route path="/tommitres/manageOrder" element={<UnreadProvider><OrderStatusScreen /></UnreadProvider>} />

      <Route path="/tommitres/manageAccount" element={<AccountScreen />} />

      <Route path="/tommitres/Invoice" element={<InvoiceForm />} />

      <Route path="/tommitres/ThankYou" element={<ThankYouScreen />} />

      <Route
        path="/tommitres/Order/Table1"
        element={<OrderScreen tableID={1}></OrderScreen>}
      ></Route>
      <Route
        path="/tommitres/Order/Table2"
        element={<OrderScreen tableID={2}></OrderScreen>}
      ></Route>
      <Route
        path="/tommitres/Order/Table3"
        element={<OrderScreen tableID={3}></OrderScreen>}
      ></Route>
      <Route
        path="/tommitres/Order/Table4"
        element={<OrderScreen tableID={4}></OrderScreen>}
      ></Route>
      <Route
        path="/tommitres/Order/Table5"
        element={<OrderScreen tableID={5}></OrderScreen>}
      ></Route>
      <Route
        path="/tommitres/Order/Table6"
        element={<OrderScreen tableID={6}></OrderScreen>}
      ></Route>
      <Route
        path="/tommitres/Order/Table7"
        element={<OrderScreen tableID={7}></OrderScreen>}
      ></Route>
      <Route
        path="/tommitres/Order/Table8"
        element={<OrderScreen tableID={8}></OrderScreen>}
      ></Route>
      <Route
        path="/tommitres/Order/Table9"
        element={<OrderScreen tableID={9}></OrderScreen>}
      ></Route>
      <Route
        path="/tommitres/Order/Table10"
        element={<OrderScreen tableID={10}></OrderScreen>}
      ></Route>
      <Route path="/tommitres/yourorder" element={<YourOrder />} />
    </Routes>
  );
};

export default AppRoutes;
