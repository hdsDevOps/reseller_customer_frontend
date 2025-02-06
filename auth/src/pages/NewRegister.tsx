import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowBack, IoMdArrowDropdown } from "react-icons/io";
import Input from "../utils/inputs/input";
import { RiEyeCloseLine } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { PhoneNumberInput } from "../utils/inputs/phonenumber";
import { useNavigate } from "react-router-dom";
import TermsAndConditions from "./Terms";
import CheckBox from "../utils/inputs/checkbox";
import { Link } from "react-router-dom";
import { useAppDispatch } from "store/hooks";
import { getLandingPageThunk, hereMapSearchThunk, resgiterCustomerThunk } from "store/user.thunk";
import { HiOutlineEye } from "react-icons/hi";
import axios from "axios";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./cumtel.css"
import { ChevronDown } from "lucide-react";

const initialCustomer = {
  email: "",
  password: "",
  phone_no: "",
  first_name: "",
  last_name: "",
  business_name: "",
  country: "",
  address: "",
  zipcode: "",
  state: "",
  city: ""
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
  const [isNumberValid, setIsNumberValid] = useState(false);
  // console.log({isNumberValid});

  const [countryDropdownOpen, setCountryDropdownOpen] = useState<Boolean>(false);
  const countryRef = useRef(null);
  const [countryName, setCountryName] = useState("");
  const [stateName, setStateName] = useState("");
  const [cityName, setCityName] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [country, setCountry] = useState({});
  const [state, setState] = useState({});
  const [city, setCity] = useState({});
  // console.log("countries...", countries);
  // console.log("country...", country);
  // console.log({countryName, stateName, cityName});
  // console.log({country, state, city});
  // console.log({countries, states, cities})

  const [hereAddressList, setHereAddressList] = useState([]);
  const [hereAddress, setHereAddress] = useState("");
  const [hereDropdownOpen, setHereDropdownOpen] = useState(false);
  const hereRef = useRef(null);
  const [hereData, setHereData] = useState<object|null>(null);
  // console.log("here data...", hereData);
  // console.log({address: customer?.address, hereData, hereAddress});

  useEffect(() => {
    const getIpData = async() => {
      const response = await fetch('https://geolocation-db.com/json/');
      const data = await response.json();
      // console.log(data);
      if(data) {
        const findCountry = countries?.find(country => country?.name?.toLowerCase() === data?.country_name?.toLowerCase());
        // console.log(findCountry);
        if(findCountry) {
          setCountry(findCountry);
          setCustomer({
            ...customer,
            country: findCountry?.name
          });
        }
      }
    };

    getIpData();
  } , [countries]);

  useEffect(() => {
    if(hereData !== null) {
      setCustomer({
        ...customer,
        address: hereData
      });
    } else {
      setCustomer({
        ...customer,
        address: "",
        country: '',
        zipcode: '',
        phone_no: ''
      });
    }
  }, [hereData]);
  
  const handleClickOutsideHere = (event: MouseEvent) => {
    if(hereRef.current && !hereRef.current.contains(event.target as Node)) {
      setCountryDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideHere);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideHere);
    };
  }, []);

  useEffect(() => {
    if(hereAddress === "") {
      setHereDropdownOpen(false);
      setHereAddressList([]);
    } else {
      if(hereAddressList?.length > 0) {
        setHereDropdownOpen(true);
      } else {
        setHereDropdownOpen(false);
      }
    }
  }, [hereAddressList, hereAddress]);

  useEffect(() => {
    if(hereData !== null && countries?.length > 0) {
      const findCountry = countries?.find(country => country?.name?.toLowerCase() === hereData?.address?.countryName?.toLowerCase());
      // console.log(findCountry)
      if(findCountry) {
        setCountry(findCountry);
        setCustomer({
          ...customer,
          country: findCountry?.name,
          address: hereData,
          zipcode: hereData?.address?.postalCode
        });
        if(hereData !== null && states?.length > 0) {
          const findState = states?.find(state => state?.name?.toLowerCase() === hereData?.address?.state?.toLowerCase());
          // console.log(findCountry)
          if(findState) {
            setState(findState);
            setCustomer({
              ...customer,
              country: findCountry?.name,
              state: findState?.name,
              address: hereData,
              zipcode: hereData?.address?.postalCode
            });
            if(hereData !== null && cities?.length > 0) {
              const findCity = cities?.find(city => city?.name?.toLowerCase() === hereData?.address?.city?.toLowerCase());
              // console.log(findCountry)
              if(findCity) {
                setCity(findCity);
                setCustomer({
                  ...customer,
                  country: findCountry?.name,
                  state: findState?.name,
                  city: findCity?.name,
                  address: hereData,
                  zipcode: hereData?.address?.postalCode
                });
              }
            }
          }
        }
      }
    }
  }, [hereData, countries, states, cities]);

  const getHereData = async() => {
    try {
      const result = await dispatch(hereMapSearchThunk({address: hereAddress})).unwrap();
      setHereAddressList(result?.data?.items);
    } catch (error) {
      setHereAddressList([]);
    }
  };

  useEffect(() => {
    if(hereAddress !== "") {
      getHereData();
    }
  }, [hereAddress]);
  
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
    if(countries?.length > 0 && countryName !== "") {
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
        // console.log("error...", err);
      })
  }, []);
  
  useEffect(() => {
    if(country?.iso2 !== undefined) {
      var config = {
        method: 'get',
        url: `https://api.countrystatecity.in/v1/countries/${country?.iso2}/states`,
        headers: {
          'X-CSCAPI-KEY': 'Nk5BN011UlE5QXZ6eXc1c05Id3VsSmVwMlhIWWNwYm41S1NRTmJHMA=='
        }
      };
      axios(config)
      .then(res => {
        setStates(res?.data);
      })
      .catch(err => {
        setStates([]);
        console.log("error...", err);
      })
    } else {
      setStates([]);
    }
  }, [country]);
  
  useEffect(() => {
    if(country?.iso2 !== undefined && state?.iso2 !== undefined) {
      var config = {
        method: 'get',
        url: `https://api.countrystatecity.in/v1/countries/${country?.iso2}/states/${state?.iso2}/cities`,
        headers: {
          'X-CSCAPI-KEY': 'Nk5BN011UlE5QXZ6eXc1c05Id3VsSmVwMlhIWWNwYm41S1NRTmJHMA=='
        }
      };
      axios(config)
      .then(res => {
        setCities(res?.data);
      })
      .catch(err => {
        setCities([]);
        console.log("error...", err);
      })
    } else {
      setCities([]);
    }
  }, [country, state]);

  const [loading, setLoading] = useState(false);

  const tableHeads = [
    {name: 'first_name', label: "First name", type: "text", required: false, placeholder: "Enter First name", },
    {name: 'last_name', label: "Last name", type: "text", required: false, placeholder: "Enter Last name", },
    {name: 'business_name', label: "Business Name", type: "text", required: false, placeholder: "Enter Business Name", },
    {name: 'address', label: "Street address", type: "text", required: false, placeholder: "Search Street address", },
    {name: 'country', label: "Region/Country", type: "dropdown", required: false, placeholder: "Select your Region", },
    {name: 'zipcode', label: "Zip code", type: "number", required: false, placeholder: "Enter Zip code", },
    {name: 'email', label: "Email address", type: "email", required: false, placeholder: "Enter Email address", },
    {name: 'phone_no', label: "Business phone number", type: "text", required: false, placeholder: "Enter Business phone number", },
    {name: 'password', label: "Password", type: "password", required: false, placeholder: "Enter Password", },
    {name: 'c_password', label: "Confirm Password", type: "password", required: false, placeholder: "Enter Confirm Password", },
  ];

  const updateCustomer = e => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };
  
  const updateCustomerName = (e) => {
    const value = e.target.value;
    const filteredValue = value.replace(/[^a-zA-Z\s]/g, "");
    setCustomer({
      ...customer,
      [e.target.name]: filteredValue,
    })
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
    setCustomer((prevData) => ({ ...prevData, phone_no: value }));
  };
  
  const validateForm = () => {
    for (const key in customer) {
      if(key === "address") {
        if(customer?.address === "" || customer?.address === null || customer?.address === undefined) {
          return false;
        }
      } else {
        if (customer[key].trim() === '') {
          return false;
        }
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
              phone_no: customer?.phone_no,
              first_name: customer?.first_name,
              last_name: customer?.last_name,
              business_name: customer?.business_name,
              country: customer?.country,
              address: customer?.address,
              state: customer?.state,
              city: customer?.city,
              zipcode: customer?.zipcode
            })).unwrap();
            // console.log("result...", result);
            navigate("/otp?mode=signup", { state: {customer_id: result?.customer_id, from: "registration", data: customer} });
          } catch (error) {
            
            toast.error(error?.message || "Error");
            setLoading(false);
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
      <button
        type="button"
        onClick={() => {navigate(-1)}}
      >
        <div className="flex gap-1 heads-center cursor-pointer">
          <IoIosArrowBack className="w-4 h-4" />
          <p className="text-greenbase">Back to previous page</p>
        </div>
      </button>

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
                  if(head.name === "country") {
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
                          name="country"
                          required
                          className='border border-[#E4E4E4] rounded-[10px] h-[54px] mt-[-9px] pl-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                          onChange={e => {
                            setCustomer({
                              ...customer,
                              country: ''
                            });
                            setCountryName(e.target.value);
                          }}
                          placeholder={head?.placeholder}
                          value={countryName || customer[head.name]}
                          onFocus={() => {setCountryDropdownOpen(true)}}
                        />
                        <IoMdArrowDropdown className={`absolute right-3 top-8 pointer-events-none ${countryDropdownOpen ? "rotate-180" : ""}`} />
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
                                        country: country?.name,
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
                } else if(head.name === "phone_no") {
                  return (
                    <div className="relative !w-full mb-2 pl-[6px] pr-2 !pb-[2px] !pt-[6px] sm:col-span-1 col-span-2 mt-2">
                      <PhoneInput
                        country={country?.iso2?.toLowerCase() || "us"}
                        value={customer?.phone_no}
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
                        htmlFor="phone_no"
                        className="absolute bg-white -top-3 left-3 text-gray-500 transition-all duration-300 ease-in-out origin-top-left peer-placeholder-shown:text-gray-400 peer-focus:text-blue-600 peer-focus:text-sm"
                      >{head?.label}</label>
                    </div>
                  )
                } else if(head.name === "address") {
                  return (
                    <div
                      key={index}
                      className='flex flex-col px-2 mb-2  sm:col-span-1 col-span-2 relative'
                      ref={hereRef}
                    >
                      <label
                        className='float-left text-sm font-normal text-custom-gray ml-[18px] z-[1] bg-white w-fit px-2'
                      >{head.label}</label>
                      <input
                        type={head.type}
                        name={head.name}
                        required={head.required}
                        className='border border-[#E4E4E4] rounded-[10px] h-[54px] mt-[-9px] pl-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                        onChange={e => {
                          setHereAddress(e.target.value);
                          setHereData(null);
                        }}
                        placeholder={head?.placeholder}
                        value={hereAddress || customer?.address?.title}
                        onFocus={() => {setHereDropdownOpen(true)}}
                      />
                      <IoMdArrowDropdown className={`absolute right-3 top-8 pointer-events-none ${hereDropdownOpen ? "rotate-180" : ""}`} />
                      {
                        hereDropdownOpen && (
                          <div className="w-[95.5%] max-h-32 absolute mt-16 bg-[#E4E4E4] overflow-y-auto z-[100] px-2 border border-[#C9C9C9]">
                            {
                              hereAddressList?.map((address, idx) => (
                                <p
                                  key={idx}
                                  className="py-1 border-b border-[#C9C9C9] last:border-0 cursor-pointer"
                                  onClick={() => {
                                    setHereData(address);
                                    setHereAddress("");
                                    setHereDropdownOpen(false);
                                  }}
                                >{address?.title}</p>
                              ))
                            }
                          </div>
                        )
                      }
                    </div>
                  )
                } else if(head.name === "first_name" || head.name === "last_name") {
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
                        onChange={updateCustomerName}
                        placeholder={head?.placeholder}
                        value={customer[head.name]}
                      />
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
            <p>
              <span>I accept the{" "}</span>
              <button
                onClick={() => setShowModal(true)}
                className="font-medium text-green-500 hover:text-green-800"
                data-testid="terms-conditions"
                type="button"
              >
                terms and conditions
              </button>
            </p>
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
