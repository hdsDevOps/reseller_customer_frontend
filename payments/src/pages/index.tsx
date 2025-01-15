import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import PaymentDetails from "./PaymentDetails";
import '../index.css';
import PaymentMethod from "./PaymentMethod";
import Cart from "../components/Cart";
import Review from "./Review";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import ViewPaymentDetails from "./ViewPaymentDetails";


const PaymentApp: React.FC = () => {
  return (
    <div className="mb-5">
      <ToastContainer />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/payment-method" element={<PaymentMethod />} />
          <Route path="/add-cart" element={<Cart />} />
          <Route path="/payment-subscription" element={<PaymentDetails />} />
          <Route path="/view-payment-details" element={<ViewPaymentDetails />} />
          <Route path="/review-and-check-out" element={<Review />} />
        </Routes>
      </Suspense>
      
    </div>
  )
}

export default PaymentApp
