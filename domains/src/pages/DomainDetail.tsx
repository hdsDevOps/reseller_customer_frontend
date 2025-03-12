import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { AiOutlineCheck } from "react-icons/ai";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { removeUserAuthTokenFromLSThunk, getCartThunk, addToCartThunk, getDomainsListThunk } from "store/user.thunk";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { currencyList } from "../components/CurrencyList";

const SelectedDomain: React.FC = () => { 
  const location = useLocation();
  console.log(location.state);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { customerId, defaultCurrencySlice } = useAppSelector(state => state.auth);

  useEffect(() => {
    if(!location.state) {
      navigate('/login')
    }
  }, []);

  const [domain, setDomain] = useState("");
  // console.log("domain...", domain);

  const [cart, setCart] = useState([]);
  console.log("cart...", cart);

  const [domainsList, setDomainsList] = useState([]);
  console.log("domains list...", domainsList);

  const getCart = async() => {
    try {
      const result = await dispatch(getCartThunk({ user_id: customerId })).unwrap();
      setCart(result?.cart);
    } catch (error) {
      setCart([]);
      if(error?.message == "Authentication token is required") {
        try {
          await dispatch(removeUserAuthTokenFromLSThunk()).unwrap();
          navigate('/login');
        } catch (error) {
          //
        }
      }
    }
  }

  useEffect(() => {
    getCart();
  }, [customerId]);

  const getDomainsList = async() => {
    try {
      const result = await dispatch(getDomainsListThunk({customer_id: customerId})).unwrap();
      setDomainsList(result?.data);
    } catch (error) {
      setDomainsList([]);
    }
  };

  useEffect(() => {
    getDomainsList();
  }, [customerId]);

  useEffect(() => {
    setDomain(location.state.domain);
  }, [location.state]);

  const addToCart = async(e) => {
    e.preventDefault();
    try {
      const newCart = cart?.filter(item => item?.product_type === "domain" ? !item : item);
      const addCart = {
        product_name: location.state.domain.domain,
        product_type: "domain",
        price: location.state.domain.price,
        payment_cycle: "Yearly",
        total_year: 1,
        currency: defaultCurrencySlice,
        is_trail: false,
        workspace_status: domainsList?.find(item => item?.domain_name === location.state.domain.domain) ? "old" : "new"
      }
      newCart.push(addCart)
      const result = await dispatch(addToCartThunk({
        user_id: customerId,
        products: newCart
      })).unwrap();
      console.log("result...", result);
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
      getCart();
      navigate('/add-cart');
    }
  }
  return (
    <div className="">
      <main>
        <Link to="/domain">
          <h2 className="text-green-500 font-medium text-sm sm:text-md lg:text-2xl flex items-center gap-1 mb-3">
            <FaArrowLeft className="text-sm sm:text-md lg:text-2xl" /> Domain
            Details
          </h2>
        </Link>
        <div className="h-full w-full flex flex-col justify-center items-center gap-6 pt-4 dm:pt-10">
          <div className="w-full max-w-3xl flex flex-col items-center justify-center gap-1 p-0 md:px-7">
            <div className="bg-white w-full border border-black rounded-sm py-4 p-3 flex justify-between items-center text-sm md:text-lg">
              <div className="text-xs sm:text-lg font-semibold">
                {location.state.domain?.domain}
              </div>
              <div className="text-xs sm:text-lg flex items-center gap-2 font-semibold">
                <small className="text-green-500 font-normal">Available</small>
                <p>{currencyList?.find(item => item?.name === defaultCurrencySlice)?.logo}{location.state.domain?.price[defaultCurrencySlice]}/year</p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-2 text-sm md:text-lg">
                <AiOutlineCheck className="text-green-500 !w-4 !h-4" />
                <p className="text-gray-600">
                  You'll use this domain to set up Google Workspace, create
                  professional email addresses like{" "}
                  <strong>sales@{location.state.domain?.domain}</strong>, and sign in to Gmail, Docs,
                  Drive, Calendar, and more.
                </p>
              </div>

              <div className="flex items-start gap-2 text-sm md:text-lg">
                <AiOutlineCheck className="text-green-500 !w-4 !h-4" />
                <p className="text-gray-600">
                  You'll be able to purchase <strong>{location.state.domain?.domain}</strong> after
                  creating your Google Workspace account.
                </p>
              </div>
            </div>

            <div className="mt-8 text-sm md:text-lg">
              <p className="leading-6 text-gray-600">
                Domain name registration services will be provided by{" "}
                <span className="text-green-500">NameSilo Domains</span>,
                pursuant to the{" "}
                <span className="text-green-500">
                NameSilo Terms of Service
                </span>{" "}
                and{" "}
                <span className="text-green-500">
                NameSilo Domain Registration Agreement
                </span>
                , which Google resells pursuant to its{" "}
                <span className="text-green-500">
                  Google Domain Reseller Agreement
                </span>
                . Initially, Google will manage your domain(s) on NameSilo's
                behalf. Once your domain is transitioned to NameSilo Domains,
                Google will share your name, contact information, and other
                domain-related information with NameSilo. You can review
                NameSilo's{" "}
                <span className="text-green-500"> Privacy Policy</span> for
                details on how they process your information. Google's{" "}
                <span className="text-green-500">Privacy Policy</span> describes
                how Google handles this information as a reseller. By clicking{" "}
                <span className="text-gray-600 font-bold text-xl">Next</span>{" "}
                you acknowledge receipt of Google'sPrivacy Policy and direct us
                to share this information with NameSilo.
              </p>
            </div>

            <button
              className="self-start flex items-center gap-1 text-green-500 border-2 border-green-500 hover:bg-green-500 hover:text-white transition duration-200 ease-in-out py-2 px-4 rounded-lg mt-4 text-xs sm:text-sm md:text-lg"
              onClick={(e) => addToCart(e)}
              cypress-name="go-to-make-domain-user-pass"
            >
              Add to Cart <MdOutlineAddShoppingCart />
            </button>

            <p className="text-xs sm:text-sm md:text-lg text-green-500 font-medium self-start mt-2 cursor-pointer" onClick={() => {navigate('/buy-domain')}}>
              Want to use a new domain?
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SelectedDomain;
