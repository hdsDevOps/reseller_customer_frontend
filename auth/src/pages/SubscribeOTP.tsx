import React, { useEffect, useState, useRef, ChangeEvent, KeyboardEvent } from "react";
import { IoChevronBackSharp } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch } from "store/hooks";
import { resendRegisterOtpThunk, verifyRegisterOtpThunk } from "store/user.thunk";

const OTP: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // console.log("state....", location.state);
    const dispatch = useAppDispatch();

    const customerId = location.state.customer_id;
    // console.log("customerId...", customerId);
    //931183

    useEffect(() => {
        if(!location.state) {
            navigate('/');
        } else {
            toast.success("Customer registered successfully. Please check your email for OTP.");
        }
    }, [location.state]);

    const otp1Ref = useRef<HTMLInputElement>(null);
    const otp2Ref = useRef<HTMLInputElement>(null);
    const otp3Ref = useRef<HTMLInputElement>(null);
    const otp4Ref = useRef<HTMLInputElement>(null);
    const otp5Ref = useRef<HTMLInputElement>(null);
    const otp6Ref = useRef<HTMLInputElement>(null);

    const [otp1, setOtp1] = useState<string>("");
    const [otp2, setOtp2] = useState<string>("");
    const [otp3, setOtp3] = useState<string>("");
    const [otp4, setOtp4] = useState<string>("");
    const [otp5, setOtp5] = useState<string>("");
    const [otp6, setOtp6] = useState<string>("");
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
        otp1Ref.current?.focus();
    }, []);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const value = (e.target as HTMLInputElement).value;
        if (/^\d$/.test(value)) {
            switch (index) {
                case 1:
                    setOtp1(value);
                    otp2Ref.current?.focus();
                    break;
                case 2:
                    setOtp2(value);
                    otp3Ref.current?.focus();
                    break;
                case 3:
                    setOtp3(value);
                    otp4Ref.current?.focus();
                    break;
                case 4:
                    setOtp4(value);
                    otp5Ref.current?.focus();
                    break;
                case 5:
                    setOtp5(value);
                    otp6Ref.current?.focus();
                    break;
                case 6:
                    setOtp6(value);
                    break;
                default:
                    break;
            }
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace") {
            switch (index) {
                case 1:
                    if (!otp1) {
                        otp1Ref.current?.focus();
                    } else {
                        setOtp1("");
                    }
                    break;
                case 2:
                    if (!otp2) {
                        otp1Ref.current?.focus();
                    } else {
                        setOtp2("");
                    }
                    break;
                case 3:
                    if (!otp3) {
                        otp2Ref.current?.focus();
                    } else {
                        setOtp3("");
                    }
                    break;
                case 4:
                    if (!otp4) {
                        otp3Ref.current?.focus();
                    } else {
                        setOtp4("");
                    }
                    break;
                case 5:
                    if (!otp5) {
                        otp4Ref.current?.focus();
                    } else {
                        setOtp5("");
                    }
                    break;
                case 6:
                    if (!otp6) {
                        otp5Ref.current?.focus();
                    } else {
                        setOtp6("");
                    }
                    break;
                default:
                    break;
            }
        }
    };

    const handleResendOtp = async(e) => {
        e.preventDefault();
        try {
            const result = await dispatch(resendRegisterOtpThunk({customer_id: customerId})).unwrap();
            console.log("result...", result);
            toast.success(result?.message);
        } catch (error) {
            toast.error("Error resending otp");
        }
    };

    const handleLogin = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const otp = `${otp1}${otp2}${otp3}${otp4}${otp5}${otp6}`;
        
        if (otp.length === 6) {
            try {
                const result = await dispatch(verifyRegisterOtpThunk({
                    customer_id: customerId,
                    otp: otp
                })).unwrap();
                console.log("result...", result);
                setToken(result?.token);
                setShowModal(true);
            } catch (error) {
                toast.error("Error verifying OTP");
            }
        } else {
            alert("Please enter all 6 digits.");
        }
    };

    const handleEditmail = () => {
        navigate(-1);
    };

    const handleBack = () => {
        navigate(-1);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        navigate("/businessinfo", {state: {customer_id: customerId, formData: location.state.formData, license_usage: location.state.license_usage, plan: location.state.plan, period: location.state.period, token: token}});
    };

    return (
        <div className="w-full flex flex-col justify-center items-center relative">
            <p className="flex items-center gap-1 text-green-600 cursor-pointer absolute left-4 top-2" onClick={handleBack}>
                <IoChevronBackSharp /> Back to previous page
            </p>
            <div className="w-[32rem] mt-10">
                <div className="p-8 xsm-max:px-4 bg-[#F9FAFB] rounded-lg shadow-sm">
                    <div className="mb-12 flex items-center justify-center">
                        <img
                            src="https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/logo.jpeg?alt=media&token=c210a6cb-a46f-462f-a00a-dfdff341e899"
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
                            <input
                                type="text"
                                maxLength={1}
                                ref={otp1Ref}
                                value={otp1}
                                onChange={(e) => handleInputChange(e, 1)}
                                onKeyDown={(e) => handleKeyDown(e, 1)}
                                className="w-full aspect-square outline-none focus border-2 bg-transparent rounded-lg text-center text-black"
                                placeholder="0"
                            />
                            <input
                                type="text"
                                maxLength={1}
                                ref={otp2Ref}
                                value={otp2}
                                onChange={(e) => handleInputChange(e, 2)}
                                onKeyDown={(e) => handleKeyDown(e, 2)}
                                className="w-full aspect-square outline-none focus border-2 bg-transparent rounded-lg text-center text-black"
                                placeholder="0"
                            />
                            <input
                                type="text"
                                maxLength={1}
                                ref={otp3Ref}
                                value={otp3}
                                onChange={(e) => handleInputChange(e, 3)}
                                onKeyDown={(e) => handleKeyDown(e, 3)}
                                className="w-full aspect-square outline-none focus border-2 bg-transparent rounded-lg text-center text-black"
                                placeholder="0"
                            />
                            <input
                                type="text"
                                maxLength={1}
                                ref={otp4Ref}
                                value={otp4}
                                onChange={(e) => handleInputChange(e, 4)}
                                onKeyDown={(e) => handleKeyDown(e, 4)}
                                className="w-full aspect-square outline-none focus border-2 bg-transparent rounded-lg text-center text-black"
                                placeholder="0"
                            />
                            <input
                                type="text"
                                maxLength={1}
                                ref={otp5Ref}
                                value={otp5}
                                onChange={(e) => handleInputChange(e, 5)}
                                onKeyDown={(e) => handleKeyDown(e, 5)}
                                className="w-full aspect-square outline-none focus border-2 bg-transparent rounded-lg text-center text-black"
                                placeholder="0"
                            />
                            <input
                                type="text"
                                maxLength={1}
                                ref={otp6Ref}
                                value={otp6}
                                onChange={(e) => handleInputChange(e, 6)}
                                onKeyDown={(e) => handleKeyDown(e, 6)}
                                className="w-full aspect-square outline-none focus border-2 bg-transparent rounded-lg text-center text-black"
                                placeholder="0"
                            />
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
                                    className="text-red-600 underline ml-4"
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
