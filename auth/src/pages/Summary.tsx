import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import SummaryDomainDetails from "../components/Summary/SummaryDomainDetails"
import DomainSummary from "../components/Summary/DomainSummary"
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import axios from "axios";
import { RiCloseFill } from "react-icons/ri";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast } from "react-toastify";
import './Summary.css';
import { currencyList } from "../components/CurrencyList";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { plansAndPricesListThunk } from "store/user.thunk";

const Summary: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // console.log("location state...", location.state);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    const section = document.getElementById("top_summary");
    if(section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const { defaultCurrencySlice } = useAppSelector(state => state.auth);

  const [data, setData] = useState(location.state);
  // console.log("data...", data);

  const initialEdit = {
    first_name: data.formData.first_name,
    last_name: data.formData.last_name,
    phone_no: data.formData.phone_no,
    business_name: data.formData.business_name,
    business_state: data.formData.business_state,
    business_city: data.formData.business_city,
    business_zip_code: data.formData.business_zip_code,
    region: data.formData.region
  };

  const [editData, setEditData] = useState(initialEdit);
  // // console.log("edit data...", editData);

  const [openContactModal, setOpenContactModal] = useState(false);
  const [openBusinessModal, setOpenBusinessModal] = useState(false);
  // // console.log({openContactModal, openBusinessModal});

  const [plan, setPlan] = useState({});
  // // console.log("plan...", plan);

  useEffect(() => {
    const getPlan = async() => {
      try {
        const result = await dispatch(plansAndPricesListThunk({subscription_id: location.state.plan.id})).unwrap();
        setPlan(result?.data[0]);
      } catch (error) {
        setPlan({});
      }
    };

    getPlan();
  }, [location.state]);
  
  const countryRef = useRef(null);
  const stateRef = useRef(null);
  const cityRef = useRef(null);
  const [countryName, setCountryName] = useState("");
  const [stateName, setStateName] = useState("");
  const [cityName, setCityName] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCitites] = useState([]);
  const [country, setCountry] = useState({});
  const [state, setState] = useState({});
  const [city, setCity] = useState({});
  // // console.log({country, state, city});
  // // console.log("countries...", countries);
  // // console.log("states...", states);
  // // console.log("cities...", cities);
  // // console.log({countryName, stateName, cityName});

  useEffect(() => {
    if(countries?.length > 0) {
      const countryData = countries?.find(item => item?.name === data.formData.country);
      setCountry(countryData);
    };
  }, [countries, data.formData.country]);

  useEffect(() => {
    if(states?.length > 0) {
      const stateData = states?.find(item => item?.name === data.formData.business_state);
      setState(stateData);
    };
  }, [states, data.formData.business_state]);

  const [countryDropdownOpen, setCountryDropdownOpen] = useState<Boolean>(false);
  const [stateDropdownOpen, setStateDropdownOpen] = useState<Boolean>(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState<Boolean>(false);
  // // console.log("isDropdownOpen", isDropdownOpen);
  const [isNumberValid, setIsNumberValid] = useState(false);
  // console.log({isNumberValid});
  
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

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideCountry);
    document.addEventListener('mousedown', handleClickOutsideState);
    document.addEventListener('mousedown', handleClickOutsideCity);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideCountry);
      document.removeEventListener('mousedown', handleClickOutsideState);
      document.removeEventListener('mousedown', handleClickOutsideCity);
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
  
  const updateEditData = e => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value
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
    setEditData((prevData) => ({ ...prevData, phone_no: value }));
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
        // // console.log(res.data);
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
        setStates(res.data);
      })
      .catch(err => {
        setStates([]);
        // console.log("error...", err);
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
        // console.log("error...", err);
      })
    } else {
      setCitites([]);
    }
  }, [country, state]);

  const handleChangeContactFormData = () => {
    setData({
      ...data,
      formData: {
        ...data.formData,
        first_name: editData?.first_name,
        last_name: editData?.last_name,
        phone_no: editData?.phone_no
      },
    });
    setOpenContactModal(false);
  };

  const handleChangeBusinessFormData = () => {
    // if(isNumberValid) {
    if(
      editData?.business_name !== "" && editData?.business_name?.trim() !== "" &&
      editData?.business_state !== "" && editData?.business_state?.trim() !== "" &&
      editData?.business_city !== "" && editData?.business_city?.trim() !== ""
    ) {
      setData({
        ...data,
        formData: {
          ...data.formData,
          business_name: editData?.business_name,
          business_state: editData?.business_state,
          business_city: editData?.business_city,
        },
      });
      setOpenBusinessModal(false);
    } else {
      toast.warning("Please fill up all the fields");
    }
    // } else {
    //   toast.warning("Please enter a valid phone number");
    // }
  }

  return (
    <div className="relative grid grid-cols-1 w-full h-full gap-6 p-4" id="top_summary">
      {" "}
      <p
        className="absolute flex items-center gap-1 text-green-600 cursor-pointer left-4 top-2"
        onClick={() => {navigate('/gemini-add', {state: data})}}
      >
        {" "}
        <IoChevronBackSharp /> Back to previous page{" "}
      </p>{" "}
      <div className="grid-container w-full max-w-full py-5 bg-white">
        <SummaryDomainDetails state={data} handleContactModalOpen={() => {setOpenContactModal(true)}} handleBusinessModalOpen={() => {setOpenBusinessModal(true)}} plan={plan} />
        <DomainSummary state={data} plan={plan} />
      </div>{" "}

      {
        openContactModal && (
          <Dialog
            open={openContactModal}
            as="div"
            className="relative z-10 focus:outline-none"
            onClose={() => {
              setOpenContactModal(false);
              setEditData(initialEdit);
            }}
          >
            <div className="fixed inset-0 bg-black bg-opacity-50 z-10 w-screen overflow-y-auto mt-16">
              <div className="flex min-h-full items-center justify-center py-4">
                <DialogPanel
                  transition
                  className="w-full max-w-[700px] rounded-xl bg-white p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                >
                  <div className="flex justify-between items-center mb-6">
                    <DialogTitle
                      as="h3"
                      className="text-lg font-semibold text-gray-900"
                    >Edit Contact Information</DialogTitle>
                    <div className='btn-close-bg'>
                      <button
                        type='button'
                        className='text-black items-center'
                        onClick={() => {
                          setOpenContactModal(false);
                          setEditData(initialEdit);
                        }}
                      ><RiCloseFill className="w-6 h-6" /></button>
                    </div>
                  </div>

                  <div
                    className="mt-8 px-8 grid grid-cols-1"
                  >
                    <div
                      className='flex flex-col px-2 mb-2 w-full max-w-[500px] mx-auto'
                    >
                      <label
                        className='float-left text-sm font-normal text-custom-gray ml-[18px] z-[1] bg-white w-fit px-2'
                      >First Name</label>
                      <input
                        type="text"
                        name="first_name"
                        required
                        className='border border-[#E4E4E4] rounded-[10px] h-[45px] mt-[-9px] pl-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                        onChange={updateEditData}
                        value={editData?.first_name}
                        placeholder="Enter first name"
                        // cypress-name={item.name+"_input"}
                      />
                    </div>

                    <div
                      className='flex flex-col px-2 mb-2 w-full max-w-[500px] mx-auto'
                    >
                      <label
                        className='float-left text-sm font-normal text-custom-gray ml-[18px] z-[1] bg-white w-fit px-2'
                      >Last Name</label>
                      <input
                        type="text"
                        name="last_name"
                        value={editData?.last_name}
                        required
                        className='border border-[#E4E4E4] rounded-[10px] h-[45px] mt-[-9px] pl-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                        onChange={updateEditData}
                        placeholder="Enter last name"
                        // cypress-name={item.name+"_input"}
                      />
                    </div>

                    <div
                      className='flex flex-col px-2 mb-2 w-full max-w-[500px] mx-auto'
                    >
                      <label
                        className='float-left text-sm font-normal text-custom-gray ml-[18px] z-[1] bg-white w-fit px-2'
                      >Email</label>
                      <input
                        type="email"
                        // name="email"
                        value={data?.formData?.email}
                        disabled
                        className='border border-[#E4E4E4] rounded-[10px] h-[45px] mt-[-9px] pl-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                        // onChange={updateEditData}
                        // placeholder="Enter last name"
                        // cypress-name={item.name+"_input"}
                      />
                    </div>

                    <div
                      className='flex flex-col px-2 mb-2 w-full max-w-[500px] mx-auto'
                    >
                      <label
                        className='float-left text-sm font-normal text-custom-gray ml-[18px] z-[1] bg-white w-fit px-2'
                      >Phone Number</label>
                      <PhoneInput
                        country={country?.code?.toLowerCase()}
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
                        value={editData?.phone_no}
                        placeholder='00000-00000'
                        inputProps={{
                          required: true,
                          name: 'phone_no'
                        }}
                        containerClass='min-w-full border border-[#E4E4E4] rounded-[10px] h-[45px] mt-[-9px] items-center'
                        inputClass="react-tel-input outline-none !w-full bord !border-0 !h-full"
                        dropdownClass="peer"
                        buttonClass="!border-0 !h-full !w-[40px]"
                        cypress-name="phone_no_input"
                      />
                    </div>
                  </div>

                  <div
                    className="flex flex-row justify-center items-center mt-14 gap-5"
                  >
                    <button
                      className="py-[10px] rounded-[10px] bg-[#12A833] text-[#F0F0F3] align-middle focus:outline-none font-inter font-semibold text-base w-[105px]"
                      type="button"
                      onClick={() => {handleChangeContactFormData()}}
                    >Update</button>
                    <button
                      className="py-[10px] rounded-[10px] bg-[#E02424] text-[#F0F0F3] align-middle focus:outline-none font-inter font-semibold text-base w-[105px]"
                      type="button"
                      onClick={() => {
                        setOpenContactModal(false);
                        setEditData(initialEdit);
                      }}
                    >Cancel</button>
                  </div>
                </DialogPanel>
              </div>
            </div>
          </Dialog>
        )
      }

      {
        openBusinessModal && (
          <Dialog
            open={openBusinessModal}
            as="div"
            className="relative z-10 focus:outline-none"
            onClose={() => {
              setOpenBusinessModal(false);
              setEditData(initialEdit);
            }}
          >
            <div className="fixed inset-0 bg-black bg-opacity-50 z-10 w-screen overflow-y-auto mt-16">
              <div className="flex min-h-full items-center justify-center py-4">
                <DialogPanel
                  transition
                  className="w-full max-w-[700px] rounded-xl bg-white p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                >
                  <div className="flex justify-between items-center mb-6">
                    <DialogTitle
                      as="h3"
                      className="text-lg font-semibold text-gray-900"
                    >Edit Business Information</DialogTitle>
                    <div className='btn-close-bg'>
                      <button
                        type='button'
                        className='text-black items-center'
                        onClick={() => {
                          setOpenBusinessModal(false);
                          setEditData(initialEdit);
                        }}
                      ><RiCloseFill className="w-6 h-6" /></button>
                    </div>
                  </div>

                  <div
                    className="mt-8 px-8 grid grid-cols-1"
                  >
                    <div
                      className='flex flex-col px-2 mb-2 w-full max-w-[500px] mx-auto'
                    >
                      <label
                        className='float-left text-sm font-normal text-custom-gray ml-[18px] z-[1] bg-white w-fit px-2'
                      >Business Name</label>
                      <input
                        type="text"
                        name="business_name"
                        required
                        className='border border-[#E4E4E4] rounded-[10px] h-[45px] mt-[-9px] pl-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                        onChange={updateEditData}
                        value={editData?.business_name}
                        placeholder="Enter first name"
                        // cypress-name={item.name+"_input"}
                      />
                    </div>

                    <div
                      className='flex flex-col px-2 mb-2 w-full max-w-[500px] mx-auto relative'
                      ref={stateRef}
                    >
                      <label
                        className='float-left text-sm font-normal text-custom-gray ml-[18px] z-[1] bg-white w-fit px-2'
                      >Business State</label>
                      <input
                        type="text"
                        name="business_state"
                        required
                        className='border border-[#E4E4E4] rounded-[10px] h-[45px] mt-[-9px] pl-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                        onChange={(e) => {
                          setEditData({
                            ...editData,
                            business_state: '',
                            business_city: '',
                          });
                          setStateName(e.target.value);
                          setCityName('');
                          setState({});
                          setCity({});
                        }}
                        value={editData?.business_state || stateName}
                        onFocus={() => {setStateDropdownOpen(true)}}
                        placeholder="Search your business state"
                        // cypress-name={item.name+"_input"}
                      />
                      {
                        stateDropdownOpen && (
                          <div className='w-full bg-[#E4E4E4] overflow-y-auto z-[10] px-2 border border-[#8A8A8A1A] rounded-md'>
                            {
                              states?.filter(name => name?.name.toLowerCase().includes(stateName.toLowerCase())).map((state, idx) => (
                                <p
                                  key={idx}
                                  className='py-1 border-b border-[#C9C9C9] last:border-0 cursor-pointer'
                                  dropdown-name="country-dropdown"
                                  onClick={() => {
                                    setEditData({
                                      ...editData,
                                      business_state: state?.name
                                    });
                                    setStateName("");
                                    setCityName("");
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

                    <div
                      className='flex flex-col px-2 mb-2 w-full max-w-[500px] mx-auto relative'
                      ref={cityRef}
                    >
                      <label
                        className='float-left text-sm font-normal text-custom-gray ml-[18px] z-[1] bg-white w-fit px-2'
                      >Business City</label>
                      <input
                        type="text"
                        name="business_city"
                        required
                        className='border border-[#E4E4E4] rounded-[10px] h-[45px] mt-[-9px] pl-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                        onChange={(e) => {
                          setEditData({
                            ...editData,
                            business_city: '',
                          });
                          setCityName(e.target.value);
                          setCity({});
                        }}
                        value={editData?.business_city || cityName}
                        onFocus={() => {setCityDropdownOpen(true)}}
                        placeholder="Search your business city"
                        // cypress-name={item.name+"_input"}
                      />
                      {
                        cityDropdownOpen && (
                          <div className='w-full bg-[#E4E4E4] overflow-y-auto z-[10] px-2 border border-[#8A8A8A1A] rounded-md'>
                            {
                              cities?.filter(name => name?.name.toLowerCase().includes(cityName.toLowerCase())).map((city, idx) => (
                                <p
                                  key={idx}
                                  className='py-1 border-b border-[#C9C9C9] last:border-0 cursor-pointer'
                                  dropdown-name="country-dropdown"
                                  onClick={() => {
                                    setEditData({
                                      ...editData,
                                      business_city: city?.name
                                    });
                                    setCityName("");
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
                  </div>

                  <div
                    className="flex flex-row justify-center items-center mt-14 gap-5"
                  >
                    <button
                      className="py-[10px] rounded-[10px] bg-[#12A833] text-[#F0F0F3] align-middle focus:outline-none font-inter font-semibold text-base w-[105px]"
                      type="button"
                      onClick={() => {handleChangeBusinessFormData()}}
                    >Update</button>
                    <button
                      className="py-[10px] rounded-[10px] bg-[#E02424] text-[#F0F0F3] align-middle focus:outline-none font-inter font-semibold text-base w-[105px]"
                      type="button"
                      onClick={() => {
                        setOpenBusinessModal(false);
                        setEditData(initialEdit);
                      }}
                    >Cancel</button>
                  </div>
                </DialogPanel>
              </div>
            </div>
          </Dialog>
        )
      }
    </div>
  );
};
export default Summary;
