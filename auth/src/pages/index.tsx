import React from "react";
import { Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
const Heaader = React.lazy(() => import("../components/Heaader"));
const Home = React.lazy(() => import("./Home"));
const Login = React.lazy(() => import("./Login"));
const Register = React.lazy(() => import("./Register"));
const OTP = React.lazy(() => import("./OTP"));
const ForgotPassword = React.lazy(() => import("./ForgotPassword"));

const AuthApp: React.FC = () => {
  return (
    <Container fluid>
      <div className="main-wrapper">
        <Heaader />
        <div className="content-body">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/otp" element={<OTP />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
          </Routes>
        </div>
      </div>
    </Container>
  );
};

export default AuthApp;
