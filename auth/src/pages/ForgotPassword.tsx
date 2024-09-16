import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button, Form } from "react-bootstrap";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the login logic here
  };

  const onGoBackhandler = () => {
    navigate("/login"); // Replace '/login' with your login route path
  };

  return (
    <Row className="full-height justify-content-center align-items-center px-5">
      <Col sm={3}></Col>
      <Col sm={6}>
        <div className="auth-section secondary-background">
          <div className="sign-in">
            <div className="forgot-pws-header mb-4">
              {/* <Image
          src={imageAssets.logo_small} // Replace with your image path
          alt="hordanso"
          className="forgot-pws-logo"
        /> */}
              <h3>Forgot password?</h3>
              <p>
                Enter the email address associated with your account and we’ll
                send you a link to reset your password.
              </p>
            </div>
            <div className="auth-container">
              <Form onSubmit={handleLogin}>
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
                <div className="auth-btn-container mt-3">
                  <Button
                    type="submit"
                    className="primary-btn black-background"
                    data-testid="next"
                  >
                    Next
                  </Button>
                </div>

                <div className="text-center mt-4">
                  <Button
                    type="button"
                    onClick={onGoBackhandler}
                    data-testid="back-to-login"
                    className="auth-back-btn"
                  >
                    {/* <Image
                src={imageAssets.back_arrow} // Replace with your image path
                alt="back arrow"
                className="auth-back-arrow"
              /> */}
                    <span className="ps-1">Back to login</span>
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </Col>
      <Col sm={3}></Col>
    </Row>
  );
};

export default ForgotPassword;
