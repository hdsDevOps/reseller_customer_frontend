import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { IoChevronBackSharp } from "react-icons/io5";
import "./cumtel.css";
import { useAppDispatch, useAppSelector } from "store/hooks";
import axios from "axios";
import { getProfileDataThunk, hereMapSearchThunk, udpateProfileDataThunk } from "store/user.thunk";
import { toast } from "react-toastify";
import { setUserDetails } from "store/authSlice";

//user_id, first_name, last_name, email, phone_no, address, state, city, country, password, business_name, business_state, business_city, zipcode

const initialFormData = {
  
}

const BusinessInfo: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const stateRef = useRef(null);
  const cityRef = useRef(null);
  const hereRef = useRef(null);

  const { userDetails, customerId, staffId, staffStatus } = useAppSelector(state => state.auth);

  // console.log("userDetails...", userDetails);

  console.log("state....", location.state);

  useEffect(() => {
    if(!location.state) {
      navigate('/');
    }
  }, [location.state]);

  const [formData, setFormData] = useState<object|null>(null);
  console.log("form data...", formData);
  
  const [isNumberValid, setIsNumberValid] = useState(false);
  // console.log({isNumberValid});

  const [isLoading, setIsLoading] = useState(false);

  const [address, setAddress] = useState("");
  // console.log("address...", address);
  const [addressList, setAddressList] = useState([]);
  // console.log("addressList...", addressList);
  const [addressObject, setAddressObject] = useState<object|null>(null);
  console.log("addressObject...", addressObject);
  const [isAddressDropdownOpen, setIsAddressDropdownOpen] = useState(false);
  
  const [stateName, setStateName] = useState("");
  const [cityName, setCityName] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCitites] = useState([]);
  const [country, setCountry] = useState({});
  // console.log("country...", country);
  const [state, setState] = useState({});
  const [city, setCity] = useState({});
  console.log({countries, states, cities});
  console.log({country, state, city});

  useEffect(() => {
    if(userDetails !== null) {
      setFormData({...userDetails});
    }
  }, [userDetails]);

  useEffect(() => {
    const countryFind = countries?.find(item => item?.name === formData?.country);
    setCountry(countryFind || {});
  }, [countries, formData?.country]);

  useEffect(() => {
    const stateFind = states?.find(item => item?.name === formData?.state);
    setState(stateFind || {});
  }, [states, formData?.state]);

  useEffect(() => {
    const cityFind = cities?.find(item => item?.name === formData?.city);
    setCity(cityFind || {});
  }, [cities, formData?.city]);

  const [stateDropdownOpen, setStateDropdownOpen] = useState<Boolean>(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState<Boolean>(false);
  
  const handleClickOutsideState = (event: MouseEvent) => {
    if(stateRef.current && !stateRef.current.contains(event.target as Node)) {
      setStateDropdownOpen(false);
    }
  };
  const handleClickOutsideCity = (event: MouseEvent) => {
    if(cityRef.current && !cityRef.current.contains(event.target as Node)) {
      setCityDropdownOpen(false);
    }
  };
  const handleClickOutsideHere = (event: MouseEvent) => {
    if(hereRef.current && !hereRef.current.contains(event.target as Node)) {
      setCityDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideState);
    document.addEventListener('mousedown', handleClickOutsideCity);
    document.addEventListener('mousedown', handleClickOutsideHere);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideState);
      document.removeEventListener('mousedown', handleClickOutsideCity);
      document.removeEventListener('mousedown', handleClickOutsideHere);
    };
  }, []);

  useEffect(() => {
    if(states?.length > 0 && stateName !== "") {
      setStateDropdownOpen(true);
    }
  }, [states, stateName]);

  useEffect(() => {
    if(cities?.length > 0 && cityName !== "") {
      setCityDropdownOpen(true);
    }
  }, [cities, cityName]);

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
        setCountries(res?.data);
        // console.log(res.data);
      })
      .catch(err => {
        setCountries([]);
        console.log("error...", err);
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
        setCitites(res?.data);
      })
      .catch(err => {
        setCitites([]);
        console.log("error...", err);
      })
    } else {
      setCitites([]);
    }
  }, [country, state]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    if(addressObject !== null) {
      if(states?.length > 0) {
        const findState = states?.find(state => state?.name?.toLowerCase()?.includes(addressObject?.address?.state?.toLowerCase()));
        console.log("findState...", findState);
        setState(findState);
        setCity({});
        setStateName("");
        setCityName("");
        setFormData({
          ...formData,
          state: findState?.name,
          city: ''
        });
      }
    }
  }, [addressObject, states]);

  useEffect(() => {
    if(addressObject !== null) {
      if(cities?.length > 0) {
        const findCity = cities?.find(city => city?.name?.toLowerCase()?.includes(addressObject?.address?.city?.toLowerCase()));
        console.log("findCity...", findCity);
        setCity(findCity);
        setCityName("");
        setFormData({
          ...formData,
          city: findCity?.name
        });
      }
    }
  }, [addressObject, cities]);

  useEffect(() => {
    if(addressList?.length > 0 && address?.length > 0) {
      setIsAddressDropdownOpen(true);
    } else {
      setIsAddressDropdownOpen(false);
    }
  }, [addressList, address]);

  const findAddress = async(address:string) => {
    try {
      const result = await dispatch(hereMapSearchThunk({address: address})).unwrap();
      // console.log("result...", result);
      setAddressList(result?.data?.items);
    } catch (error) {
      setAddressList([]);
      // console.log(error);
    }
  };

  useEffect(() => {
    if(address?.length > 0) {
      findAddress(address);
    } else {
      if(userDetails?.address !== null || userDetails?.address !== undefined || userDetails?.address !== "") {
        findAddress(userDetails?.address);
      }
    }
  }, [userDetails?.address, address]);

  const removePrefix = (input:string, prefix:string) => {
    if(input?.startsWith(prefix)) {
      return input?.slice(prefix.length);
    } else if(input?.startsWith('0')) {
      return input?.slice(1);
    }
    return input;
  };

  const handlePhoneChange = (value: string) => {
    setFormData((prevData) => ({ ...prevData, phone_no: value }));
  };

  useEffect(() => {
    if(userDetails?.phone_no === formData?.phone_no) {
      setIsNumberValid(true);
    }
  }, [userDetails]);
  
  const getProfileData = async() => {
    try {
      const result = await dispatch(getProfileDataThunk({user_id: customerId, staff_id: staffId, is_staff: staffStatus})).unwrap();
      console.log("result...", result);
      await dispatch(setUserDetails(result?.customerData));
    } catch (error) {
      //
    }
  };

  const handleSubmit = async(e) => {
    // Handle form submission or navigate to another route
    // navigate("/adddomain");
    e.preventDefault();
    setIsLoading(true);
    if(userDetails?.phone_no === formData?.phone_no || isNumberValid) {
      try {
        const result = await dispatch(udpateProfileDataThunk({
          user_id: customerId,
          first_name: userDetails?.first_name,
          last_name: userDetails?.last_name,
          email: userDetails?.email,
          phone_no: formData?.phone_no,
          address: formData?.address,
          state: formData?.state,
          city: formData?.city,
          country: userDetails?.country,
          password: '',
          business_name: formData?.business_name,
          business_state: userDetails?.business_state,
          business_city: userDetails?.business_city,
          zipcode: formData?.zipcode,
          staff_id: "",
          is_staff: false
        })).unwrap();
        // console.log("result...", result);
        await getProfileData();
        toast.success("Business Information updated successfully");
        setIsLoading(false);
        if(location.state.from === "dashboard") {
          navigate("/choose-your-domain", {state: { ...location.state}});
        } else if(location.state.from === "home") {
          navigate("/free-trial-page", {state: { ...location.state}});
        }
      } catch (error) {
        setIsLoading(true);
        toast.error(error?.message || "Error updating Business Information");
      }
    } else {
      setIsLoading(true);
      toast.warning("Please enter a valid phone number");
    }
  };

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  useEffect(() => {
    if(
      formData?.business_name === "" || formData?.business_name?.trim() === "" ||
      formData?.address === "" || formData?.address === null || formData?.address === undefined ||
      formData?.city?.trim() === "" ||
      formData?.state?.trim() === "" ||
      formData?.zipcode === "" || formData?.zipcode?.trim() === "" ||
      formData?.phone_no === "" || formData?.phone_no?.trim() === ""
    ) {
      setIsSubmitDisabled(true)
    } else {
      setIsSubmitDisabled(false);
    }
  }, [formData]);

  return (
    <div className="h-full w-full flex flex-col justify-center items-center gap-6 p-4 relative">
      <p
        className="flex items-center gap-1 text-green-600 cursor-pointer absolute left-4 top-2"
        onClick={() => navigate('/subscribe-plan', {state: {...location.state, step: 2}})}
      >
        <IoChevronBackSharp /> Back to previous page
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 w-full max-w-2xl flex flex-col items-center justify-center gap-4 bg-white shadow-none border-gray-200 rounded-lg border-2 p-7"
      >
        <div className="pb-4 self-start">
          <h1 className="text-3xl font-semibold xsm-max:text-[16px]">
            Add more information
          </h1>
          <p className="xsm-max:text-sm">
            Enter your information to register your domain
          </p>
        </div>

        <div className="relative w-full mb-2">
          <input
            name="business_name"
            type="text"
            placeholder="Business Name"
            value={formData?.business_name}
            onChange={handleChange}
            className="peer form-input"
          />
          <label
            htmlFor="business_name"
            className="absolute bg-white -top-3 left-3 text-gray-500 transition-all duration-300 ease-in-out origin-top-left peer-placeholder-shown:text-gray-400 peer-focus:text-blue-600 peer-focus:text-sm"
          >
            Business Name
          </label>
        </div>

        <div className="relative w-full mb-2">
          <input
            name="address"
            type="text"
            placeholder="Enter your address"
            value={formData?.address?.title || address}
            onChange={(e) => {
              setFormData({
                ...formData,
                address: null
              });
              setAddress(e.target.value);
            }}
            className="peer form-input"
          />
          <label
            htmlFor="address"
            className="absolute bg-white -top-3 left-3 text-gray-500 transition-all duration-300 ease-in-out origin-top-left peer-placeholder-shown:text-gray-400 peer-focus:text-blue-600 peer-focus:text-sm"
          >
            Street Name
          </label>
          {
            isAddressDropdownOpen && (
              <div className='w-full max-h-32 absolute mt-0 bg-[#E4E4E4] overflow-y-auto z-[100] px-2 border border-[#8A8A8A1A] rounded-md' cypress-name="address-dropdown">
                {
                  addressList?.map((addressItem, idx) => (
                    <p
                      key={idx}
                      className="py-1 border-b border-[#C9C9C9] last:border-0 cursor-pointer"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          address: addressItem,
                          zipcode: addressItem?.address?.postalCode,
                        });
                        setAddressObject(addressItem);
                        setAddress("");
                        setIsAddressDropdownOpen(false);
                      }}
                    >{addressItem?.address?.label}</p>
                  ))
                }
              </div>
            )
          }
        </div>

        <div className="relative w-full mb-2" ref={stateRef}>
          <input
            name="state"
            type="text"
            placeholder="State"
            value={formData?.state || stateName}
            required={states?.length > 0 ? true : false}
            onChange={(e) => {
              setFormData({
                ...formData,
                state: '',
                city: '',
              })
              setStateName(e.target.value);
              setCityName('');
              setState({});
              setCity({});
            }}
            className="peer form-input"
            onFocus={() => {setStateDropdownOpen(true)}}
          />
          <label
            htmlFor="state"
            className="absolute bg-white -top-3 left-3 text-gray-500 transition-all duration-300 ease-in-out origin-top-left peer-placeholder-shown:text-gray-400 peer-focus:text-blue-600 peer-focus:text-sm"
          >
            State
          </label>
          {
            stateDropdownOpen && (
              <div className='w-full max-h-32 absolute mt-0 bg-[#E4E4E4] overflow-y-auto z-[100] px-2 border border-[#8A8A8A1A] rounded-md'>
                {
                  states?.filter(name => name?.name?.toLowerCase().includes(stateName.toLowerCase())).map((state, idx) => (
                    <p
                      key={idx}
                      className="py-1 border-b border-[#C9C9C9] last:border-0 cursor-pointer"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          state: state?.name,
                          city: ''
                        });
                        setStateName('');
                        setCityName('');
                        setState(state);
                        setCity({});
                        setStateDropdownOpen(false);
                      }}
                    >{state?.name}</p>
                  ))
                }
              </div>
            )
          }
        </div>

        <div className="relative w-full mb-2" ref={cityRef}>
          <input
            name="city"
            type="text"
            placeholder="City"
            value={formData?.city || cityName}
            onChange={(e) => {
              setFormData({
                ...formData,
                city: '',
              })
              setCityName(e.target.value);
              setCity({});
            }}
            className="peer form-input"
            onFocus={() => setCityDropdownOpen(true)}
          />
          <label
            htmlFor="city"
            className="absolute bg-white -top-3 left-3 text-gray-500 transition-all duration-300 ease-in-out origin-top-left peer-placeholder-shown:text-gray-400 peer-focus:text-blue-600 peer-focus:text-sm"
          >
            City*
          </label>
          {
            cityDropdownOpen && (
              <div className='w-full max-h-32 absolute mt-0 bg-[#E4E4E4] overflow-y-auto z-[100] px-2 border border-[#8A8A8A1A] rounded-md'>
                {
                  cities?.filter(name => name?.name?.toLowerCase().includes(cityName.toLowerCase())).map((city, idx) => (
                    <p
                      key={idx}
                      className="py-1 border-b border-[#C9C9C9] last:border-0 cursor-pointer"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          city: city?.name,
                        });
                        setCityName('');
                        setCity(city);
                        setCityDropdownOpen(false);
                      }}
                    >{city?.name}</p>
                  ))
                }
              </div>
            )
          }
        </div>

        <div className="relative w-full mb-2">
          <input
            name="zipcode"
            type="number"
            placeholder="Zip Code"
            value={formData?.zipcode}
            onChange={handleChange}
            className="peer form-input"
          />
          <label
            htmlFor="zipcode"
            className="absolute bg-white -top-3 left-3 text-gray-500 transition-all duration-300 ease-in-out origin-top-left peer-placeholder-shown:text-gray-400 peer-focus:text-blue-600 peer-focus:text-sm"
          >
            Zip Code
          </label>
        </div>

        <div className="relative w-full mb-2">
          <PhoneInput
            country={"in"}
            value={formData?.phone_no}
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
            inputClass="react-tel-input outline-none"
            dropdownClass="peer"
            containerClass="relative outline-none w-full"
          />
          <label
            htmlFor="phone_no"
            className="absolute bg-white -top-3 left-3 text-gray-500 transition-all duration-300 ease-in-out origin-top-left peer-placeholder-shown:text-gray-400 peer-focus:text-blue-600 peer-focus:text-sm"
          >
            Phone Number
          </label>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            disabled={isLoading}
            className={`py-2 px-4 rounded-md text-white transition duration-200 ease-in-out ${
              isSubmitDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {
              isLoading ? "Loading..." : "Submit"
            }
          </button>
        </div>
      </form>
    </div>
  );
};

export default BusinessInfo;
