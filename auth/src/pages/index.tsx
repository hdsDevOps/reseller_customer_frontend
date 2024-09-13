import React from "react";
import { Route, Routes } from "react-router-dom";
<<<<<<< HEAD
import { Container } from "react-bootstrap";
const Header = React.lazy(() => import("../components/Header"));
const Footer = React.lazy(() => import("../components/Footer"));
=======

const Header = React.lazy(() => import("../components/Header"));
>>>>>>> 4c81a841910644d93d1783872fd23b88e39b0c46
const Home = React.lazy(() => import("./Home"));
const Login = React.lazy(() => import("./Login"));
const Register = React.lazy(() => import("./Register"));
const OTP = React.lazy(() => import("./OTP"));
const ForgotPassword = React.lazy(() => import("./ForgotPassword"));

const AuthApp: React.FC = () => {
  return (
<<<<<<< HEAD
    <Container fluid>
      <div className="main-wrapper">
        <Header />
        <div className="content-body">
=======
    <div className="min-h-screen bg-white w-full">
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
        <main className="py-10 lg:px-8 flex items-center justify-center max-w-full">
>>>>>>> 4c81a841910644d93d1783872fd23b88e39b0c46
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/otp" element={<OTP />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
          </Routes>
<<<<<<< HEAD
        </div>
        <Footer />
      </div>
    </Container>
=======
        </main>
      </Suspense>
    </div>
>>>>>>> 4c81a841910644d93d1783872fd23b88e39b0c46
  );
};

export default AuthApp;