import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "../components/Footer";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

const Header = React.lazy(() => import("../components/Header"));
const Home = React.lazy(() => import("./Home"));
const Plans = React.lazy(() => import("./Plans"));
const AboutUs = React.lazy(() => import("../components/Landingpage/AboutUs"));
const FrequentlyAskedQuestions = React.lazy(() => import("../components/Landingpage/FrequentlyaskedQuestions"));
const Resources = React.lazy(() => import("../components/Landingpage/Resources/Resources"));
const Login = React.lazy(() => import("./Login"));
// const Register = React.lazy(() => import("./NewRegister"));
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
const Review = React.lazy(() => import("./Review"));
const PaymentGateway = React.lazy(() => import("./PaymentGateway"));
const Receipt = React.lazy(() => import("./Receipt"));
const RegisterText = React.lazy(() => import("./RegisterText"));
const NewRegister = React.lazy(() => import("./NewRegister"));
const AuthApp: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-white relative">
      <ToastContainer />
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
        
        <main className="flex items-center justify-center max-w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/faqs" element={<FrequentlyAskedQuestions />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="/register" element={<Register />} /> */}
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
            <Route path="/DomainDetails" element={<DomainDetails />} />
            <Route path="/Review" element={<Review />} />
            <Route path="/PaymentGateway" element={<PaymentGateway />} />
            <Route path="/Receipt" element={<Receipt />} />
            <Route path="/RegisterText" element={<RegisterText />} />
            <Route path="/register" element={<NewRegister />} />
          </Routes>
        </main>
        <div className="absolute top-100">
          <Footer/>
        </div>
      </Suspense>
    </div>
  );
};

export default AuthApp;