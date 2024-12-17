import React, { useState } from 'react'
import { RiArrowDownSLine } from "react-icons/ri";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbFilterX } from "react-icons/tb";
import { BiSolidEditAlt } from "react-icons/bi";
import '../index.css'
import AddStaff from '../components/AddStaff';
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { MdKeyboardArrowDown } from 'react-icons/md';

const staffs=[
  {initials:'RC',bgColor:'#23B7E5', name:'Robert Clive ',email:'Robertclive@domain.co.in',Phone:'(123) 456 - 7890',
    UserType:'Admin',edit:BiSolidEditAlt,delete:RiDeleteBin6Line},
  {initials:'RC',bgColor:'#96D869', name:'Robert Clive ',email:'Robertclive@domain.co.in',Phone:'(123) 456 - 7890',
      UserType:'Sub-admin',edit:BiSolidEditAlt,delete:RiDeleteBin6Line},
  {initials:'RC',bgColor:'#FD7E95', name:'Robert Clive ',email:'Robertclive@domain.co.in',Phone:'(123) 456 - 7890',
        UserType:'Account ',edit:BiSolidEditAlt,delete:RiDeleteBin6Line}
];
const MyStaff = () => {
  const [showModal,setShowModal] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const formLists = [
    {name:'first_name', label: 'First name', placheholder: 'Enter the First name',},
    {name:'last_name', label: 'Last name', placheholder: 'Enter the Last name',},
    {name:'email', label: 'Email address ', placheholder: 'Enter the Email address ',},
    {name:'phone', label: 'Phone No.', placheholder: 'Enter the Phone Number',},
    {name:'user_type', label: 'User type', placheholder: 'Enter the User type',},
  ];

  return (
  <>
    <div className={`p-6 grid grid-cols-1`}>
      <h3 className='text-[#12A833] text-[28px] font-medium font-inter capitalize ml-[18px]'>My Staff</h3>
      <div className='bg-[#F9F9F9] py-3 flex min-[850px]:flex-row max-[850px]:flex-col justify-between px-6 mt-7 gap-4 max-[850px]:items-center'>
        <button onClick={() => setShowModal(true)} className='bg-[#12A833] text-[#F0F0F3] font-bold px-4 py-[10px] font-inter rounded-md max-w-40'> Add Staff</button>
        <div className='flex items-center min-sm:flex-row max-sm:flex-col gap-2'>
          <div className='max-w-[315px] flex flex-col'>
            <input type='text' placeholder='User Type' className='bg-white -mt-[6px] py-2 pl-3 w-full border text-sm text-[#7E7E7E] font-inter font-light border-[#E4E4E4]' />
            <span className='float-right -mt-8 ml-auto'><RiArrowDownSLine className='w-6 h-6 text-black' /></span>
          </div>
          <div className='flex max-sm:flex-col min-sm:flex-row max-sm:gap-2'>
            <input type='text' placeholder='Name,Email,Phone' className='max-w-[315px] bg-white py-2 pl-3 w-full border text-sm text-[#7E7E7E] font-inter font-light border-[#E4E4E4]' />
            <button className='bg-[#12A833] text-[#F0F0F3] font-medium px-4 py-[5px] font-inter'> search</button>
          </div>
          <TbFilterX size={24} className='ml-2' color='#12A833'/>
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
            {staffs.map((staff,index)=>{
              return <tr key={index}  className='px-4'>
              <td className='flex items-center min-w-40'>
                <div style={{backgroundColor:staff.bgColor}} className='text-xs text-[#000000] font-semibold rounded-full p-[10px] mr-2'>{staff.initials}</div>
                <p className='text-xs text-[#000000] font-medium'>{staff.name} </p>
              </td>
              <td className='text-[#000000] text-xs font-montserrat min-w-40'>{staff.email}</td>
              <td className='text-[#000000] text-xs font-montserrat min-w-40'>{staff.Phone}</td>
              <td className='text-[#000000] text-xs font-montserrat min-w-40'>{staff.UserType}</td>
              <td className='min-w-40 text-center'>
                <div className='flex justify-center gap-3'>
                  <button
                    type='button'
                    onClick={() => {
                      setShowModal(true);
                      setIsEdit(true);
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
            })}
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
                >{isEdit ? 'Edit ' : 'Add '}Staff</DialogTitle>
                <div className='btn-close-bg'>
                  <button
                    type='button'
                    className='text-3xl rotate-45 mt-[-8px] text-black'
                    onClick={() => {
                      setShowModal(false);
                      setIsEdit(false);
                    }}
                  >+</button>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-2'>
                {
                  formLists.map((form, index) => {
                    if(index <=1 ) {
                      return(
                        <div
                          className='flex flex-col min-[400px]:col-span-1 max-[400px]:col-span-2'
                        >
                          <label
                            className='float-left text-sm font-normal text-custom-gray ml-[18px] z-[1] bg-white w-fit px-2'
                          >{form.label}</label>
                          <input
                            type="text"
                            name={form.name}
                            required
                            className='border border-[#E4E4E4] rounded-[10px] h-[45px] mt-[-9px] pl-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                            // onChange={handleChangeData}
                            placeholder={form.placheholder}
                            // value={currentData?.user_type}
                          />
                        </div>
                      )
                    } else if(index >= 2 && index <= 3) {
                      return(
                        <div
                          className='flex flex-col col-span-2'
                        >
                          <label
                            className='float-left text-sm font-normal text-custom-gray ml-[18px] z-[1] bg-white w-fit px-2'
                          >{form.label}</label>
                          <input
                            type="text"
                            name={form.name}
                            required
                            className='border border-[#E4E4E4] rounded-[10px] h-[45px] mt-[-9px] pl-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                            // onChange={handleChangeData}
                            placeholder={form.placheholder}
                            // value={currentData?.user_type}
                          />
                        </div>
                      )
                    } else if(index === 4) {
                      return(
                        <div
                          className='flex flex-col col-span-2'
                        >
                          <label
                            className='float-left text-sm font-normal text-custom-gray ml-[18px] z-[1] bg-white w-fit px-2'
                          >{form.label}</label>
                          <select
                            className='border border-[#E4E4E4] rounded-[10px] h-[45px] mt-[-9px] pl-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                            name={form.name}
                            required
                          >
                            <option selected>{form.placheholder}</option>
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
                  type="button"
                  onClick={e => {}}
                >Submit</button>
                <button
                  className="font-inter font-semibold text-base text-[#F0F0F3] px-5 py-[10px] w-[181px] bg-red-600 rounded-[10px]"
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setIsEdit(false);
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
                >Are you sure want to delete this staff?</p>
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
    </div>
  </>
  )
}

export default MyStaff

