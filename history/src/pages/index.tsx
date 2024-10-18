import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "../index.css"
const BillHistory = React.lazy(() => import("./BillHistory"));


const HistoryApp: React.FC = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/payment-method" element={<BillHistory />} />
          
        </Routes>
      </Suspense>
      
    </div>
  )
}

export default HistoryApp
