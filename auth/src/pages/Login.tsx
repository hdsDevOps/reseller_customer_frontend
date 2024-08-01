import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "store/hooks";
import { makeUserLoginThunk } from "store/user.thunk";

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
    <div className="flex justify-center items-center h-screen px-5">
      <div className="w-full max-w-md bg-gray-50 p-12 rounded-3xl">
        <div className="w-full">
          <div className="text-center">
            {/* <img src={imageAssets.logo_small} alt="hordanso" className="w-28 h-22 mx-auto" /> */}
            <h3 className="text-2xl font-medium pt-4">Sign in your account</h3>
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
                  className="w-full h-12 rounded-md p-1.5 border border-gray-300 bg-gray-50 text-gray-600 text-base"
                  data-testid="email"
                />
              </div>
              <div className="mb-3">
                <label className="block text-gray-900 text-base font-bold mb-1" htmlFor="formBasicPassword">
                  Password
                </label>
                <input
                  type="password"
                  id="formBasicPassword"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 rounded-md p-1.5 border border-gray-300 bg-gray-50 text-gray-600 text-base"
                  data-testid="password"
                />
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  data-testid="log-in"
                  className="w-full h-11 rounded-lg text-base font-semibold text-gray-100 bg-green-600"
                >
                  Log in
                </button>
              </div>
              <div className="text-right mt-2">
                <Link
                  to="/forgotpassword"
                  className="text-sm font-normal text-green-600"
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
    </div>
  );
};

export default Login;
