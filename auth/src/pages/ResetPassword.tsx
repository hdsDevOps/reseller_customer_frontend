import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineEye } from "react-icons/hi";
import { RiEyeCloseLine } from "react-icons/ri";

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const navigate = useNavigate();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === confirmPassword) {
      console.log("Password reset successfully");
      navigate("/successpassword"); // Navigate to the success page
    } else {
      console.log("Passwords do not match");
    }
  };

  return (
    <div className="flex h-full items-center justify-center px-1">
      <div className="w-full max-w-[32rem]">
        <div className="p-8 rounded-lg bg-[#F9FAFB]">
          <div className="mb-12">
            <img src="/src/assets/images/logo.jpeg" alt="logo" />
          </div>
          <h2 className="text-center font-inter text-2xl font-semibold mb-2">Reset your password</h2>
          <p className="text-gray-500 text-center mb-6 text-md">Must be at least 8 characters</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
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

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className="custom-input"
                  placeholder=".........."
                  minLength={8}
                  required
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                >
                  {showConfirmPassword ? (
                    <HiOutlineEye className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <RiEyeCloseLine className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="btn-black"
              >
                Confirm Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
