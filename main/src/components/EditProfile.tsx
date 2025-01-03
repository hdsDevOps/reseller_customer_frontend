import React, { useEffect, useRef, useState } from 'react'
import { MdOutlineClose } from "react-icons/md";
import { PiEyeClosedBold } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { removeUserAuthTokenFromLSThunk, udpateProfileDataThunk } from 'store/user.thunk';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { setUserDetails } from 'store/authSlice';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from 'axios';

interface EditProfileProps  {
    handleCloseShowModal: () => void; 
  };
const EditProfile = ({handleCloseShowModal}:EditProfileProps,) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { userDetails, customerId } = useAppSelector(state => state.auth);

    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");

    const [data, setData] = useState(userDetails);
    console.log("data...", data);

    const handleChangeData = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const [phoneNumber,setPhoneNumber] = useState();
    const [phoneCode,setPhoneCode] = useState('+1');
    const [countryName, setCountryName] = useState("");
    const [stateName, setStateName] = useState("");
    const [cityName, setCityName] = useState("");
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCitites] = useState([]);
    const [country, setCountry] = useState({});
    const [state, setState] = useState({});
    const [city, setCity] = useState({});
    // console.log({country, state, city});
    // console.log("countries...", countries);
    // console.log("states...", states);
    // console.log("cities...", cities);
    // console.log({countryName, stateName, cityName});
    const countryRef = useRef();
    const stateRef = useRef();
    const cityRef = useRef();
    const businessStateRef = useRef();
    const businessCityRef = useRef();

    const [businessStateName, setBusinessStateName] = useState("");
    const [businessCityName, setBusinessCityName] = useState("");
    const [businessStates, setBusinessStates] = useState([]);
    const [businessCities, setBusinessCities] = useState([]);
    const [businessCountry, setBusinessCountry] = useState({});
    const [businessState, setBusinessState] = useState({});
    const [businessCity, setBusinessCity] = useState({});
    const [businessStateDropdownOpen, setBusinessStateDropdownOpen] = useState<Boolean>(false);
    const [businessCityDropdownOpen, setBusinessCityDropdownOpen] = useState<Boolean>(false);
  
    const [countryDropdownOpen, setCountryDropdownOpen] = useState<Boolean>(false);
    const [stateDropdownOpen, setStateDropdownOpen] = useState<Boolean>(false);
    const [cityDropdownOpen, setCityDropdownOpen] = useState<Boolean>(false);
    // console.log("isDropdownOpen", isDropdownOpen);
    
    const handleClickOutsideCountry = (event: MouseEvent) => {
      if(countryRef.current && !countryRef.current.contains(event.target as Node)) {
        setCountryDropdownOpen(false);
      }
    };
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
    const handleClickOutsideBusinessState = (event: MouseEvent) => {
        if(businessStateRef.current && !businessStateRef.current.contains(event.target as Node)) {
          setBusinessStateDropdownOpen(false);
        }
    };
    const handleClickOutsideBusinessCity = (event: MouseEvent) => {
        if(businessCityRef.current && !businessCityRef.current.contains(event.target as Node)) {
          setBusinessCityDropdownOpen(false);
        }
    };
  
    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutsideCountry);
      document.addEventListener('mousedown', handleClickOutsideState);
      document.addEventListener('mousedown', handleClickOutsideCity);
      document.addEventListener('mousedown', handleClickOutsideBusinessState);
      document.addEventListener('mousedown', handleClickOutsideBusinessCity);
      return () => {
        document.removeEventListener('mousedown', handleClickOutsideCountry);
        document.removeEventListener('mousedown', handleClickOutsideState);
        document.removeEventListener('mousedown', handleClickOutsideCity);
        document.removeEventListener('mousedown', handleClickOutsideBusinessState);
        document.removeEventListener('mousedown', handleClickOutsideBusinessCity);
      };
    }, []);
  
    useEffect(() => {
      if(countries.length > 0 && countryName !== "") {
        setCountryDropdownOpen(true);
      }
    }, [countries, countryName]);
  
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
      if(businessStates.length > 0 && businessStateName !== "") {
        setBusinessCityDropdownOpen(true);
      }
    }, [businessStates, businessStateName]);
  
    useEffect(() => {
      if(businessCities.length > 0 && businessCityName !== "") {
        setBusinessCityDropdownOpen(true);
      }
    }, [businessCities, businessCityName]);

    const handlePhoneChange = (value: string) => {
      setData((prevData) => ({ ...prevData, phone_no: value }));
    };
  
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

    useEffect(() => {
        if(data?.business_country === undefined || data?.business_country === null || data?.business_country === "") {
            const foundCountry = countries?.find(country => country?.name === data?.country)
            setBusinessCountry(foundCountry === undefined ? {} : foundCountry);
        } else {
            const foundCountry = countries?.find(country => country?.name === data?.business_country)
            setBusinessCountry(foundCountry === undefined ? {} : foundCountry);
        }
    }, [data?.business_country, data?.country, countries]);
      
    useEffect(() => {
        if(businessCountry?.iso2 !== undefined) {
            var config = {
            method: 'get',
            url: `https://api.countrystatecity.in/v1/countries/${businessCountry?.iso2}/states`,
            headers: {
                'X-CSCAPI-KEY': 'Nk5BN011UlE5QXZ6eXc1c05Id3VsSmVwMlhIWWNwYm41S1NRTmJHMA=='
            }
            };
            axios(config)
                .then(res => {
                    setBusinessStates(res.data);
                })
                .catch(err => {
                    setBusinessStates([]);
                    console.log("error...", err);
                })
        } else {
            setBusinessStates([]);
        }
    }, [businessCountry]);
      
    useEffect(() => {
        if(businessCountry?.iso2 !== undefined && businessState?.iso2 !== undefined) {
            var config = {
                method: 'get',
                url: `https://api.countrystatecity.in/v1/countries/${businessCountry?.iso2}/states/${businessState?.iso2}/cities`,
                headers: {
                    'X-CSCAPI-KEY': 'Nk5BN011UlE5QXZ6eXc1c05Id3VsSmVwMlhIWWNwYm41S1NRTmJHMA=='
                }
            };
            axios(config)
                .then(res => {
                    setBusinessCities(res.data);
                })
                .catch(err => {
                    setBusinessCities([]);
                    console.log("error...", err);
                })
        } else {
            setBusinessCities([]);
        }
    }, [businessCountry, businessState]);

    const validateForm = () => {
        if(
            data?.first_name === "" || data?.first_name?.trim() === "" ||
            data?.last_name === "" || data?.last_name?.trim() === "" ||
            data?.email === "" || data?.email?.trim() === "" ||
            data?.phone_no === "" || data?.phone_no?.trim() === "" ||
            data?.address === "" || data?.address?.trim() === "" ||
            data?.state === "" || data?.state?.trim() === "" ||
            data?.city === "" || data?.city?.trim() === "" ||
            data?.country === "" || data?.country?.trim() === "" ||
            data?.business_name === "" || data?.business_name?.trim() === "" ||
            data?.business_state === "" || data?.business_state?.trim() === "" ||
            data?.business_city === "" || data?.business_city?.trim() === "" ||
            data?.business_zip_code === "" || data?.business_zip_code?.trim() === ""
        ) {
            return false;
        }
        return true;
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            if(confirmPassword !== "") {
                if(data?.password !== confirmPassword) {
                    toast.warning("Password and Confirm Password do not mathc");
                } else {
                    if(validateForm()) {
                        const result = await dispatch(udpateProfileDataThunk({
                            user_id: customerId,
                            first_name: data?.first_name,
                            last_name: data?.last_name,
                            email: data?.email,
                            phone_no: data?.phone_no,
                            address: data?.address,
                            state: data?.state,
                            city: data?.city,
                            country: data?.country,
                            password: data?.password,
                            business_name: data?.business_name,
                            business_state: data?.business_state,
                            business_city: data?.business_city,
                            business_zip_code: data?.business_zip_code
                        })).unwrap();
                        console.log("result...", result);
                    } else {
                        toast.warning("Input fields cannot be empty");
                    }
                }
            } else {
                if(validateForm()) {
                    const result = await dispatch(udpateProfileDataThunk({
                        user_id: customerId,
                        first_name: data?.first_name,
                        last_name: data?.last_name,
                        email: data?.email,
                        phone_no: data?.phone_no,
                        address: data?.address,
                        state: data?.state,
                        city: data?.city,
                        country: data?.country,
                        business_name: data?.business_name,
                        business_state: data?.business_state,
                        business_city: data?.business_city,
                        business_zip_code: data?.business_zip_code
                    })).unwrap();
                    toast.success(result?.message);
                    handleCloseShowModal();
                    await dispatch(setUserDetails(data));
                } else {
                    toast.warning("Input fields cannot be empty");
                }
            }
        } catch (error) {
            handleCloseShowModal();
            toast.error("Error updating profile");
            console.log(error)
            if(error?.message == "Invalid token") {
                try {
                    const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
                    navigate('/login');
                } catch (error) {
                //
                }
            }
        }
    }
   
  return (
    <div className='bg-slate-900/20   fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer'>
        <div className='bg-white w-full max-w-2xl flex flex-col  justify-center  pb-4  rounded-xl '>
            <div className="flex justify-between items-center pt-2 pb-3 px-6">
                <h3 className="text-[#0D121F] text-xl font-medium font-inter ">
                Edit your profile
                </h3>
                <MdOutlineClose onClick={handleCloseShowModal} size={24} />
            </div>
            <div className='border-[#000000] border-b'></div>
            <form onSubmit={handleSubmit} className='px-1'>
                <h2 className='text-lg font-bold text-[#14213D] mt-6'>Basic information</h2>
                <div className='grid xl:grid-cols-3 grid-cols-2 gap-3 mt-4 items-center'>
                    <div className="max-w-[378px] w-full sm:col-span-1 col-span-2 relative mx-auto">
                        <label
                            htmlFor="first_name"
                            className="absolute text-sm text-[#8A8A8A] font-inter duration-300 transform -translate-y-4 scale-75 top-2 origin-[0] bg-white px-2 left-2"
                        >First Name</label>
                        <input
                            type="text"
                            className="block px-2.5 pb-1 pt-2 w-full text-[#14213D] text-sm   bg-white rounded-[6px] border border-[#E4E4E4] appearance-none focus:outline-none placeholder:text-[#14213D] focus:ring-0 focus:border-black peer"
                            value={data?.first_name || "John"}
                            name='first_name'
                            onChange={handleChangeData}
                        />
                    </div>
                    <div className="max-w-[378px] w-full sm:col-span-1 col-span-2 relative mx-auto">
                        <input
                            type="text"
                            className="block px-2.5 pb-1 pt-2 w-full text-[#14213D] text-sm   bg-white rounded-[6px] border border-[#E4E4E4] appearance-none focus:outline-none placeholder:text-[#14213D] focus:ring-0 focus:border-black peer"
                            value={data?.last_name || "Doe"}
                            name='last_name'
                            onChange={handleChangeData}
                        />
                        <label
                            htmlFor="last_name"
                            className="absolute text-sm text-[#8A8A8A] font-inter duration-300 transform -translate-y-4 scale-75 top-2 origin-[0] bg-white px-2 left-2"
                        >Last Name</label>
                    </div>
                    <div className="max-w-[378px] w-full sm:col-span-1 col-span-2 relative mx-auto">
                        <input
                            type="text"
                            className="block px-2.5 pb-1 pt-2 w-full text-[#14213D] text-sm  bg-white rounded-[6px] border border-[#E4E4E4] appearance-none focus:outline-none placeholder:text-[#434D64] focus:ring-0 focus:border-black peer"
                            value={data?.email}
                            name='email'
                            onChange={handleChangeData}
                        />
                        <label
                            htmlFor="email"
                            className="absolute text-sm text-[#8A8A8A] font-inter duration-300 transform -translate-y-4 scale-75 top-2 origin-[0] bg-white px-2 left-2"
                        >Email</label>
                    </div>
                    <div className="!max-w-[378px] sm:col-span-1 col-span-2 mx-auto relative !w-full mb-2 !pb-1 !pt-[6px] mt-2">
                      <PhoneInput
                        country={country?.iso2?.toLowerCase() || "us"}
                        value={data?.phone_no}
                        onChange={handlePhoneChange}
                        inputClass="!w-full !outline-none !border-0"
                        dropdownClass="peer"
                        containerClass="relative !outline-none !w-full !border !border-[#E4E4E4] !rounded-[10px]"
                      />
                      <label
                        htmlFor="business_phone_number"
                        className="absolute bg-white -top-3 left-3 text-gray-500 transition-all duration-300 ease-in-out origin-top-left peer-placeholder-shown:text-gray-400 peer-focus:text-blue-600 peer-focus:text-sm"
                      >Phone Number</label>
                    </div>
                    <div className="max-w-[378px] w-full sm:col-span-1 col-span-2 relative mx-auto">
                        <input
                            type="text"
                            className="block px-2.5 pb-1 pt-2 w-full text-[#14213D] text-sm   bg-white rounded-[6px] border border-[#E4E4E4] appearance-none focus:outline-none placeholder:text-[#434D64] focus:ring-0 focus:border-black peer"
                            value={data?.address}
                            name='address'
                            onChange={handleChangeData}
                        />
                        <label
                            htmlFor="address"
                            className="absolute text-sm text-[#8A8A8A] font-inter duration-300 transform -translate-y-4 scale-75 top-2 origin-[0] bg-white px-2 left-2"
                        >Address</label>
                    </div>
                    <div className="max-w-[378px] w-full sm:col-span-1 col-span-2 relative mx-auto">
                        <input
                            type="text"
                            className="block px-2.5 pb-1 pt-2 w-full text-[#14213D] text-sm   bg-white rounded-[6px] border border-[#E4E4E4] appearance-none focus:outline-none placeholder:text-[#434D64] focus:ring-0 focus:border-black peer"
                            value={data?.country || countryName}
                            name='country'
                            onChange={e => {
                                setData({
                                    ...data,
                                    country: '',
                                    state_name: '',
                                    city: ''
                                });
                                setCountryName(e.target.value);
                                setStateName('');
                                setCityName('');
                                setCountry({});
                                setState({});
                                setCity({});
                            }}
                            onFocus={() => {setCountryDropdownOpen(true)}}
                        />
                        <label
                            htmlFor="country"
                            className="absolute text-sm text-[#8A8A8A] font-inter duration-300 transform -translate-y-4 scale-75 top-2 origin-[0] bg-white px-2 left-2"
                        >Country</label>
                        {
                          countryDropdownOpen && (
                            <div className='w-full max-h-32 absolute bg-[#E4E4E4] overflow-y-auto z-[10] px-2 border border-[#8A8A8A1A] rounded-md'>
                              {
                                countries?.filter(name => name?.name.toLowerCase().includes(countryName.toLowerCase())).map((country, idx) => (
                                  <p
                                    key={idx}
                                    className='py-1 border-b border-[#C9C9C9] last:border-0 cursor-pointer'
                                    dropdown-name="country-dropdown"
                                    onClick={() => {
                                      setData({
                                        ...data,
                                        country: country?.name
                                      });
                                      setCountryName("");
                                      setStateName("");
                                      setCityName("");
                                      setCountry(country);
                                      setState({});
                                      setCity({});
                                      setCountryDropdownOpen(false);
                                    }}
                                  >{country?.name}</p>
                                ))
                              }
                            </div>
                          )
                        }
                    </div>
                    <div className="max-w-[378px] w-full sm:col-span-1 col-span-2 relative mx-auto">
                        <input
                            type="text"
                            className="block px-2.5 pb-1 pt-2 w-full text-[#14213D] text-sm  bg-white rounded-[6px] border border-[#E4E4E4] appearance-none focus:outline-none placeholder:text-[#434D64] focus:ring-0 focus:border-black peer"
                            value={data?.state_name || stateName}
                            name='state_name'
                            onChange={e => {
                                setData({
                                  ...data,
                                  state_name: "",
                                  city: ""
                                });
                                setStateName(e.target.value);
                                setCityName("");
                                setState({});
                                setCity({});
                            }}
                            onFocus={() => {setStateDropdownOpen(true)}}
                        />
                        <label
                            htmlFor="state_name"
                            className="absolute text-sm text-[#8A8A8A] font-inter duration-300 transform -translate-y-4 scale-75 top-2 origin-[0] bg-white px-2 left-2"
                        >State</label>
                        {
                          stateDropdownOpen && (
                            <div className='lg:w-[97%] w-[95%] max-h-32 absolute bg-[#E4E4E4] overflow-y-auto z-[100] px-2 border border-[#8A8A8A1A] rounded-md'>
                              {
                                states?.filter(name => name?.name.toLowerCase().includes(stateName.toLowerCase())).map((region, idx) => (
                                  <p
                                    key={idx}
                                    className='py-1 border-b border-[#C9C9C9] last:border-0 cursor-pointer'
                                    onClick={() => {
                                      setData({
                                        ...data,
                                        state_name: region?.name,
                                        city: ""
                                      });
                                      setStateName("");
                                      setCityName("");
                                      setState(region);
                                      setCity({});
                                      setStateDropdownOpen(false);
                                    }}
                                    dropdown-name="state_dropdown"
                                  >{region?.name}</p>
                                ))
                              }
                            </div>
                          )
                        }
                    </div>
                    <div className="max-w-[378px] w-full sm:col-span-1 col-span-2 relative mx-auto">
                        <input
                            type="text"
                            className="block px-2.5 pb-1 pt-2 w-full text-[#14213D] text-sm  bg-white rounded-[6px] border border-[#E4E4E4] appearance-none focus:outline-none placeholder:text-[#434D64] focus:ring-0 focus:border-black peer"
                            value={data?.city || cityName}
                            name='city'
                            onChange={e => {
                                setData({
                                  ...data,
                                  city: ''
                                });
                                setCityName(e.target.value);
                                setCity({});
                            }}
                            onFocus={() => {setCityDropdownOpen(true)}}
                        />
                        <label
                            htmlFor="city"
                            className="absolute text-sm text-[#8A8A8A] font-inter duration-300 transform -translate-y-4 scale-75 top-2 origin-[0] bg-white px-2 left-2"
                        >City</label>
                        {
                          cityDropdownOpen && (
                            <div className='lg:w-[97%] w-[95%] max-h-32 absolute bg-[#E4E4E4] overflow-y-auto z-[100] px-2 border border-[#8A8A8A1A] rounded-md'>
                              {
                                cities?.filter(name => name?.name.toLowerCase().includes(cityName.toLowerCase())).map((city_name, idx) => (
                                  <p
                                    key={idx}
                                    className='py-1 border-b border-[#C9C9C9] last:border-0 cursor-pointer'
                                    onClick={() => {
                                      setData({
                                        ...data,
                                        city: city_name?.name
                                      });
                                      setCityName("");
                                      setCity(city_name);
                                      setCityDropdownOpen(false);
                                    }}
                                    dropdown-name="city-dropdown"
                                  >{city_name?.name}</p>
                                ))
                              }
                            </div>
                          )
                        }
                    </div>
                    <div className="max-w-[378px] w-full sm:col-span-1 col-span-2 relative mx-auto">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="block px-2.5 pb-1 pt-2 w-full text-[#14213D] text-sm  bg-white rounded-[6px] border border-[#E4E4E4] appearance-none focus:outline-none placeholder:text-[#434D64] focus:ring-0 focus:border-black peer"
                            name='password'
                            onChange={handleChangeData}
                        />
                        <label
                            htmlFor="password"
                            className="absolute text-sm text-[#8A8A8A] font-inter duration-300 transform -translate-y-4 scale-75 top-2 origin-[0] bg-white px-2 left-2"
                        >Password</label>
                        <button
                            type='button'
                            className='absolute right-2 -mt-[22px]'
                            onClick={() => {setShowPassword(!showPassword)}}
                        >
                            {
                                showPassword ?
                                (<FaEye className='w-5' />) : 
                                (<FaEyeSlash className='w-5' />)
                            }
                        </button>
                    </div>
                    <div className="max-w-[378px] w-full sm:col-span-1 col-span-2 relative mx-auto">
                        <input
                            type={showCPassword ? "text" : "password"}
                            className="block px-2.5 pb-1 pt-2 w-full text-[#14213D] text-sm  bg-white rounded-[6px] border border-[#E4E4E4] appearance-none focus:outline-none placeholder:text-[#434D64] focus:ring-0 focus:border-black peer"
                            name='confirm_password'
                            onChange={e => {setConfirmPassword(e.target.value)}}
                        />
                        <label
                            htmlFor="confirm_password"
                            className="absolute text-sm text-[#8A8A8A] font-inter duration-300 transform -translate-y-4 scale-75 top-2 origin-[0] bg-white px-2 left-2"
                        >Confirm Password</label>
                        <button
                            type='button'
                            className='absolute right-2 -mt-[22px]'
                            onClick={() => {setShowCPassword(!showCPassword)}}
                        >
                            {
                                showCPassword ?
                                (<FaEye className='w-5' />) : 
                                (<FaEyeSlash className='w-5' />)
                            }
                        </button>
                    </div>
                </div>
                <h2 className='text-lg font-bold text-[#14213D] mt-6'>Business information</h2>
                <div className='grid grid-cols-2 gap-3 mt-4 items-center'>
                    <div className="max-w-[378px] w-full sm:col-span-1 col-span-2 relative mx-auto">
                        <input
                            type="text"
                            className="block px-2.5 pb-2 pt-2 w-full text-[#14213D] text-sm   bg-white rounded-[6px] border border-[#E4E4E4] appearance-none focus:outline-none placeholder:text-[#14213D] focus:ring-0 focus:border-black peer"
                            value={data?.business_name}
                            name='business_name'
                            onChange={handleChangeData}
                        />
                        <label
                            htmlFor="business_name"
                            className="absolute text-sm text-[#8A8A8A] font-inter duration-300 transform -translate-y-4 scale-75 top-2 origin-[0] bg-white px-2 left-2"
                        >Business Name</label>
                    </div>
                    <div className="max-w-[378px] w-full sm:col-span-1 col-span-2 relative mx-auto">
                        <input
                            type="text"
                            className="block px-2.5 pb-2 pt-2 w-full text-[#14213D] text-sm   bg-white rounded-[6px] border border-[#E4E4E4] appearance-none focus:outline-none placeholder:text-[#14213D] focus:ring-0 focus:border-black peer"
                            value={data?.business_state || businessStateName}
                            name='business_state'
                            onChange={e => {
                                setData({
                                  ...data,
                                  business_state: "",
                                  business_city: ""
                                });
                                setBusinessStateName(e.target.value);
                                setBusinessCityName("");
                                setBusinessState({});
                                setBusinessCity({});
                            }}
                            onFocus={() => {setBusinessStateDropdownOpen(true)}}
                        />
                        <label
                            htmlFor="business_state"
                            className="absolute text-sm text-[#8A8A8A] font-inter duration-300 transform -translate-y-4 scale-75 top-2 origin-[0] bg-white px-2 left-2"
                        >Business State</label>
                        {
                          businessStateDropdownOpen && (
                            <div className='w-full max-h-32 absolute bg-[#E4E4E4] overflow-y-auto z-[100] px-2 border border-[#8A8A8A1A] rounded-md'>
                              {
                                businessStates?.filter(name => name?.name.toLowerCase().includes(businessStateName.toLowerCase())).map((region, idx) => (
                                  <p
                                    key={idx}
                                    className='py-1 border-b border-[#C9C9C9] last:border-0 cursor-pointer'
                                    onClick={() => {
                                      setData({
                                        ...data,
                                        business_state: region?.name,
                                        city: ""
                                      });
                                      setBusinessStateName("");
                                      setBusinessCityName("");
                                      setBusinessState(region);
                                      setBusinessCity({});
                                      setBusinessStateDropdownOpen(false);
                                    }}
                                    dropdown-name="state_dropdown"
                                  >{region?.name}</p>
                                ))
                              }
                            </div>
                          )
                        }
                    </div>
                    <div className="max-w-[378px] w-full sm:col-span-1 col-span-2 relative mx-auto">
                        <input
                            type="text"
                            className="block px-2.5 pb-2 pt-2 w-full text-[#14213D] text-sm   bg-white rounded-[6px] border border-[#E4E4E4] appearance-none focus:outline-none placeholder:text-[#14213D] focus:ring-0 focus:border-black peer"
                            value={data?.business_city || businessCityName}
                            name='business_city'
                            onChange={e => {
                                setData({
                                  ...data,
                                  business_city: ""
                                });
                                setBusinessCityName(e.target.value);
                                setBusinessCity({});
                            }}
                            onFocus={() => {setBusinessCityDropdownOpen(true)}}
                        />
                        <label
                            htmlFor="business_city"
                            className="absolute text-sm text-[#8A8A8A] font-inter duration-300 transform -translate-y-4 scale-75 top-2 origin-[0] bg-white px-2 left-2"
                        >Business City*</label>
                        {
                          businessCityDropdownOpen && (
                            <div className='w-full max-h-32 absolute bg-[#E4E4E4] overflow-y-auto z-[100] px-2 border border-[#8A8A8A1A] rounded-md'>
                              {
                                businessCities?.filter(name => name?.name.toLowerCase().includes(businessCityName.toLowerCase())).map((region, idx) => (
                                  <p
                                    key={idx}
                                    className='py-1 border-b border-[#C9C9C9] last:border-0 cursor-pointer'
                                    onClick={() => {
                                      setData({
                                        ...data,
                                        business_city: region?.name
                                      });
                                      setBusinessCityName("");
                                      setBusinessCity(region);
                                      setBusinessCityDropdownOpen(false);
                                    }}
                                    dropdown-name="state_dropdown"
                                  >{region?.name}</p>
                                ))
                              }
                            </div>
                          )
                        }
                    </div>
                    <div className="max-w-[378px] w-full sm:col-span-1 col-span-2 relative mx-auto">
                        <label
                            htmlFor="business_zip_code"
                            className="absolute text-sm text-[#8A8A8A] font-inter duration-300 transform -translate-y-4 scale-75 top-2 origin-[0] bg-white px-2 left-2"
                        >Zip code</label>
                        <input
                            type="text"
                            className="block px-2.5 pb-2 pt-2 w-full text-[#14213D] text-sm   bg-white rounded-[6px] border border-[#E4E4E4] appearance-none focus:outline-none placeholder:text-[#14213D] focus:ring-0 focus:border-black peer"
                            value={data?.business_zip_code}
                            name='business_zip_code'
                            onChange={handleChangeData}
                        />
                    </div>
                </div>
                <div className='flex items-center justify-between mt-3 px-6'>
                    <button
                        type='submit' 
                        className='text-white text-center bg-[#12A833] py-2 px-4 rounded-xl w-36  mb-4'
                    >Update</button>
                </div>
            </form>
        </div>
     </div>
  )
}

export default EditProfile