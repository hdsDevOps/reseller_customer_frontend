import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import BillingHistory from "./BillingHistory";
import Voucher from "./Voucher";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";


const HistoryApp: React.FC = () => {
  return (
    <div className="mb-5">
      <ToastContainer />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/billing-history" element={<BillingHistory />} />
          <Route path="/voucher" element={<Voucher />} />
        </Routes>
      </Suspense>
      
    </div>
  )
}

export default HistoryApp
