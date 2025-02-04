import React, { useEffect, useState } from "react";
import Stripe from "../../public/images/stripe.png";
import Paystack from "../../public/images/paystack.png";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { getPaymentMethodsThunk, makeDefaultPaymentMethodThunk, removeUserAuthTokenFromLSThunk } from "store/user.thunk";
import { toast } from "react-toastify";

const PaymentMethod = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { customerId, rolePermission }= useAppSelector(state => state.auth);
  
  const [paymentMethods, setPaymentMethods] = useState([]);
  // console.log("payment methods...", paymentMethods);
  
  useEffect(() => {
    const checkPermission = (label:String) => {
      if(rolePermission?.length > 0) {
        const permissionStatus = rolePermission?.find(item => item?.name === label)?.value;
        if(permissionStatus) {
          //
        } else {
          navigate('/');
        }
      } else {
        navigate('/');
      }
    };

    checkPermission("Payment Method");
  }, [rolePermission]);

  const getPaymentMethods = async() => {
    try {
      const result = await dispatch(getPaymentMethodsThunk({user_id: customerId})).unwrap();
      setPaymentMethods(result?.paymentMethods);
    } catch (error) {
      if(error?.message == "Request failed with status code 401") {
        setPaymentMethods([]);
        try {
          const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
          navigate('/login');
        } catch (error) {
          //
        }
      }
    }
  };

  useEffect(() => {
    getPaymentMethods();
  }, []);

  const updateDefaultPaymentMethod = async(id:string) => {
    try {
      const result = await dispatch(makeDefaultPaymentMethodThunk({
        user_id: customerId,
        payment_method_id: id
      })).unwrap();
      setTimeout(() => {
        toast.success(result?.message);
      }, 1000);
    } catch (error) {
      if(error?.message == "Request failed with status code 401") {
        toast.error(error?.message || "Error making default payment method");
        try {
          const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
          navigate('/login');
        } catch (error) {
          //
        }
      }
    } finally {
      getPaymentMethods();
    }
  };
  return (
    <div>
      <div className="flex flex-col gap-1">
        <h1 className="text-green-500 text-3xl font-medium">
          Payment method
        </h1>
        <p className="text-gray-900 text-sm">
          View & manage the payment method in your account
        </p>
      </div>
      <div className="flex flex-wrap gap-3 mt-8">
        {
          paymentMethods.length > 0 ? paymentMethods?.map((method, index) => (
            <div
              className="rounded-lg flex flex-col items-center justify-center p-2"
              style={{ width: "20rem", height: "12rem", border: "1px solid gray" }}
              key={index}
            >
              <div className="flex gap-2 self-end my-2">
                <p className="text-green-500">Mark as default</p>
                <input
                  type="checkbox"
                  checked={method?.default}
                  onChange={() => {updateDefaultPaymentMethod(method?.id)}}
                  className="checkbox checkbox-xs rounded-sm border-green-500 [--chkbg:theme(colors.green.500)] [--chkfg:white] checked:border-green-500"
                />
              </div>
              <div className="mb-10" style={{ width: "12rem", height: "7rem" }}>
                <img src={method?.method_image} alt="stripe" className="w-full h-full" />
              </div>
            </div>
          )) : (
            <div
              className="rounded-lg flex flex-col items-center justify-center p-2"
              style={{ width: "20rem", height: "12rem", border: "1px solid gray" }}
            >
              No Data Available
            </div>
          )
        }
      </div>
    </div>
  );
};

export default PaymentMethod;
