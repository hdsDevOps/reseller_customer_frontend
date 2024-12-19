import React, { useEffect, useState } from "react";
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
import { makeUserRegisterThunk } from "store/user.thunk";
import { HiOutlineEye } from "react-icons/hi";
import axios from "axios";

const initialCustomer = {
  first_name: "",
  last_name: "",
  business_name: "",
  street_address: "",
  state: "",
  region: "",
  city: "",
  zip_code: "",
  email: "",
  business_phone_number: "",
  password: "",
};

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [customer, setCustomer] = useState(initialCustomer);
  console.log("customer...", customer);
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [countryName, setCountryName] = useState("");
  const [stateName, setStateName] = useState("");
  const [cityName, setCityName] = useState("");
  const [countries, setCountries] = useState([]);
  console.log("countries...", countries);
  
  const [states, setStates] = useState([]);
  const [cities, setCitites] = useState([]);

  const [loading, setLoading] = useState(false);

  const tableHeads = [
    {name: 'first_name', label: "First name", type: "text", required: false, placeholder: "Enter First name", },
    {name: 'last_name', label: "Last name", type: "text", required: false, placeholder: "Enter Last name", },
    {name: 'business_name', label: "Business Name", type: "text", required: false, placeholder: "Enter Business Name", },
    {name: 'street_address', label: "Street address", type: "text", required: false, placeholder: "Select Street address", },
    {name: 'state', label: "State", type: "dropdown", required: false, placeholder: "Enter your State", },
    {name: 'region', label: "Region/Country", type: "dropdown", required: false, placeholder: "Enter your Region", },
    {name: 'city', label: "City", type: "dropdown", required: false, placeholder: "Enter your City", },
    {name: 'zip_code', label: "Zip code", type: "number", required: false, placeholder: "Enter Zip code", },
    {name: 'email', label: "Email address", type: "email", required: false, placeholder: "Enter Email address", },
    {name: 'Business_phone_number', label: "Business phone number", type: "text", required: false, placeholder: "Enter Business phone number", },
    {name: 'password', label: "Password", type: "password", required: false, placeholder: "Enter Password", },
    {name: 'c_password', label: "Confirm Password", type: "password", required: false, placeholder: "Enter Confirm Password", },
  ];

  const updateCustomer = e => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    axios
      .get("https://www.universal-tutorial.com/api/getaccesstoken", {headers: {
        "Accept": "application/json",
        "api-token": "AtAMX2sSL0P0xiNSJ5gEmgL9uNc9MH31bPRqvD4dlqQvl9KEfHiAjzJUYjrbDLdAS6Q",
        "user-email": "hesham.reza@schemaphic.com"
      }})
      .then(res => {
        axios
          .get("https://www.universal-tutorial.com/api/countries/", { headers: {
            "Authorization": `Bearer ${res.data.auth_token}`,
            "Accept": "application/json"
          }})
          .then(response => {
            setCountries(response.data);
          })
          .catch(error => {
            setCountries([]);
            console.log("error...", error);
          })
      })
      .catch(err => {
        console.log("err...", err);
      })
  }, []);
  
  useEffect(() => {
    axios
      .get("https://www.universal-tutorial.com/api/getaccesstoken", {headers: {
        "Accept": "application/json",
        "api-token": "AtAMX2sSL0P0xiNSJ5gEmgL9uNc9MH31bPRqvD4dlqQvl9KEfHiAjzJUYjrbDLdAS6Q",
        "user-email": "hesham.reza@schemaphic.com"
      }})
      .then(res => {
        if(customer?.region !== ""){
          axios
          .get(`https://www.universal-tutorial.com/api/states/${customer?.country}`, { headers: {
            "Authorization": `Bearer ${res.data.auth_token}`,
            "Accept": "application/json"
          }})
          .then(response => {
            setStates(response.data);
          })
          .catch(error => {
            setStates([]);
            console.log("error...", error);
          })
        } else {
          setStates([]);
        }
      })
      .catch(err => {
        console.log("err...", err);
      })
  }, [customer]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    navigate("/otp?mode=signup");
    // return;
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!termsAccepted) {
      setError("You must accept the terms and conditions");
      return;
    }
    setLoading(true);
    try {
      
      navigate("/otp?mode=signin");
    } catch (error) {
      console.error("Login error:", error);
      setLoading(false);
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
                        className='border border-[#E4E4E4] rounded-[10px] h-[45px] mt-[-9px] pl-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
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
                        className='border border-[#E4E4E4] rounded-[10px] h-[45px] mt-[-9px] pl-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                        onChange={e => {setConfirmPassword(e.target.value)}}
                        placeholder={head?.placeholder}
                        value={confirmPassword}
                      />
                      <button
                        type="button"
                        onClick={() => {setShowCPassword(!showCPassword)}}
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
                        className='border border-[#E4E4E4] rounded-[10px] h-[45px] mt-[-9px] pl-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                        // onChange={updateCustomer}
                        placeholder={head?.placeholder}
                      /> */}
                      <select
                        name={head.name}
                        required={head.required}
                        className="border border-[#E4E4E4] rounded-[10px] h-[45px] mt-[-9px] pl-2"
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
                      >
                        <label
                          className='float-left text-sm font-normal text-custom-gray ml-[18px] z-[1] bg-white w-fit px-2'
                        >{head.label}</label>
                        <input
                          type="text"
                          name="region"
                          required
                          className='border border-[#E4E4E4] rounded-[10px] h-[45px] mt-[-9px] pl-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                          onChange={e => {
                            setCustomer({
                              ...customer,
                              region: e.target.value,
                              state: "",
                              street_address: "",
                              city: "",
                              zip_code: ""
                            });
                            setCountryName(e.target.value);
                            setStateName("");
                            setCityName("");
                          }}
                          placeholder={head?.placeholder}
                          value={customer[head.name]}
                        />
                        {
                          countryName.length > 2 && (
                            <div className="w-[95.5%] max-h-32 absolute mt-14 bg-white overflow-y-auto z-[100] px-2 border border-[#C9C9C9]">
                              {
                                countries?.filter(name => name?.country_name?.toLowerCase().includes(countryName.toLowerCase())).map((country, idx) => (
                                  <p
                                    key={idx}
                                    className="py-1 border-b border-[#C9C9C9] last:border-0 cursor-pointer"
                                    onClick={() => {
                                      setCustomer({
                                        ...customer,
                                        region: country?.country_name,
                                      });
                                      setCountryName("");
                                      setStateName("");
                                      setCityName("");
                                    }}
                                  >{country?.country_name}</p>
                                ))
                              }
                            </div>
                          )
                        }
                      </div>
                    )
                  }
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
                        className='border border-[#E4E4E4] rounded-[10px] h-[45px] mt-[-9px] pl-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
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
                !termsAccepted || customer.password !== confirmPassword || loading
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
