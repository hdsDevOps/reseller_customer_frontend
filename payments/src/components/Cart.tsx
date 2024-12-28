import React, { useEffect, useState } from "react";
import { GoChevronLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { LuPencilLine } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaLock } from "react-icons/fa6";
import { BiSolidCheckShield } from "react-icons/bi";
import { MdClose, MdOutlineAddShoppingCart } from "react-icons/md";
import { cartItems, recommendations } from "../utils/Utils";
import "./Cart.css";
import { addNewDomainThunk, getCartThunk, removeUserAuthTokenFromLSThunk } from 'store/user.thunk';
import { useAppDispatch, useAppSelector } from "store/hooks";

// Sample vouchers
const vouchers = [
  { code: "HORD6290", discount: 8.6 },
  { code: "HORD6190", discount: 4.6 },
  { code: "HORD6390", discount: 5.6 },
  { code: "HORD6490", discount: 9.6 },
];

interface Voucher {
  code: string;
  discount: number;
}

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { customerId } = useAppSelector(state => state.auth);
  const [showVoucherInput, setShowVoucherInput] = useState(false);
  const [showAvailableVouchers, setShowAvailableVouchers] = useState(false);
  const [voucherCode, setVoucherCode] = useState("");
  const [appliedVoucher, setAppliedVoucher] = useState<Voucher | null>(null);
  const [selectedVoucher] = useState<Voucher | null>(null);
  const [isVoucherApplied, setIsVoucherApplied] = useState(false);
  const [cart, setCart] = useState([]);
  console.log("cart...", cart);

  const getCartDetails = async() => {
    try {
      const result = await dispatch(getCartThunk({ user_id: customerId })).unwrap();
      setCart(result?.cart);
    } catch (error) {
      setCart([]);
      if(error?.error == "Invalid token") {
        try {
          const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
          navigate('/login');
        } catch (error) {
          //
        }
      }
    }
  };

  useEffect(() => {
    getCartDetails();
  }, []);

  const handleDeleteItemFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
  }

  const handleVoucherToggle = () => {
    setShowVoucherInput((prev) => !prev);
  };

  const handleVoucherClose = () => {
    setShowVoucherInput(false);
    setVoucherCode("");
    setAppliedVoucher(null);
  };

  const handleVoucherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVoucherCode(e.target.value);
  };

  const handleVoucherCheck = () => {
    const selectedVoucher = vouchers.find((v) => v.code === voucherCode);
    if (selectedVoucher) {
      setAppliedVoucher(selectedVoucher);
      setShowAvailableVouchers(false);
    } else {
      alert("Invalid voucher code!");
    }
  };

  const handleInputFocus = () => {
    const randomIndex = Math.floor(Math.random() * vouchers.length);
    const selectedVoucher = vouchers[randomIndex];
    setVoucherCode(selectedVoucher.code);
  };

  const toggleAvailableVouchers = () => {
    setShowAvailableVouchers((prev) => !prev);
  };

  const handleSelectVoucher = (voucher: Voucher) => {
    setVoucherCode(voucher.code);
    setAppliedVoucher(voucher);
    setShowAvailableVouchers(false);
  };

  const handleApplyClick = () => {
    setIsVoucherApplied(true);
  };

  return (
    <div className="flex flex-col gap-6 px-2">
      <div className="flex flex-col md:flex-row items-center justify-between md:justify-between mb-6">
        <div
          className="flex items-center gap-1 text-green-500 text-lg cursor-pointer mr-3n whitespace-nowrap mr-2"
          onClick={() => navigate("/dashboard")}
        >
          <GoChevronLeft />
          <p className="text-green-500 text-md">Back to previous page</p>
        </div>
        <div className="relative flex gap-2 flex-grow md:max-w-[850px] w-full">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="domain"
                className="w-full border-2 border-gray-200 bg-transparent rounded-lg p-[.8rem] pr-32 focus:border-green-500 focus:outline-none"
              />
              <select
                id="domain-select"
                className="absolute top-0 right-2 h-full border-0 bg-transparent text-black font-semibold"
                aria-label="Choose a domain extension"
              >
                <option value=".com">.com</option>
                <option value=".co">.co</option>
                <option value=".org">.org</option>
              </select>
            </div>
            <button className="bg-green-600 text-white p-2 rounded-lg text-sm sm:text-md md:text-lg">
              Search Domain
            </button>
            
          </div>
      </div>

      <div className="grid-container">
        <div className="flex flex-col gap-4">
          <div className="mb-4">
            <h1 className="text-green-500 text-3xl font-semibold">
              Shopping Cart
            </h1>
            <small>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non fuga
              repudiandae natus, perspiciatis tenetur maxime!.
            </small>
          </div>
          {
            cart.length > 0 ? cart?.map((item, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg py-4 px-8 flex gap-6 items-start justify-between border border-transparent w-full"
              >
                <div className="flex gap-10 w-full">
                  <div className="flex items-center justify-center bg-gray-200 shadow-md rounded-md w-24 h-20">
                    <img
                      src={item?.product_type === "Domain" ? "https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/globe.svg?alt=media&token=426e0f86-ea50-4d0d-b902-e64d52024975" : "https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/google.webp?alt=media&token=76556bcb-a71c-4ea7-a8a6-04735644213d"}
                      alt={item?.product_type}
                      className="size-[97%] object-cover"
                    />
                  </div>
                  <div className="flex items-start gap-10">
                    <div className="flex-grow flex flex-col justify-center">
                      <h3 className="text-xl font-semibold">{item?.product_name}</h3>
                      <small className="text-sm my-1">({item?.product_type})</small>
                      <small className="text-[10px] text-gray-400">
                        Upgrade user license
                      </small>
                      {
                        item?.product_type === "Domain" ? (
                          <select
                            title="Qty"
                            className="mt-1 bg-transparent border border-black rounded-md p-1 text-sm max-w-20 w-full"
                          >
                            <option value="1">1 year</option>
                            <option value="2">2 year</option>
                            <option value="3">3 year</option>
                          </select>
                        ) : (
                          <select
                            title="Qty"
                            className="mt-1 bg-transparent border border-black rounded-md p-1 text-sm max-w-20 w-full"
                          >
                            <option value="1">Qty: 1</option>
                            <option value="2">Qty: 2</option>
                            <option value="3">Qty: 3</option>
                          </select>
                        )
                      }
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="text-xl font-bold">{item?.price}</span>
                      <small className="text-[10px] text-gray-400 self-end">
                        <span className="uppercase">{item?.payment_cycle}</span> cycle
                      </small>
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      handleDeleteItemFromCart(index)
                    }}
                  >
                    <RiDeleteBin6Line className="text-red-500 text-2xl cursor-pointer w-full" />
                  </button>
                </div>
              </div>
            )) : (
              <div
                className="bg-white shadow-md rounded-lg py-4 px-8 flex gap-6 items-start justify-between border border-transparent w-full"
              >Cart is empty</div>
            )
          }

          <div className="my-4">
            <h1 className="text-3xl font-semibold mb-4">Recommended for you</h1>
            {recommendations.map((item, index) => (
              <div key={index}>
                <div className="flex items-start justify-between my-8">
                  <div className="flex items-start gap-6">
                    <div className="flex items-center justify-center size-10">
                      <img
                        src={item.imageUrl}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex items-start gap-10">
                      <div className="flex-grow flex flex-col justify-center">
                        <h3 className="text-md font-semibold">{item.title}</h3>
                        <small
                          className="text-xs my-1 text-gray-400"
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <span className="text-xl font-normal">
                          {item.price}
                        </span>
                        <small className="text-[10px] text-gray-400 self-end">
                          {item.cycle}
                        </small>
                      </div>
                    </div>
                  </div>
                  <div>
                    <small className="text-green-500 text-xs flex items-center self-end cursor-pointer">
                      Add <MdOutlineAddShoppingCart />
                    </small>
                  </div>
                </div>
                {index < recommendations.length - 1 && (
                  <div style={{ borderBottom: "2px dashed gray" }}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="flex items-center gap-1 underline text-xl font-semibold justify-end mb-4">
            Business Summary <LuPencilLine className="text-xl text-green-500" />
          </h1>
          <div className="flex flex-col gap-8">
            {!showAvailableVouchers && (
              <>
                <div className="flex flex-col gap-2  mt-6">
                  <div className="flex flex-col gap-2">
                    <h1 className="text-2xl lg:text-4xl font-bold">Summary</h1>
                    <div className="flex items-start justify-between">
                      <div className="flex flex-col">
                        <h1 className="text-xl font-semibold flex item ">
                          Business Standard{" "}
                          <span className="text-gray-700 text-md font-normal">
                            (Google Workspace)
                          </span>
                        </h1>
                        <small className="text-xs text-gray-400">
                          3 users, Yearly commitment
                        </small>
                      </div>
                      <div className="text-xl font-normal text-black">
                        <h2>3 X ₹72.00</h2>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col">
                      <h1 className="text-xl font-semibold flex item ">
                        Domain.co.in{" "}
                        <span className="text-gray-700 text-md font-normal">
                          (Domain)
                        </span>
                      </h1>
                      <small className="text-xs text-gray-400">
                        1 Year commitment
                      </small>
                    </div>
                    <div className="text-xl font-normal text-black">
                      <h2>₹648.00</h2>
                    </div>
                  </div>
                  <div className="flex items-start justify-between">
                    <p
                      className="text-green-500 font-semibold underline cursor-pointer hover:underline-offset-0 hover:text-green-700 hover:scale-105 transition ease-in-out duration-300"
                      onClick={handleVoucherToggle}
                    >
                      Have a voucher code?
                    </p>
                    <button
                      className="bg-green-100 p-1 rounded-sm text-[10px]"
                      onClick={toggleAvailableVouchers}
                    >
                      Available vouchers
                    </button>
                  </div>
                </div>
                <div className="">
                  {showVoucherInput && (
                    <div className="flex flex-col items-center justify-center relative">
                      <div className="flex items-center w-[80%] max-w-[300px]">
                        <input
                          type="text"
                          placeholder="Enter your voucher code"
                          value={voucherCode}
                          onFocus={handleInputFocus}
                          onChange={handleVoucherChange}
                          className="border-2 border-dashed border-gray-400 rounded-l-sm px-2 py-4 text-left w-full bg-transparent outline-none"
                          style={{
                            border: "2px dashed gray",
                            borderRight: "none",
                          }}
                        />
                        <button
                          className="bg-black text-white p-4 rounded-r-sm"
                          onClick={handleVoucherCheck}
                          style={{
                            height: "100%",
                            border: "2px dashed gray",
                            borderLeft: "none",
                          }}
                        >
                          Check
                        </button>
                        <MdClose
                          className="cursor-pointer text-2xl text-gray-500 ml-2"
                          onClick={handleVoucherClose}
                        />
                      </div>
                    </div>
                  )}
                </div>
                {appliedVoucher && (
                  <div className="bg-transparent border border-gray-500 rounded-md p-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div
                        className="px-6 rounded-sm text-xs"
                        style={{
                          border: "2px dashed gray",
                          backgroundColor: "#12A83333",
                          paddingTop: "0.65rem",
                          paddingBottom: "0.65rem",
                        }}
                      >
                        {appliedVoucher.code}
                      </div>
                      <p className="text-green-500">
                        Saved ₹{appliedVoucher.discount}!
                      </p>
                    </div>
                    <p
                      className={`font-bold text-xl cursor-pointer ${
                        isVoucherApplied ? "text-gray-500" : "text-green-500"
                      }`}
                      onClick={!isVoucherApplied ? handleApplyClick : undefined} 
                    >
                      {isVoucherApplied ? "Applied" : "Apply"}
                    </p>
                  </div>
                )}
              </>
            )}

            {!showAvailableVouchers && (
              <>
                <div className="flex flex-col pt-2">
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col">
                      <h1 className="text-md font-semibold flex item ">
                        Subtotal{" "}
                      </h1>
                    </div>
                    <div className="text-md font-bold text-black">
                      <h2>₹648.00</h2>
                    </div>
                  </div>
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col">
                      <h1 className="text-sm font-normal">Tax (8.25%)</h1>
                    </div>
                    <div className="text-sm font-normal text-black">
                      <h2>₹72.00</h2>
                    </div>
                  </div>
                  <div className="border border-black"></div>
                  <div className="flex items-start justify-between my-4">
                    <div className="flex flex-col">
                      <h1 className="text-xl font-bold flex item ">Total</h1>
                    </div>
                    <div className="text-xl font-bold text-black">
                      <h2>₹936.28</h2>
                    </div>
                  </div>
                  <button
                    className="bg-green-600 rounded-lg text-white font-semibold py-3 hover:bg-opacity-90 flex items-center justify-center gap-3"
                    type="button"
                    // onClick={() => {navigate('/Review')}}
                  >
                    <FaLock /> Submit Purchase
                  </button>

                  <div className="flex flex-col items-center justify-center gap-2 mt-6">
                    <p className="flex items-center gap-2 text-lg font-semibold">
                      <BiSolidCheckShield className="text-2xl" /> Safe & Secure
                      Payment
                    </p>
                    <p
                      className="text-gray-400 text-sm text-center"
                      style={{ maxWidth: "20.5rem", lineHeight: "1.5rem" }}
                    >
                      By purchasing, you accept the{" "}
                      <span className="text-green-500">Customer Agreement</span>{" "}
                      and acknowledge reading the{" "}
                      <span className="text-green-500">Privacy Policy.</span>{" "}
                      You also agree to Auto renewal of your yearly subscription
                      for ₹467.64, which can be disabled at any time through
                      your account. Your card details will be saved for future
                      purchases and subscription renewals.
                    </p>
                  </div>
                </div>
              </>
            )}

            {showAvailableVouchers && (
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold text-black">
                    All Vouchers
                  </h1>
                  <MdClose
                    className="cursor-pointer text-3xl text-gray-500 ml-2"
                    onClick={toggleAvailableVouchers}
                  />
                </div>
                <div className="flex flex-col items-center justify-center my-4 relative">
                  <div className="flex items-center w-full">
                    <input
                      type="text"
                      placeholder="Enter your voucher code"
                      value={voucherCode}
                      onFocus={handleInputFocus}
                      onChange={handleVoucherChange}
                      className="border-2 border-dashed border-gray-400 rounded-l-sm px-2 py-4 text-left w-full bg-transparent outline-none"
                      style={{ border: "2px dashed gray", borderRight: "none" }}
                    />
                    <button
                      className="bg-black text-white p-4 rounded-r-sm"
                      onClick={handleVoucherCheck}
                      style={{
                        height: "100%",
                        border: "2px dashed gray",
                        borderLeft: "none",
                      }}
                    >
                      Check
                    </button>
                  </div>
                </div>
                <div className="flex flex-col">
                  {vouchers.map((voucher: Voucher) => (
                    <div key={voucher.code} className="flex flex-col mb-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-6">
                          <div
                            className="px-6 rounded-sm text-xs"
                            style={{
                              border: "2px dashed gray",
                              backgroundColor: "#12A83333",
                              paddingTop: "0.65rem",
                              paddingBottom: "0.65rem",
                            }}
                          >
                            {voucher.code}
                          </div>
                          <p className="text-black font-semibold">
                            Saved ₹{voucher.discount}
                          </p>
                        </div>

                        {selectedVoucher?.code === voucher.code ? (
                          <p className="font-bold text-2xl">Available</p>
                        ) : (
                          <button
                            className="font-bold text-green-500 cursor-pointer"
                            onClick={() => handleSelectVoucher(voucher)}
                          >
                            Apply
                          </button>
                        )}
                      </div>
                      <p className="text-[10px] text-gray-400 mt-2">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Reprehenderit <br /> non libero consequuntur?
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
