import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const Header = React.lazy(() => import("../components/Header"));
const Home = React.lazy(() => import("./Home"));
const Plans = React.lazy(() => import("./Plans"));
const Login = React.lazy(() => import("./Login"));
const Register = React.lazy(() => import("./NewRegister"));
const OTP = React.lazy(() => import("./OTP"));
const ForgotPassword = React.lazy(() => import("./ForgotPassword"));
const RegisterVerify = React.lazy(() => import("./VerifyEmail"));
const ResetPassword = React.lazy(() => import("./ResetPassword"));
const SuccessPassword = React.lazy(() => import("./SuccessPassword"));
const Subscribe = React.lazy(() => import("./Subscribe"));
const SubscribeOTP = React.lazy(() => import("./SubscribeOTP"));
const BusinessInfo = React.lazy(() => import("./BusinessInfo"));
const DomainDetails = React.lazy(() => import("./DomainDetails"));
const DomainList = React.lazy(() => import("./DomainList"));
const SelectedDomain = React.lazy(() => import("./SelectedDomain"));
const SignToDomain = React.lazy(() => import("./SignToDomain"));
const FreeTrial = React.lazy(() => import("./FreeTrial"));
const Gemini = React.lazy(() => import("./Gemini"));
const Summary = React.lazy(() => import("./Summary"));

const AuthApp: React.FC = () => {
  return (
    <div className="min-h-screen bg-white w-full">
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
        <main className="py-10 lg:px-8 flex items-center justify-center max-w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/otp" element={<OTP />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/verifyemail" element={<RegisterVerify />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/successpassword" element={<SuccessPassword />} />
            <Route path="/subscribe" element={<Subscribe />} />
            <Route path="/subscribeotp" element={<SubscribeOTP />} />
            <Route path="/businessinfo" element={<BusinessInfo />} />
            <Route path="/adddomain" element={<DomainDetails />} />
            <Route path="/domainlist" element={<DomainList />} />
            <Route path="/selected-domain" element={<SelectedDomain />} />
            <Route path="/signin-domain" element={<SignToDomain />} />
            <Route path="/free-trial" element={<FreeTrial />} />
            <Route path="/gemini-add" element={<Gemini />} />
            <Route path="/summary" element={<Summary />} />
          </Routes>
        </main>
      </Suspense>
    </div>
  );
};

export default AuthApp;