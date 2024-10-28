import React, {
  useEffect,
  useState,
  useRef,
  ChangeEvent,
  KeyboardEvent,
} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { verifyOTPUserLoginThunk } from "store/user.thunk";

const OTP: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const customerId = useAppSelector((state: any) => state.auth.customerId);
  const mode = queryParams.get("mode");

  const otp1Ref = useRef<HTMLInputElement>(null);
  const otp2Ref = useRef<HTMLInputElement>(null);
  const otp3Ref = useRef<HTMLInputElement>(null);
  const otp4Ref = useRef<HTMLInputElement>(null);
  const otp5Ref = useRef<HTMLInputElement>(null);

  const [otp1, setOtp1] = useState<string>("");
  const [otp2, setOtp2] = useState<string>("");
  const [otp3, setOtp3] = useState<string>("");
  const [otp4, setOtp4] = useState<string>("");
  const [otp5, setOtp5] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<number>(10);
  const [loading, setLoading] = useState(false);

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
        default:
          break;
      }
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Concatenate OTP values
    const otp = `${otp1}${otp2}${otp3}${otp4}${otp5}`;

    // Check if OTP length is correct
    if (otp.length !== 5) {
      return alert("Please enter all 5 digits.");
    }

    if (mode === "signin") {
      // Set loading state to true
      setLoading(true);
      try {
        // Dispatch the OTP verification for signin
        const result = await dispatch(
          verifyOTPUserLoginThunk({
            customer_id: customerId,
            otp: otp,
          })
        ).unwrap();

        console.log("result....", result);
        // Optionally navigate or do something else after successful login
        // navigate("/otp?mode=signin");
      } catch (error) {
        // Handle login error
        console.error("Login error:", error);
      } finally {
        // Set loading state to false after request completes
        setLoading(false);
      }
    } else if (mode === "signup") {
      // TODO: Handle signup logic here
      console.log("Handle signup process here.");
    } else {
      // If it's neither signin nor signup, navigate to reset password
      navigate("/resetpassword");
    }
  };

  const handleEditmail = () => {
    navigate(-1);
  };

  return (
    <div className="flex h-full items-center justify-center">
      <div className="w-full max-w-[32rem]">
        <div className="p-8 xsm-max:px-4 bg-[#F9FAFB] rounded-lg shadow-sm">
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
                    We have sent an One Time Passcode to this
                    Robertclive@gmail.com email address
                  </p>
                  <button
                    type="button"
                    onClick={() => handleEditmail()}
                    className="font-medium text-green-600 hover:text-gray-500"
                    data-testid="back-to-login"
                  >
                    Edit
                  </button>
                </>
              )}
            </div>
            <div className="flex justify-between mt-12">
              <p className="text-md font-bold">OTP verification</p>
              <span className="text-red-600">{formatTime(timeLeft)}</span>
            </div>
            <div className="grid grid-cols-5 gap-2 mt-4">
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
            </div>
            <div className="text-center mt-4">
              <button
                type="submit"
                //className={btnClass}
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
            <div className="text-center mt-4 xsm-max:text-sm">
              <p>
                Didn't get an OTP?{" "}
                <button
                  disabled={timeLeft == 0 ? false : true}
                  data-testid="resend-otp"
                  className="text-red-600 underline ml-4"
                >
                  Resend OTP
                </button>{" "}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OTP;
