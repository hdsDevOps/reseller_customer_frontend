import React, {
  useEffect,
  useState,
  useRef,
  ChangeEvent,
  KeyboardEvent,
} from "react";
import { LuMoveLeft } from "react-icons/lu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { verifyLoginOtpThunk, setUserAuthTokenToLSThunk, setUserIdToLSThunk, getUserAuthTokenFromLSThunk, getUserIdFromLSThunk, resendLoginOtpThunk, verifyForgetPasswordOtpThunk, resendForgetPasswordOtpThunk, resendRegisterOtpThunk, verifyRegisterOtpThunk, setStaffIdToLSThunk, getStaffIdFromLSThunk, verifyStaffLoginOtpThunk, setStaffStatusToLSThunk, getStaffStatusFromLSThunk, setRoleIdToLSThunk, getRoleIdFromLSThunk, addSettingWithoutLoginThunk, addStaffWithoutLoginThunk } from 'store/user.thunk';

const logo = "https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/hordanso-fixed-logo.png?alt=media&token=ecd5d548-0aa7-46d4-9757-c24cba11693c";

const superAdminRolePermissions = [
  {
      name: "Dashboard",
      value: true
  },
  {
      name: "Profile",
      value: true
  },
  {
      name: "Domain",
      value: true
  },
  {
      name: "Payment Subscription",
      value: true
  },
  {
      name: "Email",
      value: true
  },
  {
      name: "Payment Method",
      value: true
  },
  {
      name: "Vouchers",
      value: true
  },
  {
      name: "My Staff",
      value: true
  },
  {
      name: "Billing History",
      value: true
  },
  {
      name: "Settings",
      value: true
  }
];

