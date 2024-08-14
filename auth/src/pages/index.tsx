import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const Header = React.lazy(() => import("../components/Heaader"));
const Home = React.lazy(() => import("./Home"));
const Login = React.lazy(() => import("./Login"));
// const Register = React.lazy(() => import("./Register"));
const Register = React.lazy(()=> import ("./NewRegister"));
const OTP = React.lazy(() => import("./OTP"));
const ForgotPassword = React.lazy(() => import("./ForgotPassword"));
const RegisterVerify = React.lazy(() => import("./VerifyEmail"));

const AuthApp: React.FC = () => {
  return (
    <div className="min-h-screen bg-white w-full">
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
          <main className="max-w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              {/* <Route path="/register" element={<Register />} /> */}
              <Route path="/register" element={<Register/>} />
              <Route path="/otp" element={<OTP />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route path="/verifyemail" element={<RegisterVerify/>} />
            </Routes>
          </main>
        </Suspense>
      </div>
    </div>
  );
};

export default AuthApp;