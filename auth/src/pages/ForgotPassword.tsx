import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "store/hooks";
import { forgetPasswordThunk } from "store/user.thunk";
import { toast } from 'react-toastify';

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async(e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await dispatch(forgetPasswordThunk({email: email})).unwrap();
      navigate("/otp?mode=forgotpassword", {state: {email}});
    } catch (error) {
      toast.error("Please enter a valid email");
      setLoading(false);
    }
    // navigate
  };
  

  const onGoBackhandler = () => {
    navigate("/login"); // Replace '/login' with your login route path
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="max-w-[32rem] space-y-8 bg-[#F9FAFB] p-10 rounded-2xl shadow-sm xsm-max:px-4">
        <div className="">
          <img 
           src={process.env.BASE_URL + "/images/logo.jpeg"}
           alt="logo" />
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
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                data-testid="email"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="btn-black"
              data-testid="next"
              disabled={loading}
            >
              {
                loading ? "Loading..." : "Next"
              }
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
