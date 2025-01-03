import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import PaymentDetails from "./PaymentDetails";
import '../index.css';
const PaymentMethod = React.lazy(() => import("./PaymentMethod"));
const Cart = React.lazy(() => import("../components/Cart"));
const Review = React.lazy(() => import("./Review"));
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import ViewPaymentDetails from "./ViewPaymentDetails";


const PaymentApp: React.FC = () => {
  return (
    <div>
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
