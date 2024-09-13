import React from 'react';
import { useNavigate } from 'react-router-dom';

const SuccessPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-full max-w-[32rem] text-center bg-[#F9FAFB] p-10 xsm-max:px-2 rounded-lg shadow-sm flex items-center flex-col justify-center gap-12">
        <div className="mb-12 mt-6 flex justify-center">
          <img src="/src/assets/images/logo.jpeg" alt="logo" className="max-w-full h-auto" />
        </div>
        <h2 className="text-2xl font-semibold mb-4">Successful password reset!</h2>
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