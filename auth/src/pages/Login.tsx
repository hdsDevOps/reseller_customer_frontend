import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "store/hooks";
import { makeUserLoginThunk } from "store/user.thunk";
import { Row, Col, Button, Form, Modal } from "react-bootstrap";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("biswajit@yopmail.com");
  const [password, setPassword] = useState("Admin@1234");
  const [show, setShow] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const result = await dispatch(
        makeUserLoginThunk({
          email: email,
          password: password,
          login_user_type: 0,
        })
      ).unwrap();
      console.log("result....", result);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleOpen = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

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
                New to Hordanso?{" "}
                <Link
                  to="/register"
                >
                  Register Now
                </Link>
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
      </Col>
      <Col sm={3}></Col>
    </Row>
  );
};

export default Login;
