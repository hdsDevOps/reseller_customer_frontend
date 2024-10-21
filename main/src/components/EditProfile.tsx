import React from 'react'
import { MdOutlineClose } from "react-icons/md";
import { PiEyeClosedBold } from "react-icons/pi";
interface EditProfileProps  {
    handleCloseShowModal: () => void; 
  };
const EditProfile = ({handleCloseShowModal}:EditProfileProps) => {
   
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
             <div className='px-6'>
                <h2 className='text-lg font-bold text-[#14213D] mt-6'>Basic information</h2>
                <div className='max-w-4xl '>
                    <div className='flex items-center justify-between mt-6 w-full'>
                        <div className="relative w-full ">
                        <input
                            type="text"
                            id="userType"
                            className="block px-2.5 pb-1 pt-2 w-full text-[#14213D] text-sm   bg-white rounded-xl border border-[#E4E4E4] appearance-none focus:outline-none placeholder:text-[#14213D] focus:ring-0 focus:border-black peer"
                            placeholder=" Robert"
                        />
                        <label
                            htmlFor="userType"
                            className="absolute text-sm text-[#8A8A8A] font-inter duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 left-2"
                        >
                        First Name
                        </label>
                        </div>
                        <div className="relative w-full ml-12">
                        <input
                            type="text"
                            id="userType"
                            className="block px-2.5 pb-1 pt-2 w-full text-[#14213D] text-sm   bg-white rounded-xl border border-[#E4E4E4] appearance-none focus:outline-none placeholder:text-[#14213D] focus:ring-0 focus:border-black peer"
                            placeholder=" Clive"
                        />
                        <label
                            htmlFor="userType"
                            className="absolute text-sm text-[#8A8A8A] font-inter duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 left-2"
                        >
                    Last Name
                        </label>
                        </div>
                    </div>
                    <div className='flex items-center justify-between mt-6 w-full'>
                        <div className="relative w-full ">
                        <input
                            type="text"
                            id="Email"
                            className="block px-2.5 pb-1 pt-2 w-full text-[#14213D] text-sm  bg-white rounded-xl border border-[#E4E4E4] appearance-none focus:outline-none placeholder:text-[#434D64] focus:ring-0 focus:border-black peer"
                            placeholder=" Robertclive@gmail.com"
                        />
                        <label
                            htmlFor="Email"
                            className="absolute text-sm text-[#8A8A8A] font-inter duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 left-2"
                        >
                        Email
                        </label>
                        </div>
                        <div className="relative w-full ml-12">
                        <input
                            type="text"
                            id="8777593945"
                            className="block px-2.5 pb-1 pt-2 w-full text-[#14213D] text-xs  bg-white rounded-xl border border-[#E4E4E4] appearance-none focus:outline-none placeholder:text-[#434D64] focus:ring-0 focus:border-black peer"
                            placeholder="8777593945"
                        />
                        <label
                            htmlFor="Phone Number"
                            className="absolute text-sm text-[#8A8A8A] font-inter duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 left-2"
                        >
                        Phone Number
                        </label>
                        </div>
                    </div>
                    <div className='flex items-center mt-6 w-full justify-between'>
                        <div className="relative w-full">
                        <input
                            type="text"
                            id="Address"
                            className="block px-2.5 pb-1 pt-2 w-full text-[#14213D] text-sm   bg-white rounded-xl border border-[#E4E4E4] appearance-none focus:outline-none placeholder:text-[#434D64] focus:ring-0 focus:border-black peer"
                            placeholder=" Lorem ipsum dolor sit "
                        />
                        <label
                            htmlFor="Address"
                            className="absolute text-sm text-[#8A8A8A] font-inter duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 left-2"
                        >
                        Address
                        </label>
                        </div>
                        <div className="relative w-full mx-12">
                        <input
                            type="text"
                            id="State/City"
                            className="block px-2.5 pb-1 pt-2 w-full text-[#14213D] text-sm  bg-white rounded-xl border border-[#E4E4E4] appearance-none focus:outline-none placeholder:text-[#434D64] focus:ring-0 focus:border-black peer"
                            placeholder=" Lorem ipsum dolor sit "
                        />
                        <label
                            htmlFor="State/City"
                            className="absolute text-sm text-[#8A8A8A] font-inter duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 left-2"
                        >
                        State/City
                        </label>
                        </div>
                        <div className="relative w-full">
                        <input
                            type="text"
                            id="Country"
                            className="block px-2.5 pb-1 pt-2 w-full text-[#14213D] text-sm   bg-white rounded-xl border border-[#E4E4E4] appearance-none focus:outline-none placeholder:text-[#434D64] focus:ring-0 focus:border-black peer"
                            placeholder=" Lorem ipsum dolor sit"
                        />
                        <label
                            htmlFor="Country"
                            className="absolute text-sm text-[#8A8A8A] font-inter duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 left-2"
                        >
                        Country
                        </label>
                        </div>
                    </div>
                    <div className='flex items-center justify-between mt-6 w-full'>
                        <div className="relative w-full ">
                        <input
                            type="text"
                            id="password"
                            className="block px-2.5 pb-1 pt-2 w-full text-[#14213D] text-sm  bg-white rounded-xl border border-[#E4E4E4] appearance-none focus:outline-none placeholder:text-[#434D64] focus:ring-0 focus:border-black peer"
                            placeholder=" 123456"
                        />
                        <span className='absolute right-4 top-3'><PiEyeClosedBold/></span>
                        <label
                            htmlFor="password"
                            className="absolute text-sm text-[#8A8A8A] font-inter duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 left-2"
                        >
                        Password
                        </label>
                        </div>
                        <div className="relative w-full ml-12">
                        <input
                            type="text"
                            id="confirm Password"
                            className="block px-2.5 pb-1 pt-2 w-full text-[#14213D] text-xs  bg-white rounded-xl border border-[#E4E4E4] appearance-none focus:outline-none placeholder:text-[#434D64] focus:ring-0 focus:border-black peer"
                            placeholder="123456"
                        />
                        <label
                            htmlFor="confirm Password"
                            className="absolute text-sm text-[#8A8A8A] font-inter duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 left-2"
                        >
                        confirm Password
                        </label>
                        </div>
                    </div>
                </div>
                <h2 className='text-lg font-bold text-[#14213D] mt-6'>Business information</h2>
                <div className='max-w-4xl'>
                <div className='flex items-center justify-between mt-6 w-full'>
                        <div className="relative w-full ">
                        <input
                            type="text"
                            id="ABC Business"
                            className="block px-2.5 pb-2 pt-2 w-full text-[#14213D] text-sm   bg-white rounded-xl border border-[#E4E4E4] appearance-none focus:outline-none placeholder:text-[#14213D] focus:ring-0 focus:border-black peer"
                            placeholder=" ABC Business"
                        />
                        <label
                            htmlFor="ABC Business"
                            className="absolute text-sm text-[#8A8A8A] font-inter duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 left-2"
                        >
                        Business Name
                        </label>
                        </div>
                        <div className="relative w-full ml-12">
                        <input
                            type="text"
                            id="userType"
                            className="block px-2.5 pb-2 pt-2 w-full text-[#14213D] text-sm   bg-white rounded-xl border border-[#E4E4E4] appearance-none focus:outline-none placeholder:text-[#14213D] focus:ring-0 focus:border-black peer"
                            placeholder=" Maharashtra"
                        />
                        <label
                            htmlFor="userType"
                            className="absolute text-sm text-[#8A8A8A] font-inter duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 left-2"
                        >
                            State
                        </label>
                        </div>
                </div>
                <div className='flex items-center justify-between mt-6 w-full'>
                        <div className="relative w-full ">
                        <input
                            type="text"
                            id="Mumbai"
                            className="block px-2.5 pb-2 pt-2 w-full text-[#14213D] text-sm   bg-white rounded-xl border border-[#E4E4E4] appearance-none focus:outline-none placeholder:text-[#14213D] focus:ring-0 focus:border-black peer"
                            placeholder=" Mumbai"
                        />
                        <label
                            htmlFor="Mumbai"
                            className="absolute text-sm text-[#8A8A8A] font-inter duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 left-2"
                        >
                        City*
                        </label>
                        </div>
                        <div className="relative w-full ml-12">
                        <input
                            type="text"
                            id="Zip code"
                            className="block px-2.5 pb-2 pt-2 w-full text-[#14213D] text-sm   bg-white rounded-xl border border-[#E4E4E4] appearance-none focus:outline-none placeholder:text-[#14213D] focus:ring-0 focus:border-black peer"
                            placeholder=" 601249"
                        />
                        <label
                            htmlFor="Zip code"
                            className="absolute text-sm text-[#8A8A8A] font-inter duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 left-2"
                        >
                            Zip code
                        </label>
                        </div>
                    </div>
                </div>
             </div>
             <div className='flex items-center justify-between mt-3 px-6'>
                <button onClick={handleCloseShowModal} 
                className='text-white text-center bg-[#12A833] py-2 px-4 rounded-xl w-36  mb-4'>Update</button>
                <img className='h-28 w-40 object-cover' src='./images/stamp.png'/>
             </div>
        </div>
     </div>
  )
}

export default EditProfile