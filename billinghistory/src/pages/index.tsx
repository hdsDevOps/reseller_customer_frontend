import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
const BillingHistory = React.lazy(() => import("./BillingHistory"));


const HistoryApp: React.FC = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/billing-history" element={<BillingHistory />} />
        </Routes>
      </Suspense>
      
    </div>
  )
}

export default HistoryApp
