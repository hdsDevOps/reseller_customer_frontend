import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const Header = React.lazy(() => import("../components/Heaader"));
const Home = React.lazy(() => import("./Home"));
const Login = React.lazy(() => import("./Login"));
const Register = React.lazy(() => import("./Register"));
const OTP = React.lazy(() => import("./OTP"));
const ForgotPassword = React.lazy(() => import("./ForgotPassword"));
const ResetPassword = React.lazy(() => import("./ResetPassword"));
const SuccessPassword = React.lazy(() => import("./SuccessPassword"));

const AuthApp: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-full mx-auto ">
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
          <main className="py-10 lg:px-8 px-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/otp" element={<OTP />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route path="/resetpassword" element={<ResetPassword />} />
              <Route path="/successpassword" element={<SuccessPassword />} />
            </Routes>
          </main>
        </Suspense>
      </div>
    </div>
  );
};

export default AuthApp;