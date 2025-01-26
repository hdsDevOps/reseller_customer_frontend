import React from "react";
import { Route, Routes } from "react-router-dom";
import EmailList from "./EmailList";
import AddDomain from "./AddDomain";
import DomainList from "./DomainList";
import DomainDetail from "./DomainDetail";
import BuyDomain from "./BuyDomain";
import ChooseDomain from "./ChooseDomain";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

const DomainApp: React.FC = () => {
  return (
    <div className="mb-5">
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
