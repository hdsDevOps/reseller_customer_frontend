import React, { useState } from 'react'
import { RiArrowDownSLine } from "react-icons/ri";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbFilterX } from "react-icons/tb";
import { BiSolidEditAlt } from "react-icons/bi";
import '../index.css'
import AddStaff from '../components/AddStaff';
const staffs=[
  {initials:'RC',bgColor:'#23B7E5', name:'Robert Clive ',email:'Robertclive@domain.co.in',Phone:'(123) 456 - 7890',
    UserType:'Admin',edit:BiSolidEditAlt,delete:RiDeleteBin6Line},
  {initials:'RC',bgColor:'#96D869', name:'Robert Clive ',email:'Robertclive@domain.co.in',Phone:'(123) 456 - 7890',
      UserType:'Sub-admin',edit:BiSolidEditAlt,delete:RiDeleteBin6Line},
  {initials:'RC',bgColor:'#FD7E95', name:'Robert Clive ',email:'Robertclive@domain.co.in',Phone:'(123) 456 - 7890',
        UserType:'Account ',edit:BiSolidEditAlt,delete:RiDeleteBin6Line}
]
const MyStaff = () => {
  const [showModal,setShowModal] = useState<boolean>(false)
  const displayModal=()=>{
    setShowModal(true)
  }
  const closeModal=() :void=>{
    setShowModal(false)
  }
  return (
  <>
    <div className={`p-6 grid grid-cols-1`}>
      <h3 className='text-[#12A833] text-[28px] font-medium font-inter capitalize ml-[18px]'>My Staff</h3>
      {showModal && <AddStaff handleCloseModal={closeModal}/>}
      <div className='bg-[#F9F9F9] py-3 flex min-md:flex-row max-md:flex-col justify-between px-6 mt-7 gap-2 max-md:items-center'>
        <button onClick={displayModal} className='bg-[#12A833] text-[#F0F0F3] font-bold px-4 py-[10px] font-inter rounded-md max-w-40'> Add Staff</button>
        <div className='flex items-center min-sm:flex-row max-sm:flex-col gap-2'>
          <div className='max-w-[315px] flex flex-col'>
            <input type='text' placeholder='User Type' className='bg-white py-2 pl-3 w-full border text-sm text-[#7E7E7E] font-inter font-light border-[#E4E4E4]' />
            <span className='float-right -mt-8 ml-auto'><RiArrowDownSLine className='w-6 h-6 text-black' /></span>
          </div>
          <div className='flex max-sm:flex-col min-sm:flex-row'>
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
                <div className='flex justify-center items-center'>
                  <staff.edit className='mr-3' color='#111928' size={18}/>
                  <staff.delete color='#F24E1E' size={16}/>
                </div>
              </td>
            </tr>
            })}
          </tbody>
        </table>
      </div>
   
    </div>
  </>
  )
}

export default MyStaff

