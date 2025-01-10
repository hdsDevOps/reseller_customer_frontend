import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import Input from "../utils/inputs/input";
import { RiEyeCloseLine } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { PhoneNumberInput } from "../utils/inputs/phonenumber";
import { useNavigate } from "react-router-dom";
import TermsAndConditions from "./Terms";
import CheckBox from "../utils/inputs/checkbox";
import { Link } from "react-router-dom";
import { useAppDispatch } from "store/hooks";
import { resgiterCustomerThunk } from "store/user.thunk";
import { HiOutlineEye } from "react-icons/hi";
import axios from "axios";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./cumtel.css"

const initialCustomer = {
  email: "",
  password: "",
  business_phone_number: "",
  first_name: "",
  last_name: "",
  business_name: "",
  region: "",
  street_name: "",
  zipcode: ""
};

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [customer, setCustomer] = useState(initialCustomer);
  // console.log("customer...", customer);
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isNumberValid, setIsNumberValid] = useState(false);
  // console.log({isNumberValid});

  const [countryDropdownOpen, setCountryDropdownOpen] = useState<Boolean>(false);
  const countryRef = useRef(null);
  const [countryName, setCountryName] = useState("");
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState({});
  // console.log("countries...", countries);
  // console.log("country...", country);
  
  const handleClickOutsideCountry = (event: MouseEvent) => {
    if(countryRef.current && !countryRef.current.contains(event.target as Node)) {
      setCountryDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideCountry);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideCountry);
    };
  }, []);

  useEffect(() => {
    if(countries.length > 0 && countryName !== "") {
      setCountryDropdownOpen(true);
    }
  }, [countries, countryName]);

  useEffect(() => {
    var config = {
      method: 'get',
      url: 'https://api.countrystatecity.in/v1/countries',
      headers: {
        'X-CSCAPI-KEY': 'Nk5BN011UlE5QXZ6eXc1c05Id3VsSmVwMlhIWWNwYm41S1NRTmJHMA=='
      }
    };
    axios(config)
      .then(res => {
        setCountries(res.data);
        // console.log(res.data);
      })
      .catch(err => {
        setCountries([]);
        console.log("error...", err);
      })
  }, []);

  const [loading, setLoading] = useState(false);

  const tableHeads = [
    {name: 'first_name', label: "First name", type: "text", required: false, placeholder: "Enter First name", },
    {name: 'last_name', label: "Last name", type: "text", required: false, placeholder: "Enter Last name", },
    {name: 'business_name', label: "Business Name", type: "text", required: false, placeholder: "Enter Business Name", },
    {name: 'street_name', label: "Street address", type: "text", required: false, placeholder: "Select Street address", },
    {name: 'region', label: "Region/Country", type: "dropdown", required: false, placeholder: "Enter your Region", },
    {name: 'zipcode', label: "Zip code", type: "number", required: false, placeholder: "Enter Zip code", },
    {name: 'email', label: "Email address", type: "email", required: false, placeholder: "Enter Email address", },
    {name: 'business_phone_number', label: "Business phone number", type: "text", required: false, placeholder: "Enter Business phone number", },
    {name: 'password', label: "Password", type: "password", required: false, placeholder: "Enter Password", },
    {name: 'c_password', label: "Confirm Password", type: "password", required: false, placeholder: "Enter Confirm Password", },
  ];

  const updateCustomer = e => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  const removePrefix = (input:string, prefix:string) => {
    if(input.startsWith(prefix)) {
      return input.slice(prefix.length);
    } else if(input.startsWith('0')) {
      return input.slice(1);
    }
    return input;
  };

  const handlePhoneChange = (value: string) => {
    setCustomer((prevData) => ({ ...prevData, business_phone_number: value }));
  };
  
  const validateForm = () => {
    for (const key in customer) {
      if (customer[key].trim() === '') {
        return false;
      }
    }
    return true;
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // navigate("/otp?mode=signup");
    // return;
    setLoading(true);
    if (customer.password !== confirmPassword) {
      toast.warning("Passwords do not match");
      setLoading(false);
    } else if (!termsAccepted) {
      toast.warning("You must accept the terms and conditions");
      setLoading(false);
    } else {
      if(isNumberValid) {
        if(validateForm()) {
          try {
            const result = await dispatch(resgiterCustomerThunk({
              email: customer?.email,
              password: customer?.password,
              business_phone_number: customer?.business_phone_number,
              first_name: customer?.first_name,
              last_name: customer?.last_name,
              business_name: customer?.business_name,
              region: customer?.region,
              street_name: customer?.street_name,
              state: "",
              city: "",
              zipcode: customer?.zipcode
            })).unwrap();
            console.log("result...", result);
            navigate("/otp?mode=signup", { state: {customer_id: result?.customer_id} })
          } catch (error) {
            toast.error("Error registering customer");
          }
        } else {
          toast.warning("Please fill out all the fields");
          setLoading(false);
        }
      } else {
        toast.warning("Please enter a valid phone number");
        setLoading(false);
      }
    }
    
  };

  return (
    <section className="w-full mx-auto px-8 pt-3 pb-8">
      <Link to="/login">
        <div className="flex gap-1 heads-center cursor-pointer">
          <IoIosArrowBack className="w-4 h-4" />
          <p className="text-greenbase">Back to previous page</p>
        </div>
      </Link>

      <div className="">
        <h1 className="font-bold md:text-4xl text-2xl text-greenbase flex justify-center pt-3">
          Welcome to Hordanso LLC 
        </h1>
        <p className="font-normal text-base flex justify-center md:pt-4 pt-2">
          To create an account, we need some information for your HORDANSO
          account.
        </p>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-2">
          <div
            className="grid grid-cols-2 gap-2"
          >
            {
              tableHeads.map((head, index) => {
                if(head.name === "password") {
                  return (
                    <div
                      key={index}
                      className='flex flex-col px-2 mb-2  sm:col-span-1 col-span-2'
                    >
                      <label
                        className='float-left text-sm font-normal text-custom-gray ml-[18px] z-[1] bg-white w-fit px-2'
                      >{head.label}</label>
                      <input
                        type={showPassword ? "text" : "password"}
                        name={head.name}
                        required={head.required}
                        className='border border-[#E4E4E4] rounded-[10px] h-[54px] mt-[-9px] pl-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                        onChange={updateCustomer}
                        placeholder={head.placeholder}
                        value={customer[head.name]}
                      />
                      <button
                        type="button"
                        onClick={() => {setShowPassword(!showPassword)}}
                        className="relative float-right mt-[-35px] mr-[15px] ml-auto"
                      >
                        {showPassword ? (
                          <HiOutlineEye className="h-[25px] w-[25px]" aria-hidden="true" />
                        ) : (
                          <RiEyeCloseLine className="h-[25px] w-[25px]" aria-hidden="true" />
                        )}
                      </button>
                    </div>
                  )
                } else if(head.name === "c_password") {
                  return (
                    <div
                      key={index}
                      className='flex flex-col px-2 mb-2  sm:col-span-1 col-span-2'
                    >
                      <label
                        className='float-left text-sm font-normal text-custom-gray ml-[18px] z-[1] bg-white w-fit px-2'
                      >{head.label}</label>
                      <input
                        type={showCPassword ? "text" : "password"}
                        name={head.name}
                        required={head.required}
                        className='border border-[#E4E4E4] rounded-[10px] h-[54px] mt-[-9px] pl-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                        onChange={e => {setConfirmPassword(e.target.value)}}
                        placeholder={head?.placeholder}
                        value={confirmPassword}
                      />
                      <button
                        type="button"
                        onClick={() => {setShowCPassword(!showCPassword)}}
                        className="relative float-right mt-[-35px] mr-[15px] ml-auto"
                      >
                        {showCPassword ? (
                          <HiOutlineEye className="h-[25px] w-[25px]" aria-hidden="true" />
                        ) : (
                          <RiEyeCloseLine className="h-[25px] w-[25px]" aria-hidden="true" />
                        )}
                      </button>
                    </div>
                  )
                } else if(head.type === "select") {
                  return (
                    <div
                      key={index}
                      className='flex flex-col px-2 mb-2  sm:col-span-1 col-span-2'
                    >
                      <label
                        className='float-left text-sm font-normal text-custom-gray ml-[18px] z-[1] bg-white w-fit px-2'
                      >{head.label}</label>
                      {/* <input
                        type="text"
                        name={head.name}
                        required
                        className='border border-[#E4E4E4] rounded-[10px] h-[54px] mt-[-9px] pl-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                        // onChange={updateCustomer}
                        placeholder={head?.placeholder}
                      /> */}
                      <select
                        name={head.name}
                        required={head.required}
                        className="border border-[#E4E4E4] rounded-[10px] h-[54px] mt-[-9px] pl-2"
                      >
                        <option selected disabled>{head.placeholder}</option>
                        <option>United States</option>
                      </select>
                    </div>
                  )
                } else if(head.type === "dropdown") {
                  if(head.name === "region") {
                    return (
                      <div
                        key={index}
                        className='flex flex-col px-2 mb-2  sm:col-span-1 col-span-2 relative'
                        ref={countryRef}
                      >
                        <label
                          className='float-left text-sm font-normal text-custom-gray ml-[18px] z-[1] bg-white w-fit px-2'
                        >{head.label}</label>
                        <input
                          type="text"
                          name="region"
                          required
                          className='border border-[#E4E4E4] rounded-[10px] h-[54px] mt-[-9px] pl-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                          onChange={e => {
                            setCustomer({
                              ...customer,
                              region: ''
                            });
                            setCountryName(e.target.value);
                          }}
                          placeholder={head?.placeholder}
                          value={countryName || customer[head.name]}
                          onFocus={() => {setCountryDropdownOpen(true)}}
                        />
                        {
                          countryDropdownOpen && (
                            <div className="w-[95.5%] max-h-32 absolute mt-14 bg-[#E4E4E4] overflow-y-auto z-[100] px-2 border border-[#C9C9C9]">
                              {
                                countries?.filter(name => name?.name?.toLowerCase().includes(countryName.toLowerCase())).map((country, idx) => (
                                  <p
                                    key={idx}
                                    className="py-1 border-b border-[#C9C9C9] last:border-0 cursor-pointer"
                                    onClick={() => {
                                      setCustomer({
                                        ...customer,
                                        region: country?.name,
                                      });
                                      setCountryName("");
                                      setCountryDropdownOpen(false);
                                      setCountry(country)
                                    }}
                                  >{country?.name}</p>
                                ))
                              }
                            </div>
                          )
                        }
                      </div>
                    )
                  }
                } else if(head.name === "business_phone_number") {
                  return (
                    <div className="relative !w-full mb-2 pl-[6px] pr-2 !pb-[2px] !pt-[6px] sm:col-span-1 col-span-2 mt-2">
                      <PhoneInput
                        country={country?.iso2?.toLowerCase() || "us"}
                        value={customer?.business_phone_number}
                        onChange={(inputPhone, countryData, event, formattedValue) => {
                          handlePhoneChange(inputPhone);
                          if(countryData?.format?.length === formattedValue.length) {
                            const newValue = removePrefix(inputPhone, countryData?.dialCode);
                            if (newValue.startsWith('0')) {
                              setIsNumberValid(false);
                            } else {
                              setIsNumberValid(true);
                            }
                          } else {
                            setIsNumberValid(false);
                          }
                        }}
                        inputClass="!w-full !outline-none !border-0"
                        dropdownClass="peer"
                        containerClass="relative !outline-none !w-full !border !border-[#E4E4E4] !rounded-[10px]"
                      />
                      <label
                        htmlFor="business_phone_number"
                        className="absolute bg-white -top-3 left-3 text-gray-500 transition-all duration-300 ease-in-out origin-top-left peer-placeholder-shown:text-gray-400 peer-focus:text-blue-600 peer-focus:text-sm"
                      >{head?.label}</label>
                    </div>
                  )
                } else {
                  return (
                    <div
                      key={index}
                      className='flex flex-col px-2 mb-2  sm:col-span-1 col-span-2'
                    >
                      <label
                        className='float-left text-sm font-normal text-custom-gray ml-[18px] z-[1] bg-white w-fit px-2'
                      >{head.label}</label>
                      <input
                        type={head.type}
                        name={head.name}
                        required={head.required}
                        className='border border-[#E4E4E4] rounded-[10px] h-[54px] mt-[-9px] pl-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                        onChange={updateCustomer}
                        placeholder={head?.placeholder}
                        value={customer[head.name]}
                      />
                    </div>
                  )
                }
              })
            }
          </div>
          <div className="text-sm flex gap-2 px-3 pt-3 items-center">
            <input
              type="checkbox"
              onChange={() => setTermsAccepted(!termsAccepted)}
              className="w-3 h-3"
            />
            <button
              onClick={() => setShowModal(true)}
              className="font-medium text-green-500 hover:text-green-800"
              data-testid="terms-conditions"
              type="button"
            >
              Terms and conditions
            </button>
          </div>
          <div>
            {showModal && (
              <TermsAndConditions
                isOpen={showModal}
                onClose={() => setShowModal(false)}
              />
            )}
          </div>
          <div className="mt-4 flex justify-center">
            <button
              type="submit"
              className="group relative w-full md:max-w-40 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:!bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 cursor-pointer"
              data-testid="log-in"
              disabled={
                customer.password !== confirmPassword || loading
              }
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RegisterPage;
