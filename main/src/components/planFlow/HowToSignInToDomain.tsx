import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { HiOutlineEye } from "react-icons/hi";
import { RiEyeCloseLine } from "react-icons/ri";
import { IoChevronBackSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { verifyReCaptchaThunk } from "store/user.thunk";

// Update the site key with your actual reCAPTCHA site key
const RECAPTCHA_SITE_KEY = "6LfFS7gqAAAAANx6APGgbqq8ambPmp1hCDD51FMV";

const HowToSignInToDomain: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  console.log("location state...", location.state);

  const { userDetails } = useAppSelector(state => state.auth);
  
  // Retrieve the domain from the location state
  const domain = location.state.selectedDomain?.domain?.domain;
  const captchaRef = useRef(null);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  // console.log("form data...", formData);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  // console.log("recaptchaToken...", recaptchaToken);
  const [recaptchaValid, setRecaptchaValid] = useState<Boolean>(false);

  useEffect(() => {
    if(userDetails !== null) {
      setFormData({
        ...formData,
        username: `${userDetails?.first_name?.toLowerCase()}.${userDetails?.last_name?.toLowerCase()}`
      })
    }
  }, [userDetails]);

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

  const handleRecaptcha = (value) => {
    setRecaptchaToken(value);
  };

  const captchaValidation = async() => {
    try {
      const result = await dispatch(verifyReCaptchaThunk({re_captcha_token: recaptchaToken})).unwrap();
      setRecaptchaValid(result?.success);
    } catch (error) {
      setRecaptchaValid(false);
    }
  };

  useEffect(() => {
    captchaValidation();
  }, [recaptchaToken]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(recaptchaValid) {
      if(formData?.username?.includes("@")) {
        toast.warning("Username cannot include @ symbol");
      } else {
        if(
          formData?.username !== "" && formData?.username?.trim() !== "" &&
          formData?.password !== "" && formData?.password?.trim() !== ""
        ) {
          navigate('/free-trial-page', { state: { ...location.state, emailData: {username: `${formData?.username}@${location.state.selectedDomain?.domain}`, password: formData?.password} } });
        } else {
          toast.error("Please fill all the fields");
        }
      }
    } else {
      toast.error("Please click on I'm not a robot.");
    }
  };

  return (
    <div className="h-full w-full flex flex-col justify-center items-center gap-6 p-4 relative">
      <p
        className="flex items-center gap-1 text-green-600 cursor-pointer absolute left-4 top-2"
        onClick={() => navigate('/selected-domain-details', {state: {...location.state}})}
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
            value={formData?.username}
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
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
            @{location.state.selectedDomain?.domain}
          </span>
        </div>

        {/* Password Input */}
        <div className="relative w-full mb-10">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={formData?.password}
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
        </div>
        <p className="tex">
          We know you are probably not a robot, but we just have to ask.
          <br/>Are you a robot?
        </p>

        {/* reCAPTCHA */}
        <div className="relative my-4">
          <ReCAPTCHA
            sitekey={"6LfFS7gqAAAAANx6APGgbqq8ambPmp1hCDD51FMV"}
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
          disabled={!recaptchaValid}
        >
          Agree and Continue
        </button>
      </form>
    </div>
  );
};

export default HowToSignInToDomain;
