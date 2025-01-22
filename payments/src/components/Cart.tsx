import React, { useEffect, useState } from "react";
import { GoChevronLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { LuPencilLine } from "react-icons/lu";
import { RiCloseFill, RiDeleteBin6Line } from "react-icons/ri";
import { FaLock } from "react-icons/fa6";
import { BiSolidCheckShield } from "react-icons/bi";
import { MdClose, MdOutlineAddShoppingCart } from "react-icons/md";
import { cartItems, recommendations } from "../utils/Utils";
import "./Cart.css";
import { addNewDomainThunk, addToCartThunk, getCartThunk, getVouchersListThunk, plansAndPricesListThunk, removeUserAuthTokenFromLSThunk } from 'store/user.thunk';
import { useAppDispatch, useAppSelector } from "store/hooks";
import { toast } from "react-toastify";
import { setCart } from "store/authSlice";
import { currencyList } from "./CurrencyList";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import CustomerAgreement from "./CustomerAgreement";
import PrivacyPolicy from "./PrivacyPolicy";

interface Voucher {
  code: string;
  discount: number;
};

const initialCartPrice = {
  total_year: 0,
  price: 0
}

const logoImage = 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/logo-2.png?alt=media&token=9315e750-1f5d-4032-ba46-1aeafa340a75';
const logoImageSmall = 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/logo.jpeg?alt=media&token=c210a6cb-a46f-462f-a00a-dfdff341e899';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { customerId, defaultCurrencySlice, userDetails } = useAppSelector(state => state.auth);
  // console.log(userDetails);
  const [showVoucherInput, setShowVoucherInput] = useState(false);
  const [showAvailableVouchers, setShowAvailableVouchers] = useState(false);
  const [voucherCode, setVoucherCode] = useState("");
  const [voucherCodeSearch, setVoucherCodeSearch] = useState("");
  // console.log("voucherCodeSearch...", voucherCodeSearch);
  const [appliedVoucher, setAppliedVoucher] = useState<Voucher | null>(null);
  // console.log("applied voucher...", appliedVoucher);
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const [isVoucherApplied, setIsVoucherApplied] = useState(false);
  const [cart, setCartItems] = useState([]);
  // console.log("cart...", cart);
  const [vouchers, setVouchers] = useState([]);
  const [filterVouchers, setFilterVouchers] = useState([]);
  // console.log("vouchers..", vouchers);
  const [totalPrice, setTotalPrice] = useState(0);
  // console.log("total price...", totalPrice);
  const [finalTotalPrice, setFinalTotalPrice] = useState(0.00);
  const [taxAmount, setTaxAmount] = useState(8.25);
  const [taxedPrice, setTaxedPrice] = useState(0.00);
  const [discountedPrice, setDiscountedPrice] = useState(0.00);
  const [preDiscountedPrice, setPreDiscountedPrice] = useState(0.00);
  const [voucherHover, setVoucherHover] = useState(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState("");
  const [cartPrice, setCartPrice] = useState([initialCartPrice]);
  // console.log("cartPrice...", cartPrice);
  const [workspacePrice, setWorkspacePrice] = useState(0);
  const [currentPlan, setCurrentPlan] = useState<object|null>(null);
  // console.log("currentPlan...", currentPlan);

  const handleLegalModalClose = () => {
    setIsLegalModalOpen(false);
    setLegalModalType("");
  };

  const getPlansAndPricesList = async() => {
    try {
      const result = await dispatch(plansAndPricesListThunk({subscription_id: ""})).unwrap();
      setPlansList(result?.data);
    } catch (error) {
      setPlansList([]);
      if(error?.message == "Authentication token is required") {
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
    getPlansAndPricesList();
  }, []);

  const [plansList, setPlansList] = useState([]);
  // console.log("plans list...", plansList);

  useEffect(() => {
    const current = plansList?.find(item => item?.id === userDetails?.workspace?.plan_name_id);
    if(current){
      setCurrentPlan(current);
    } else {
      setCurrentPlan(null);
    }
  }, [plansList, userDetails]);

  const getAmount = (amount, period) => {
    const amountDetails =  amount?.find(item => item?.currency_code === defaultCurrencySlice);
    if(amountDetails === undefined) {
      return {type: '', price: 0, discount_price: 0};
    } else {
      return amountDetails?.price?.find(item => item?.type === period);
    }
  };

  const cartAddAmount = (item, period) => {
    const data = getAmount(item?.amount_details, period);
    return data;
  };

  const getPlan = async() => {
    // if(userDetails?.workspace?.workspace_status === "trial") {
    //   setWorkspacePrice(0);
    // } else {
      const workspaceCart = cart?.find(item => item?.product_type === "google workspace");
      if(workspaceCart) {
        try {
          const result = await dispatch(plansAndPricesListThunk({subscription_id: workspaceCart?.plan_name_id})).unwrap();
          const amountArray = result?.data[0]?.amount_details;
          const priceArray = amountArray?.find(amount => amount?.currency_code === defaultCurrencySlice)?.price;
          const finalArray = priceArray?.find(price => price?.type?.toLowerCase() === workspaceCart?.payment_cycle?.toLowerCase());
          console.log({pre: finalArray?.discount_price, final: parseFloat(cartAddAmount(currentPlan, userDetails?.workspace?.payment_cycle)?.discount_price)})
          setWorkspacePrice(cartAddAmount(currentPlan, userDetails?.workspace?.payment_cycle)?.discount_price ? (parseFloat(finalArray?.discount_price) - parseFloat(cartAddAmount(currentPlan, userDetails?.workspace?.payment_cycle)?.discount_price))?.toFixed(2) : finalArray?.discount_price);
        } catch (error) {
          setWorkspacePrice(0);
        }
      } else {
        setWorkspacePrice(0);
      }
    // }
  };

  useEffect(() => {
    getPlan();
  }, [cart, defaultCurrencySlice, currentPlan, userDetails]);

  const getDomainPrice = () => {
    return 953.72;
  };

  const calculateCartAmount = (cart) => {
    if(cart?.length > 0) {
      const priceList = cart.map((item) => {
        if(item?.product_type === "google workspace"){
          return {total_year: item?.total_year, price: workspacePrice};
        } else if(item?.product_type?.toLowerCase() === "domain") {
          return {total_year: item?.total_year, price: 953.72};
        }
      });

      setCartPrice(priceList);
    } else {
      setCartPrice([initialCartPrice]);
    }
  };

  useEffect(() => {
    calculateCartAmount(cart);
  }, [cart, workspacePrice]);

  useEffect(() => {
    // const filterByCurrency = vouchers?.filter(v => v?.voucher?.voucher_code === defaultCurrencySlice);
    // setFilterVouchers(filterByCurrency);
    setFilterVouchers([...vouchers]);
  }, [vouchers, defaultCurrencySlice]);

  useEffect(() => {
    if(cart?.length > 0) {
      const total = cartPrice?.reduce((totalCart, item) => {
        const amountt = parseFloat(item?.price) * parseInt(item?.total_year);
        return totalCart + amountt;
      }, 0);
      // console.log("cartTotal...", total);
      setTotalPrice(parseFloat(total.toFixed(2)));
      setTaxedPrice(parseFloat(((total * taxAmount) / 100).toFixed(2)));
      const discountedPercent = appliedVoucher === null
        ? 0.00
        : parseFloat(parseFloat(appliedVoucher?.voucher?.discount_rate)?.toFixed(2));
      const totalOutPrice = parseFloat((total + ((total * taxAmount) / 100)).toFixed(2));
      const discountedAMount = parseFloat(((totalOutPrice * discountedPercent) / 100).toFixed(2));
      setDiscountedPrice(discountedAMount);

      const preDiscountedPercent = selectedVoucher === null
        ? 0.00
        : parseFloat(parseFloat(selectedVoucher?.voucher?.discount_rate)?.toFixed(2));
      const preTotalOutPrice = parseFloat((total + ((total * taxAmount) / 100)).toFixed(2));
      const preDiscountedAMount = parseFloat(((preTotalOutPrice * preDiscountedPercent) / 100).toFixed(2));
      setPreDiscountedPrice(preDiscountedAMount);

      const finalDiscountedPrice = parseFloat((totalOutPrice - discountedAMount).toFixed(2));
      setFinalTotalPrice(finalDiscountedPrice);
    } else {
      setTotalPrice(0);
    }
  }, [cart, appliedVoucher, selectedVoucher, cartPrice]);

  const getCartDetails = async() => {
    try {
      const result = await dispatch(getCartThunk({ user_id: customerId })).unwrap();
      setCartItems(result?.cart);
      await dispatch(setCart(result?.cart));
    } catch (error) {
      setCartItems([]);
      if(error?.error == "Request failed with status code 401") {
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
  }, [customerId]);

  const addToCart = async(e, product_name, product_type, price, payment_cycle, total_year) => {
    e.preventDefault();
    try {
      const addCart = {
        product_name: product_name,
        product_type: product_type,
        price: price,
        payment_cycle: payment_cycle,
        total_year: total_year
      }
      const newCart = [...cart, addCart];
      const result = await dispatch(addToCartThunk({
        user_id: customerId,
        products: newCart
      })).unwrap();
      // console.log("result...", result);
    } catch (error) {
      // console.log("error")
      if(error?.message == "Authentication token is required") {
        try {
          await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
          navigate('/login');
        } catch (error) {
          //
        }
      }
    } finally {
      getCartDetails();
    }
  };

  const addToCart2 = async(e, cartValue) => {
    e.preventDefault();
    try {
      const result = await dispatch(addToCartThunk({
        user_id: customerId,
        products: cartValue
      })).unwrap();
      // console.log("result...", result);
      await dispatch(setCartItems(cartValue));
    } catch (error) {
      if(error?.message == "Authentication token is required") {
        try {
          await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
          navigate('/login');
        } catch (error) {
          //
        }
      }
    } finally {
      getCartDetails();
    }
  };

  const getVouchersList = async() => {
    try {
      const result = await dispatch(getVouchersListThunk({customer_id: customerId})).unwrap();
      setVouchers(result?.joinedData);
    } catch (error) {
      setVouchers([]);
      if(error?.message == "Authentication token is required") {
        try {
          await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
          navigate('/login');
        } catch (error) {
          //
        }
      }
    }
  };

  useEffect(() => {
    getVouchersList();
  }, [customerId]);

  const handleDeleteItemFromCart = async(index) => {
    const newCart = cart.filter((_, i) => i !== index);
    try {
      const result = await dispatch(addToCartThunk({
        user_id: customerId,
        products: newCart
      })).unwrap();
      toast.success("Your cart item has been deleted.");
    } catch (error) {
      toast.error("Error on deleting cart item.");
      if(error?.error == "Request failed with status code 401") {
        try {
          const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
          navigate('/login');
        } catch (error) {
          //
        }
      }
    } finally {
      getCartDetails();
    }
  };

  const handleVoucherToggle = () => {
    setShowVoucherInput((prev) => !prev);
  };

  const handleVoucherClose = () => {
    setShowVoucherInput(false);
    setVoucherCode("");
    setAppliedVoucher(null);
  };

  const handleVoucherChange = (e) => {
    e.preventDefault();
    const filterByCurrency = vouchers?.filter(v => v?.voucher?.voucher_code === defaultCurrencySlice);
    const voucherFind = filterByCurrency?.find((v) => v?.voucher?.voucher_code?.toLowerCase().includes(voucherCode?.toLowerCase()));
    if(voucherFind) {
      setSelectedVoucher(voucherFind);
    } else {
      toast.error(`No voucher found with voucher code ${voucherCode}`);
    }
  };

  const handleVoucherCheck = (e) => {
    e.preventDefault();
    // const voucherFilterList = vouchers?.filter(item => item?.voucher_code?.toLowerCase() === voucherCodeSearch?.toLowerCase());
    // setFilteredVouchers(voucherFilterList);
    if(voucherCodeSearch === "") {
      setFilterVouchers([...vouchers])
    } else {
      const filterByCurrency = vouchers?.filter(v => v?.voucher?.voucher_code === defaultCurrencySlice);
      const voucherFilterList = filterByCurrency?.find((v) => v?.voucher?.voucher_code === voucherCodeSearch);
      if (voucherFilterList) {
        setFilterVouchers([voucherFilterList]);
      } else {
        toast.error(`No voucher found with voucher code ${voucherCodeSearch}!`);
      }
    }
  };

  const toggleAvailableVouchers = () => {
    setShowAvailableVouchers((prev) => !prev);
  };

  const handleSelectVoucher = (voucher: Voucher) => {
    setVoucherCode(voucher.code);
    setAppliedVoucher(voucher);
    setSelectedVoucher(voucher);
    setShowAvailableVouchers(false);
  };

  const handleApplyClick = () => {
    setIsVoucherApplied(true);
  };

  const handleChangeCartValue = (e, index, value) => {
    const newCart = { ...cart[index] };
    newCart.total_year = parseInt(value);
    const newCartValue = cart?.map((prev, i) => 
      i === index ? newCart : prev
    );
    // console.log(newCartValue);
    addToCart2(e, newCartValue);
  }

  return (
    <div className="flex flex-col gap-6 px-2">
      <div className="flex flex-col md:flex-row items-center justify-between md:justify-between mb-6">
        <div
          className="flex items-center gap-1 text-green-500 text-lg cursor-pointer mr-3n whitespace-nowrap mr-2"
          onClick={() => navigate(-1)}
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
                  <div className="flex flex-row justify-between w-full">
                    <div className="flex flex-col justify-center">
                      <h3 className="text-xl font-semibold">{item?.product_name}</h3>
                      <small className="text-sm my-1">({item?.product_type})</small>
                      <small className="text-[10px] text-gray-400">
                        {
                          item?.product_type === "google workspace" ?
                          "Upgrade user license" :
                          "Upgrade total period"
                        }
                      </small>
                      {
                        item?.product_type === "Domain" ? (
                          <select
                            title="Qty"
                            className="mt-1 bg-transparent border border-black rounded-md p-1 text-sm max-w-20 w-full"
                            onChange={e => {
                              handleChangeCartValue(e, index, e.target.value);
                            }}
                            value={item?.total_year}
                          >
                            <option value="1">1 year</option>
                            <option value="2">2 year</option>
                            <option value="3">3 year</option>
                          </select>
                        ) : (
                          <div className="flex mt-1 bg-transparent border border-black rounded-md p-1 text-sm max-w-20 w-full">
                            <p>Qty:</p>
                            <input
                            className="max-w-full focus:outline-none border-0 h-full w-[40px] ml-1"
                              type="number"
                              onChange={e => {
                                if(userDetails?.workspace?.workspace_status === "trial") {
                                  if(e.target.value < 0) {
                                    handleChangeCartValue(e, index, 0)
                                  } else if(e.target.value > 10) {
                                    handleChangeCartValue(e, index, 10)
                                  } else {
                                    handleChangeCartValue(e, index, e.target.value)
                                  }
                                } else {
                                  if(e.target.value < 0) {
                                    handleChangeCartValue(e, index, 0)
                                  } else {
                                    handleChangeCartValue(e, index, e.target.value)
                                  }
                                }
                                
                              }}
                              value={item?.total_year}
                            />
                            {/* <select
                              title="Qty"
                              className="mt-1 bg-transparent border border-black rounded-md p-1 text-sm max-w-20 w-full"
                              onChange={e => {
                                handleChangeCartValue(e, index, e.target.value);
                              }}
                              value={item?.total_year}
                            >
                              <option value="1">Qty: 1</option>
                              <option value="2">Qty: 2</option>
                              <option value="3">Qty: 3</option>
                            </select> */}
                          </div>
                        )
                      }
                    </div>
                    <div className="cart-delete-flex">
                      <div className="flex flex-col justify-start
                     text-left">
                        <span className="text-xl font-inter font-bold text-black text-end">{currencyList?.find(item => item?.name === defaultCurrencySlice)?.logo}{
                          item?.product_type === "google workspace"
                          ? workspacePrice
                          : item?.price
                        }</span>
                        <small className="font-inter font-medium text-[8px] text-gray-400 self-end max-w-[70px]">
                          <span className="capitalize">{item?.payment_cycle}</span> cycle
                        </small>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          handleDeleteItemFromCart(index)
                        }}
                        className="ml-auto max-[640px]:mt-10 pt-1"
                      >
                        <RiDeleteBin6Line className="text-red-500 text-2xl cursor-pointer w-full" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )) : (
              <div
                className="bg-white shadow-md rounded-lg py-4 px-8 flex gap-6 items-start justify-between border border-transparent w-full"
              >Cart is empty</div>
            )
          }

          <div className="my-4">
            {/* <h1 className="text-3xl font-semibold mb-4">Recommended for you</h1>
            {recommendations.map((item, index) => (
              <div key={index}>
                <div className="flex items-start justify-between my-8">
                  <div className="flex items-start gap-6">
                    <div className="flex items-center justify-center size-10">
                      <img
                        src={item?.imageUrl}
                        alt=""
                        className="w-full object-cover mt-12"
                      />
                    </div>
                    <div className="flex items-start gap-10">
                      <div className="flex-grow flex flex-col justify-center">
                        <h3 className="text-md font-semibold">{item?.title}</h3>
                        <small
                          className="text-xs my-1 text-gray-400"
                          dangerouslySetInnerHTML={{ __html: item?.description }}
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
                    <small
                      className="text-green-500 text-xs flex items-center self-end cursor-pointer"
                      onClick={(e) => {addToCart(e, item?.title, item?.type, item?.price, item?.cycle, 1)}}
                    >
                      Add <MdOutlineAddShoppingCart />
                    </small>
                  </div>
                </div>
                {index < recommendations.length - 1 && (
                  <div style={{ borderBottom: "2px dashed gray" }}></div>
                )}
              </div>
            ))} */}
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
                    {
                      cart?.map((item, index) => (
                        <div className="flex items-start justify-between" key={index}>
                          <div className="flex flex-col">
                            <h1 className="text-xl font-semibold flex item ">
                              {item?.product_name}
                              <span className="text-gray-700 text-md font-normal">
                                ({item?.product_type})
                              </span>
                            </h1>
                            <small className="text-xs text-gray-400">
                              {
                                item?.product_type === "google workspace" ? 
                                `${item?.total_year} users` :
                                `${item?.total_year} years`
                              }, {item?.payment_cycle} commitment
                            </small>
                          </div>
                          <div className="text-xl font-normal text-black">
                            <h2>{item?.total_year} X {currencyList?.find(item => item?.name === defaultCurrencySlice)?.logo}{
                              item?.product_type === "google workspace"
                              ? workspacePrice
                              : item?.price  
                            }</h2>
                          </div>
                        </div>
                      ))
                    }
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
                          // onFocus={handleInputFocus}
                          onChange={e => {setVoucherCode(e.target.value)}}
                          className="border-2 border-dashed border-gray-400 rounded-l-sm px-2 py-4 text-left w-full bg-transparent outline-none"
                          style={{
                            border: "2px dashed gray",
                            borderRight: "none",
                          }}
                        />
                        <button
                          className="bg-black text-white p-4 rounded-r-sm"
                          onClick={e => handleVoucherChange(e)}
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
                {selectedVoucher && (
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
                        {selectedVoucher?.voucher?.voucher_code}
                      </div>
                      <p className="text-green-500">
                        {selectedVoucher?.voucher?.voucher_code === appliedVoucher?.voucher?.voucher_code ? `Saved ${currencyList?.find(item => item?.name === defaultCurrencySlice)?.logo} ${discountedPrice}` : `You will save ${currencyList?.find(item => item?.name === defaultCurrencySlice)?.logo} ${preDiscountedPrice}`}
                      </p>
                    </div>
                    <p
                      className={`font-bold text-xl cursor-pointer ${
                        appliedVoucher?.voucher?.voucher_code === selectedVoucher?.voucher?.voucher_code ? "text-gray-500" : "text-green-500"
                      }`}
                      onClick={appliedVoucher?.voucher?.voucher_code !== selectedVoucher?.voucher?.voucher_code ? handleApplyClick : undefined} 
                    >
                      {appliedVoucher?.voucher?.voucher_code === selectedVoucher?.voucher?.voucher_code ? "Applied" : "Apply"}
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
                      <h2>{currencyList?.find(item => item?.name === defaultCurrencySlice)?.logo}{totalPrice.toFixed(2)}</h2>
                    </div>
                  </div>
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col">
                      <h1 className="text-sm font-normal">Tax ({taxAmount.toFixed(2)}%)</h1>
                    </div>
                    <div className="text-sm font-normal text-black">
                      <h2>{currencyList?.find(item => item?.name === defaultCurrencySlice)?.logo}{taxedPrice.toFixed(2)}</h2>
                    </div>
                  </div>
                  {
                    appliedVoucher && (
                      <div className="flex justify-between items-center text-sm font-normal text-black mb-2">
                        <p className="flex items-center">
                          Voucher Discount
                          <IoMdInformationCircleOutline className="relative text-greenbase text-[23px] ml-1" onMouseOver={() => setVoucherHover(true)} onMouseLeave={() => {setVoucherHover(false)}} />
                          {
                            voucherHover && (
                              <div className="absolute flex flex-col ml-6">
                                <p className="font-inter font-medium text-base text-white bg-[#12A833] p-2 rounded-[10px] -mt-[145px] w-full max-w-[200px] z-10">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis semper dolor. </p>
                                <div className="w-7 h-7 bg-[#12A833] rotate-45 -mt-4 mx-auto"></div>
                              </div>
                            )
                          }
                        </p>
                        <p>-{currencyList?.find(item => item?.name === defaultCurrencySlice)?.logo}{discountedPrice}</p>
                      </div>
                    )
                  }
                  <div className="border border-black"></div>
                  <div className="flex items-start justify-between my-4">
                    <div className="flex flex-col">
                      <h1 className="text-xl font-bold flex item ">Total</h1>
                    </div>
                    <div className="text-xl font-bold text-black">
                      <h2>{currencyList?.find(item => item?.name === defaultCurrencySlice)?.logo}{finalTotalPrice.toFixed(2)}</h2>
                    </div>
                  </div>
                  <button
                    className="bg-green-600 rounded-lg text-white font-semibold py-3 hover:bg-opacity-90 flex items-center justify-center gap-3"
                    type="button"
                    disabled={cart.length > 0 ? false : true}
                    onClick={() => {navigate('/review-and-check-out', { state: { cart, price: {totalPrice, finalTotalPrice, taxAmount, discountedPrice}, voucher_code: appliedVoucher } })}}
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
                      <span className="text-green-500 cursor-pointer" onClick={() => {
                        setIsLegalModalOpen(true);
                        setLegalModalType("agreement");
                      }}>Customer Agreement</span>{" "}
                      and acknowledge reading the{" "}
                      <span className="text-green-500 cursor-pointer" onClick={() => {
                        setIsLegalModalOpen(true);
                        setLegalModalType("privacy");
                      }}>Privacy Policy.</span>{" "}
                      You also agree to Auto renewal of your yearly subscription
                      for, which can be disabled at any time through
                      your account. Your card details will be saved for future
                      purchases and subscription renewals.
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
                      value={voucherCodeSearch}
                      // onFocus={handleInputFocus}
                      onChange={e => {setVoucherCodeSearch(e.target.value)}}
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
                  {filterVouchers?.length > 0 
                  ? filterVouchers?.map((voucher: Voucher) => {
                    if(voucher?.status === "active" && voucher?.used_date === null) {
                      return (
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
                                {voucher?.voucher?.voucher_code}
                              </div>
                              <p className="text-black font-semibold">
                                {
                                  appliedVoucher === null
                                  ? "Save"
                                  : appliedVoucher?.voucher?.voucher_code === voucher?.voucher?.voucher_code
                                    ? "Saved"
                                    : "Save"
                                } {voucher?.voucher?.discount_rate}%
                              </p>
                            </div>
    
                            {selectedVoucher?.code === voucher?.voucher?.voucher_code ? (
                              <p className="font-bold text-2xl">Available</p>
                            ) : (
                              <button
                                className={`font-bold ${appliedVoucher?.voucher?.voucher_code === voucher?.voucher?.voucher_code ? "text-gray-400" : "text-green-500"} cursor-pointer`}
                                onClick={() => handleSelectVoucher(voucher)}
                                disabled={appliedVoucher?.voucher?.voucher_code === voucher?.voucher?.voucher_code}
                              >
                                {appliedVoucher?.voucher?.voucher_code === voucher?.voucher?.voucher_code ? "Applied" : "Apply"}
                              </button>
                            )}
                          </div>
                          <p className="text-[10px] text-gray-400 mt-2">
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Reprehenderit <br /> non libero consequuntur?
                          </p>
                        </div>
                      )
                    }
                  }) : (
                    <p className="font-inter font-normal text-black text-base text-center">No Vouchers...</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {
        isLegalModalOpen && (
          <Dialog
            open={isLegalModalOpen}
            as="div"
            className="relative z-50 focus:outline-none"
            onClose={() => {
              setIsLegalModalOpen(false);
              setLegalModalType("");
            }}
          >
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 w-screen overflow-y-auto">
              <div className="flex min-h-screen min-w-screen items-center justify-center">
                <DialogPanel
                  transition
                  className="h-screen w-screen overflow-y-auto bg-white p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 flex flex-col"
                >
                  <div className="flex justify-between items-center mb-6">
                    <DialogTitle
                      as="h3"
                      className="text-lg font-semibold text-gray-900"
                    >
                      <img
                        src={logoImage}
                        className="h-10 object-contain"
                        alt="logo"
                      />
                    </DialogTitle>
                    <div className='btn-close-bg'>
                      <button
                        type='button'
                        className='text-black items-center'
                        onClick={() => {
                          setIsLegalModalOpen(false);
                          setLegalModalType("");
                        }}
                      ><RiCloseFill className="w-6 h-6" /></button>
                    </div>
                  </div>
                  {
                    legalModalType === "agreement"
                    ? <CustomerAgreement />
                    : legalModalType === "privacy"
                    ? <PrivacyPolicy />
                    : ''
                  }
                </DialogPanel>
              </div>
            </div>
          </Dialog>
        )
      }
    </div>
  );
};

export default Cart;
