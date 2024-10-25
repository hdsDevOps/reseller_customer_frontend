import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "store/hooks";
import { HiOutlineEye } from "react-icons/hi";
import { RiEyeCloseLine } from "react-icons/ri";
import { makeUserLoginThunk } from "store/user.thunk";
import { FcGoogle } from "react-icons/fc";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [show, setShow] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();    
    let valid = true;
    navigate("/otp?mode=signin");
  
    // Email validation
    if (!email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      valid = false;
    } else {
      setEmailError(null);
    }

    // Password validation
    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    } else {
      setPasswordError(null);
    }

    // If both fields are valid, proceed
    if (valid) {
      navigate("/otp?mode=signin");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleOpen = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen mt-24 mb-12 xsm-max:px-1">
      <div className="w-full max-w-[32rem] bg-gray-50 p-12 rounded-3xl xsm-max:px-4">
        <div className="w-full">
          <div className="text-center">
            <div className="flex items-center justify-center">
              <div
                className="bg-center bg-cover"
                style={{
                  backgroundImage: `url(${
                    process.env.BASE_URL + "/images/logo.jpeg"
                  })`,
                  width: "100px",
                  height: "100px",
                }}
                aria-label="logo"
              ></div>
            </div>
            <h3 className="text-2xl font-semibold text-[#0D121F] pt-4">
              Sign in your account
            </h3>
            <p className="mt-2">
              New to Hordanso?{" "}
              <Link to="/NewRegister" className="text-green-600">
                Register Now
              </Link>
            </p>
          </div>
          <div className="mt-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block mb-1 text-base font-bold text-gray-900"
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
                {emailError && (
                  <p className="mt-1 text-sm text-red-500">{emailError}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium text-gray-700">
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
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
                  >
                    {showPassword ? (
                      <HiOutlineEye className="w-5 h-5" aria-hidden="true" />
                    ) : (
                      <RiEyeCloseLine className="w-5 h-5" aria-hidden="true" />
                    )}
                  </button>
                </div>
                {passwordError && (
                  <p className="mt-1 text-sm text-red-500">{passwordError}</p>
                )}
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
              <div className="mt-2 text-right">
                <Link
                  to="/forgotpassword"
                  className="text-sm font-normal text-red-600"
                  data-testid="forgot-password"
                >
                  Forgot Password
                </Link>
              </div>
              <div className="mt-4 text-center">
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
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                <div className="flex items-center justify-between pb-3">
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
          className="flex items-center justify-center w-full px-4 py-[.7rem] border-1 border-blue-300 rounded-md shadow-sm bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          <FcGoogle className="mr-3 " size={30} />
          <span className="text-sm text-gray-900">Sign in with Google</span>
        </button>
      </div>
    </div>
  );
};

export default Login;




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