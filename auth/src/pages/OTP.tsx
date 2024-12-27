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
import { verifyLoginOtpThunk, setUserAuthTokenToLSThunk, setUserIdToLSThunk, getUserAuthTokenFromLSThunk, getUserIdFromLSThunk, resendLoginOtpThunk, verifyForgetPasswordOtpThunk, resendForgetPasswordOtpThunk, resendRegisterOtpThunk, verifyRegisterOtpThunk } from 'store/user.thunk';

const OTP: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const customerId = location?.state?.customer_id;
  const email = location.state?.email;
  const mode = queryParams.get("mode");

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
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(location.state) {
      if(location.state?.email) {
        toast.success("OTP for resetting your password has been sent.");
      } else if(location?.state?.customerId) {
        toast.success("OTP for log in to your account has been sent.");
      } else {
        console.log("ok")
      }
    } else {
      navigate('/home');
    }
  }, []);


  useEffect(() => {
    otp1Ref.current?.focus();
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
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
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

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Concatenate OTP values
    const otp = `${otp1}${otp2}${otp3}${otp4}${otp5}${otp6}`;

    // Check if OTP length is correct
    if (otp.length === 6) {
      if (mode === "signin") {
        // Set loading state to true
        setLoading(true);
        try {
          const result = await dispatch(verifyLoginOtpThunk({
            customer_id: customerId,
            otp: otp
          })).unwrap();
          console.log("result...", result);
          if(result?.status === 200) {
            try {
              await dispatch(setUserAuthTokenToLSThunk({token: result?.token})).unwrap();
              await dispatch(setUserIdToLSThunk(customerId)).unwrap();
              navigate('/dashboard', {state: {from: 'otp'}});
            } catch (error) {
              console.log("Error on token");
            } finally {
              try {
                await dispatch(getUserAuthTokenFromLSThunk()).unwrap();
                await dispatch(getUserIdFromLSThunk()).unwrap();
                navigate('/dashboard', {state: {from: 'otp'}})
              } catch (error) {
                console.log("Error on token")
              }
            }
          }
        } catch (error) {
          // Handle login error
          console.error("Login error:", error);
          // toast.error()
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
          console.log("result...", result);
          navigate("/resetpassword", {state: {email: email}});
        } catch (error) {
          toast.error("Please enter a valid otp");
        }
      } else if (mode === "signup") {
        setLoading(true);
        try {
          const result = await dispatch(verifyRegisterOtpThunk({
            customer_id: customerId,
            otp: otp
          })).unwrap();
          console.log("result...", result);
          if(result?.status === 200) {
            try {
              await dispatch(setUserAuthTokenToLSThunk({token: result?.token})).unwrap();
              await dispatch(setUserIdToLSThunk(customerId)).unwrap();
              navigate('/dashboard', {state: {from: 'registration'}});
            } catch (error) {
              console.log("Error on token");
            } finally {
              try {
                await dispatch(getUserAuthTokenFromLSThunk()).unwrap();
                await dispatch(getUserIdFromLSThunk()).unwrap();
                navigate('/dashboard', {state: {from: 'registration'}})
              } catch (error) {
                console.log("Error on token")
              }
            }
          }
        } catch (error) {
          toast.error("Please enter a valid otp");
        }
      }
    } else {
      // not entered 6 otps
      toast.warning("Please enter all 6 otps")
    }
  };

  const handleResendOtp = async() => {
    if(mode === "signin") {
      try {
        const result = await dispatch(resendLoginOtpThunk({customer_id: customerId})).unwrap();
        console.log("result...", result);
        toast.success("Please check your email for OTP.");
        setTimeLeft(120);
      } catch (error) {
        console.log(error)
        toast.error("Error resending otp");
      }
    } else if(mode === "forgotpassword") {
      try {
        const result = await dispatch(resendForgetPasswordOtpThunk({email: email})).unwrap();
        console.log("result...", result);
        toast.success("Please check your email for OTP.");
        setTimeLeft(120);
      } catch (error) {
        toast.error("Error resending otp");
      }
    } else if(mode === "signup") {
      try {
        const result = await dispatch(resendRegisterOtpThunk({customer_id: customerId})).unwrap();
        console.log("result...", result);
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
              src={process.env.BASE_URL + "/images/logo.jpeg"}
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
