import React, { useState } from "react";
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

const Dashboard = React.lazy(() => import("./Dashboard"));
const routes = [
  { path: "/", element: <Dashboard /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/upgrade-plan/*", element: <PlanCard /> },
];

const MainApp: React.FC = () => {
  const [showProfile,setShowProfile] = useState<boolean>(false)
  return (
  <div className="main-wrapper">
    <Header onSetShowProfile={setShowProfile} />
    <div className="content-body relative min-h-screen pl-[5.2rem] lg:pl-[17rem] pt-[6rem] pr-[0.8rem] pb-4">
    {
        showProfile && <HdsProfile setShowProfile={setShowProfile}/>
      }
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
      <DomainApp />
      <SettingsApp/>
      <PaymentApp />
      <HistoryApp />
    </div>
    <Navbar />
  
  </div>
  )

};

export default MainApp;
