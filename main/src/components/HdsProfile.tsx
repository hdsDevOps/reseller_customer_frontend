import React, { useState } from 'react';
import { IoArrowBackSharp } from "react-icons/io5";
import { FaCamera } from "react-icons/fa";
import { PiEyeClosedBold } from "react-icons/pi";
import HdsCropPicture from './HdsCropPicture';
import EditProfile from './EditProfile';
interface HdsProfileProps{
    setShowProfile: React.Dispatch<React.SetStateAction<boolean>>
}
const HdsProfile = ({setShowProfile}:HdsProfileProps) => {
    const [showModal,setShowModal] = useState<boolean>(false)
    const [showEditModal,setEditShowModal] = useState<boolean>(false)
    const displayModal=()=>{
      setShowModal(true)
    }
    const closeModal=() :void=>{
      setShowModal(false)
    }
    const onSetShowProfile= ()=>{
        setShowProfile(false)
    }
    const onShowModal=()=>{
        setEditShowModal(true)
    }
    const handleCloseShowModal=()=>{
        setEditShowModal(false)
    }
  return (
    <div className="absolute bg-white left-64 right-0 min-h-screen z-50 mb-20">
      <main className="  px-10 bg-white">
        <h2 className="text-2xl text-[#12A833] flex items-center font-medium cursor-pointer" onClick={onSetShowProfile}>
            <IoArrowBackSharp color='#12A833' size={20}/> <span className='ml-2'>Profile</span></h2>
        <div className='flex justify-between items-center pt-4'>
            <div className='relative'>
                <img src='.\images\profile-image.png' className='' alt='profile_image'/>
                <div onClick={displayModal} className='border border-[#5A5A5A] rounded-full p-1 cursor-pointer absolute top-[5rem] left-[4rem]'>
                    <FaCamera size={16} color='#12A833'/>
                </div>
            </div>
            {showModal && <HdsCropPicture handleCloseModal={closeModal}/>}
            <button onClick={onShowModal}
             className='bg-transparent border-2 rounded-lg cursor-pointer
             border-[#12A833] px-[20px] py-1 font-sm capitalize text-center text-[#12A833]'>edit</button>
             {showEditModal && <EditProfile handleCloseShowModal={handleCloseShowModal}/>}
        </div>
        <h4 className='text-[#14213D] font-medium text-3xl pt-3'>Robert Clive</h4>
        <p className='text-sm text-[#434D64] pt-2 '>User</p>
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
      </main>
    </div>
  );
};

export default HdsProfile;
