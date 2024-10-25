import React, {
  useEffect,
  useState,
  useRef,
  ChangeEvent,
  KeyboardEvent,
} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "store/hooks";
// import { makeUserLoginThunk } from "store/user.thunk";
import { setTokenDetails } from "store/authSlice";

const OTP: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
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

  useEffect(() => {
    otp1Ref.current?.focus();
  }, []);

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

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const otp = `${otp1}${otp2}${otp3}${otp4}${otp5}`;

    if (otp.length === 5) {
      const isValidOtp = true;

      if (isValidOtp) {
        if (mode === "signin") {
          dispatch(setTokenDetails("usy6767jshs688ytmbqa88654sgsgs5sgs6sgs6q"));
          navigate("/dashboard");
        } else {
          navigate("/dashboard");
        }
      } else {
        alert("Invalid OTP. Please try again.");
      }
    } else {
      alert("Please enter all 5 digits.");
    }
  };

  const handleEditmail = () => {
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center w-full my-7">
      <div className="flex flex-col items-center justify-center w-[40%]">
        <div className="flex flex-col items-center justify-center w-full bg-[#F9FAFB] p-8 rounded-lg shadow-sm xsm-max:px-4">
          <div
            className={`mb-3 ${
              mode === "signin" ? "flex items-center justify-center" : ""
            }`}
          >
            {mode === "signin" ? (
              <div
                className="w-24 h-24 bg-center bg-no-repeat bg-contain"
                style={{ backgroundImage: `url('/images/hordansologo2.png')` }}
              ></div>
            ) : (
              " "
            )}
          </div>
          <h3 className="text-center font-inter font-medium mb-2 text-[28px]">
            {mode === "signin" ? (
              <>
                <h2 className="text-[30px] font-bold mb-3">Sign in your account</h2>
              </>
            ) : (
              <>
                <h2 className="text-[30px] font-bold mb-3">Verify your email</h2>
              </>
            )}
          </h3>
          <h4 className="text-[16px]">
            {mode === "signin" ? (
              <>
                we have sent a{" "}
                <span className="font-bold">One Time Passcode</span> to your
                email address
              </>
            ) : (
              <>
                <h3 className="text-[18px]">
                  we have sent a{" "}
                  <span className="font-bold">One Time Passcode</span> to this
                </h3>
              </>
            )}
          </h4>
          <form onSubmit={handleLogin} className="px-[20px]">
            {/* mood for not signing in  */}
            <div className="mb-4 text-center xsm-max:text-sm">
              {/* <p dangerouslySetInnerHTML={{ __html: message }} /> */}
              {mode !== "signin" && (
                <div className="flex items-center justify-center gap-1 mt-2">
                  <h1 className="text-[17px]">
                    {" "}
                    Robertclive@gmail.com Email Address{" "}
                  </h1>
                  <button
                    type="button"
                    onClick={() => handleEditmail()}
                    className="text-green-600 hover:text-gray-500 text-[17px] font-bold underline"
                    data-testid="back-to-login"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between mt-10">
              <p className="font-bold text-md">OTP verification</p>
              <span className="font-bold text-red-600">01:19</span>
            </div>
            {/* otp buttons */}
            <div className="grid grid-cols-5 gap-2 mt-5">
              <input
                type="text"
                maxLength={1}
                ref={otp1Ref}
                value={otp1}
                onChange={(e) => handleInputChange(e, 1)}
                onKeyDown={(e) => handleKeyDown(e, 1)}
                className="w-full text-center text-black bg-transparent border-2 rounded-lg outline-none aspect-square focus"
                placeholder="0"
              />
              <input
                type="text"
                maxLength={1}
                ref={otp2Ref}
                value={otp2}
                onChange={(e) => handleInputChange(e, 2)}
                onKeyDown={(e) => handleKeyDown(e, 2)}
                className="w-full text-center text-black bg-transparent border-2 rounded-lg outline-none aspect-square focus"
                placeholder="0"
              />
              <input
                type="text"
                maxLength={1}
                ref={otp3Ref}
                value={otp3}
                onChange={(e) => handleInputChange(e, 3)}
                onKeyDown={(e) => handleKeyDown(e, 3)}
                className="w-full text-center text-black bg-transparent border-2 rounded-lg outline-none aspect-square focus"
                placeholder="0"
              />
              <input
                type="text"
                maxLength={1}
                ref={otp4Ref}
                value={otp4}
                onChange={(e) => handleInputChange(e, 4)}
                onKeyDown={(e) => handleKeyDown(e, 4)}
                className="w-full text-center text-black bg-transparent border-2 rounded-lg outline-none aspect-square focus"
                placeholder="0"
              />
              <input
                type="text"
                maxLength={1}
                ref={otp5Ref}
                value={otp5}
                onChange={(e) => handleInputChange(e, 5)}
                onKeyDown={(e) => handleKeyDown(e, 5)}
                className="w-full text-center text-black bg-transparent border-2 rounded-lg outline-none aspect-square focus"
                placeholder="0"
              />
            </div>
            {/* submit */}
            <div className="w-full mt-5 text-center">
              <button
                type="submit"
                className="w-full py-3 rounded-[10px] font-bold text-white bg-green-500"
                data-testid="submit"
              >
                Submit
              </button>
            </div>
            {/* didnt get an otp  */}
            <div className="flex items-center justify-center text-center mt-14 xsm-max:text-sm">
              <p className="font-bold">Didn't get an OTP? </p>
              <Link
                data-testid="resend-otp"
                to="#"
                className="ml-4 font-bold text-red-600 underline"
              >
                Resend OTP
              </Link>{" "}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OTP;
