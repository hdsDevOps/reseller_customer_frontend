import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
const BillingHistory = React.lazy(() => import("./BillingHistory"));
const Voucher = React.lazy(() => import("./Voucher"));


const HistoryApp: React.FC = () => {
  return (
    <div>
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
