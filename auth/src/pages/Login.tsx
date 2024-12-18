import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "store/hooks";
import { HiOutlineEye } from "react-icons/hi";
import { RiEyeCloseLine } from "react-icons/ri";
import { makeUserLoginThunk } from "store/user.thunk";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  email: string;
  password: string;
};

const initialUserDetails = {
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
        navigate("/otp?mode=signin", { state: { customer_id: result?.customer_id }});
      }
      // navigate("/otp?mode=signin");
    } catch (error) {
      console.error("Login error:", error);
      setLoading(false);
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
          <div className="mt-6">
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
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email format",
                    },
                  })}
                  name="email"
                  onChange={updateUserDetails}
                  value={userDetails?.email}
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
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 8 characters",
                      },
                    })}
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
              <div style={{ color: "red" }}>
                <Link to="/forgotpassword">Forgot Password</Link>
              </div>
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
        </div>
      </div>
    </div>
  );
};

export default Login;
