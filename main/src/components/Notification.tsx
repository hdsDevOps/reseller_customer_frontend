import React from 'react';
import ToggleSwitch from './ToggleSwtich';

interface NotificationCenterProps {
  onClose: () => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ onClose }) => {
  const handleModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="bg-slate-900/20 fixed inset-0 z-50 cursor-pointer" onClick={onClose} >
      <div
        className="bg-white w-full max-w-[420px] flex flex-col justify-center rounded-xl px-4 absolute right-4 top-[4.5rem]"
        onClick={handleModalContentClick}>
        <div className='flex justify-between mt-4 '>
          <p className='text-[#000000] text-lg font-bold'>NotificationCenter</p>
          <ToggleSwitch/>
        </div>
        <div className='flex items-center mt-4'>
          <img src='./images/user-profile-image.png'/>
          <div className='w-full ml-2 mr-4'>
            <p className='text-[#000000] text-sm font-semibold'>Frankie sulliva commented on your post</p>
            <p className='text-[#000000] pl-2 mt-2 text-xs border border-[#E5E7EB] rounded-lg '>This is a notification template. Here is it </p>
            <div className='flex justify-between mt-2'>
              <p className='text-[10px] font-semibold text-[#000000]'>Friday 2:20pm</p>
              <p className='text-[10px] font-semibold text-[#000000]'>Sep 20, 2024</p>
            </div>
          </div>
          <div className='bg-[#1C64F2] h-2 w-2 rounded-full'></div>
        </div>
        <div className='flex items-center mt-4'>
          <img src='./images/user-profile-image.png'/>
          <div className='w-full ml-2 mr-4'>
            <p className='text-[#000000] text-sm font-semibold'>Frankie sulliva commented on your post</p>
            <p className='text-[#000000] pl-2 mt-2 text-xs border border-[#E5E7EB] rounded-lg '>This is a notification template. Here is it </p>
            <div className='flex justify-between mt-2'>
              <p className='text-[10px] font-semibold text-[#000000]'>Friday 2:20pm</p>
              <p className='text-[10px] font-semibold text-[#000000]'>Sep 20, 2024</p>
            </div>
          </div>
          <div className='bg-[#1C64F2] h-2 w-2 rounded-full'></div>
        </div>
        <div className='flex items-center mt-4'>
          <img src='./images/user-profile-image.png'/>
          <div className='w-full ml-2 mr-4'>
            <p className='text-[#000000] text-sm font-semibold'>Frankie sulliva commented on your post</p>
            <p className='text-[#000000] pl-2 mt-2 text-xs border border-[#E5E7EB] rounded-lg '>This is a notification template. Here is it </p>
            <div className='flex justify-between mt-2'>
              <p className='text-[10px] font-semibold text-[#000000]'>Friday 2:20pm</p>
              <p className='text-[10px] font-semibold text-[#000000]'>Sep 20, 2024</p>
            </div>
          </div>
          <div className='bg-[#1C64F2] h-2 w-2 rounded-full'></div>
        </div>
        <button className='bg-[#80AC8A] text-[8px] font-bold text-white text-center px-3 w-fit mx-auto rounded-lg my-10'>See all notification</button>
    </div>
    </div>
  );
};

export default NotificationCenter;
