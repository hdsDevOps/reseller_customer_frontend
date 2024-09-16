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
>>>>>>> 4c81a841910644d93d1783872fd23b88e39b0c46

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("test@yopmail.com");
  const [password, setPassword] = useState("Test@1234");
  const [show, setShow] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
<<<<<<< HEAD
    dispatch(setTokenDetails("usy6767jshs688ytmbqa88654sgsgs5sgs6sgs6q"));
    navigate("/dashboard");
=======
    navigate("/otp?mode=signin");

>>>>>>> 4c81a841910644d93d1783872fd23b88e39b0c46
    // try {
    //   const result = await dispatch(
    //     makeUserLoginThunk({
    //       email: email,
    //       password: password,
    //       login_user_type: 0,
    //     })
    //   ).unwrap();
    //   console.log("result....", result);
    //   navigate("/otp?mode=signin");
    // } catch (error) {
    //   console.error("Login error:", error);
    // }
<<<<<<< HEAD
=======
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
>>>>>>> 4c81a841910644d93d1783872fd23b88e39b0c46
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

                <Form.Group controlId="formBasicPassword" className="mb-3">
                  <Form.Label className="auth-form-label mb-1">
                    Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control auth-form-control"
                    data-testid="password"
                  />
                </Form.Group>
                <div className="auth-btn-container">
                  <Button
                    type="submit"
                    data-testid="log-in"
                    className="primary-btn"
=======
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center h-screen xsm-max:px-1">
      <div className="w-full max-w-[32rem] bg-gray-50 p-12 rounded-3xl xsm-max:px-4">
        <div className="w-full">
          <div className="text-center">
            <div className="flex items-center justify-center">
              <img
                src={process.env.BASE_URL + "/images/logo.jpeg"}
                alt="logo"
              />
            </div>
            <h3 className="text-2xl font-semibold text-[#0D121F] pt-4">
              Sign in your account
            </h3>
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
                <label
                  className="block text-gray-900 text-base font-bold mb-1"
                  htmlFor="formBasicEmail"
                >
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
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
>>>>>>> 4c81a841910644d93d1783872fd23b88e39b0c46
                  >
                    Log in
                  </Button>
                </div>
                <div className="text-right">
                  <Link
                    to="/forgotpassword"
                    className="forgot-pws-link primary-text"
                    data-testid="forgot-password"
                  >
                    Forgot Password
                  </Link>
                </div>
                <div className="text-center auth-footer">
                  <p>
                    By signing in, you agree to our{" "}
                    <Link
                      to="#"
                      onClick={handleOpen}
                      className="terms-conditions-text primary-text"
                      data-testid="terms-conditions"
                    >
                      Terms and conditions
                    </Link>
                  </p>
                </div>
              </Form>
            </div>
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
            >
              <Modal.Header closeButton>
                <Modal.Title>Terms of Services</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Woohoo, you are reading this text in a modal!
              </Modal.Body>
            </Modal>
          </div>
        </div>
<<<<<<< HEAD
      </Col>
      <Col sm={3}></Col>
    </Row>
=======
      </div>

      <div className="mt-6 mb-10 text-center">
        <p className="mb-3">Or</p>
        <button
          type="button"
          className="flex items-center justify-center w-full px-4 py-[.7rem] border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="Google logo"
            className="h-5 w-5 mr-2"
          />
          <span className="text-gray-900 text-sm">Sign in with Google</span>
        </button>
      </div>
    </div>
>>>>>>> 4c81a841910644d93d1783872fd23b88e39b0c46
  );
};

export default Login;
