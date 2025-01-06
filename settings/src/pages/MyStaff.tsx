import React, { useEffect, useRef, useState } from 'react'
import { RiArrowDownSLine } from "react-icons/ri";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbFilterX } from "react-icons/tb";
import { BiSolidEditAlt } from "react-icons/bi";
import '../index.css'
import AddStaff from '../components/AddStaff';
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { MdKeyboardArrowDown } from 'react-icons/md';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { useNavigate } from 'react-router-dom';
import { addStaffThunk, deleteStaffThunk, editStaffThunk, getSettingsListThunk, getStaffListThunk, removeUserAuthTokenFromLSThunk } from 'store/user.thunk';
import { toast } from 'react-toastify';

const initialstaffs = [
  {initials:'RC',bgColor:'#23B7E5', name:'Robert Clive ',email:'Robertclive@domain.co.in',Phone:'(123) 456 - 7890',
    UserType:'Admin',edit:BiSolidEditAlt,delete:RiDeleteBin6Line},
  {initials:'RC',bgColor:'#96D869', name:'Robert Clive ',email:'Robertclive@domain.co.in',Phone:'(123) 456 - 7890',
      UserType:'Sub-admin',edit:BiSolidEditAlt,delete:RiDeleteBin6Line},
  {initials:'RC',bgColor:'#FD7E95', name:'Robert Clive ',email:'Robertclive@domain.co.in',Phone:'(123) 456 - 7890',
        UserType:'Account ',edit:BiSolidEditAlt,delete:RiDeleteBin6Line}
];
const initialStaff = {
  first_name: '',
  last_name: '',
  email: '',
  phone_no: '',
  user_type_id: '',
};

