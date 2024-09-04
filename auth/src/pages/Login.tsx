import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "store/hooks";
<<<<<<< HEAD
// import { makeUserLoginThunk } from "store/user.thunk";
import { setTokenDetails } from "store/authSlice"; 
import { Row, Col, Button, Form, Modal } from "react-bootstrap";
=======
import { HiOutlineEye } from "react-icons/hi";
import { RiEyeCloseLine } from "react-icons/ri";
import { makeUserLoginThunk } from "store/user.thunk";
>>>>>>> main

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("biswajit@yopmail.com");
  const [password, setPassword] = useState("Admin@1234");
  const [show, setShow] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
<<<<<<< HEAD
    dispatch(setTokenDetails("usy6767jshs688ytmbqa88654sgsgs5sgs6sgs6q"));
    navigate("/dashboard");
    // try {
    //   const result = await dispatch(
    //     makeUserLoginThunk({
    //       email: email,
    //       password: password,
    //       login_user_type: 0,
    //     })
    //   ).unwrap();
    //   console.log("result....", result);
    //   navigate("/dashboard");
    // } catch (error) {
    //   console.error("Login error:", error);
    // }
=======
    navigate("/otp?mode=signin");

    try {
      const result = await dispatch(
        makeUserLoginThunk({
          email: email,
          password: password,
          login_user_type: 0,
        })
      ).unwrap();
      console.log("result....", result);
      navigate("/otp?mode=signin");
    } catch (error) {
      console.error("Login error:", error);
    }
>>>>>>> main
  };
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleOpen = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

<<<<<<< HEAD
  return (
    <Row className="full-height justify-content-center align-items-center px-5">
      <Col sm={3}></Col>
      <Col sm={6}>
        <div className="auth-section secondary-background">
          <div className="sign-in">
            <div className="auth-header">
              {/* <Image
          src={imageAssets.logo_small} // Replace with your image path
          alt="hordanso"
          className="auth-logo"
        /> */}
              <h3>Sign in your account</h3>
              <p className="text-center">
                New to Hordanso? <Link to="/register">Register Now</Link>
              </p>
            </div>
            <div className="auth-container">
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail" className="mb-4">
                  <Form.Label className="auth-form-label mb-1">
                    Email
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control auth-form-control"
                    data-testid="email"
                  />
                </Form.Group>
=======
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
>>>>>>> main

  return (
    <div className="w-full flex flex-col justify-center items-center h-screen xsm-max:px-1">
      <div className="w-full max-w-[32rem] bg-gray-50 p-12 rounded-3xl xsm-max:px-4">
        <div className="w-full">
          <div className="text-center">
          <div className="flex items-center justify-center">
          <img src="/src/assets/images/logo.jpeg" alt="logo" />
        </div>
            <h3 className="text-2xl font-semibold text-[#0D121F] pt-4">Sign in your account</h3>
            <p className="mt-2">
              New to Hordanso?{" "}
              <Link to="/register" className="text-green-600">
                Register Now
              </Link>
            </p>
          </div>
          <div className="mt-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-900 text-base font-bold mb-1" htmlFor="formBasicEmail">
                  Email
                </label>
                <input
                  type="text"
                  id="formBasicEmail"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="custom-input"
                  data-testid="email"
                />
              </div>
              <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  className="custom-input"
                  minLength={8}
                  placeholder=".........."
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                >
                  {showPassword ? (
                    <HiOutlineEye className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <RiEyeCloseLine className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>
              <div className="mt-4">
                <button
                  type="submit"
                  data-testid="log-in"
                  className="btn-green"
                >
                  Submit
                </button>
              </div>
              <div className="text-right mt-2">
                <Link
                  to="/forgotpassword"
                  className="text-sm font-normal text-red-600"
                  data-testid="forgot-password"
                >
                  Forgot Password
                </Link>
              </div>
              <div className="text-center mt-4">
                <p className="text-sm font-medium text-gray-900">
                  By signing in, you agree to our{" "}
                  <button
                    type="button"
                    onClick={handleOpen}
                    className="text-green-600"
                    data-testid="terms-conditions"
                  >
                    Terms and conditions
                  </button>
                </p>
              </div>
            </form>
          </div>
          {show && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
              <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <div className="flex justify-between items-center pb-3">
                  <p className="text-lg font-bold">Terms of Services</p>
                  <button onClick={handleClose} className="text-black">
                    &times;
                  </button>
                </div>
                <p>Woohoo, you are reading this text in a modal!</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 mb-10 text-center">
        <p className="mb-3">Or</p>
          <button
            type="button"
            className="flex items-center justify-center w-full px-4 py-[.7rem] border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google logo" className="h-5 w-5 mr-2" />
            <span className="text-gray-900 text-sm">Sign in with Google</span>
          </button>
        </div>
    </div>
  );
};

export default Login;
