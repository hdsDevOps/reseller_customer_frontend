import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { HiOutlineEye } from "react-icons/hi";
import { RiEyeCloseLine } from "react-icons/ri";
import { IoChevronBackSharp } from "react-icons/io5";
import { toast } from "react-toastify";

// Update the site key with your actual reCAPTCHA site key
const RECAPTCHA_SITE_KEY = "6LdENbMqAAAAABasUqa4IoohS73SF0TVIxXDWHdy";

const SignInForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // console.log("location state...", location.state);
  
  // Retrieve the domain from the location state
  const domain = location.state.selectedDomain;

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  // console.log("form data...", formData);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  console.log("recaptchaToken...", recaptchaToken);
  const [charCount, setCharCount] = useState({
    username: 0,
    password: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
    setCharCount({
      ...charCount,
      [id]: value.length,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRecaptcha = (token: string | null) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // if (recaptchaToken) {
    //   console.log("Form submitted with:", formData, recaptchaToken);
    // } else {
    //   console.log("Please complete the reCAPTCHA.");
    // }
    if(formData.username.includes("@")) {
      toast.warning("Username cannot include @ symbol");
    } else {
      navigate('/free-trial', { state: {customer_id: location.state.customer_id, formData: location.state.formData, license_usage: location.state.license_usage, plan: location.state.plan, period: location.state.period, selectedDomain: location.state.selectedDomain, token: location.state.token, emailData: {username: `${formData.username}@${location.state.selectedDomain}`, password: formData.password}, from: location.state.from} });
    }
  };

  return (
    <div className="h-full w-full flex flex-col justify-center items-center gap-6 p-4 relative">
      <p
        className="flex items-center gap-1 text-green-600 cursor-pointer absolute left-4 top-2"
        onClick={() => navigate('/selected-domain', {state: location.state})}
      >
        <IoChevronBackSharp /> Back to previous page
      </p>

      <form
        className="w-full max-w-2xl p-6 border border-gray-300 rounded-xl bg-white mt-8"
        onSubmit={handleSubmit}
      >
        {/* Username Input */}
        <h1 className="text-3xl font-semibold mb-1">How you'll sign In</h1>

        <p className="text-md mb-6">
          You'll use your username to sign into your Google Workspace account
          and create your business email address.
        </p>
        <div className="relative w-full mb-10">
          <input
            id="username"
            type="text"
            placeholder="demo"
            value={formData.username}
            onChange={handleChange}
            required
            className="peer w-full px-2 py-[.8rem] border border-gray-300 rounded-lg form-input focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <label
            htmlFor="username"
            className="absolute bg-white -top-3 left-3 text-gray-500 transition-all duration-300 ease-in-out origin-top-left peer-placeholder-shown:text-gray-400 peer-focus:text-blue-600 peer-focus:text-xs"
          >
            Username
          </label>
          <span className="absolute right-3 -bottom-4 text-xs text-gray-500">
            {charCount.username}/64
          </span>
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
            @{domain}
          </span>
        </div>

        {/* Password Input */}
        <div className="relative w-full mb-10">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
            className="peer w-full px-2 py-[.8rem] border border-gray-300 rounded-lg form-input focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <label
            htmlFor="password"
            className="absolute bg-white -top-3 left-3 text-gray-500 transition-all duration-300 ease-in-out origin-top-left peer-placeholder-shown:text-gray-400 peer-focus:text-blue-600 peer-focus:text-xs"
          >
            Password
          </label>
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
          >
            {showPassword ? (
              <HiOutlineEye className="h-5 w-5 text-black" aria-hidden="true" />
            ) : (
              <RiEyeCloseLine className="h-5 w-5 text-black" aria-hidden="true" />
            )}
          </button>
          <span className="absolute right-3 -bottom-4 text-xs text-gray-500">
            {charCount.password}/100
          </span>
        </div>
        <p className="tex">
          We know you are probably not a robot, but we just have to ask.
          <br/>Are you a robot?
        </p>

        {/* reCAPTCHA */}
        <div className="relative my-4">
          <ReCAPTCHA
            sitekey="6LdENbMqAAAAAKCJtG-Hf4Q2qVblxiQ7WTRDp6Ps"
            onChange={handleRecaptcha}
            className=""
          />
          {/* <div className="absolute left-0 top-1/2 transform -translate-y-1/2 flex items-center ml-2">
            <input
              type="checkbox"
              id="recaptcha-checkbox"
              required
              className="checkbox checkbox-md"
            />
            <label htmlFor="recaptcha-checkbox" className="ml-2 text-sm">
              I'm not a robot
            </label>
          </div> */}
        </div>

        {/* Agreement and Continue Button */}
        <div className="flex items-center gap-2 mt-4">
          <p className="text-sm">
            By clicking{" "}
            <span className="text-black font-bold">Agree and Continue</span>,
            you agree to the{" "}
            <a href="#" className="text-green-600">
              Google Workspace Agreement, Google Workspace purchase Agreement
            </a>{" "}
            and{" "}
            <a href="#" className="text-green-600">
              Supplemental Terms
            </a>{" "}
            and{" "}
            <a href="#" className="text-green-600">
              Conditions for Google Workspace Free Trial Agreement.
            </a>
          </p>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-sm text-white p-[10px] px-4 rounded-lg mt-4"
        >
          Agree and Continue
        </button>
      </form>
    </div>
  );
};

export default SignInForm;
