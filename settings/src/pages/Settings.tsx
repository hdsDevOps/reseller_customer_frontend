import React, { useState } from 'react'
import { RiArrowDownSLine } from "react-icons/ri";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbFilterX } from "react-icons/tb";
import { BiSolidEditAlt } from "react-icons/bi";
import '../index.css'
import AddUser from '../components/AddUser';
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

const initialData = {
  user_type: '', permissions: [
    {name: 'Dashboard', value: false,},
    {name: 'Profile', value: false,},
    {name: 'Domain', value: false,},
    {name: 'Payment Subscription', value: false,},
    {name: 'Email', value: false,},
    {name: 'Payment Method', value: false,},
    {name: 'Vouhcers', value: false,},
    {name: 'My Staff', value: false,},
    {name: 'Billing History', value: false,},
    {name: 'Settings', value: false,},
  ], 
}
const Settings = () => {
  const [userTypes, setUserTypes] = useState([
    { user_type: 'Admin', permissions: [
      {name: 'Dashboard', value: true,},
      {name: 'Profile', value: false,},
      {name: 'Domain', value: true,},
      {name: 'Payment Subscription', value: false,},
      {name: 'Email', value: true,},
      {name: 'Payment Method', value: false,},
      {name: 'Vouhcers', value: true,},
      {name: 'My Staff', value: false,},
      {name: 'Billing History', value: false,},
      {name: 'Settings', value: false,},
    ], },
    { user_type: 'Sub-admin', permissions: [
      {name: 'Dashboard', value: false,},
      {name: 'Profile', value: false,},
      {name: 'Domain', value: false,},
      {name: 'Payment Subscription', value: true,},
      {name: 'Email', value: false,},
      {name: 'Payment Method', value: true,},
      {name: 'Vouhcers', value: false,},
      {name: 'My Staff', value: true,},
      {name: 'Billing History', value: true,},
      {name: 'Settings', value: false,},
    ], },
  ]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState(initialData);
  const permissionsList = ['Dashboard', 'Profile', 'Domain', 'Payment Subscription', 'Email', 'Payment Method', 'Vouhcers', 'My Staff', 'Billing History', 'Settings',];
  const [filter, setFilter] = useState("");

  const handleChangeData = (e) => {
    setCurrentData({
      ...currentData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePermissionChange = (targetName:string) => {
    setCurrentData({
      ...currentData,
      permissions: currentData.permissions.map(permission => 
        permission.name === targetName
        ? {...permission, value: !permission.value}
        : permission
      ),
    })
  };

  const findValue = (name: string) => {
    const value = currentData.permissions.find(permission => permission.name === name);
    return value?.value;
  };
  
  return (
    <>
      <div className={`p-6 grid grid-cols-1`}>
        <h3 className='text-[#12A833] text-[28px] font-medium font-inter capitalize ml-[18px]'>settings</h3>
        <p className='text-xs text-[#141414] pt-1 font-inter ml-[18px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis semper dolor. </p>
        <p className='text-[#00163B] text-sm font-medium py-4 pt-7 tracking-wider ml-[14px] px-1 border-b-[3px] border-[#12A833] w-fit'>Add User Type</p>
        
        <div className='bg-[#F9F9F9] py-3 flex min-sm:flex-row max-sm:flex-col justify-between px-6 mt-7 gap-2 max-sm:items-center'>
          <button onClick={() => {setIsModalOpen(true)}} className='bg-[#12A833] text-[#F0F0F3] font-bold px-4 py-[10px] font-inter rounded-md max-w-40'> Add User Type</button>
          <div className='flex items-center'>
            <div className='max-w-[315px] flex flex-col'>
              <input type='text' placeholder='Auto search' className='bg-white py-2 pl-3 w-full border text-sm text-[#7E7E7E] font-inter font-light border-[#E4E4E4]' value={filter} onChange={e => {setFilter(e.target.value)}} />
              <span className='float-right -mt-8 ml-auto'><RiArrowDownSLine className='w-6 h-6 text-black' /> </span>
            </div>
            <button
              type='button'
              onClick={e => {setFilter("")}}
            >
              <TbFilterX className='text-[#12A833] w-6 h-6' />
            </button>
          </div>
        </div>
        <div className='overflow-x-auto'>
          <table className='mt-6 min-w-full text-center'>
            <thead>
              <tr className='text-[#777777] text-base font-bold font-inter bg-[#F7FAFF]'>
                <th>User Type</th>
                <th>Permission</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                userTypes.length> 0 ? userTypes?.map((type, index) => (
                  <tr key={index}>
                    <td className='text-[#000000] font-medium text-xs font-montserrat min-w-[180px]'>{type?.user_type}</td>
                    <td className='min-w-[180px] flex flex-wrap gap-1'>
                      {
                        type?.permissions?.map((permission, number) => {
                          if(permission?.value) {
                            return(
                              <button key={number} className='bg-[#12A83399] rounded-3xl text-xs text-left font-montserrat font-medium text-black py-1 px-4 hover:bg-gray-300 transition capitalize inline-block max-w-max text-nowrap' type='button'>{permission?.name}</button>
                            )
                          }
                        })
                      }
                    </td>
                    <td className='min-w-[180px]'>
                      <div className='flex justify-center gap-3'>
                        <button
                          type='button'
                          onClick={() => {
                            setIsModalOpen(true);
                            setIsEdit(true);
                            setCurrentData(type);
                          }}
                        ><BiSolidEditAlt className='text-gray-900 w-4 h-4 hover:text-gray-600' /></button>
                        <button
                          type='button'
                          onClick={() => {
                            setIsDeleteModalOpen(true);
                          }}
                        ><RiDeleteBin6Line className='text-[#F24E1E] w-4 h-4 hover:text-[#f24f1ec7]' /></button>
                      </div>
                    </td>
                  </tr>
                )) :
                (<tr>
                  <td colSpan={3}>No Data Available</td>
                </tr>)
              }
            </tbody>
          </table>
        </div>
      </div>

      <Dialog
        open={isModalOpen}
        as="div"
        className="relative focus:outline-none z-[9999]"
        onClose={() => {
          setIsModalOpen(false);
          setIsEdit(false);
          setCurrentData(initialData);
        }}
      >
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10 w-screen overflow-y-auto mt-16">
          <div className="flex min-h-full items-center justify-center py-4">
            <DialogPanel
              transition
              className="w-full max-w-[450px] rounded-xl bg-white p-4 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <div className="flex justify-between items-center mb-[10px]">
                <DialogTitle
                  as="h3"
                  className="text-[28px] font-semibold text-[#0D121F]"
                >{isEdit ? 'Edit ' : 'Add '}User Type</DialogTitle>
                <div className='btn-close-bg'>
                  <button
                    type='button'
                    className='text-3xl rotate-45 mt-[-8px] text-black'
                    onClick={() => {
                      setIsModalOpen(false);
                      setIsEdit(false);
                      setCurrentData(initialData);
                    }}
                  >+</button>
                </div>
              </div>

              <p className='font-inter font-normal text-xs text-black'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis semper dolor. </p>

              <div
                className='flex flex-col mt-4'
              >
                <label
                  className='float-left text-sm font-normal text-custom-gray ml-[18px] z-[1] bg-white w-fit px-2'
                >User type</label>
                <input
                  type="text"
                  name="user_type"
                  required
                  className='border border-[#E4E4E4] rounded-[10px] h-[45px] mt-[-9px] pl-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                  onChange={handleChangeData}
                  placeholder="Enter user type"
                  value={currentData?.user_type}
                />
              </div>

              <div
                className='flex flex-col mt-4'
              >
                <label
                  className='float-left text-sm font-normal text-custom-gray ml-[18px] z-[1] bg-white w-fit px-2'
                >User type</label>
                <div
                  className='grid min-[375px]:grid-cols-2 max-[375px]:grid-cols-1 gap-2 border border-[#E4E4E4] rounded-[10px] mt-[-9px] p-2 '
                >
                  {
                    permissionsList.map((list, index) => (
                      <div
                        className='flex justify-between items-center'
                        key={index}
                      >
                        <h5
                          className='font-montserrat font-medium text-nowrap text-[10px] '
                        >{list}</h5>
                        <div className="transition-transform duration-1000 ease-in-out flex justify-center ml-5 mt-[3px]">
                          {/* {notificationToggle()} */}
                          <label className="relative cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={findValue(list)}
                              onClick={() => {handlePermissionChange(list)}}
                            />
                            <div
                              className="w-[25px] h-[15px] flex items-center bg-gray-300 rounded-full after:flex after:items-center after:justify-center peer peer-checked:after:translate-x-full after:absolute after:left-[2px] peer-checked:after:left-[-1px] peer-checked:after:border-white after:bg-white after:border after:border-gray-300 after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#00D13B]">
                            </div>
                          </label>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>

              <div
                className="flex min-[450px]:flex-row max-[450px]:flex-col justify-center items-center mt-14 min-[450px]:gap-12 max-[450px]:gap-2"
              >
                <button
                  className="font-inter font-semibold text-base text-[#F0F0F3] px-5 py-[10px] w-[181px] bg-[#12A833] rounded-[10px]"
                  type="button"
                  onClick={e => {
                    setIsModalOpen(false);
                    setIsEdit(false);
                  }}
                >Submit</button>
                <button
                  className="font-inter font-semibold text-base text-[#F0F0F3] px-5 py-[10px] w-[181px] bg-red-600 rounded-[10px]"
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setIsEdit(false);
                    setCurrentData(initialData);
                  }}
                >Cancel</button>
              </div>
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
                    }}
                  >+</button>
                </div>
              </div>

              <div
                className="mt-8 px-8"
              >
                <p
                  className="font-warning-popup-message"
                >Are you sure want to delete this user type?</p>
              </div>

              <div
                className="flex min-[450px]:flex-row max-[450px]:flex-col justify-center items-center mt-14 min-[450px]:gap-12 max-[450px]:gap-2"
              >
                <button
                  className="font-inter font-semibold text-base text-[#F0F0F3] px-5 py-[10px] w-[181px] bg-[#12A833] rounded-[10px]"
                  type="button"
                  // onClick={(e) => {deleteRole(e)}}
                >Delete</button>
                <button
                  className="font-inter font-semibold text-base text-[#F0F0F3] px-5 py-[10px] w-[181px] bg-red-600 rounded-[10px]"
                  type="button"
                  onClick={() => {
                    setIsDeleteModalOpen(false);
                  }}
                >Cancel</button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default Settings
