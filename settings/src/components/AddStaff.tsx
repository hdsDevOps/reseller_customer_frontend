import React from "react";
import { MdOutlineClose } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
type AddStaffProps = {
    handleCloseModal: () => void; 
  };
  
const AddStaff = ({handleCloseModal}:AddStaffProps) => {
  return (
    <div className="bg-slate-900/20  p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer">
      <div className="bg-white w-full max-w-[600px] relative   rounded-xl px-4  ">
        <div className="flex justify-between pt-4">
          <h3 className="text-[#0D121F] text-[28px] font-medium font-inter ">
          Add Staff
          </h3>
          <MdOutlineClose onClick={handleCloseModal} size={20} />
        </div>
        <p className="text-xs text-[#000000] pt-3 font-inter font-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis semper dolor. </p>
        <div className="flex items-center mt-6 w-full ">
          <div className="relative mt-3 w-full mr-5">
            <input type="text" id="First name"
              className="block px-2.5 pb-2 pt-2 w-full placeholder:text-[#1E1E1E]   bg-white rounded-xl border border-[#E4E4E4] appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
              placeholder=" Robert"
            />
            <label
              htmlFor="First name"
              className="absolute text-sm text-[#8A8A8A] font-inter duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 left-2"
            >
            First name
            </label>
          </div>
          <div className="relative mt-3 w-full">
            <input type="text" id="Last name"
              className="block px-2.5 pb-2 pt-2 w-full placeholder:text-[#1E1E1E]   bg-white rounded-xl border border-[#E4E4E4] appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
              placeholder=" Clive"
            />
            <label
              htmlFor="Last name"
              className="absolute text-sm text-[#8A8A8A] font-inter duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 left-2"
            >
          Last name
            </label>
          </div>
        </div>
        <div className="relative mt-3 w-full">
            <input type="email" id="Last name"
              className="block px-2.5 pb-2 pt-2 w-full placeholder:text-[#1E1E1E]   bg-white rounded-xl border border-[#E4E4E4] appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
              placeholder=" Robertclive"
            /> <span className="absolute right-4 top-2 text-[#8A8A8A]">@domain.co.in</span>
            <label
              htmlFor="Email address "
              className="absolute text-sm text-[#8A8A8A] font-inter duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 left-2"
            >
             Email address 
            </label>
          </div>
          <div className="relative mt-3 w-full">
            <input type="text" id=" Phone No."
              className="block px-2.5 pb-2 pt-2 w-full placeholder:text-[#1E1E1E]   bg-white rounded-xl border border-[#E4E4E4] appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
              placeholder="  8777593946"
            /> 
            <label
              htmlFor=" Phone No."
              className="absolute text-sm text-[#8A8A8A] font-inter duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 left-2"
            >
            Phone No.
            </label>
          </div>
          <div className="relative mt-3 w-full">
            <select  id=" Phone No."
              className="block px-2.5 pb-2 pt-2 w-full placeholder:text-[#1E1E1E]   bg-white rounded-xl border border-[#E4E4E4] appearance-none focus:outline-none focus:ring-0 focus:border-black peer">
                <option>Select user type</option> 
                </select> <span className="absolute right-4 top-3 text-[#000000]"><MdKeyboardArrowDown size={24}/></span>
            <label
              htmlFor=" Phone No."
              className="absolute text-sm text-[#8A8A8A] font-inter duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 left-2"
            >
            User type
            </label>
          </div>
          <div className="flex justify-center items-center mt-8 mb-10 relative">
              <button className=" text-[#F0F0F3] px-16 py-[10px] rounded-xl font-inter capitalize bg-[#12A833] text-center mr-10">submit</button>
              <div>
                <button className=" text-[#F0F0F3] px-16 py-[10px] rounded-xl font-inter capitalize bg-[#E02424] text-center">cancel</button>
              </div>

          </div>
        <img  src='.\images\stickyNote.png' className='absolute bottom-5 right-[-8px] z-10' alt='sticky-note'/>
      </div>
    </div>
  );
};

export default AddStaff;
