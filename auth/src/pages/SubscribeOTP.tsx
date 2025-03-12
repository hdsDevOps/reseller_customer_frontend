import React, { useEffect, useState, useRef, ChangeEvent, KeyboardEvent } from "react";
import { IoChevronBackSharp } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch } from "store/hooks";
import { addSettingWithoutLoginThunk, addStaffWithoutLoginThunk, resendRegisterOtpThunk, verifyRegisterOtpThunk } from "store/user.thunk";

const logo = "https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/hordanso-fixed-logo.png?alt=media&token=ecd5d548-0aa7-46d4-9757-c24cba11693c";

const superAdminPermissions = [
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
    const navigate = useNavigate();
    const location = useLocation();
    // console.log("state....", location.state);
    const dispatch = useAppDispatch();
            
    useEffect(() => {
    const section = document.getElementById("top_subscribe_otp");
    if(section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
    }, []);

    const customerId = location.state.customer_id;
    // // console.log("customerId...", customerId);
    //931183

    useEffect(() => {
        if(!location.state) {
            navigate('/');
        } else {
            toast.success("Customer registered successfully. Please check your email for OTP.");
        }
    }, [location.state]);
      
    const otpRefs = useRef([]);
    const [otpValues, SetOptValues] = useState(["", "", "", "", "", "",]);

    const [showModal, setShowModal] = useState<boolean>(false);
    const [timeLeft, setTimeLeft] = useState<number>(120);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState("");
    
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

    useEffect(() => {
        otpRefs.current[0]?.focus();
    }, []);

    
    
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
        if(e.key === "Backspace" && !otpValues[index - 1] && index > 1) {
          otpRefs.current[index - 2]?.focus();
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

    const handleResendOtp = async(e) => {
        e.preventDefault();
        try {
            const result = await dispatch(resendRegisterOtpThunk({customer_id: customerId})).unwrap();
            // console.log("result...", result);
            toast.success(result?.message);
        } catch (error) {
            toast.error(error?.message || "Error resending otp");
        }
    };

    const handleLogin = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const otp = otpValues.join("");
        
        if (otp.length === 6) {
            try {
                const result = await dispatch(verifyRegisterOtpThunk({
                    customer_id: customerId,
                    otp: otp
                })).unwrap();
                // console.log("result...", result);
                setToken(result?.token);
                setShowModal(true);
                const role = await dispatch(addSettingWithoutLoginThunk({user_type: "Super Admin", user_id: customerId, permissions: superAdminPermissions, token: result?.token})).unwrap();
                // settingId
                await dispatch(addStaffWithoutLoginThunk({user_id: customerId, first_name: location.state?.formData?.first_name, last_name: location.state?.formData?.last_name, email: location.state?.formData?.email, phone_no: location.state?.formData?.phone_no, user_type_id: role?.settingId, token: result?.token}));
            } catch (error) {
                toast.error(error?.message || "Error verifying OTP");
            }
        } else {
            alert("Please enter all 6 digits.");
        }
    };

    const handleEditmail = () => {
        navigate('/subscribe', {state: {...location.state, step: 2}});
    };

    const handleBack = () => {
        navigate('/subscribe', {state: {...location.state, step: 2}});
    };

    const handleCloseModal = () => {
        setShowModal(false);
        navigate("/businessinfo", {state: { ...location.state, customer_id: customerId, token: token}});
    };

    return (
        <div className="w-full flex flex-col justify-center items-center relative" id="top_subscribe_otp">
            <p className="flex items-center gap-1 text-green-600 cursor-pointer absolute left-4 top-2" onClick={handleBack}>
                <IoChevronBackSharp /> Back to previous page
            </p>
            <div className="w-[32rem] mt-10">
                <div className="p-8 xsm-max:px-4 bg-[#F9FAFB] rounded-lg shadow-sm">
                    <div className="mb-12 flex items-center justify-center">
                        <img
                            src={logo}
                            alt="logo"
                            className="mx-auto"
                        />
                    </div>
                    <h3 className="text-center font-inter font-medium mb-4 text-[28px]">
                        Verify your email
                    </h3>
                    <form onSubmit={handleLogin}>
                        <div className="mb-4 text-center xsm-max:text-sm">
                            <p>We have sent an <strong>One Time Passcode</strong> to your email address</p>
                            <button
                                type="button"
                                onClick={() => handleEditmail()}
                                className="font-medium text-green-600 hover:text-gray-500"
                                data-testid="back-to-login"
                            >
                                Edit
                            </button>
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
                            <button type="submit" className="btn-green" data-testid="submit">
                                Verify and Proceed
                            </button>
                        </div>
                        <div className="text-center mt-4 xsm-max:text-sm">
                            <p>
                                Didn't get an OTP?{" "}
                                <button
                                    data-testid="resend-otp"
                                    type="button"
                                    onClick={(e) => {handleResendOtp(e)}}
                                    className={`ml-4 ${timeLeft > 0 ? "text-[#858585]" : "text-red-600 underline"}`}
                                    disabled={timeLeft > 0 ? true : false}
                                >
                                    Resend OTP
                                </button>{" "}
                            </p>
                        </div>
                    </form>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-10">
                    <div className="bg-white px-4 py-6 rounded-lg shadow-lg w-full max-w-[582px] border-[0.5px] border-black drop-shadow-lg">
                        <h3 className="font-inter font-bold text-[20px] text-black mb-4">Verified!</h3>
                        <p className="font-inter font-normal text-sm text-black">Your email is verified successfully!</p>
                        <p className="font-inter font-normal text-sm text-black">We have sent the auto-generated password to your email address {location.state.formData.email} to login to the Hordanso portal.</p>
                        <div className="mt-4 text-center">
                            <button
                                onClick={handleCloseModal}
                                className="bg-green-600 text-white px-4 py-2 rounded-[10px]"
                                cypress-name="subscribe-opt-success-modal-button"
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OTP;
