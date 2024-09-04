import React, {
    useEffect,
    useState,
    useRef,
    ChangeEvent,
    KeyboardEvent,
  } from "react";
  import { IoIosArrowBack } from "react-icons/io";
  import { useNavigate } from "react-router-dom";
  
  const RegistrationVerifyEmail = () => {
    const navigate = useNavigate();
  
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
  
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
      const value = e.target.value;
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
            if (!otp1) otp1Ref.current?.focus();
            setOtp1("");
            break;
          case 2:
            if (!otp2) otp1Ref.current?.focus();
            setOtp2("");
            break;
          case 3:
            if (!otp3) otp2Ref.current?.focus();
            setOtp3("");
            break;
          case 4:
            if (!otp4) otp3Ref.current?.focus();
            setOtp4("");
            break;
          case 5:
            if (!otp5) otp4Ref.current?.focus();
            setOtp5("");
            break;
          default:
            break;
        }
      }
    };
  
    const handleVerify = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const otp = `${otp1}${otp2}${otp3}${otp4}${otp5}`;
      if (otp.length === 5) {
      } 
      navigate("/dashboard")

    };
  
    const onGoBackHandler = () => {
      navigate("/register");
    };
  
    return (
      <section className="w-full px-8 mx-auto">
        <div className="flex gap-1 items-center py-3 cursor-pointer" onClick={onGoBackHandler}>
          <IoIosArrowBack className="w-4 h-4" />
          <p className="text-greenbase">Back to previous page</p>
        </div>
        <div className="w-full flex justify-center h-full mt-10 ">
        <div className="bg-[#f9fafb] max-w-xl rounded-lg px-16 py-14 mx-auto flex flex-col">
          <div className="flex flex-col justify-center items-center">
            <h3 className="font-semibold text-2xl">Verify your email</h3>
            <div className="mt-3 mb-10 flex justify-center items-center text-center">
            <p className=" font-normal text-base ">
              We have sent a <span className="font-bold text-base">One Time Passcode</span> to this Robertclive@gmail.com email
              address <span className="text-greenbase text-base font-light pl-0.5 underline">Edit</span>
            </p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-base font-bold">OTP Verification</p>
            <p className="text-redbase text-sm font-semibold">09.07</p>
          </div>
          <form onSubmit={handleVerify}>
            <div className="flex items-center gap-4 my-8">
              <input
                type="text"
                ref={otp1Ref}
                maxLength={1}
                value={otp1}
                onChange={(e) => handleInputChange(e, 1)}
                onKeyDown={(e) => handleKeyDown(e, 1)}
                className=" bg-transparent text-center text-black border-2 focus:!border-greenbase rounded-lg otp-input"
                data-testid= "otp-one"           
              />
              <input
                type="text"
                ref={otp2Ref}
                maxLength={1}
                value={otp2}
                onChange={(e) => handleInputChange(e, 2)}
                onKeyDown={(e) => handleKeyDown(e, 2)}
                className=" border-2 bg-transparent focus:!border-green-500 rounded-lg text-center text-black otp-input"
                data-testid= "otp-two"
              />
                <input
                  type="text"
                  maxLength={1}
                  ref={otp3Ref}
                  value={otp3}
                  onChange={(e) => handleInputChange(e, 3)}
                  onKeyDown={(e) => handleKeyDown(e, 3)}
                  className=" border-2 bg-transparent focus:!border-greenbase rounded-lg text-center text-black otp-input"
                  data-testid="otp-three"
                />
                <input
                  type="text"
                  maxLength={1}
                  ref={otp4Ref}
                  value={otp4}
                  onChange={(e) => handleInputChange(e, 4)}
                  onKeyDown={(e) => handleKeyDown(e, 4)}
                  className="border-2 bg-transparent focus:!border-green-500 rounded-lg text-center text-black  otp-input"
                  data-testid="otp-four"
                />
                 <input
                  type="text"
                  maxLength={1}
                  ref={otp5Ref}
                  value={otp5}
                  onChange={(e) => handleInputChange(e, 5)}
                  onKeyDown={(e) => handleKeyDown(e, 5)}
                  className="border-2 bg-transparent focus:!border-green-500 rounded-lg text-center text-black  otp-input"
                  data-testid="otp-five"
                />
              </div>
              <button className="bg-greenbase w-full flex justify-center py-2 text-base font-semibold text-white rounded-lg" type="submit">
                Verify and proceed
              </button>
          </form>
          <div className="flex justify-center mt-11">
          <p className="font-medium text-sm">Didn't get an OTP <span className="text-redbase text-sm underline cursor-pointer">Resend OTP</span></p>
          </div>

        </div>
        </div>
      </section>
    );
  };
  
  export default RegistrationVerifyEmail;
  