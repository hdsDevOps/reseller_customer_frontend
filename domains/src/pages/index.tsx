import React from "react";
import { Route, Routes } from "react-router-dom";
import EmailList from "./EmailList";
const AddDomain = React.lazy(() => import("./AddDomain"));
const DomainList = React.lazy(() => import("./DomainList"));
const DomainDetail = React.lazy(() => import("./DomainDetail"));
const BuyDomain = React.lazy(() => import("./BuyDomain"));
const ChooseDomain = React.lazy(() => import("./ChooseDomain"));
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

const DomainApp: React.FC = () => {
  return (
    <div className="mb-5">
      <ToastContainer />
      <Routes>
        <Route path="/domain" element={<DomainList />} />
        <Route path="/add-domain" element={<AddDomain />} />
        <Route path="/domain-details" element={<DomainDetail/>} />
        <Route path="/buy-domain" element={<BuyDomain />} />
        <Route path="/choose-domain" element={<ChooseDomain />} />
        {/* <Route path="/email" element={<EmailList />} /> */}
      </Routes>
    </div>
  );
};

export default DomainApp;
