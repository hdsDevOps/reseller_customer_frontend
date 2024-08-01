import React, {
  useEffect,
  useState,
  useRef,
  ChangeEvent,
  KeyboardEvent,
} from "react";
import { Link, useNavigate } from "react-router-dom";

const OTP: React.FC = () => {
  const navigate = useNavigate();

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

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const otp = `${otp1}${otp2}${otp3}${otp4}${otp5}${otp6}`;
    if (otp.length === 6) {
      // Process the OTP login
      // dispatch(makeUserLoginThunk({ email, otp }))
      //   .then((response) => {
      //     // Handle successful login
      //     toast.success("Login successful!");
      //     router.push("/dashboard"); // Replace with your desired route
      //   })
      //   .catch((error) => {
      //     // Handle login error
      //     if (error instanceof CustomError) {
      //       toast.error(error.message);
      //     } else {
      //       toast.error("Login failed. Please try again.");
      //     }
      //   });
    } else {
      //toast.error("Please enter a valid 6-digit OTP.");
    }
  };

  const onGoBackhandler = () => {
    navigate("/login");
  };

  return (
    <div className="flex h-screen items-center justify-center px-5">
      <div className="w-full max-w-lg">
        <div className="p-8 bg-gray-100 rounded-lg shadow-lg">
          <h3 className="text-center mb-4 text-3xl">Sign in your account</h3>
          <form onSubmit={handleLogin}>
            <div className="mb-4 text-center">
              <label className="block text-sm font-medium text-gray-700">OTP Verification</label>
              <div className="flex justify-center space-x-2 mt-4">
                <input
                  type="text"
                  maxLength={1}
                  ref={otp1Ref}
                  value={otp1}
                  onChange={(e) => handleInputChange(e, 1)}
                  onKeyDown={(e) => handleKeyDown(e, 1)}
                  className="w-10 h-10 border-2 bg-transparent focus:border-green-500 rounded-lg text-center text-black otp-input"
                  data-testid="otp-one"
                />
                <input
                  type="text"
                  maxLength={1}
                  ref={otp2Ref}
                  value={otp2}
                  onChange={(e) => handleInputChange(e, 2)}
                  onKeyDown={(e) => handleKeyDown(e, 2)}
                  className="w-10 h-10 border-2 bg-transparent border-green-500 rounded-lg text-center text-black  otp-input"
                  data-testid="otp-two"
                />
                <input
                  type="text"
                  maxLength={1}
                  ref={otp3Ref}
                  value={otp3}
                  onChange={(e) => handleInputChange(e, 3)}
                  onKeyDown={(e) => handleKeyDown(e, 3)}
                  className="w-10 h-10 border-2 bg-transparent focus: rounded-lg text-center text-black  otp-input"
                  data-testid="otp-three"
                />
                <input
                  type="text"
                  maxLength={1}
                  ref={otp4Ref}
                  value={otp4}
                  onChange={(e) => handleInputChange(e, 4)}
                  onKeyDown={(e) => handleKeyDown(e, 4)}
                  className="w-10 h-10 border-2 bg-transparent border-green-500 rounded-lg text-center text-black  otp-input"
                  data-testid="otp-four"
                />
                <input
                  type="text"
                  maxLength={1}
                  ref={otp5Ref}
                  value={otp5}
                  onChange={(e) => handleInputChange(e, 5)}
                  onKeyDown={(e) => handleKeyDown(e, 5)}
                  className="w-10 h-10 border-2 bg-transparent border-green-500 rounded-lg text-center text-black  otp-input"
                  data-testid="otp-five"
                />
                <input
                  type="text"
                  maxLength={1}
                  ref={otp6Ref}
                  value={otp6}
                  onChange={(e) => handleInputChange(e, 6)}
                  onKeyDown={(e) => handleKeyDown(e, 6)}
                  className="w-10 h-10 border-2 bg-transparent border-green-500 rounded-lg text-center text-black  otp-input"
                  data-testid="otp-six"
                />
              </div>
            </div>
            <div className="text-center mt-4">
              <button
                type="submit"
                className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-700"
                data-testid="submit"
              >
                Submit
              </button>
            </div>
            <div className="text-center mt-4">
              <p>
                Didn't get an OTP?{" "}
                <Link data-testid="resend-otp" to="#" className="text-green-500">
                  Resend OTP
                </Link>{" "}
                <span>01:19</span>
              </p>
            </div>
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => onGoBackhandler()}
                className="w-full py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
                data-testid="back-to-login"
              >
                Back to login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OTP;
