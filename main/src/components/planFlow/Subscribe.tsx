import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { IoChevronBackSharp } from "react-icons/io5";
import { TfiPlus, TfiMinus } from "react-icons/tfi";
import "./cumtel.css"
import { useAppDispatch, useAppSelector } from "store/hooks";
import axios from "axios";
import { toast } from "react-toastify";
import { getProfileDataThunk, resgiterCustomerThunk, udpateProfileDataThunk } from "store/user.thunk";
import { setUserDetails } from "store/authSlice";

const Subscribe: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const { userDetails, staffStatus, staffId, customerId } = useAppSelector(state => state.auth);
  console.log("userDetails...", userDetails);
  
  useEffect(() => {
    const section = document.getElementById("top_subscribe");
    if(section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  })

  // console.log("state...", location.state);

  useEffect(() => {
    if(!location.state) {
      navigate('/');
    };
  }, [location.state]);

  const [isLoading, setIsLoading] = useState(false);

  const [step, setStep] = useState(1);
  const [ipCountry, setIpCountry] = useState("");

  useEffect(() => {
    // const getIpData = async() => {
    //   const response = await fetch('https://geolocation-db.com/json/');
    //   const data = await response.json();
    //   console.log("first...", data);
    //   setIpCountry(data?.country_name);
    // };

    // getIpData();
  } , []);
  const [formData, setFormData] = useState<object|null>(null);
  console.log("form data...", formData);
  const [count, setCount] = useState(1);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState<Boolean>(false);
  const countryRef = useRef(null);
  const [countryName, setCountryName] = useState("");
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState({});
  // console.log("countries...", countries);
  // console.log("country...", country);
  const [isNumberValid, setIsNumberValid] = useState(false);
  console.log({isNumberValid});

  useEffect(() => {
    if(userDetails !== null) {
      setFormData({...userDetails});
    }
  }, [userDetails?.business_name, userDetails?.country, userDetails?.first_name, userDetails?.last_name, userDetails?.email, userDetails?.phone_no]);
  
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
      if(userDetails?.phone_no === formData?.phone_no) {
        setIsNumberValid(true);
      }
    }, [userDetails, formData]);

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
        console.log(res.data);
      })
      .catch(err => {
        setCountries([]);
        console.log("error...", err);
      })
  }, []);

  // useEffect(() => {
  //   if(countries?.length > 0 && ipCountry !== "") {
  //     const foundIpCountry = countries?.find((count) => count?.name?.toLowerCase() === ipCountry?.toLowerCase());
  //     if(foundIpCountry) {
  //       setFormData({
  //         ...formData,
  //         country: foundIpCountry?.name,
  //       });
  //       setCountry(foundIpCountry);
  //     }
  //   }
  // }, [countries, ipCountry]);

  useEffect(() => {
    if(countries?.length > 0 && formData?.country !== "") {
      const foundIpCountry = countries?.find((count) => count?.name?.toLowerCase() === formData?.country?.toLowerCase());
      if(foundIpCountry) {
        // setFormData({
        //   ...formData,
        //   country: foundIpCountry?.name,
        // });
        setCountry(foundIpCountry);
      }
    }
  }, [countries, formData !== null]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleChangeName = (e) => {
    const value = e.target.value;
    const filteredValue = value.replace(/[^a-zA-Z\s]/g, "");
    setFormData({
      ...formData,
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
    setFormData((prevData) => ({ ...prevData, phone_no: value }));
  };

  const increment = () => setCount(count <10 ? count + 1 : count)
  const decrement = () => setCount(count > 1 ? count - 1 : 1); // Ensure count doesn't go below 1

  const handleNext = () => {
    setIsLoading(true);
    if (step === 1 && formData?.business_name && formData?.country) {
      setStep(2);
      setIsLoading(false);
    } else if (step === 2) {
      navigate("/subscribeotp");
      
      // Handle form submission or final step logic here
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    } else {
      navigate(-1);
    }
  };

  const [isNextDisabled, setIsNextDisabled] = useState(false);
  useEffect(() => {
    if(step === 1) {
      if(
        formData?.business_name === "" || formData?.business_name?.trim() === "" ||
        formData?.country === "" || formData?.country?.trim() === ""
      ){
        setIsNextDisabled(true);
      } else {
        setIsNextDisabled(false);
      }
    } else {
      if(
        formData?.first_name === "" || formData?.first_name?.trim() === "" ||
        formData?.last_name === "" || formData?.last_name?.trim() === "" ||
        formData?.email === "" || formData?.email?.trim() === "" ||
        formData?.phone_no === "" || formData?.phone_no?.trim() === ""
      ){
        setIsNextDisabled(true);
      } else {
        setIsNextDisabled(false);
      }
    }
  }, [step, formData]);

  const getProfileData = async() => {
    try {
      const result = await dispatch(getProfileDataThunk({user_id: customerId, staff_id: staffId, is_staff: staffStatus})).unwrap();
      console.log("result...", result);
      await dispatch(setUserDetails(result?.customerData));
    } catch (error) {
      //
    }
  };

  const handleSubscribeSubmit = async(e) => {
    e.preventDefault();
    setIsLoading(true);
    if(isNumberValid) {
      try {
        const result = await dispatch(udpateProfileDataThunk({
          user_id: customerId,
          first_name: formData?.first_name,
          last_name: formData?.last_name,
          email: userDetails?.email,
          phone_no: formData?.phone_no,
          address: userDetails?.address,
          state: `${
            formData?.country === userDetails?.country
            ? userDetails?.state
            : ""
          }`,
          city: `${
            formData?.country === userDetails?.country
            ? userDetails?.city
            : ""
          }`,
          country: formData?.country,
          password: '',
          business_name: formData?.business_name,
          business_state: userDetails?.business_state,
          business_city: userDetails?.business_city,
          zipcode: `${
            formData?.country === userDetails?.country
            ? userDetails?.zipcode
            : ""
          }`,
          staff_id: staffId,
          is_staff: staffStatus
        })).unwrap();
        console.log("result...", result);
        await getProfileData();
        navigate('/business-information', { state: { ...location.state, license_usage: count }});
      } catch (error) {
        toast.error(error?.message || "Error updating information");
        setIsLoading(false);
      }
    } else {
      toast.warning("Please enter a valid phone number");
      setIsLoading(false);
    }
  }

  return (
    <div className="h-full w-full flex flex-col justify-center items-center gap-6 p-4 relative" id="top_subscribe">
        <p className="flex items-center gap-1 text-green-600 cursor-pointer absolute left-4 top-2" onClick={handleBack}>
          <IoChevronBackSharp /> Back to previous page
        </p>
      {step === 1 && (
        <div className="text-center mt-10">
          <h1 className="text-3xl font-bold">Let's Begin</h1>
          {/* <p className="mt-2 text-gray-600">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores,
            accusamus!
          </p> */}
        </div>
      )}

      {step === 1 && (
        <form action="" className="flex items-center justify-between flex-col w-full gap-20 xsm-max:flex xsm-max:flex-col xsm-max:gap-4">
          <div className="flex items-center gap-10 justify-center w-3/5 xsm-max:flex-col xsm-max:w-full">
            <div className="w-full flex flex-col">
              <label
                htmlFor="business_name"
                className="float-left text-sm font-normal text-custom-gray ml-[18px] bg-white w-fit px-2 z-10"
              >
                Business Name
              </label>
              <input
                id="business_name"
                type="text"
                placeholder="Enter business name"
                value={formData?.business_name}
                onChange={handleChange}
                name="business_name"
                className="border border-[#E4E4E4] rounded-[10px] h-[45px] mt-[-9px] pl-2 relative focus:outline-none w-full"
              />
            </div>

            <div className="w-full flex flex-col">
              <label
                className="float-left text-sm font-normal text-custom-gray ml-[18px] bg-white w-fit px-2 z-10"
              >
                Country
              </label>
              <input
                type="text"
                placeholder="Enter region name"
                value={countryName || formData?.country}
                onChange={e => {
                  setCountryName(e.target.value);
                  setFormData({
                    ...formData,
                    country: ''
                  });
                }}
                name="country"
                className="border border-[#E4E4E4] rounded-[10px] h-[45px] mt-[-9px] pl-4 relative focus:outline-none w-full"
                onFocus={() => {setCountryDropdownOpen(true)}}
              />
              {
                countryDropdownOpen && (
                  <div className="absolute mt-14 xl-custom:w-[28%] big:w-[27%] medium:w-[26%] md2:w-[26%] small-3:w-[94%] sm:w-[93%] small-2:w-[92%]  small-small:w-[90%] small:w-[88%] w-[85%] max-h-32 bg-[#E4E4E4] overflow-y-auto z-10 px-2 border border-[#8A8A8A1A] rounded-md">
                    {
                      countries?.filter(name => name?.name?.toLowerCase().includes(countryName?.toLowerCase())).map((country, index) => (
                        <p
                          key={index}
                          className="py-1 border-b border-[#C9C9C9] last:border-0 cursor-pointer"
                          onClick={() => {
                            setFormData({
                              ...formData,
                              country: country?.name,
                            });
                            setCountryName("");
                            setCountry(country);
                            setCountryDropdownOpen(false);
                          }}
                        >{country?.name}</p>
                      ))
                    }
                  </div>
                )
              }
            </div>
          </div>

          <div className="flex items-center w-3/5 gap-20 xsm-max:flex-col xsm-max:gap-10 xsm-max:w-full">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold xsm-max:text-[18px]">
              Number of employees, including you
            </h1>
            <p className="text-sm">
              Your first {location?.state?.plan?.trial_period} days are at no charge (limited to 10 users)
            </p>
          </div>

          <div className="flex items-center justify-center border-2 rounded-md  w-1/5 h-11 border-green-600 xsm-max:w-full">
            <button
              type="button"
              onClick={decrement}
              className="w-1/3 h-full flex items-center justify-center border-r border-transparent bg-transparent hover:bg-green-100 transition duration-200 ease-in-out"
            >
              <TfiMinus className="text-green-600 text-2xl" />
            </button>
            <div className="w-1/3 h-full flex items-center justify-center bg-gray-300 text-gray-700 text-lg font-medium">
              {count}
            </div>
            <button
              type="button"
              onClick={increment}
              className="w-1/3 h-full flex items-center justify-center border-l border-transparent bg-transparent hover:bg-green-100 transition duration-200 ease-in-out"
            >
              <TfiPlus className="text-green-600 text-2xl" />
            </button>
          </div>
          </div>

          <div className=" mt-6">
            <button
              type="button"
              onClick={handleNext}
              disabled={isNextDisabled}
              className={`py-2 px-4 rounded-md text-white transition duration-200 ease-in-out ${
                isNextDisabled
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              { isLoading ? "Loading..." : "Next"}
            </button>
          </div>
        </form>
      )}

      {step === 2 && (
        <form
          onSubmit={handleSubscribeSubmit}
          className="mt-4 flex flex-col items-center justify-center gap-4 bg-white border-gray-200 rounded-lg border-2 p-7"
        >
          <div className="pb-4">
            <h1 className="text-2xl font-semibold xsm-max:text-[18px]">
              What's your contact info?
            </h1>
            <p className="xsm-max:text-sm">
              You'll be the Google workspace account admin since you are
              creating the account.
            </p>
          </div>
          <div className="relative w-full mb-2">
            <input
              name="first_name"
              type="text"
              placeholder="Robert"
              value={formData?.first_name}
              onChange={handleChangeName}
              className="peer form-input"
            />
            <label
              htmlFor="first_name"
              className="absolute bg-white -top-3 left-3 text-gray-500 transition-all duration-300 ease-in-out origin-top-left peer-placeholder-shown:text-gray-400 peer-focus:text-blue-600 peer-focus:text-sm"
            >
              First Name
            </label>
          </div>

          <div className="relative w-full mb-2">
            <input
              name="last_name"
              type="text"
              placeholder="Clive"
              value={formData?.last_name}
              onChange={handleChangeName}
              className="peer form-input"
            />
            <label
              htmlFor="last_name"
              className="absolute bg-white -top-3 left-3 text-gray-500 transition-all duration-300 ease-in-out origin-top-left peer-placeholder-shown:text-gray-400 peer-focus:text-blue-600 peer-focus:text-sm"
            >
              Last Name
            </label>
          </div>

          <div className="relative w-full mb-2">
            <input
              name="email"
              type="email"
              placeholder="robertclive@gmail.com"
              value={formData?.email}
              // onChange={handleChange}
              disabled
              className="peer form-input"
            />
            <label
              htmlFor="email"
              className="absolute bg-white -top-3 left-3 text-gray-500 transition-all duration-300 ease-in-out origin-top-left peer-placeholder-shown:text-gray-400 peer-focus:text-blue-600 peer-focus:text-sm"
            >
              Current Email Address
            </label>
          </div>

          <div className="relative w-full mb-2">
            <div className="relatve"></div>
            <PhoneInput
              value={formData?.phone_no}
              onChange={(inputPhone, countryData, event, formattedValue) => {
                handlePhoneChange(inputPhone);
                if(countryData?.format?.length === formattedValue?.length) {
                  const newValue = removePrefix(inputPhone, countryData?.dialCode);
                  console.log({inputPhone, countryData, formattedValue})
                  if (newValue.startsWith('0')) {
                    setIsNumberValid(false);
                  } else {
                    setIsNumberValid(true);
                  }
                } else {
                  setIsNumberValid(false);
                }
              }}
              inputClass="react-tel-input outline-none"
              dropdownClass="peer"
              containerClass="relative outline-none w-full"
            />
            <label
              htmlFor="phone"
              className="absolute bg-white -top-3 left-3 text-gray-500 transition-all duration-300 ease-in-out origin-top-left peer-placeholder-shown:text-gray-400 peer-focus:text-blue-600 peer-focus:text-sm"
            >
              Business Phone Number
            </label>
          </div>

          <div className="col-span-2 flex justify-between mt-6">
            
            <button
              type="submit"
              disabled={isNextDisabled}
              className={`py-2 px-4 rounded-md text-white transition duration-200 ease-in-out ${
                isNextDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              { isLoading ? "Loading..." : "Submit"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Subscribe;
