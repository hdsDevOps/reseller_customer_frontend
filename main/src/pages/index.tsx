import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import DomainApp from "domains/DomainApp";
import PaymentApp from "payments/PaymentApp";

import HistoryApp from "billinghistory/HistoryApp";
import SettingsApp from "settings/SettingsApp";
import HdsProfile from "../components/HdsProfile";
import EmailApp from "email/EmailApp";        
import PlanCard from "./PlanCards";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { getProfileDataThunk, removeUserAuthTokenFromLSThunk } from "store/user.thunk";
import Footer from "../components/Footer";
import Dashboard from "./Dashboard";

const routes = [
  { path: "/", element: <Dashboard /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/upgrade-plan/*", element: <PlanCard /> },
  { path: "/profile", element: <HdsProfile /> },
];

const MainApp: React.FC = () => {
  return (
  <div className="main-wrapper">
    <ToastContainer />
    <Header />
    <div className="content-body relative min-h-screen pl-[5.2rem] lg:pl-[17rem] pt-[70px] pr-[0.8rem] pb-4">
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
      <DomainApp />
      <SettingsApp/>
      <PaymentApp />
      <HistoryApp />
      <EmailApp />
      <div className="absolute bottom-0 left-0 right-0 w-full">
        <Footer />
      </div>
    </div>
    <Navbar />
  
  </div>
  )

};

export default MainApp;
