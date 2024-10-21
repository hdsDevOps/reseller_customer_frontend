import React from "react";
import { MdOutlineClose } from "react-icons/md";
type AddUserProps = {
    handleCloseModal: () => void; 
  };
  
const AddUser = ({handleCloseModal}:AddUserProps) => {
  return (
    <div className="bg-slate-900/20  p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer">
      <div className="bg-white w-full max-w-[600px]   rounded-xl px-4  ">
        <div className="flex justify-between pt-4">
          <h3 className="text-[#0D121F] text-[28px] font-medium font-inter ">
            Add User Type
          </h3>
          <MdOutlineClose onClick={handleCloseModal} size={20} />
        </div>
        <p className="text-xs text-[#000000] pt-3 font-inter font-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis semper dolor. </p>
        <div className="relative mt-6">
          <input
            type="text"
            id="userType"
            className="block px-2.5 pb-2 pt-2 w-full   bg-white rounded-xl border border-[#E4E4E4] appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
            placeholder=" Enter user type"
          />
          <label
            htmlFor="userType"
            className="absolute text-sm text-[#8A8A8A] font-inter duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 left-2"
          >
            User Type
          </label>
        </div>
        <div className="relative border border-[#E4E4E4] rounded-xl px-6 py-2 mt-6 w-full ">
        <p className="absolute -top-3 left-2 bg-white px-1 text-sm text-[#8A8A8A] font-inter transition-all">Permissions</p>
        <div className="flex  w-full pb-4">
           <div className="flex flex-col w-full mr-10">
             <div className="flex justify-between items-center w-full mt-3">
                <p className="text-[#000000] text-[10px] font-montserrat">Dashboard</p>
                <input type="checkbox" className="toggle toggle-success toggle-md" defaultChecked />
             </div>
             <div className="flex justify-between items-center w-full mt-3">
                <p className="text-[#000000] text-[10px] font-montserrat">Domain</p>
                <input type="checkbox" className="toggle toggle-md"  />
             </div>
             <div className="flex justify-between items-center w-full mt-3">
                <p className="text-[#000000] text-[10px] font-montserrat">Email</p>
                <input type="checkbox" className="toggle toggle-success toggle-md" defaultChecked />
             </div>
             <div className="flex justify-between items-center w-full mt-3">
                <p className="text-[#000000] text-[10px] font-montserrat">Vouchers</p>
                <input type="checkbox" className="toggle toggle-md"  />
             </div>
             <div className="flex justify-between items-center w-full mt-3">
                <p className="text-[#000000] text-[10px] font-montserrat">Billing History</p>
                <input type="checkbox" className="toggle toggle-md"  />
             </div>
           </div>
           <div className="flex flex-col w-full">
                <div className="flex justify-between items-center w-full mt-3">
                    <p className="text-[#000000] text-[10px] font-montserrat">Profile</p>
                    <input type="checkbox" className="toggle toggle-md"  />
                </div>
                <div className="flex justify-between items-center w-full mt-3">
                    <p className="text-[#000000] text-[10px] font-montserrat">Payment Subscription</p>
                    <input type="checkbox" className="toggle toggle-md"  />
                </div>
                <div className="flex justify-between items-center w-full mt-3">
                    <p className="text-[#000000] text-[10px] font-montserrat">Payment Method</p>
                    <input type="checkbox" className="toggle toggle-md"  />
                </div>
                <div className="flex justify-between items-center w-full mt-3">
                    <p className="text-[#000000] text-[10px] font-montserrat">My Staff</p>
                    <input type="checkbox" className="toggle toggle-md"  />
                </div>
                <div className="flex justify-between items-center w-full mt-3">
                <p className="text-[#000000] text-[10px] font-montserrat">Settings</p>
                <input type="checkbox" className="toggle toggle-success toggle-md" defaultChecked />
             </div>
           </div>
        </div>
        </div>
        <div className="flex justify-center items-center mt-8 mb-6">
            <button className=" text-[#F0F0F3] px-16 py-[10px] rounded-xl font-inter capitalize bg-[#12A833] text-center mr-10">submit</button>
            <button className=" text-[#F0F0F3] px-16 py-[10px] rounded-xl font-inter capitalize bg-[#E02424] text-center">cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
