import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useAppDispatch } from "store/hooks";
// import { makeUserLoginThunk } from "store/user.thunk";
import { Row, Col, Button, Form, Modal } from "react-bootstrap";
const Register: React.FC = () => {
//   const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    navigate("/otp");
  };

  const handleOpen = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <Row className="full-height justify-content-center align-items-center px-5">
      <Col sm={1}></Col>
      <Col sm={10}>
        <div className="sign-in">
          <div className="auth-header">
            {/* <Image
          src={imageAssets.logo_small} // Replace with your image path
          alt="hordanso"
          className="auth-logo"
        /> */}
            <h3>Welcome to Hordanso LLC</h3>
            <p className="text-center">
              To create an account, We need some information for your HORDANSO
              account.
            </p>
          </div>
          <div className="auth-container">
            <Form onSubmit={handleSubmit}>
              <Row>
              <Col sm={6}>
                  <Form.Group controlId="formBasicEmail" className="mb-4">
                    <Form.Label className="auth-form-label mb-1">
                      First name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter first name"
                      value={fname}
                      onChange={(e) => setFname(e.target.value)}
                      className="form-control auth-form-control"
                      data-testid="fname"
                    />
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group controlId="formBasicEmail" className="mb-4">
                    <Form.Label className="auth-form-label mb-1">
                      Last name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter last name"
                      value={lname}
                      onChange={(e) => setLname(e.target.value)}
                      className="form-control auth-form-control"
                      data-testid="lname"
                    />
                  </Form.Group>
                </Col>
                <Col sm={6}>
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
                </Col>
                <Col sm={6}>
                  <Form.Group
                    controlId="formBasicPassword"
                    className="mb-3"
                  >
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
                </Col>
              </Row>
              <div className="w-100 text-center">
                <Button
                  type="submit"
                  data-testid="log-in"
                  className="primary-btn"
                >
                  Submit
                </Button>
              </div>
              <div className="auth-footer">
                  <Link
                    to="#"
                    onClick={handleOpen}
                    className="terms-conditions-text primary-text"
                    data-testid="terms-conditions"
                  >
                    Terms and conditions
                  </Link>
                
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
      </Col>
      <Col sm={1}></Col>
    </Row>
  );
};

export default Register;