const OTP: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const customerId = location?.state?.customer_id;
  const staffId = location.state.staff_id;
  const email = location.state?.email;
  const mode = queryParams.get("mode");

  // // console.log("state...", location.state);
  
  const otpRefs = useRef([]);
  const [otpValues, SetOptValues] = useState(["", "", "", "", "", "",]);
  
  const [timeLeft, setTimeLeft] = useState<number>(120);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(location.state) {
      if(location.state?.from === "forgot") {
        toast.success("OTP for resetting your password has been sent.");
      } else if(location?.state?.from === "otp") {
        toast.success("OTP for log in to your account has been sent.");
      } else if(location?.state?.from === "registration") {
        toast.success("OTP for verify your account has been sent.");
      } else {
        // // console.log("ok")
      }
    } else {
      navigate('/home');
    }
  }, []);


  useEffect(() => {
    otpRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (timeLeft === 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2,"0")}`;
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;

    if(/^\d$/.test(value)) {
      const newOtpValues = [...otpValues];
      newOtpValues[index - 1] = value;
      SetOptValues(newOtpValues);

      if(index < 6) {
        otpRefs.current[index]?.focus();
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if(e.key === "Backspace") {
      const newOtpValues = [...otpValues];
      newOtpValues[index - 1] = "";
      SetOptValues(newOtpValues);
      if(!otpValues[index - 1] && index > 1) {
        otpRefs.current[index - 2]?.focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("Text").slice(0, 6);

    if(/^\d{1,6}$/.test(pastedData)) {
      const newOtpValues = pastedData.split("");
      SetOptValues((prev) => 
        newOtpValues.concat(Array(6 - newOtpValues.length).fill("")).slice(0, 6)
      );

      newOtpValues.forEach((val, i) => {
        otpRefs.current[i].value = val;
      });

      const lastFilledIndex = newOtpValues.length - 1;
      if(lastFilledIndex < 6) {
        otpRefs.current[lastFilledIndex]?.focus();
      }
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Concatenate OTP values
    const otp = otpValues.join("");

    // Check if OTP length is correct
    if (otp.length === 6) {
      if (mode === "signin") {
        // Set loading state to true
        setLoading(true);
        try {
          if(location.state.is_staff) {
            const result = await dispatch(verifyStaffLoginOtpThunk({
              otp: otp,
              staff_id: staffId
            })).unwrap();
            // // console.log("result...", result);
            if(result?.status === 200) {
              try {
                await dispatch(setUserAuthTokenToLSThunk({token: result?.token})).unwrap();
                await dispatch(setUserIdToLSThunk(customerId)).unwrap();
                await dispatch(setStaffIdToLSThunk(staffId || "")).unwrap();
                await dispatch(setStaffStatusToLSThunk(location.state.is_staff)).unwrap();
                await dispatch(setRoleIdToLSThunk(location.state?.role_id || "")).unwrap();
                // navigate('/dashboard', {state: {from: 'otp'}});
              } catch (error) {
                // console.log("Error on token");
              } finally {
                try {
                  await dispatch(getUserAuthTokenFromLSThunk()).unwrap();
                  await dispatch(getUserIdFromLSThunk()).unwrap();
                  await dispatch(getStaffIdFromLSThunk()).unwrap();
                  await dispatch(getStaffStatusFromLSThunk()).unwrap();
                  await dispatch(getRoleIdFromLSThunk()).unwrap();
                  navigate('/dashboard', {state: {from: 'otp'}})
                } catch (error) {
                  // console.log("Error on token")
                }
              }
            }
          } else {
            const result = await dispatch(verifyLoginOtpThunk({
              customer_id: customerId,
              otp: otp
            })).unwrap();
            // console.log("result...", result);
            if(result?.status === 200) {
              try {
                await dispatch(setUserAuthTokenToLSThunk({token: result?.token})).unwrap();
                await dispatch(setUserIdToLSThunk(customerId)).unwrap();
                // navigate('/dashboard', {state: {from: 'otp'}});
                await dispatch(setStaffIdToLSThunk(staffId)).unwrap();
                await dispatch(setStaffStatusToLSThunk(location.state.is_staff)).unwrap();
              } catch (error) {
                // console.log("Error on token");
              } finally {
                try {
                  await dispatch(getUserAuthTokenFromLSThunk()).unwrap();
                  await dispatch(getUserIdFromLSThunk()).unwrap();
                  await dispatch(getStaffIdFromLSThunk()).unwrap();
                  await dispatch(getStaffStatusFromLSThunk()).unwrap();
                  navigate('/dashboard', {state: {from: 'otp'}})
                } catch (error) {
                  // console.log("Error on token")
                }
              }
            }
          }
        } catch (error) {
          // Handle login error
          console.error("Login error:", error);
          // toast.error()
          if(error?.message === "Request failed with status code 400") {
            
            toast.error("Please enter the correct OTP");
            setLoading(false);
          } else {
            
            toast.error(error?.message || "Error");
            setLoading(false);
          }
        } finally {
          // Set loading state to false after request completes
          setLoading(false);
        }
      } else if (mode === "forgotpassword") {
        setLoading(true);
        try {
          const result = await dispatch(verifyForgetPasswordOtpThunk({
            email: email,
            otp: otp
          })).unwrap();
          // console.log("result...", result);
          navigate("/resetpassword", {state: {email: email}});
        } catch (error) {
          
          toast.error("Please enter a valid otp");
          setLoading(false);
        }
      } else if (mode === "signup") {
        setLoading(true);
        try {
          const result = await dispatch(verifyRegisterOtpThunk({
            customer_id: customerId,
            otp: otp
          })).unwrap();
          // console.log("result...", result);
          if(result?.status === 200) {
            try {
              const role = await dispatch(addSettingWithoutLoginThunk({user_type: "Super Admin", user_id: location.state?.customer_id, permissions: superAdminRolePermissions, token: result?.token})).unwrap();
              // settingId
              await dispatch(addStaffWithoutLoginThunk({user_id: location.state?.customer_id, first_name: location.state?.data?.first_name, last_name: location.state?.data?.last_name, email: location.state?.data?.email, phone_no: location.state?.data?.phone_no, user_type_id: role?.settingId, token: result?.token}));

              await dispatch(setUserAuthTokenToLSThunk({token: result?.token})).unwrap();
              await dispatch(setUserIdToLSThunk(customerId)).unwrap();
              // navigate('/dashboard', {state: {from: 'registration'}});
            } catch (error) {
              // console.log("Error on token");
            } finally {
              try {
                await dispatch(getUserAuthTokenFromLSThunk()).unwrap();
                await dispatch(getUserIdFromLSThunk()).unwrap();
                navigate('/dashboard', {state: {from: 'registration'}})
              } catch (error) {
                // console.log("Error on token")
              }
            }
          }
        } catch (error) {
          
          toast.error("Please enter a valid otp");
          setLoading(false);
        }
      }
    } else {
      // not entered 6 otps
      
      toast.warning("Please enter the OTP");
      setLoading(false);
    }
  };

  const handleResendOtp = async() => {
    if(mode === "signin") {
      try {
        const result = await dispatch(resendLoginOtpThunk({customer_id: customerId})).unwrap();
        // console.log("result...", result);
        
        toast.success("Please check your email for OTP.");
        setTimeLeft(120);
      } catch (error) {
        // console.log(error)
        
        toast.error("Error resending otp");
      }
    } else if(mode === "forgotpassword") {
      try {
        const result = await dispatch(resendForgetPasswordOtpThunk({email: email})).unwrap();
        // console.log("result...", result);
        
        toast.success("Please check your email for OTP.");
        setTimeLeft(120);
      } catch (error) {
        toast.error("Error resending otp");
      }
    } else if(mode === "signup") {
      try {
        const result = await dispatch(resendRegisterOtpThunk({customer_id: customerId})).unwrap();
        // console.log("result...", result);
        
        toast.success("Please check your email for OTP.");
        setTimeLeft(120);
      } catch (error) {
        
        toast.error("Error resending otp");
      }
    } else {
      
      toast.error("Error");
    }
  }

  const handleEditmail = () => {
    navigate('/forgotpassword', { state: {email: email}});
  };

  return (
    <div className="flex h-full items-center justify-center">
      <div className="w-full max-w-[32rem]">
        <div className="p-8 xsm-max:px-4 bg-[#F9FAFB] rounded-lg shadow-sm my-5">
          <div
            className={`mb-12 ${
              mode !== "forgotpassword"
                ? "flex items-center justify-center"
                : ""
            }`}
          >
            <img
              src={logo}
              alt="logo"
              className={mode !== "forgotpassword" ? "mx-auto" : ""}
            />
          </div>
          <h3 className="text-center font-inter font-medium mb-4 text-[28px]">
            {mode === "forgotpassword"
              ? "Verify your email"
              : "Sign in your account"}
          </h3>
          <form onSubmit={handleLogin}>
            <div className="mb-4 text-center xsm-max:text-sm">
              {/* <p dangerouslySetInnerHTML={{ __html: message }} /> */}
              {mode === "forgotpassword" && (
                <>
                  <p>
                    We have sent an One Time Passcode to this <span className="font-bold">{email}</span> email address:
                    <button
                      type="button"
                      onClick={() => handleEditmail()}
                      className="font-medium text-green-600 inline-block ml-[5px] hover:underline"
                      data-testid="back-to-login"
                    >
                      Edit
                    </button>
                  </p>
                </>
              )}
            </div>
            <div className="flex justify-between mt-12">
              <p className="text-md font-bold">OTP verification</p>
              <span className="text-red-600">{formatTime(timeLeft)}</span>
            </div>

            <div className="grid grid-cols-6 gap-2 mt-4">
              {
                [1, 2, 3, 4, 5, 6].map((index) => (
                  <input
                  key={index}
                    type="text"
                    maxLength={1}
                    // ref={otp1Ref}
                    ref={(el) => (otpRefs.current[index - 1] = el)}
                    value={otpValues[index-1]}
                    onChange={(e) => handleInputChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    className="w-full aspect-square outline-none focus border-2 bg-transparent rounded-lg text-center text-black"
                    placeholder="0"
                  />
                ))
              }
            </div>
            <div className="text-center mt-4">
              <button
                type="submit"
                //className={btnClass}
                className={`${mode === "forgotpassword" ? "bg-black" : "bg-green-500"} text-white border-none px-4 py-2.5 rounded-lg font-semibold w-full`}
                data-testid="submit"
                disabled={loading}
              >
                {mode === "forgotpassword"
                  ? loading
                    ? "Verify and Process..."
                    : "Verify and Process"
                  : loading
                  ? "Loading..."
                  : "Submit"}
              </button>
            </div>
            <div className="text-center mt-4 xsm-max:text-sm flex justify-center gap-5">
              <p>
                Didn't get an OTP?
              </p>
              <button
                type="button"
                disabled={timeLeft == 0 ? false : true}
                data-testid="resend-otp"
                className={`${timeLeft === 0 ? "text-red-600 underline" : "text-[#858585]"}`}
                onClick={() => {handleResendOtp()}}
              >
                Resend OTP
              </button>
            </div>

            {
              mode === "singin" ? (
                <div
                  className="text-center flex flex-row justify-center mt-8 items-center"
                >
                  <button
                    type="button"
                    className="flex flex-row"
                    onClick={() => {navigate('/login')}}
                  >
                    <LuMoveLeft
                      className="w-2 pt-[2px] my-auto"
                    />
                    <p
                      className="ml-2 font-inter font-semibold text-base"
                    >Back to log in</p>
                  </button>
                </div>
              ) : ""
            }
          </form>
        </div>
      </div>
    </div>
  );
};

export default OTP;
