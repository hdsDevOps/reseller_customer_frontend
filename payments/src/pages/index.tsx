import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import PaymentDetails from "./PaymentDetails";
import '../index.css';
const PaymentMethod = React.lazy(() => import("./PaymentMethod"));
const Cart = React.lazy(() => import("../components/Cart"));


const PaymentApp: React.FC = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/payment-method" element={<PaymentMethod />} />
          <Route path="/add-cart" element={<Cart />} />
          <Route path="/payment-subscription" element={<PaymentDetails />} />
        </Routes>
      </Suspense>
      
    </div>
  )
}

export default PaymentApp
