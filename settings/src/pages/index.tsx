import React from "react";
import { Route, Routes } from "react-router-dom";
import Settings from "./Settings";
import MyStaff from "./MyStaff";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

const DomainApp: React.FC = () => {
  return (
    <div className="mb-5">
      <ToastContainer />
      <Routes>
        <Route path="/settings" element={<Settings />} />
        <Route path="/my-staff" element={<MyStaff />} />

      </Routes>
    </div>
  );
};

export default DomainApp;