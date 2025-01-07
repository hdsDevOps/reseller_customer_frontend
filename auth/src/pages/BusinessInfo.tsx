import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { IoChevronBackSharp } from "react-icons/io5";
import "./cumtel.css";
import { useAppDispatch } from "store/hooks";
import axios from "axios";
import { udpateBusinessDataThunk } from "store/user.thunk";
import { toast } from "react-toastify";

//user_id, first_name, last_name, email, phone_no, address, state, city, country, password, business_name, business_state, business_city, business_zip_code

const BusinessInfo: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const stateRef = useRef(null);
  const cityRef = useRef(null);

  console.log("state....", location.state);

  useEffect(() => {
    if(!location.state) {
      navigate('/');
    }
  }, [location.state]);

  const [formData, setFormData] = useState(location.state.formData);
  console.log("form data...", formData);
  const region = location.state.formData.region;
  
  const [stateName, setStateName] = useState("");
  const [cityName, setCityName] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCitites] = useState([]);
  const [country, setCountry] = useState({});
  const [state, setState] = useState({});
  const [city, setCity] = useState({});
  // console.log({countries, states, cities});
  // console.log({country, state, city});

  useEffect(() => {
    const countryFind = countries?.find(item => item?.name === region);
    setCountry(countryFind || {});
  }, [countries, region])

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

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideState);
    document.addEventListener('mousedown', handleClickOutsideCity);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideState);
      document.removeEventListener('mousedown', handleClickOutsideCity);
    };
  }, []);

  useEffect(() => {
    if(states.length > 0 && stateName !== "") {
      setStateDropdownOpen(true);
    }
  }, [states, stateName]);

  useEffect(() => {
    if(cities.length > 0 && cityName !== "") {
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
        setCountries(res.data);
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
        setStates(res.data);
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
        setCitites(res.data);
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

  const handlePhoneChange = (value: string) => {
    setFormData((prevData) => ({ ...prevData, phone_no: value }));
  };

  const handleSubmit = async(e) => {
    // Handle form submission or navigate to another route
    // navigate("/adddomain");
    e.preventDefault();
    try {
      const result = await dispatch(udpateBusinessDataThunk({
        user_id: location.state.customer_id,
        first_name: location.state.formData.first_name,
        last_name: location.state.formData.last_name,
        email: location.state.formData.email,
        phone_no: formData?.phone_no,
        address: formData?.address,
        state: '',
        city: '',
        country: region,
        password: '',
        business_name: formData?.business_name,
        business_state: formData?.business_state,
        business_city: formData?.business_city,
        business_zip_code: formData?.business_zip_code,
        token: location.state.token
      })).unwrap();
      // console.log("result...", result);
      toast.success("Business Information updated successfully");
      navigate("/adddomain", {state: {customer_id: location.state.customer_id, formData: formData, license_usage: location.state.license_usage, plan: location.state.plan, period: location.state.period, token: location.state.token, from: 'business_info'}});
    } catch (error) {
      toast.error("Error updating Business Information");
    }
  };

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  useEffect(() => {
    if(
      formData?.business_name === "" || formData?.business_name?.trim() === "" ||
      formData?.address === "" || formData?.address?.trim() === "" ||
      formData?.business_city?.trim() === "" ||
      formData?.business_state?.trim() === "" ||
      formData?.business_zip_code === "" || formData?.business_zip_code?.trim() === "" ||
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
        onClick={() => navigate(-1)}
      >
        <IoChevronBackSharp /> Back to previous page
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 w-full max-w-2xl flex flex-col items-center justify-center gap-4 bg-white shadow-none border-gray-200 rounded-lg border-2 p-7"
      >
        <div className="pb-4 self-start">
          <h1 className="text-3xl font-semibold xsm-max:text-[16px]">
            Enter your business information
          </h1>
          <p className="xsm-max:text-sm">
          Enter your business information to register your domain
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
            placeholder="123 Main St"
            value={formData?.address}
            onChange={handleChange}
            className="peer form-input"
          />
          <label
            htmlFor="address"
            className="absolute bg-white -top-3 left-3 text-gray-500 transition-all duration-300 ease-in-out origin-top-left peer-placeholder-shown:text-gray-400 peer-focus:text-blue-600 peer-focus:text-sm"
          >
            Street Name
          </label>
        </div>

        <div className="relative w-full mb-2" ref={stateRef}>
          <input
            name="business_state"
            type="text"
            placeholder="State"
            value={formData?.business_state || stateName}
            required={states?.length > 0 ? true : false}
            onChange={(e) => {
              setFormData({
                ...formData,
                business_state: '',
                business_city: '',
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
            htmlFor="business_state"
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
                          business_state: state?.name,
                          business_city: ''
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
            name="business_city"
            type="text"
            placeholder="City"
            value={formData?.business_city || cityName}
            onChange={(e) => {
              setFormData({
                ...formData,
                business_city: '',
              })
              setCityName(e.target.value);
              setCity({});
            }}
            className="peer form-input"
            onFocus={() => setCityDropdownOpen(true)}
          />
          <label
            htmlFor="business_city"
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
                          business_city: city?.name,
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
            name="business_zip_code"
            type="number"
            placeholder="Zip Code"
            value={formData?.business_zip_code}
            onChange={handleChange}
            className="peer form-input"
          />
          <label
            htmlFor="business_zip_code"
            className="absolute bg-white -top-3 left-3 text-gray-500 transition-all duration-300 ease-in-out origin-top-left peer-placeholder-shown:text-gray-400 peer-focus:text-blue-600 peer-focus:text-sm"
          >
            Zip Code
          </label>
        </div>

        <div className="relative w-full mb-2">
          <PhoneInput
            country={"in"}
            value={formData?.phone_no}
            onChange={handlePhoneChange}
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
            disabled={isSubmitDisabled}
            className={`py-2 px-4 rounded-md text-white transition duration-200 ease-in-out ${
              isSubmitDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default BusinessInfo;
