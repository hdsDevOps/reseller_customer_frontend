import React, { useEffect, useState } from 'react';
import ToggleSwitch from './ToggleSwtich';
import { getNotificationsListThunk, readNotificationThunk, removeUserAuthTokenFromLSThunk, toggleNotificationStatusThunk } from 'store/user.thunk';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { useNavigate } from 'react-router-dom';

interface NotificationCenterProps {
  onClose: () => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { customerId, notificationsList } = useAppSelector(state => state.auth);
  const handleModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // const [notificationsList, setNotificationsList] = useState([]);
  console.log("notificationsList...", notificationsList);
  const [lastId, setLastId] = useState("");

  // const getNotificationsList = async() => {
  //   try {
  //     const result = await dispatch(getNotificationsListThunk({
  //       user_id: customerId,
  //       last_id: lastId,
  //       per_page: 10
  //     })).unwrap();
  //     console.log("result...", result);
  //   } catch (error) {
  //     setNotificationsList([...notificationsList]);
  //     if(error?.message == "Authentication token is required") {
  //       try {
  //         const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
  //         navigate('/login');
  //       } catch (error) {
  //         //
  //       }
  //     }
  //   }
  // };

  // useEffect(() => {
  //   getNotificationsList();
  // }, [lastId]);

  const readNotification = async(id) => {
    try {
      const result = await dispatch(readNotificationThunk({
        notification_id: id,
        is_read: true
      })).unwrap();
      console.log("result...", result);
    } catch (error) {
      if(error?.message == "Authentication token is required") {
        try {
          const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
          navigate('/login');
        } catch (error) {
          //
        }
      }
    }
  };

  const toggleNotification = async() => {
    try {
      const result = await dispatch(toggleNotificationStatusThunk({
        user_id: customerId,
        status: true
      })).unwrap();
      console.log("result...", result);
    } catch (error) {
      if(error?.message == "Authentication token is required") {
        try {
          const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
          navigate('/login');
        } catch (error) {
          //
        }
      }
    }
  };

  return (
    <div className="bg-slate-900/20 fixed inset-0 z-50 cursor-pointer" onClick={onClose} >
      <div
        className="bg-white w-full max-w-[420px] flex flex-col justify-center rounded-xl px-4 absolute right-4 top-[4.5rem]"
        onClick={handleModalContentClick}>
        <div className='flex justify-between mt-4 '>
          <p className='text-[#000000] text-lg font-bold'>Notifications</p>
          <ToggleSwitch/>
        </div>
        <div className='flex flex-col mb-10'>
          <div className='flex flex-col'>
            {
              notificationsList?.length > 0
              ? notificationsList?.map((notification, index) => (
                <div></div>
              )) : (
                <p className='font-inter font-semibold text-[10px] text-black text-center'>No notifications...</p>
              )
            }
          </div>
          {/* <div className='flex items-center mt-4'>
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
          </div> */}
          {
            notificationsList?.length > 4 && (
              <button className='bg-[#80AC8A] text-[8px] font-bold text-white text-center px-3 w-fit mx-auto rounded-lg mt-10'>See more</button>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;
