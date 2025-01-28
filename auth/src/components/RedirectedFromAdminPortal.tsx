import React, { useEffect } from 'react';
import './list.css';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getHordansoAdminDetailsFromLSThunk, getUserAuthTokenFromLSThunk, getUserIdFromLSThunk, setHordansoAdminDetailsToLSThunk, setUserAuthTokenToLSThunk, setUserIdToLSThunk } from 'store/user.thunk';
import { setAdminNameSlice, setIsAdminSlice } from 'store/authSlice';

function RedirectedFromAdminPortal() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const tokenFromHordansoAdmin = searchParams.get("token");
  const customerIdFromHordansoAdmin = searchParams.get("customer_id");
  const adminNameFromHordansoAdmin = searchParams.get("admin_name");

  const { customerId, token, isAdmin, adminName } = useAppSelector(state => state.auth);
  // console.log({ customerId, token, isAdmin, adminName });

  useEffect(() => {
    const setCustomerIdTokenFromHordansoAdmin = async() => {
      if(tokenFromHordansoAdmin !== "" && tokenFromHordansoAdmin !== null && tokenFromHordansoAdmin !== undefined && customerIdFromHordansoAdmin !== "" && customerIdFromHordansoAdmin !== null && customerIdFromHordansoAdmin !== undefined && adminNameFromHordansoAdmin !== "" && adminNameFromHordansoAdmin !== null && adminNameFromHordansoAdmin !== undefined) {
        console.log({token, customerId, adminName});
        try {
          await dispatch(setHordansoAdminDetailsToLSThunk({hordansoAdminStatus: true,hordansoAdminName:adminNameFromHordansoAdmin}));
          await dispatch(setUserIdToLSThunk(customerIdFromHordansoAdmin)).unwrap();
          await dispatch(setUserAuthTokenToLSThunk({token: tokenFromHordansoAdmin})).unwrap();
          
          // await dispatch(setIsAdminSlice(true));
          // await dispatch(setAdminNameSlice(adminNameFromHordansoAdmin));
          await dispatch(getHordansoAdminDetailsFromLSThunk());
          await dispatch(getUserAuthTokenFromLSThunk());
          await dispatch(getUserIdFromLSThunk());
        } catch (error) {
          console.log("error");
        }
      } else {
        console.log("no data");
      }
    }

    setCustomerIdTokenFromHordansoAdmin()
  }, [token, customerId]);
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 z-50 bg-white'>
      You are being redirected to customer portal...
    </div>
  )
}

export default RedirectedFromAdminPortal;