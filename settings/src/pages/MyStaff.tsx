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
    <div className={`${showModal===true?'bg-[bg-slate-900/20]' :'' }'`}>
      <h4 className='text-[#12A833] text-3xl font-medium font-inter capitalize'>MyStaff </h4>
      {showModal && <AddStaff handleCloseModal={closeModal}/>}
     <div className='bg-[#F9F9F9] py-3 flex justify-between px-4 mt-4'>
        <button onClick={displayModal} className='bg-[#12A833] text-[#F0F0F3] font-medium px-4 py-1 font-inter rounded-md'> Add Staff</button>
        <div className='flex items-center'>
          <div className='relative mr-6'>
            <input type='text' placeholder='User Type' className='bg-white relative py-2 pl-2 w-[300px]  border text-sm text-[#7E7E7E] border-[#E4E4E4]' />
            <span  className='absolute top-2  right-[0.2rem]'><RiArrowDownSLine  size={24} color='#000000' /> </span>
          </div>
          <input type='text' placeholder='Name,Email,Phone' className='bg-white relative py-2 pl-2 w-[300px]  border text-sm text-[#7E7E7E] border-[#E4E4E4]' />
          <button className='bg-[#12A833] text-[#F0F0F3] font-medium px-4 py-[5px] font-inter'> search</button>
          <TbFilterX size={24} className='ml-2' color='#12A833'/>
        </div>
     </div>
     <table width="100%" className='mt-6 px-4'>
      <tr className='text-[#777777] font-bold font-inter bg-[#F7FAFF] px-4'>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>User Type</th>
        <th>Action</th>
      </tr>
      {staffs.map((staff,index)=>{
        return <tr key={index}  className='px-4'>
        <td className='flex items-center'>
          <div style={{backgroundColor:staff.bgColor}} className='text-xs text-[#000000] font-semibold rounded-full p-[10px] mr-2'>{staff.initials}</div>
          <p className='text-xs text-[#000000] font-medium'>{staff.name} </p>
        </td>
        <td className='text-[#000000] text-xs font-montserrat'>{staff.email}</td>
        <td className='text-[#000000] text-xs font-montserrat'>{staff.Phone}</td>
        <td className='text-[#000000] text-xs font-montserrat'>{staff.UserType}</td>
        <td>
          <div className='flex items-center'>
            <staff.edit className='mr-3' color='#111928' size={18}/>
            <staff.delete color='#F24E1E' size={16}/>
          </div>
        </td>
      </tr>
      })}
      
     </table>
   
    </div>
  </>
  )
}

export default MyStaff

