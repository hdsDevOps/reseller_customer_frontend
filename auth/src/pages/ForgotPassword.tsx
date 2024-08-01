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
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-md w-full space-y-8 bg-gray-100 p-10 rounded-lg shadow-md">
        <div>
          {/* You can add your logo here */}
          {/* <img className="mx-auto h-12 w-auto" src="/path-to-your-logo.png" alt="Logo" /> */}
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Forgot password?
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter the email address associated with your account and we'll
            send you a link to reset your password.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none bg-transparent relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                data-testid="email"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
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
            className="font-medium text-green-500 hover:text-green-800"
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