const MyStaff = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { customerId } = useAppSelector(state => state.auth);
  // console.log("customer id...", customerId);

  const initialFilter = {
    user_type_id: '',
    user_id: customerId,
    search_text: ''
  };
  
  const [staffs, setStaffs] = useState([]);
  console.log("staffs...", staffs);
  const [showModal,setShowModal] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [newStaff, setNewStaff] = useState(initialStaff);
  console.log("new staff...", newStaff);
  const modalRef = useRef();
  const [userTypes, setUserTypes] = useState([]);
  // console.log("userTypes...", userTypes);
  const [filter, setFilter] = useState(initialFilter);
  console.log("filter...", filter);
  const [type, setType] = useState("");
  const [type2, setType2] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const [deleteId, setDeleteId] = useState("");
  
  useEffect(() => {
    if(userTypes.length > 0 && type !== "") {
      setIsDropdownOpen(true);
    } else {
      setIsDropdownOpen(false);
    }
  }, [userTypes, type]);

  useEffect(() => {
    setFilter({
      ...filter,
      user_id: customerId,
    });
  }, [customerId]);
  
  const handleClickOutsideDropdown = (event: MouseEvent) => {
    if(dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideDropdown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideDropdown);
    };
  }, []);

  const getUserTypes = async() => {
    try {
      const result = await dispatch(getSettingsListThunk({
        user_id: customerId,
        user_type: ""
      })).unwrap();
      setUserTypes(result?.settings);
    } catch (error) {
      setUserTypes([]);
      if(error?.message == "Request failed with status code 401") {
        try {
          const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
          navigate('/login');
        } catch (error) {
          //
        }
      }
    }
  };

  useEffect(() => {
    getUserTypes();
  }, [customerId]);

  const formLists = [
    {name:'first_name', label: 'First name', placheholder: 'Enter the First name', type: 'text',},
    {name:'last_name', label: 'Last name', placheholder: 'Enter the Last name', type: 'text',},
    {name:'email', label: 'Email address ', placheholder: 'Enter the Email address ', type: 'email',},
    {name:'phone_no', label: 'Phone No.', placheholder: 'Enter the Phone Number', type: 'number',},
    {name:'user_type_id', label: 'User type', placheholder: 'Enter the User type', type: 'select',},
  ];

  const getStaffsList = async() => {
    try {
      const result = await dispatch(getStaffListThunk(filter)).unwrap();
      setStaffs(result?.data);
    } catch (error) {
      setStaffs([]);
      if(error?.message == "Request failed with status code 401") {
        try {
          const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
          navigate('/login');
        } catch (error) {
          //
        }
      }
    }
  };

  useEffect(() => {
    getStaffsList();
  }, [filter]);

  const handleChangeNewStaffData = e => {
    setNewStaff({
      ...newStaff,
      [e.target.name]: e.target.value
    });
  };

  const handlePhoneChange = (value: string) => {
    setNewStaff((prevData) => ({ ...prevData, phone_no: value }));
  };

  const handleClickOutside = (event: MouseEvent) => {
    if(modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setShowModal(false);
      setIsEdit(false);
      setNewStaff(initialStaff);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const validateJson = (json) => {
    for (const key in json) {
      if(
        typeof json[key] === "string" &&
        (json[key].trim() === "")
      ) {
        return false;
      }
    }
    return true;
  };

  const handleAddStaff = async() => {
    if(validateJson({
      first_name: newStaff?.first_name,
      last_name: newStaff?.last_name,
      email: newStaff?.email,
      phone_no: newStaff?.phone_no,
      user_type_id: newStaff?.user_type_id
    })) {
      try {
        const result = await dispatch(addStaffThunk({
          user_id: customerId,
          first_name: newStaff?.first_name,
          last_name: newStaff?.last_name,
          email: newStaff?.email,
          phone_no: newStaff?.phone_no,
          user_type_id: newStaff?.user_type_id
        })).unwrap();
        toast.success(result?.message);
      } catch (error) {
        toast.error("Error adding a new staff");
        // console.log("error", error);
        if(error?.message == "Authentication token is required") {
          try {
            const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
            navigate('/login');
          } catch (error) {
            //
          }
        }
      } finally {
        getStaffsList();
        setShowModal(false);
        setIsEdit(false);
        setNewStaff(initialStaff);
      }
    } else {
      toast.warning("Form inputs cannot be empty.");
    }
  };

  const handleEditStaff = async() => {
    if(validateJson({
      first_name: newStaff?.first_name,
      last_name: newStaff?.last_name,
      email: newStaff?.email,
      phone_no: newStaff?.phone_no,
      user_type_id: newStaff?.user_type_id
    })) {
      try {
        const result = await dispatch(editStaffThunk({
          id: newStaff?.id,
          first_name: newStaff?.first_name,
          last_name: newStaff?.last_name,
          email: newStaff?.email,
          phone_no: newStaff?.phone_no,
          user_type_id: newStaff?.user_type_id
        })).unwrap();
        toast.success(result?.message);
      } catch (error) {
        toast.error("Error editing the staff");
        // console.log("error", error);
        if(error?.message == "Authentication token is required") {
          try {
            const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
            navigate('/login');
          } catch (error) {
            //
          }
        }
      } finally {
        getStaffsList();
        setShowModal(false);
        setIsEdit(false);
        setNewStaff(initialStaff);
      }
    } else {
      toast.warning("Form inputs cannot be empty.");
    }
  };

  const handleStaffSubmit = e => {
    e.preventDefault();
    if(isEdit) {
      handleEditStaff();
    } else {
      handleAddStaff();
    }
  };

  const getInitials = (name:string) => {
    return name?.split(' ').map(word => word.charAt(0).toUpperCase());
  };

  const getUserTypeName = (id) => {
    if(userTypes.length > 0) {
      return userTypes?.find(type => type?.id === id) ? userTypes?.find(type => type?.id === id)?.user_type : "";
    } else {
      return "";
    }
  };

  const deleteSatff = async(e) => {
    e.preventDefault();
    try {
      await dispatch(deleteStaffThunk({id: deleteId})).unwrap();
      toast.success("Staff deleted successfully");
    } catch (error) {
      toast.error("Error deleting staff");
      if(error?.message == "Authentication token is required") {
        try {
          const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
          navigate('/login');
        } catch (error) {
          //
        }
      }
    } finally {
      setIsDeleteModalOpen(false);
      setDeleteId("");
      getStaffsList();
    }
  }

  return (
  <>
    <div className={`p-6 grid grid-cols-1`}>
      <h3 className='text-[#12A833] text-[28px] font-medium font-inter capitalize ml-[18px]'>My Staff</h3>
      <div className='bg-[#F9F9F9] py-3 flex min-[850px]:flex-row max-[850px]:flex-col justify-between px-6 mt-7 gap-4 max-[850px]:items-center'>
        <button
          onClick={() => {
            setShowModal(true);
            setIsEdit(false);
            setNewStaff(initialStaff);
          }}
          className='bg-[#12A833] text-[#F0F0F3] font-bold px-4 py-[10px] font-inter rounded-md max-w-40'
        >Add Staff</button>
        <div className='flex items-center min-sm:flex-row max-sm:flex-col gap-2'>
          <div className='max-w-[315px] flex flex-col relative' ref={dropdownRef}>
            <input
              type='text'
              placeholder='User Type'
              className='bg-white -mt-[6px] py-2 pl-3 w-full border text-sm text-[#7E7E7E] font-inter font-light border-[#E4E4E4]'
              value={getUserTypeName(filter?.user_type_id) || type}
              onChange={e => {
                setFilter({
                  ...filter,
                  user_type_id: ''
                });
                setType(e.target.value);
              }}
              onFocus={() => {setIsDropdownOpen(true)}}
            />
            <span className='float-right -mt-8 ml-auto'><RiArrowDownSLine className='w-6 h-6 text-black' /></span>
            {
              isDropdownOpen && (
                <div className='absolute w-full bg-gray-200 flex flex-col max-h-20 overflow-y-auto mt-8'>
                  {
                    userTypes.length > 0 && userTypes?.filter(item => item?.user_type?.toLowerCase()?.includes(type.toLowerCase()))?.map((type, index) => (
                      <p className='font-inter px-1 cursor-pointer' key={index} onClick={() => {
                        setFilter({
                          ...filter,
                          user_type_id: type?.id
                        });
                        setType("");
                        setIsDropdownOpen(false);
                      }}>{type?.user_type}</p>
                    ))
                  }
                </div>
              )
            }
          </div>
          <div className='flex max-sm:flex-col min-sm:flex-row max-sm:gap-2'>
            <input
              type='text'
              placeholder='Name,Email,Phone'
              className='max-w-[315px] bg-white py-2 pl-3 w-full border text-sm text-[#7E7E7E] font-inter font-light border-[#E4E4E4]'
              value={filter?.search_text || type2}
              onChange={(e) => {
                setType2(e.target.value);
              }}
            />
            <button
              type='button'
              className='bg-[#12A833] text-[#F0F0F3] font-medium px-4 py-[5px] font-inter'
              onClick={() => {
                setFilter({
                  ...filter,
                  search_text: type2.replace('+', '')
                });
                setType("");
              }}
            > search</button>
          </div>
          <TbFilterX size={24} className='ml-2 cursor-pointer' color='#12A833' onClick={() => {
            setFilter(initialFilter);
            setType("");
            setType2("");
          }} />
        </div>
      </div>
      <div className='overflow-x-auto'>
        <table className='mt-6 min-w-full text-center'>
          <thead>
            <tr className='text-[#777777] text-base font-bold font-inter bg-[#F7FAFF]'>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>User Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              staffs.length > 0 ? (
                staffs?.map((staff,index) => {
                  return <tr key={index}  className='px-4'>
                  <td className='flex items-center min-w-40'>
                    <div className='text-xs text-[#000000] font-semibold rounded-full p-[10px] mr-2 bg-gray-100'>{getInitials(staff?.first_name)}{getInitials(staff?.last_name)}</div>
                    <p className='text-xs text-[#000000] font-medium'>{staff?.first_name}&nbsp;{staff?.last_name}</p>
                  </td>
                  <td className='text-[#000000] text-xs font-montserrat min-w-40'>{staff?.email}</td>
                  <td className='text-[#000000] text-xs font-montserrat min-w-40'>+{staff?.phone_no}</td>
                  <td className='text-[#000000] text-xs font-montserrat min-w-40'>{getUserTypeName(staff?.user_type_id)}</td>
                  <td className='min-w-40 text-center'>
                    <div className='flex justify-center gap-3'>
                      <button
                        type='button'
                        onClick={() => {
                          setShowModal(true);
                          setIsEdit(true);
                          setNewStaff(staff);
                        }}
                      ><BiSolidEditAlt className='text-gray-900 w-4 h-4 hover:text-gray-600' /></button>
                      <button
                        type='button'
                        onClick={() => {
                          setIsDeleteModalOpen(true);
                          setDeleteId(staff?.id);
                        }}
                      ><RiDeleteBin6Line className='text-[#F24E1E] w-4 h-4 hover:text-[#f24f1ec7]' /></button>
                    </div>
                  </td>
                </tr>
                })
              ) : (
                <tr>
                  <td colSpan={5} className='text-center'>No Data Available</td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
      
      <Dialog
        open={showModal}
        as="div"
        className="relative focus:outline-none z-[9999]"
        onClose={() => {
          setShowModal(false);
          setIsEdit(false);
          setNewStaff(initialStaff);
        }}
      >
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10 w-screen overflow-y-auto mt-16">
          <div className="flex min-h-full items-center justify-center py-4">
            <DialogPanel
              transition
              className="w-full max-w-[627px] rounded-xl bg-white p-4 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
              ref={modalRef}
            >
              <form onSubmit={handleStaffSubmit}>
                <div className="flex justify-between items-center mb-[10px]">
                  <DialogTitle
                    as="h3"
                    className="text-[28px] font-semibold text-[#0D121F]"
                  >{isEdit ? 'Edit ' : 'Add '}Staff</DialogTitle>
                  <div className='btn-close-bg'>
                    <button
                      type='button'
                      className='text-3xl rotate-45 mt-[-8px] text-black'
                      onClick={() => {
                        setShowModal(false);
                        setIsEdit(false);
                        setNewStaff(initialStaff);
                      }}
                    >+</button>
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-2'>
                  {
                    formLists.map((form, index) => {
                      if(form.name === "first_name" || form.name === "last_name") {
                        return(
                          <div
                            className='flex flex-col min-[400px]:col-span-1 max-[400px]:col-span-2'
                            key={index}
                          >
                            <label
                              className='float-left text-sm font-inter font-normal text-[#8A8A8A] ml-[18px] z-[1] bg-white w-fit px-2'
                            >{form.label}</label>
                            <input
                              type="text"
                              name={form.name}
                              required
                              className='border border-[#E4E4E4] rounded-[10px] h-[45px] mt-[-9px] pl-2 font-inter font-normal text-base text-[#1E1E1E]'
                              onChange={handleChangeNewStaffData}
                              placeholder={form.placheholder}
                              value={newStaff[form.name]}
                            />
                          </div>
                        )
                      } else if(form.name === "email") {
                        return(
                          <div
                            className='flex flex-col col-span-2'
                            key={index}
                          >
                            <label
                              className='float-left text-sm font-inter font-normal text-[#8A8A8A] ml-[18px] z-[1] bg-white w-fit px-2'
                            >{form.label}</label>
                            <input
                              type="text"
                              name={form.name}
                              required
                              className='border border-[#E4E4E4] rounded-[10px] h-[45px] mt-[-9px] pl-2 font-inter font-normal text-base text-[#1E1E1E]'
                              onChange={handleChangeNewStaffData}
                              placeholder={form.placheholder}
                              value={newStaff[form.name]}
                            />
                          </div>
                        )
                      } else if(form.name === "phone_no") {
                        return(
                          <div
                            className='flex flex-col col-span-2'
                            key={index}
                          >
                            <label
                              className='float-left text-sm font-inter font-normal text-[#8A8A8A] ml-[18px] z-[1] bg-white w-fit px-2'
                            >{form.label}</label>
                            <PhoneInput
                              country={"us"}
                              onChange={handlePhoneChange}
                              value={newStaff?.phone_no}
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
                        )
                      } else if(form.name === "user_type_id") {
                        return(
                          <div
                            className='flex flex-col col-span-2'
                            key={index}
                          >
                            <label
                              className='float-left text-sm font-inter font-normal text-[#8A8A8A] ml-[18px] z-[1] bg-white w-fit px-2'
                            >{form.label}</label>
                            <select
                              className={`border border-[#E4E4E4] rounded-[10px] h-[45px] mt-[-9px] pl-2 font-inter font-normal text-base ${newStaff?.user_type_id === "" ? "text-[#8A8A8A]" : "text-[#1E1E1E]"} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                              onChange={handleChangeNewStaffData}
                              value={newStaff[form.name]}
                              required
                              name={form.name}
                            >
                              <option selected value="">{form.placheholder}</option>
                              {
                                userTypes?.map((user, idx) => (
                                  <option
                                    value={user?.id}
                                    key={idx}
                                    className='text-[#1E1E1E]'
                                  >{user?.user_type}</option>
                                ))
                              }
                            </select>
                          </div>
                        )
                      }
                    })
                  }
                </div>

                <div
                  className="flex min-[450px]:flex-row max-[450px]:flex-col justify-center items-center mt-14 min-[450px]:gap-12 max-[450px]:gap-2"
                >
                  <button
                    className="font-inter font-semibold text-base text-[#F0F0F3] px-5 py-[10px] w-[181px] bg-[#12A833] rounded-[10px]"
                    type="submit"
                  >Submit</button>
                  <button
                    className="font-inter font-semibold text-base text-[#F0F0F3] px-5 py-[10px] w-[181px] bg-red-600 rounded-[10px]"
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setIsEdit(false);
                      setNewStaff(initialStaff);
                    }}
                  >Cancel</button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

      <Dialog
        open={isDeleteModalOpen}
        as="div"
        className="relative z-[9999] focus:outline-none"
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeleteId("");
        }}
      >
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10 w-screen overflow-y-auto mt-16">
          <div className="flex min-h-full items-center justify-center py-4">
            <DialogPanel
              transition
              className="w-full max-w-[450px] rounded-xl bg-white p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <div className="flex justify-between items-center mb-6">
                <DialogTitle
                  as="h3"
                  className="text-[28px] font-semibold text-[#0D121F]"
                >{isEdit ? 'Edit ' : 'Add '}User Type</DialogTitle>
                <div className='btn-close-bg'>
                  <button
                    type='button'
                    className='text-3xl rotate-45 mt-[-8px] text-black'
                    onClick={() => {
                      setIsDeleteModalOpen(false);
                      setDeleteId("");
                    }}
                  >+</button>
                </div>
              </div>

              <div
                className="mt-8 px-8"
              >
                <p
                  className="font-warning-popup-message"
                >Are you sure want to delete this staff?</p>
              </div>

              <div
                className="flex min-[450px]:flex-row max-[450px]:flex-col justify-center items-center mt-14 min-[450px]:gap-12 max-[450px]:gap-2"
              >
                <button
                  className="font-inter font-semibold text-base text-[#F0F0F3] px-5 py-[10px] w-[181px] bg-[#12A833] rounded-[10px]"
                  type="button"
                  onClick={(e) => {deleteSatff(e)}}
                >Delete</button>
                <button
                  className="font-inter font-semibold text-base text-[#F0F0F3] px-5 py-[10px] w-[181px] bg-red-600 rounded-[10px]"
                  type="button"
                  onClick={() => {
                    setIsDeleteModalOpen(false);
                    setDeleteId("");
                  }}
                >Cancel</button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  </>
  )
}

export default MyStaff

