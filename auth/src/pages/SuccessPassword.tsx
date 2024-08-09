import React from 'react';
import { useNavigate } from 'react-router-dom';

const SuccessPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    navigate('/login'); // Adjust the path if needed
  };

  return (
    <div className="flex h-screen items-center justify-center bg-[#F9FAFB]">
      <div className="w-full max-w-[32rem] text-center bg-white p-8 rounded-lg shadow-sm">
        <div className="mb-8">
          <img src="/src/assets/images/logo.jpeg" alt="logo" className="mx-auto" />
        </div>
        <h2 className="text-2xl font-semibold mb-4">Successful Password Reset</h2>
        <p className="text-gray-700 mb-6">You can now use your new password to log in to your account!</p>
        <button
          onClick={handleBackToLogin}
          className="btn-black"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
