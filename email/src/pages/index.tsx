import React from "react";
import { Route, Routes } from "react-router-dom";
const EmailList = React.lazy(() => import("./EmailList"));
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

const EmailApp: React.FC = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/email" element={<EmailList />} />
      </Routes>
    </div>
  );
};

export default EmailApp;
