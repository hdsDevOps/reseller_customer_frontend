import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { PhoneNumberInput } from "../utils/inputs/phonenumber";
import TermsAndConditions from "./Terms";
import CheckBox from "../utils/inputs/checkbox";
import { Link, useNavigate } from "react-router-dom";

interface FormData {
  firstName: string;
  lastName: string;
  businessName: string;
  streetAddress: string;
  city: string;
  state: string;
  region: string;
  zipCode: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
}

interface FormErrors extends Partial<FormData> {
  terms?: string;
}

const NewRegister: React.FC = () => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    businessName: "",
    streetAddress: "",
    city: "",
    state: "",
    region: "",
    zipCode: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleCheckboxChange = (checked: boolean): void => {
    setIsChecked(checked);
    // Clear the terms error when checkbox is checked
    if (checked && errors.terms) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.terms;
        return newErrors;
      });
    }
  };
  const handlePhoneChange = (value: string | undefined): void => {
    setFormData((prev) => ({ ...prev, phone: value || "" }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required.";
    if (!formData.lastName.trim())
      newErrors.lastName = "Last name is required.";
    if (!formData.businessName.trim())
      newErrors.businessName = "Business name is required.";
    if (!formData.streetAddress.trim())
      newErrors.streetAddress = "Street address is required.";
    if (!formData.city.trim()) newErrors.city = "City is required.";
    if (!formData.state.trim()) newErrors.state = "State is required.";
    if (!formData.region.trim()) newErrors.region = "Region is required.";
    if (!formData.zipCode.trim()) newErrors.zipCode = "Zip code is required.";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters long and contain both letters and numbers.";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (!formData.phone || !phoneRegex.test(formData.phone)) {
      newErrors.phone = "Please enter a valid digit phone number.";
    }

    if (!isChecked) {
      newErrors.terms = "You must accept the Terms and Conditions.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (validateForm()) {
      try {
        navigate("/otp");
        console.log("Form submitted:", formData);
      } catch (error) {
        console.error("Registration failed:", error);
        // Handle submission error
      }
    }
  };

  return (
    <section className="w-full px-8 pt-3 pb-8 mx-auto">
      <Link to="/login">
        <div className="flex items-center gap-1 cursor-pointer">
          <IoIosArrowBack className="w-4 h-4" />
          <p className="text-greenbase">Back to previous page</p>
        </div>
      </Link>

      <div>
        <h1 className="flex justify-center pt-3 text-2xl font-bold md:text-4xl text-greenbase">
          Welcome to Hordanso LLC
        </h1>
        <p className="flex justify-center pt-2 text-base font-normal md:pt-4">
          To create an account, we need some information for your HORDANSO
          account.
        </p>
        <form className="mt-16" onSubmit={handleSubmit}>
          <div className="flex items-start justify-between w-full px-[20px]">
            {/* Left side form fields */}
            <div className="w-[49%] flex flex-col items-center justify-center">
              <div className="relative w-full mb-5">
                <input
                  type="text"
                  name="firstName"
                  placeholder="Robert"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full p-[11px] border-2 ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  } rounded-[10px] outline-0 placeholder-black`}
                />
                <label
                  htmlFor="firstName"
                  className="absolute text-gray-400 bg-white -top-3 left-5 text-[17px]"
                >
                  First name
                </label>
                {errors.firstName && (
                  <p className="text-red-500">{errors.firstName}</p>
                )}
              </div>
              <div className="relative w-full mb-5">
                <input
                  type="text"
                  name="businessName"
                  placeholder="ABC Business"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  className={`w-full p-[11px] border-2 ${
                    errors.businessName ? "border-red-500" : "border-gray-300"
                  } rounded-[10px] outline-0 placeholder-black`}
                />
                <label
                  htmlFor="businessName"
                  className="absolute text-gray-400 bg-white -top-3 left-5 text-[17px]"
                >
                  Business Name
                </label>
                {errors.businessName && (
                  <p className="text-red-500">{errors.businessName}</p>
                )}
              </div>
              <div className="relative w-full mb-5">
                <input
                  type="text"
                  name="state"
                  placeholder="Maharashtra"
                  value={formData.state}
                  onChange={handleInputChange}
                  className={`w-full p-[11px] border-2 ${
                    errors.state ? "border-red-500" : "border-gray-300"
                  } rounded-[10px] outline-0 placeholder-black`}
                />
                <label
                  htmlFor="state"
                  className="absolute text-gray-400 bg-white -top-3 left-5 text-[17px]"
                >
                  State
                </label>
                {errors.state && <p className="text-red-500">{errors.state}</p>}
              </div>
              <div className="relative w-full mb-5">
                <input
                  type="text"
                  name="city"
                  placeholder="Mumbai"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={`w-full p-[11px] border-2 ${
                    errors.city ? "border-red-500" : "border-gray-300"
                  } rounded-[10px] outline-0 placeholder-black`}
                />
                <label
                  htmlFor="city"
                  className="absolute text-gray-400 bg-white -top-3 left-5 text-[17px]"
                >
                  City
                </label>
                {errors.city && <p className="text-red-500">{errors.city}</p>}
              </div>
              <div className="relative w-full mb-5">
                <input
                  type="email"
                  name="email"
                  placeholder="RobertClive@gmail.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full p-[11px] border-2 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-[10px] outline-0 placeholder-black`}
                />
                <label
                  htmlFor="email"
                  className="absolute text-gray-400 bg-white -top-3 left-5 text-[17px]"
                >
                  Email Address
                </label>
                {errors.email && <p className="text-red-500">{errors.email}</p>}
              </div>
              <div className="relative w-full mb-5">
                <input
                  type="password"
                  name="password"
                  placeholder="********"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full p-[11px] border-2 ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } rounded-[10px] outline-0 placeholder-black`}
                />
                <label
                  htmlFor="password"
                  className="absolute text-gray-400 bg-white -top-3 left-5 text-[17px]"
                >
                  Password
                </label>
                {errors.password && (
                  <p className="text-red-500">{errors.password}</p>
                )}
              </div>
            </div>

            {/* Right side form fields */}
            <div className="w-[49%] flex flex-col items-center justify-center">
              <div className="relative w-full mb-5">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Clive"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full p-[11px] border-2 ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  } rounded-[10px] outline-0 placeholder-black`}
                />
                <label
                  htmlFor="lastName"
                  className="absolute text-gray-400 bg-white -top-3 left-5 text-[17px]"
                >
                  Last name
                </label>
                {errors.lastName && (
                  <p className="text-red-500">{errors.lastName}</p>
                )}
              </div>
              <div className="relative w-full mb-5">
                <input
                  type="text"
                  name="streetAddress"
                  placeholder="123 Street"
                  value={formData.streetAddress}
                  onChange={handleInputChange}
                  className={`w-full p-[11px] border-2 ${
                    errors.streetAddress ? "border-red-500" : "border-gray-300"
                  } rounded-[10px] outline-0 placeholder-black`}
                />
                <label
                  htmlFor="streetAddress"
                  className="absolute text-gray-400 bg-white -top-3 left-5 text-[17px]"
                >
                  Street Address
                </label>
                {errors.streetAddress && (
                  <p className="text-red-500">{errors.streetAddress}</p>
                )}
              </div>
              <div className="relative w-full mb-5">
                <input
                  type="text"
                  name="region"
                  placeholder="Region"
                  value={formData.region}
                  onChange={handleInputChange}
                  className={`w-full p-[11px] border-2 ${
                    errors.region ? "border-red-500" : "border-gray-300"
                  } rounded-[10px] outline-0 placeholder-black`}
                />
                <label
                  htmlFor="region"
                  className="absolute text-gray-400 bg-white -top-3 left-5 text-[17px]"
                >
                  Region
                </label>
                {errors.region && (
                  <p className="text-red-500">{errors.region}</p>
                )}
              </div>
              <div className="relative w-full mb-5">
                <input
                  type="text"
                  name="zipCode"
                  placeholder="123456"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className={`w-full p-[11px] border-2 ${
                    errors.zipCode ? "border-red-500" : "border-gray-300"
                  } rounded-[10px] outline-0 placeholder-black`}
                />
                <label
                  htmlFor="zipCode"
                  className="absolute text-gray-400 bg-white -top-3 left-5 text-[17px]"
                >
                  Zip Code
                </label>
                {errors.zipCode && (
                  <p className="text-red-500">{errors.zipCode}</p>
                )}
              </div>
              <div className="relative w-full mb-5">
                <PhoneNumberInput
                  placeholder="Phone Number"
                  className="my-custom-class"
                  defaultCountry="us"
                  onChange={handlePhoneChange}
                />
                {errors.phone && <p className="text-red-500">{errors.phone}</p>}
              </div>
              <div className="relative w-full mb-5">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="********"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full p-[11px] border-2 ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-[10px] outline-0 placeholder-black`}
                />
                <label
                  htmlFor="confirmPassword"
                  className="absolute text-gray-400 bg-white -top-3 left-5 text-[17px]"
                >
                  Confirm Password
                </label>
                {errors.confirmPassword && (
                  <p className="text-red-500">{errors.confirmPassword}</p>
                )}
              </div>
            </div>
          </div>

          {/* checkbox field */}
          <div className="flex flex-col items-start gap-1 mb-3 ml-10">
            <div className="flex items-center gap-1">
              <CheckBox
                isChecked={isChecked}
                onChange={handleCheckboxChange}
                aria-label="Accept terms and conditions"
              />
              <p className="text-[15px] font-bold">
                <span
                  className="text-green-500 cursor-pointer"
                  onClick={() => setShowModal(true)}
                  role="button"
                  tabIndex={0}
                >
                  Terms And Conditions
                </span>
              </p>
            </div>
            {errors.terms && (
              <p className="text-sm text-red-500" role="alert">
                {errors.terms}
              </p>
            )}
          </div>

          <div className="flex items-center justify-center w-full mt-4 text-center">
            <button
              className="bg-green-500 p-3 rounded-[10px] text-white font-semibold hover:bg-green-600 transition-colors"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {showModal && (
        <TermsAndConditions
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        />
      )}
    </section>
  );
};

export default NewRegister;
