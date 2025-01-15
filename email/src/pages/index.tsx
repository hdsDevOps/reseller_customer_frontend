import React from "react";
import { Route, Routes } from "react-router-dom";
import EmailList from "./EmailList";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

const EmailApp: React.FC = () => {
  return (
    <div className="mb-5">
      <ToastContainer />
      <Routes>
        <Route path="/email" element={<EmailList />} />
      </Routes>
    </div>
  );
};

export default EmailApp;
