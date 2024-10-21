import React from 'react'
import { MdOutlineClose } from "react-icons/md";
import { GrRotateLeft } from "react-icons/gr";
import { PiCrop } from "react-icons/pi";
type AddUserProps = {
    handleCloseModal: () => void; 
  };
const HdsCropPicture = ({handleCloseModal}:AddUserProps) => {
  return (
    <div className='bg-slate-900/20   fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer'>
        <div className='bg-white w-full max-w-[400px] flex flex-col  justify-center   rounded-xl px-4'>
            <div className="flex justify-between items-center pt-2 mb-3">
            <h3 className="text-[#0D121F] text-xl font-medium font-inter ">
            Add profile picture
            </h3>
            <MdOutlineClose onClick={handleCloseModal} size={24} />
            </div>
            <img className='h-48 w-48 object-cover mx-auto' src='./images/crop-profile-img.png'/>
           <div className='mt-4 flex items-center justify-center border-[#CACACA] mb-4 border-b '>
                <p className=' flex items-center'><PiCrop/>
                <span className='inline-flex ml-1 text-[15px] text-[#000000]'>crop</span></p>
                <div className='border-[#CACACA] border-r  h-10 mx-6'></div>
                <p className=' flex items-center'><GrRotateLeft/>
                <span className='inline-flex ml-1 text-[15px] text-[#000000]'>Rotate</span></p>
           </div>
           <div className='flex items-center my-6 justify-center'>
                <button className='text-[#000000] text-center text-[10px] bg-[#C3C3C380] py-2 w-full rounded-lg flex justify-center items-center mr-4'>
                    <img src='./images/image-editing 1.png'/><span className='inline-flex ml-2'>Select from gallary</span></button>
                    <button className='text-[#000000] text-center rounded-lg text-[10px] bg-[#C3C3C380] py-2 w-full flex justify-center items-center '>
                    <img src='./images/capture.png'/><span className='inline-flex ml-2'>Take a picture</span></button>
           </div>
           
           <button onClick={handleCloseModal}  className='text-white text-center bg-[#12A833] py-2 px-4 rounded-xl w-36 mx-auto mb-4'>Update</button>
        </div>
    </div>
  )
}

export default HdsCropPicture