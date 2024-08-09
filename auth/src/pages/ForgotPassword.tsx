import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-[#F9FAFB] p-10 rounded-2xl shadow-sm">
        <div className="">
          <img src="/src/assets/images/logo.jpeg" alt="logo" />
        </div>
        <div>
          <h2 className="mt-6 text-left text-[28px] font-inter font-medium text-gray-900">
            Forgot password?
          </h2>
          <p className="mt-2 text-left text-sm text-gray-600">
            Enter the email address associated with your account and we’ll send
            you an OTP to reset your password.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="">
            <div className="space-y-1">
              <label
                htmlFor="email-address"
                className="block text-sm font-bold text-black"
              >
                Email
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="custom-input"
                placeholder="Robertclive@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                data-testid="email"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="relative w-full flex justify-center px-3 py-[10px] border border-transparent text-sm font-medium rounded-lg text-white bg-black transition-shadow duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:bg-gray-800 hover:shadow-md"
              data-testid="next"
            >
              Next
            </button>
          </div>
        </form>

        <div className="text-center">
          <button
            type="button"
            onClick={onGoBackhandler}
            className="font-medium hover:text-green-600"
            data-testid="back-to-login"
          >
            ← Back to login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
