import React, {
  useEffect,
  useState,
  useRef,
  ChangeEvent,
  KeyboardEvent,
} from "react";
<<<<<<< HEAD
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Button, Form } from "react-bootstrap";
import { useAppDispatch } from "store/hooks";
import { setTokenDetails } from "store/authSlice"; 

const OTP: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const otp1Ref = useRef<HTMLInputElement>(null);
  const otp2Ref = useRef<HTMLInputElement>(null);
  const otp3Ref = useRef<HTMLInputElement>(null);
  const otp4Ref = useRef<HTMLInputElement>(null);
  const otp5Ref = useRef<HTMLInputElement>(null);
  const otp6Ref = useRef<HTMLInputElement>(null);

  const [otp1, setOtp1] = useState<string>("");
  const [otp2, setOtp2] = useState<string>("");
  const [otp3, setOtp3] = useState<string>("");
  const [otp4, setOtp4] = useState<string>("");
  const [otp5, setOtp5] = useState<string>("");
  const [otp6, setOtp6] = useState<string>("");

  useEffect(() => {
    otp1Ref.current?.focus();
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = (e.target as HTMLInputElement).value;
    if (/^\d$/.test(value)) {
      switch (index) {
        case 1:
          setOtp1(value);
          otp2Ref.current?.focus();
          break;
        case 2:
          setOtp2(value);
          otp3Ref.current?.focus();
          break;
        case 3:
          setOtp3(value);
          otp4Ref.current?.focus();
          break;
        case 4:
          setOtp4(value);
          otp5Ref.current?.focus();
          break;
        case 5:
          setOtp5(value);
          otp6Ref.current?.focus();
          break;
        case 6:
          setOtp6(value);
          break;
        default:
          break;
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      switch (index) {
        case 1:
          if (!otp1) {
            otp1Ref.current?.focus();
          } else {
            setOtp1("");
          }
          break;
        case 2:
          if (!otp2) {
            otp1Ref.current?.focus();
          } else {
            setOtp2("");
          }
          break;
        case 3:
          if (!otp3) {
            otp2Ref.current?.focus();
          } else {
            setOtp3("");
          }
          break;
        case 4:
          if (!otp4) {
            otp3Ref.current?.focus();
          } else {
            setOtp4("");
          }
          break;
        case 5:
          if (!otp5) {
            otp4Ref.current?.focus();
          } else {
            setOtp5("");
          }
          break;
        case 6:
          if (!otp6) {
            otp5Ref.current?.focus();
          } else {
            setOtp6("");
          }
=======
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "store/hooks";
// import { makeUserLoginThunk } from "store/user.thunk";
import { setTokenDetails } from "store/authSlice";

const OTP: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const mode = queryParams.get("mode");

  const otp1Ref = useRef<HTMLInputElement>(null);
  const otp2Ref = useRef<HTMLInputElement>(null);
  const otp3Ref = useRef<HTMLInputElement>(null);
  const otp4Ref = useRef<HTMLInputElement>(null);
  const otp5Ref = useRef<HTMLInputElement>(null);

  const [otp1, setOtp1] = useState<string>("");
  const [otp2, setOtp2] = useState<string>("");
  const [otp3, setOtp3] = useState<string>("");
  const [otp4, setOtp4] = useState<string>("");
  const [otp5, setOtp5] = useState<string>("");

  useEffect(() => {
    otp1Ref.current?.focus();
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = (e.target as HTMLInputElement).value;
    if (/^\d$/.test(value)) {
      switch (index) {
        case 1:
          setOtp1(value);
          otp2Ref.current?.focus();
          break;
        case 2:
          setOtp2(value);
          otp3Ref.current?.focus();
          break;
        case 3:
          setOtp3(value);
          otp4Ref.current?.focus();
          break;
        case 4:
          setOtp4(value);
          otp5Ref.current?.focus();
          break;
        case 5:
          setOtp5(value);
>>>>>>> 4c81a841910644d93d1783872fd23b88e39b0c46
          break;
        default:
          break;
      }
    }
  };

<<<<<<< HEAD
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setTokenDetails("usy6767jshs688ytmbqa88654sgsgs5sgs6sgs6q"));
    navigate("/dashboard");
    //const otp = `${otp1}${otp2}${otp3}${otp4}${otp5}${otp6}`;
    //if (otp.length === 6) {
      // Process the OTP login
      // dispatch(makeUserLoginThunk({ email, otp }))
      //   .then((response) => {
      //     // Handle successful login
      //     toast.success("Login successful!");
      //     router.push("/dashboard"); // Replace with your desired route
      //   })
      //   .catch((error) => {
      //     // Handle login error
      //     if (error instanceof CustomError) {
      //       toast.error(error.message);
      //     } else {
      //       toast.error("Login failed. Please try again.");
      //     }
      //   });
    //} else {
      //toast.error("Please enter a valid 6-digit OTP.");
    //}
  };

  const onGoBackhandler = () => {
    navigate("/login");
  };

  return (
    <Row className="full-height justify-content-center align-items-center px-5">
      <Col sm={3}></Col>
      <Col sm={6}>
        <div className="auth-section secondary-background">
          <div className="sign-in">
            <div className="auth-header mb-4">
              {/* <Image
        src={imageAssets.logo_small} // Replace with your image path
        alt="hordanso"
        className="auth-logo"
      /> */}
              <h3>Sign in your account</h3>
            </div>
            <div className="auth-container">
              <Form onSubmit={handleLogin}>
                <Row>
                  <Form.Label className="auth-form-label mb-4">
                    OTP Verification
                  </Form.Label>
                  <Col sm={2} xl={2}>
                    <Form.Control
                      type="text"
                      maxLength={1}
                      ref={otp1Ref}
                      value={otp1}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleInputChange(e, 1)
                      }
                      onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                        handleKeyDown(e, 1)
                      }
                      className="otp-input"
                      data-testid="otp-one"
                    />
                  </Col>
                  <Col sm={2} xl={2}>
                    <Form.Control
                      type="text"
                      maxLength={1}
                      ref={otp2Ref}
                      value={otp2}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleInputChange(e, 2)
                      }
                      onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                        handleKeyDown(e, 2)
                      }
                      className="otp-input"
                      data-testid="otp-two"
                    />
                  </Col>
                  <Col sm={2} xl={2}>
                    <Form.Control
                      type="text"
                      maxLength={1}
                      ref={otp3Ref}
                      value={otp3}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleInputChange(e, 3)
                      }
                      onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                        handleKeyDown(e, 3)
                      }
                      className="otp-input"
                      data-testid="otp-three"
                    />
                  </Col>
                  <Col sm={2} xl={2}>
                    <Form.Control
                      type="text"
                      maxLength={1}
                      ref={otp4Ref}
                      value={otp4}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleInputChange(e, 4)
                      }
                      onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                        handleKeyDown(e, 4)
                      }
                      className="otp-input"
                      data-testid="otp-four"
                    />
                  </Col>
                  <Col sm={2} xl={2}>
                    <Form.Control
                      type="text"
                      maxLength={1}
                      ref={otp5Ref}
                      value={otp5}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleInputChange(e, 5)
                      }
                      onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                        handleKeyDown(e, 5)
                      }
                      className="otp-input"
                      data-testid="otp-five"
                    />
                  </Col>
                  <Col sm={2} xl={2}>
                    <Form.Control
                      type="text"
                      maxLength={1}
                      ref={otp6Ref}
                      value={otp6}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleInputChange(e, 6)
                      }
                      onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                        handleKeyDown(e, 6)
                      }
                      className="otp-input"
                      data-testid="otp-six"
                    />
                  </Col>
                </Row>
                <div className="auth-btn-container mt-3">
                  <Button
                    type="submit"
                    className="primary-btn"
                    data-testid="submit"
                  >
                    Submit
                  </Button>
                </div>
                <div className="text-center auth-otp-footer mt-4">
                  <p>
                    Didn't get an OTP ?{" "}
                    <Link data-testid="resend-otp" to="#">
                      Resend OTP
                    </Link>{" "}
                    <span>01:19</span>
                  </p>
                </div>
                <div className="text-center mt-4">
                  <Button
                    type="button"
                    onClick={() => onGoBackhandler()}
                    className="auth-back-btn"
                    data-testid="back-to-login"
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
=======
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      switch (index) {
        case 1:
          if (!otp1) {
            otp1Ref.current?.focus();
          } else {
            setOtp1("");
          }
          break;
        case 2:
          if (!otp2) {
            otp1Ref.current?.focus();
          } else {
            setOtp2("");
          }
          break;
        case 3:
          if (!otp3) {
            otp2Ref.current?.focus();
          } else {
            setOtp3("");
          }
          break;
        case 4:
          if (!otp4) {
            otp3Ref.current?.focus();
          } else {
            setOtp4("");
          }
          break;
        case 5:
          if (!otp5) {
            otp4Ref.current?.focus();
          } else {
            setOtp5("");
          }
          break;
        default:
          break;
      }
    }
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const otp = `${otp1}${otp2}${otp3}${otp4}${otp5}`;

    if (otp.length === 5) {
      const isValidOtp = true;

      if (isValidOtp) {
        if (mode === "signin") {
          dispatch(setTokenDetails("usy6767jshs688ytmbqa88654sgsgs5sgs6sgs6q"));
          navigate("/dashboard");
        } else {
          navigate("/resetpassword");
        }
      } else {
        alert("Invalid OTP. Please try again.");
      }
    } else {
      alert("Please enter all 5 digits.");
    }
  };

  const handleEditmail = () => {
    navigate("/forgotpassword");
  };

  return (
    <div className="flex h-full items-center justify-center">
      <div className="w-full max-w-[32rem]">
        <div className="p-8 xsm-max:px-4 bg-[#F9FAFB] rounded-lg shadow-sm">
          <div
            className={`mb-12 ${
              mode === "signin" ? "flex items-center justify-center" : ""
            }`}
          >
            <img
              src="/src/assets/images/logo.jpeg"
              alt="logo"
              className={mode === "signin" ? "mx-auto" : ""}
            />
          </div>
          <h3 className="text-center font-inter font-medium mb-4 text-[28px]">
            {mode === "signin" ? "Sign in your account" : "Verify your email"}
          </h3>
          <form onSubmit={handleLogin}>
            <div className="mb-4 text-center xsm-max:text-sm">
              {/* <p dangerouslySetInnerHTML={{ __html: message }} /> */}
              {mode !== "signin" && (
                <button
                  type="button"
                  onClick={() => handleEditmail()}
                  className="font-medium text-green-600 hover:text-gray-500"
                  data-testid="back-to-login"
                >
                  Edit
                </button>
              )}
            </div>
            <div className="flex justify-between mt-12">
              <p className="text-md font-bold">OTP verification</p>
              <span className="text-red-600">01:19</span>
            </div>
            <div className="grid grid-cols-5 gap-2 mt-4">
              <input
                type="text"
                maxLength={1}
                ref={otp1Ref}
                value={otp1}
                onChange={(e) => handleInputChange(e, 1)}
                onKeyDown={(e) => handleKeyDown(e, 1)}
                className="w-full aspect-square outline-none focus border-2 bg-transparent rounded-lg text-center text-black"
                placeholder="0"
              />
              <input
                type="text"
                maxLength={1}
                ref={otp2Ref}
                value={otp2}
                onChange={(e) => handleInputChange(e, 2)}
                onKeyDown={(e) => handleKeyDown(e, 2)}
                className="w-full aspect-square outline-none focus border-2 bg-transparent rounded-lg text-center text-black"
                placeholder="0"
              />
              <input
                type="text"
                maxLength={1}
                ref={otp3Ref}
                value={otp3}
                onChange={(e) => handleInputChange(e, 3)}
                onKeyDown={(e) => handleKeyDown(e, 3)}
                className="w-full aspect-square outline-none focus border-2 bg-transparent rounded-lg text-center text-black"
                placeholder="0"
              />
              <input
                type="text"
                maxLength={1}
                ref={otp4Ref}
                value={otp4}
                onChange={(e) => handleInputChange(e, 4)}
                onKeyDown={(e) => handleKeyDown(e, 4)}
                className="w-full aspect-square outline-none focus border-2 bg-transparent rounded-lg text-center text-black"
                placeholder="0"
              />
              <input
                type="text"
                maxLength={1}
                ref={otp5Ref}
                value={otp5}
                onChange={(e) => handleInputChange(e, 5)}
                onKeyDown={(e) => handleKeyDown(e, 5)}
                className="w-full aspect-square outline-none focus border-2 bg-transparent rounded-lg text-center text-black"
                placeholder="0"
              />
            </div>
            <div className="text-center mt-4">
              <button
                type="submit"
                //className={btnClass}
                data-testid="submit"
              >
                Submit
              </button>
            </div>
            <div className="text-center mt-4 xsm-max:text-sm">
              <p>
                Didn't get an OTP?{" "}
                <Link
                  data-testid="resend-otp"
                  to="#"
                  className="text-red-600 underline ml-4"
                >
                  Resend OTP
                </Link>{" "}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
>>>>>>> 4c81a841910644d93d1783872fd23b88e39b0c46
  );
};

export default OTP;
