import React, { useState } from 'react'
import { RiArrowDownSLine } from "react-icons/ri";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbFilterX } from "react-icons/tb";
import { BiSolidEditAlt } from "react-icons/bi";
import '../index.css'
import AddUser from '../components/AddUser';
const Settings = () => {
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
      <h4 className='text-[#12A833] text-3xl font-medium font-inter capitalize'>settings </h4>
      <p className='text-xs text-[#141414] pt-1 font-inter'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis semper dolor. </p>
      <p className='text-[#00163B] text-sm font-medium pt-7 tracking-wider'>Add User Type</p>
      {showModal && <AddUser handleCloseModal={closeModal}/>}
     <div className='bg-[#12A833] h-[3px] w-28 mt-2 rounded-xl' ></div>
     <div className='bg-[#F9F9F9] py-3 flex justify-between px-4 mt-4'>
        <button onClick={displayModal} className='bg-[#12A833] text-[#F0F0F3] font-medium px-4 py-1 font-inter rounded-md'> Add User Type</button>
        <div className='flex items-center'>
          <input type='text' placeholder='Auto search' className='bg-white relative py-2 pl-2 w-[300px]  border text-sm text-[#7E7E7E] border-[#E4E4E4]' />
          <span  className='absolute  right-20'><RiArrowDownSLine  size={24} color='#000000' /> </span>
          <TbFilterX size={24} className='ml-2' color='#12A833'/>
        </div>
     </div>
     <table width="100%" className='mt-6'>
      <tr className='text-[#777777] font-bold font-inter bg-[#F7FAFF]'>
        <th>User Type</th>
        <th>Permission</th>
        <th>Action</th>
      </tr>
      <tr>
        <td className='text-[#000000] font-medium text-xs font-montserrat'>Admin</td>
        <td>
          <div className='flex flex-col items-start'>
            <button className='text-[8px] font-montserrat w-auto font-medium text-[#000000] bg-[#12A83399] rounded-xl px-2 py-[2px] capitalize'>dashboard</button>
            <button className='text-[8px] font-montserrat w-auto font-medium text-[#000000] bg-[#12A83399] rounded-xl px-2 py-[2px] capitalize mt-1'>domain</button>
            <button className='text-[8px] font-montserrat w-auto font-medium text-[#000000] bg-[#12A83399] rounded-xl px-2 py-[2px] capitalize mt-1'>email</button>
            <button className='text-[8px] font-montserrat w-auto font-medium text-[#000000] bg-[#12A83399] rounded-xl px-2 py-[2px] capitalize mt-1'>voucher</button>
          </div>
        </td>
        <td>
          <div className='flex items-center'>
            <BiSolidEditAlt className='mr-3' color='#111928' size={18}/>
            <RiDeleteBin6Line color='#F24E1E' size={16}/>
          </div>
        </td>
      </tr>
      <tr>
        <td className='text-[#000000] font-medium text-xs font-montserrat'>Sub-admin</td>
        <td>
          <div className='flex flex-col items-start'>
            <button className='text-[8px] font-montserrat w-auto font-medium text-[#000000] bg-[#12A83399] rounded-xl px-2 py-[2px] capitalize'>Billing History</button>
            <button className='text-[8px] font-montserrat w-auto font-medium text-[#000000] bg-[#12A83399] rounded-xl px-2 py-[2px] capitalize mt-1'>Payment Subscription</button>
            <button className='text-[8px] font-montserrat w-auto font-medium text-[#000000] bg-[#12A83399] rounded-xl px-2 py-[2px] capitalize mt-1'>Payment Method</button>
            <button className='text-[8px] font-montserrat w-auto font-medium text-[#000000] bg-[#12A83399] rounded-xl px-2 py-[2px] capitalize mt-1'>My Staff</button>
          </div>
        </td>
        <td>
          <div className='flex items-center '>
            <BiSolidEditAlt className='mr-3' color='#111928' size={18}/>
            <RiDeleteBin6Line color='#F24E1E'  size={16}/>
          </div>
        </td>
      </tr>
     </table>
   
    </div>
  </>
  )
}

export default Settings
