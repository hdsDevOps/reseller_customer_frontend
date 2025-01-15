import React, { useEffect, useState } from "react";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { ChevronDown, ChevronUp } from "lucide-react";
import AddPayment from "./AddPaymentMethods";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { deleteCardThunk, getProfileDataThunk, removeUserAuthTokenFromLSThunk, savedCardsListThunk, updateLicenseUsageThunk } from "store/user.thunk";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { setSaveCards, setUserDetails } from "store/authSlice";
import { RiDeleteBin6Line } from "react-icons/ri";

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  getDomainsList: () => void;
}

const EmailModal: React.FC<EmailModalProps> = ({ isOpen, onClose,getDomainsList }) => {
  const navigate = useNavigate();
  const { userDetails, customerId, token, saveCardsState, paymentMethodsState } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const [numUsers, setNumUsers] = useState<number>(0);
  const [showDetails, setShowDetails] = useState<boolean>(true);
  const subtotal = 70.6;
  const taxRate = 0.0825;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  const [activeMethod, setActiveMethod] = useState("saved");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>("");
  const [selectedCard, setSelectedCard] = useState<string | null>("");

  useEffect(() => {
    const defaultCard = saveCardsState?.find(card => card?.is_default);
    if(defaultCard) {
      setSelectedCard(defaultCard?.uuid)
    } else {
      setSelectedCard("");
    }
  }, [saveCardsState]);

  useEffect(() => {
    const defaultPayment = paymentMethodsState?.find(method => method?.default);
    if(defaultPayment) {
      setSelectedPaymentMethod(defaultPayment?.method_name);
    } else {
      setSelectedPaymentMethod("");
    }
  }, [paymentMethodsState]);

  if (!isOpen) return null;

  const handlePaymentMethodChange = (method: string) => {
    setSelectedPaymentMethod(method);
  };

  const handlePaymentMethodChange2 = (uuid: string) => {
    setSelectedCard(uuid);
  };

  const getProfileData = async() => {
    if(token) {
      try {
        const result = await dispatch(getProfileDataThunk({user_id: customerId})).unwrap();
        await dispatch(setUserDetails(result?.customerData));
      } catch (error) {
        if(error?.message == "Request failed with status code 401") {
          try {
            const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
            navigate('/login');
          } catch (error) {
            //
          }
        }
      }
    }
  };
  
  const changeLicenseUsage = async(e) => {
    e.preventDefault();
    try {
      if(numUsers > 0) {
        const originalLicense = parseInt(userDetails?.license_usage);
        const updatedLicense = originalLicense + numUsers;
        const result = await dispatch(updateLicenseUsageThunk({
          user_id: customerId,
          license_usage: updatedLicense
        })).unwrap();
        // console.log("result...", result);
        toast.success(result?.message);
        onclose;
      } else {
        toast.warning("Number of user cannot be 0");
      }
    } catch (error) {
      onclose;
      toast.error("Error updating License Usage");
      if(error?.message == "Authentication token is required") {
        try {
          const removeToken = await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
          navigate('/login');
        } catch (error) {
          //
        }
      }
    } finally {
      getDomainsList();
      getProfileData();
    }
  };

  const handleBuyLicenseUsage = e => {
    const count = Number(e.target.value);
    count < 0
    ? setNumUsers(0)
    : userDetails?.workspace?.workspace_status === "trial" 
      ? count + parseInt(userDetails?.license_usage) <= 10
        ? setNumUsers(count)
        : setNumUsers(10 - parseInt(userDetails?.license_usage))
      : setNumUsers(count);
  };

  function hideCardNumber(cardNumber) {
    const cardStr = String(cardNumber);
    const hiddenCard = cardStr.replace(/^(\d{8})/, "**** **** ");
    return hiddenCard;
  };

  const getCardsList = async() => {
    try {
      const result = await dispatch(savedCardsListThunk({user_id: customerId})).unwrap();
      await dispatch(setSaveCards(result?.cards));
    } catch (error) {
      //
    }
  };

  const deleteCard = async(id) => {
    try {
      const result = await dispatch(deleteCardThunk({user_id: customerId, rec_id: id})).unwrap();
      toast.success(result?.message);
    } catch (error) {
      toast.error("Error deleting card");
    } finally {
      getCardsList();
    }
  };

  return (
    // <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    //   <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl w-full mx-2  h-[95vh] xl:h-full overflow-y-scroll">
    //     <div className="flex items-center justify-between mb-4">
    //       <h1 className="text-xl font-bold">Add User License</h1>
    //       <button className="flex items-center gap-1 text-green-500 border-2 border-green-500 hover:bg-green-500 hover:text-white transition duration-200 ease-in-out py-2 px-4 rounded-lg text-xs sm:text-sm">
    //         Add to Cart <MdOutlineAddShoppingCart />
    //       </button>
    //     </div>

    //     {showDetails && (
    //       <div className="flex items-center justify-between mb-4">
    //         <p className="text-base font-semibold">No. of additional user</p>
    //         <input
    //           type="number"
    //           value={numUsers}
    //           onChange={(e) => setNumUsers(Number(e.target.value))}
    //           className="border-gray-300 border rounded p-2 w-16 text-center bg-white outline-none focus:ring-1 focus:ring-green-300"
    //           placeholder="No."
    //         />
    //       </div>
    //     )}

    //     {showDetails && (
    //       <div className="border-y border-gray-300 py-2 my-6">
    //         <div className="flex justify-between items-center mt-2">
    //           <div className="flex items-center gap-1">
    //             <p>
    //             {numUsers + parseInt(userDetails?.license_usage)} users, Year subscription (price adjusted to current cycle) users, Year subscription (price adjusted to current cycle)
    //             </p>
    //             <span className="border-2 border-green-500 rounded-full h-5 w-5 flex items-center justify-center text-green-500 font-bold mr-1">
    //               i
    //             </span>
    //           </div>
    //           <span className="flex items-center font-semibold">₹{subtotal.toFixed(2)}</span>
    //         </div>
    //         <p className="underline mb-4 font-semibold mt-2">Enter voucher code</p>
    //       </div>
    //     )}

    //     <div className="border-b border-gray-300 py-2 mb-4">
    //       <div className="flex justify-between font-semibold mb-3">
    //         <span>Subtotal</span>
    //         <span>₹{subtotal.toFixed(2)}</span>
    //       </div>
    //       <div className="flex justify-between">
    //         <div className="flex items-center">
    //           Tax (8.25%)
    //           <span className="border-2 border-green-500 rounded-full h-5 w-5 flex items-center justify-center text-green-500 font-bold ml-1">
    //             i
    //           </span>
    //         </div>
    //         <span className="gap-2">₹{tax.toFixed(2)}</span>
    //       </div>
    //     </div>

    //     <div className="border-b border-gray-300 py-2 mb-4">
    //       <div className="flex justify-between font-bold">
    //         <span className="flex items-center gap-2">
    //           Total
    //           <p 
    //             className="text-green-500 font-normal cursor-pointer flex items-center"
    //             onClick={() => setShowDetails(!showDetails)}
    //           >
    //              {showDetails ? (
    //               <>
    //                 Hide details <ChevronUp className="w-4 h-4 ml-1" />
    //               </>
    //             ) : (
    //               <>
    //                 Show details <ChevronDown className="w-4 h-4 ml-1" />
    //               </>
    //             )}
    //           </p>
    //         </span>
    //         <span>₹{total.toFixed(2)}</span>
    //       </div>
    //     </div>

    //     <AddPayment />

    //     <div className="flex justify-start gap-4 mt-4">
    //       <button
    //         className="bg-green-500 text-white py-2 px-4 rounded"
    //         onClick={onClose}
    //       >
    //         Submit
    //       </button>
    //       <button
    //         className="bg-red-500 text-white py-2 px-4 rounded"
    //         onClick={onClose}
    //       >
    //         Cancel
    //       </button>
    //     </div>
    //   </div>
    // </div>
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <form className="bg-white p-6 rounded-lg shadow-md max-w-3xl w-full mx-2  max-h-[95vh] xl:max-h-full overflow-y-scroll" onSubmit={changeLicenseUsage}>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">Add User License</h1>
          {/* <button className="flex items-center gap-1 text-green-500 border-2 border-green-500 hover:bg-green-500 hover:text-white transition duration-200 ease-in-out py-2 px-4 rounded-lg text-xs sm:text-sm">
            Add to Cart <MdOutlineAddShoppingCart />
          </button> */}
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="text-base font-semibold">No. of additional user</p>
          <input
            type="number"
            value={numUsers}
            onChange={(e) => {handleBuyLicenseUsage(e)}}
            className="border-gray-300 border rounded p-2 w-16 text-center bg-white outline-none focus:ring-1 focus:ring-green-300"
            placeholder="No."
          />
        </div>

        {showDetails && (
          <>
            <div className="border-y border-gray-300 py-2 my-6">
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center gap-1">
                  <p>
                    {numUsers + parseInt(userDetails?.license_usage)} users, Year subscription (price adjusted to current cycle)
                  </p>
                  <span className="border-2 border-green-500 rounded-full h-5 w-5 flex items-center justify-center text-green-500 font-bold mr-1">
                    i
                  </span>
                </div>
                <span className="flex items-center font-semibold">₹{subtotal.toFixed(2)}</span>
              </div>
              <p className="underline mb-4 font-semibold mt-2">Enter voucher code</p>
            </div>

            <div className="border-b border-gray-300 py-2 mb-4">
              <div className="flex justify-between font-semibold mb-3">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center">
                  Tax (8.25%)
                  <span className="border-2 border-green-500 rounded-full h-5 w-5 flex items-center justify-center text-green-500 font-bold ml-1">
                    i
                  </span>
                </div>
                <span className="gap-2">₹{tax.toFixed(2)}</span>
              </div>
            </div>
          </>
        )}

        <div className="border-b border-gray-300 py-2 mb-4">
          <div className="flex justify-between font-bold">
            <span className="flex items-center gap-2">
              Total
              <p 
                className="text-green-500 font-normal cursor-pointer flex items-center"
                onClick={() => setShowDetails(!showDetails)}
              >
                {showDetails ? (
                  <>
                    Hide details <ChevronUp className="w-4 h-4 ml-1" />
                  </>
                ) : (
                  <>
                    Show details <ChevronDown className="w-4 h-4 ml-1" />
                  </>
                )}
              </p>
            </span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex justify-between max-w-md w-full text-xs sm:text-sm md:text-md">
          <button
            className={`flex-1 py-2 px-1 text-center rounded-l-md ${activeMethod === "saved" ? "bg-white text-green-500 shadow-sm" : "bg-white text-gray-800"}`}
            type="button"
            onClick={() => setActiveMethod("saved")}
          >
            Saved Payment Method
          </button>
          <button
            className={`flex-1 py-2 px-1 text-center rounded-r-md ${activeMethod === "other" ? "bg-white text-green-500 shadow-sm" : "bg-white text-gray-800"}`}
            type="button"
            onClick={() => setActiveMethod("other")}
          >
            Other Payment Methods
          </button>
        </div>
  
        <div className="rounded-b-lg rounded-tr-lg border p-3">
          {activeMethod === "saved" && (
            <div className="border-2 border-green-500 p-4 rounded-lg my-4">
              {
                saveCardsState?.length > 0 ? saveCardsState?.map((card, index) => (
                  <div className="flex justify-between items-center mb-2" key={index}>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="saved-method"
                        checked={activeMethod === "saved" && selectedCard === card?.uuid}
                        onChange={() => handlePaymentMethodChange2(card?.uuid)}
                        className="mr-2 radio radio-xs radio-success"
                        aria-labelledby="saved-method-label"
                        defaultChecked
                      />
                      <label id="saved-method-label" className="flex items-center">
                        <img
                          src="/images/stripe.webp"
                          alt="Stripe"
                          className="w-14 h-8 mr-6"
                        />
                        <div className="flex flex-col">
                          <small className="text-xs font-bold text-gray-700">{hideCardNumber(card?.card_id)}</small>
                          <small className="text-[10px] text-gray-300">Expiry: {card?.expiry_month}/{card?.expiry_year}</small>
                          <small className="text-[10px] flex items-center gap-1 text-gray-300">
                            {/* <MdOutlineMail /> billing@acme.corp */}
                            {card?.name}
                          </small>
                        </div>
                      </label>
                    </div>
                    {
                      card?.is_default && (
                        <button className="bg-green-500 text-white text-xs rounded-3xl px-4 py-1 mx-auto block">
                          Default
                        </button>
                      )
                    }
                    <RiDeleteBin6Line onClick={() => {deleteCard(card?.uuid)}} className="text-red-500 text-lg cursor-pointer" />
                  </div>
                )) : (
                  <p className="text-center">No saved cards</p>
                )
              }
            </div>
          )}
  
          {activeMethod === "other" && (
            <div>
              {
                paymentMethodsState?.length > 0 && paymentMethodsState?.map((method, index) => (
                  <div className="flex items-center justify-between mb-2" key={index}>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id={method?.id}
                        name="payment-method"
                        checked={selectedPaymentMethod === method?.id || method?.default} // Check if method is 'stripe'
                        onChange={() => handlePaymentMethodChange(method?.id)}
                        className="mr-2 radio radio-xs radio-success"
                        title={method?.method_name}
                      />
                      <label htmlFor={method?.id} className="mr-2 capitalize">
                        {method?.method_name}
                      </label>
                    </div>
                    <div>
                      <img
                        src={method?.method_image}
                        alt={method?.method_name}
                        className="w-14 h-8 border-2 border-gray-200 shadow-sm p-1 rounded-md"
                      />
                    </div>
                  </div>
                ))
              }
            </div>
          )}
  
          {activeMethod === "saved" && (
            <p className="text-green-500 text-sm text-left mt-4 cursor-pointer" onClick={() => {setActiveMethod("other")}}>
              Use another payment method
            </p>
          )}
        </div>

        <div className="flex justify-start gap-4 mt-4">
          <button
            className="bg-green-500 text-white py-2 px-4 rounded"
            type="submit"
          >
            Submit
          </button>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded"
            onClick={() => {
              onClose();

            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmailModal;
