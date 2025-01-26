import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "../components/Footer";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import Header from "../components/Header";
import Home from "./Home";
import Plans from "./Plans";
import AboutUs from "../components/Landingpage/AboutUs";
import FrequentlyAskedQuestions from "../components/Landingpage/FrequentlyaskedQuestions";
import Resources from "../components/Landingpage/Resources/Resources";
import Login from "./Login";
import OTP from "./OTP";
import ForgotPassword from "./ForgotPassword";
import RegisterVerify from "./VerifyEmail";
import ResetPassword from "./ResetPassword";
import SuccessPassword from "./SuccessPassword";
import Subscribe from "./Subscribe";
import SubscribeOTP from "./SubscribeOTP";
import BusinessInfo from "./BusinessInfo";
import DomainDetails from "./DomainDetails";
import DomainList from "./DomainList";
import SelectedDomain from "./SelectedDomain";
import SignToDomain from "./SignToDomain";
import FreeTrial from "./FreeTrial";
import Gemini from "./Gemini";
import Summary from "./Summary";
import Review from "./Review";
import PaymentGateway from "./PaymentGateway";
import Receipt from "./Receipt";
import RegisterText from "./RegisterText";
import NewRegister from "./NewRegister";
import DownloadInvoice from "./DownloadInvoice";
import AI from "./AI";

// const Register = React.lazy(() => import("./NewRegister"));

const AuthApp: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-white relative">
      <Suspense fallback={<div>Loading...</div>}>
        <div className="fixed top-0 left-0 right-0 w-full z-40 bg-white">
          <Header />
        </div>
        
        <main className="flex items-center justify-center max-w-full lg:mt-[80px] mt-[60px]">
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/faqs" element={<FrequentlyAskedQuestions />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/login" element={<Login />} />
            <Route path="/ai" element={<AI />} />
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
            <Route path="/download-invoice" element={<DownloadInvoice />} />
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