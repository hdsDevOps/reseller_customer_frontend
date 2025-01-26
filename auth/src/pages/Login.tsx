import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "store/hooks";
import { HiOutlineEye } from "react-icons/hi";
import { RiCloseFill, RiEyeCloseLine } from "react-icons/ri";
import { getLandingPageThunk, getRoleIdFromLSThunk, getStaffIdFromLSThunk, getStaffStatusFromLSThunk, getUserAuthTokenFromLSThunk, getUserIdFromLSThunk, makeUserLoginThunk, setRoleIdToLSThunk, setStaffIdToLSThunk, setStaffStatusToLSThunk, setUserAuthTokenToLSThunk, setUserIdToLSThunk } from "store/user.thunk";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

interface IFormInput {
  email: string;
  password: string;
};

const initialUserDetails:IFormInput = {
  email: "",
  password: "",
};

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<IFormInput>(initialUserDetails);
  // console.log("userDetails...", userDetails);
  const [termsModalOpen, setTermsModalOpen] = useState(false);

  const [termsAndConditions, setTermsAndConditions] = useState("");

  const getTermsAndConditions = async() => {
    try {
      const result = await dispatch(getLandingPageThunk()).unwrap();
      setTermsAndConditions(result?.data?.terms_conditions?.content);
    } catch (error) {
      setTermsAndConditions("");
    }
  };

  useEffect(() => {
    getTermsAndConditions();
  }, []);

  const updateUserDetails = e => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setLoading(true);
    try {
      const result = await dispatch(makeUserLoginThunk(userDetails)).unwrap();
      console.log("result...", result);
      if(result?.message === "Login successful. Please check your email for OTP.") {
        navigate("/otp?mode=signin", { state: { customer_id: result?.customer_id, staff_id: result?.staff_id, is_staff: result?.is_staff, role_id: result?.role_id }});
      } else if(result?.message === "Login successful") {
        try {
          await dispatch(setUserAuthTokenToLSThunk({token: result?.token})).unwrap();
          await dispatch(setUserIdToLSThunk(result?.customer_id)).unwrap();
          await dispatch(setStaffIdToLSThunk(result?.staff_id)).unwrap();
          await dispatch(setStaffStatusToLSThunk(result?.is_staff)).unwrap();
          await dispatch(setRoleIdToLSThunk(result?.role_id)).unwrap();
          // navigate('/dashboard', {state: {from: 'otp'}});
        } catch (error) {
          console.log("Error on token");
        } finally {
          setLoading(false);
          try {
            await dispatch(getUserAuthTokenFromLSThunk()).unwrap();
            await dispatch(getUserIdFromLSThunk()).unwrap();
            // navigate('/dashboard', {state: {from: 'otp'}});
            await dispatch(getStaffIdFromLSThunk()).unwrap();
            await dispatch(getStaffStatusFromLSThunk()).unwrap();
            await dispatch(getRoleIdFromLSThunk()).unwrap();
            navigate('/dashboard', {state: {from: 'otp'}});
          } catch (error) {
            console.log("Error on token")
          }
        }
      }
      // navigate("/otp?mode=signin");
    } catch (error) {
      console.error("Login error:", error);
      setLoading(false);
      if(error?.message === "Request failed with status code 500") {
        
        toast.error("Please enter correct email or password");
      } else {
        
        toast.error("Error logging in");
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center h-screen xsm-max:px-1">
      <div className="w-full max-w-[32rem] bg-gray-50 p-12 rounded-3xl xsm-max:px-4">
        <div className="w-full">
          <div className="text-center">
            <div className="flex items-center justify-center">
              <img
                src={process.env.BASE_URL + "/images/logo.jpeg"}
                alt="logo"
              />
            </div>
            <h3 className="text-2xl font-semibold text-[#0D121F] pt-4">
              Sign in your account
            </h3>
            <p className="mt-2">
              New to Hordanso?{" "}
              <Link to="/register" className="text-green-600">
                Register Now 
              </Link>
            </p>
          </div>
          <div className="my-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label
                  className="block text-gray-900 text-base font-bold mb-1"
                  htmlFor="formBasicEmail"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="formBasicEmail"
                  placeholder="Enter email"
                  className="custom-input"
                  data-testid="email"
                  name="email"
                  onChange={updateUserDetails}
                  value={userDetails?.email}
                  required
                />
                {errors.email && (
                  <p className="text-red-600 text-sm">{errors.email.message}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    className="custom-input"
                    minLength={6}
                    required
                    name="password"
                    onChange={updateUserDetails}
                    value={userDetails?.password}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                  >
                    {showPassword ? (
                      <HiOutlineEye className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <RiEyeCloseLine className="h-5 w-5" aria-hidden="true" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-600 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <button className="text-red-600 hover:text-[#12A833] hover:underline" onClick={() => {navigate('/forgotpassword')}}>Forgot Password?</button>
              <div className="mt-4">
                <button
                  type="submit"
                  data-testid="log-in"
                  className="btn-green"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Submit"}
                </button>
              </div>
            </form>
          </div>

          <p className="font-inter font-medium text-sm text-black text-center">
            By signing you agree to our{" "}
            <span className="text-[#12A833] cursor-pointer" onClick={() => {setTermsModalOpen(true)}}>Terms and conditions</span>
          </p>
        </div>
      </div>

      <Dialog
        open={termsModalOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={() => { setTermsModalOpen(false); }}
      >
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10 w-screen overflow-y-auto mt-16">
          <div className="flex min-h-full items-center justify-center py-4">
            <DialogPanel
              transition
              className="w-full max-w-xl rounded-xl bg-white p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <div className="flex justify-between items-center mb-6">
                <DialogTitle
                  as="h3"
                  className="text-lg font-semibold text-gray-900"
                >
                  <h1 className="h1-text">Terms and Conditions</h1>
                </DialogTitle>
                <div className='btn-close-bg'>
                  <button
                    type='button'
                    className='text-black items-center'
                    onClick={() => {setTermsModalOpen(false)}}
                  ><RiCloseFill className="w-6 h-6" /></button>
                </div>
              </div>

              <div className="max-w-xl w-full p-2 max-h-[400px] overflow-y-auto">
                <div dangerouslySetInnerHTML={{__html: termsAndConditions}}></div>
              </div>
              
              {/* <div className="max-w-xl w-full p-2">
                
                <p
                  className="h-[500px] overflow-scroll overflow-x-hidden font-inter text-[14px] pr-1"
                >
                  &nbsp;1. Introduction
                  These Terms and Conditions ("Terms") govern your use of the design services provided by [Your Company Name] ("Company," "we," "us," or "our"). By using our design services, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you must not use our design services.

                  <br /><br />

                  &nbsp;2. Intellectual Property Rights

                  <br />

                  2.1. Ownership: All design work, including but not limited to graphics, logos, illustrations, and layouts created by [Your Company Name] remains the intellectual property of [Your Company Name] until full payment is received.

                  <br /><br />

                  2.2. Usage Rights: Upon full payment, you are granted a non-exclusive, non-transferable license to use the design work for the intended purpose as agreed upon. This license does not grant you ownership of the design work, only the right to use it.

                  <br /><br />

                  2.3. Third-Party Elements: Any third-party elements, such as stock images or fonts, included in the design work may have separate licenses. It is your responsibility to comply with the terms of these licenses.

                  <br /><br />

                  &nbsp;3. Payment and Fees

                  <br />

                  3.1. Payment Terms: Payment terms will be outlined in the invoice provided. Full payment is required upon completion of the design work unless otherwise agreed upon in writing.

                  <br /><br />

                  3.2. Late Payments: Late payments may incur additional fees as specified in the invoice or agreed upon separately.

                  <br /><br />

                  &nbsp;4. Revisions and Modifications

                  <br />

                  4.1. Revisions: We offer a reasonable number of revisions to the design work as part of our service. The scope of revisions will be defined in the project agreement.

                  <br /><br />

                  4.2. Additional Revisions: Any additional revisions beyond the agreed-upon scope may incur extra charges.

                  <br /><br />

                  &nbsp;5. Use of Designs

                  <br /><br />

                  5.1. Permitted Use: The design work may be used for the specific purpose for which it was created and as described in the project agreement.

                  <br /><br />

                  5.2. Prohibited Use: You may not resell, redistribute, or use the design work for any other purpose without prior written consent from [Your Company Name].

                  <br /><br />
                  
                  &nbsp;6. Confidentiality

                  <br />

                  6.1. Confidential Information: Any confidential information shared during the course of the project will be kept confidential and will not be disclosed to any third parties without your consent.

                  <br /><br />
                  
                  &nbsp;7. Liability

                  <br />

                  7.1. No Warranty: The design work is provided "as is" without any warranty of any kind, either express or implied, including but not limited to the implied warranties of merchantability and fitness for a particular purpose.
                  
                  <br /><br />

                  7.2. Limitation of Liability: In no event shall [Your Company Name] be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with the use or inability to use the design work.

                  <br /><br />
                  
                  &nbsp;8. Termination
                  
                  <br />

                  8.1. Termination by Client: You may terminate the project at any time by providing written notice. In such cases, you will be billed for any completed work and any expenses incurred up to the date of termination.

                  <br /><br />
                  
                  8.2. Termination by Company: We reserve the right to terminate the project if you breach any of these Terms. In such cases, no refund will be provided.

                  <br /><br />
                  
                  &nbsp;9. Governing Law

                  <br />

                  These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction].

                  <br /><br />
                  
                  &nbsp;10. Changes to Terms

                  <br />

                  We reserve the right to update these Terms from time to time. Any changes will be posted on our website, and it is your responsibility to review these Terms periodically.

                  <br /><br />
                  
                  &nbsp;11. Contact Information

                  <br />

                  If you have any questions about these Terms, please contact us at [Your Contact Information].
                </p>
              </div> */}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Login;
