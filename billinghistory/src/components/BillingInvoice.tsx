import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getBase64ImageThunk, getPaymentMethodsThunk, getPaymentSubscriptionsListThunk } from 'store/user.thunk';

const BillingInvoice: React.FC = ({pdfRef, data}) => {
  const { customerId } = useAppSelector(state => state.auth);
  const logo = "https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/hordanso-fixed-logo.png?alt=media&token=ecd5d548-0aa7-46d4-9757-c24cba11693c";
  // const logo = "";
  const visa = "https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/visa-logo-grey.png?alt=media&token=00881596-2fad-4385-82bb-a0269ae4b4fb";
  // const visa = "";

  const stripeImageUrl = "https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/stripe.png?alt=media&token=23bd6672-665c-4dfb-9d75-155abd49dc58";
  const paystackImageUrl = "https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/paystack.png?alt=media&token=8faf3870-4256-4810-9844-5fd3c147d7a3";

  const { userDetails } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  const [paymentMethods, setPaymentMethods] = useState([]);

  const [subscriptionList, setSubscriptionList] = useState([]);
  const [subscription, setSubscription] = useState<object|null>(null);
  // console.log("subscription...", subscription);
  
  const [base64ImageLogo, setBase64ImageLogo] = useState("");
  // console.log("base64ImageLogo...", base64ImageLogo);
  const [stripeImage, setStripeImage] = useState("");
  const [paystackImage, setPaystackImage] = useState("");
  // console.log("paymentMethodImage...", paymentMethodImage);

  const getBase64ImageLogo = async() => {
    try {
      const result = await dispatch(getBase64ImageThunk({url: logo})).unwrap();
      setBase64ImageLogo(result?.base64);
    } catch (error) {
      setBase64ImageLogo("");
    }
  };

  useEffect(() => {
    getBase64ImageLogo();
  }, []);

  const getBase64ImageStripe = async() => {
    try {
      const result = await dispatch(getBase64ImageThunk({url: stripeImageUrl})).unwrap();
      setStripeImage(result?.base64);
    } catch (error) {
      setStripeImage("");
    }
  };
  const getBase64ImagePaystack = async() => {
    try {
      const result = await dispatch(getBase64ImageThunk({url: paystackImageUrl})).unwrap();
      setPaystackImage(result?.base64);
    } catch (error) {
      setStripeImage("");
    }
  };

  useEffect(() => {
    getBase64ImageStripe();
    getBase64ImagePaystack();
  }, []);
  
  const getSubscriptionList = async() => {
    try {
      const result = await dispatch(getPaymentSubscriptionsListThunk({customer_id: customerId, start_date: "", end_date: "", domain_name: ""})).unwrap();
      setSubscriptionList(result?.subscriptions);
    } catch (error) {
      setSubscriptionList([]);
    }
  };

  useEffect(() => {
    getSubscriptionList();
  }, [customerId]);

  useEffect(() => {
    if(subscriptionList?.length > 0 && data) {
      setSubscription(subscriptionList?.find(item => item?.id === data?.subscription_id));
    } else {
      setSubscription(null);
    }
  }, [subscriptionList, data]);

  // console.log("data...", data);

  const formatDate = (seconds, nanoseconds) => {
    const miliseconds = parseInt(seconds) * 1000 + parseInt(nanoseconds) / 1e6;

    const date = new Date(miliseconds);
    // const date = new Date();

    const formattedDate = format(date, "MMM dd, yyyy, h:mm:ss a");
    return formattedDate;
  };

  const getPaymentMethodsList = async() => {
    try {
      const methods = await dispatch(getPaymentMethodsThunk({user_id: data?.customer_id, token: data?.token})).unwrap();
      setPaymentMethods(methods?.paymentMethods);
    } catch (error) {
      setPaymentMethods([]);
    }
  };

  useEffect(() => {
    getPaymentMethodsList();
  }, [data]);

  const formatDateInvoice = (datee) => {
    const date = new Date(datee);

    if(date == "Invalid Date") {
      return {top: "Invalid Date", bottom: ""};
    } else {
      return {top: format(date, "MMM dd, yyyy"), bottom: format(date, "h:mm:ss a")}
    }
  };

  return (
    <div
      className='max-w-[700px]'
      ref={pdfRef}
    >
    <div
      className='bg-white px-1 w-full mx-auto'
    >
      <div
        className='relative h-40 bg-white overflow-hidden'
      >
        <div
          style={{position: 'absolute', top: 0, width: "100%", height: "100%", backgroundColor: '#12A833', zIndex: '10', transform: 'skewY(-11deg)', transformOrigin: 'top left'}}
        ></div>
        <div
          className='absolute top-0 right-0 w-[200px] h-[80%] bg-[#f4f4f6] opacity-50 transform -skew-y-[17deg] origin-top-left z-10'
        ></div>
        {/* <div
          className='absolute h-full w-[2px] bg-[#535E7C] top-0 ml-[300px]'
        ></div>
        <div
          className='absolute h-full w-[2px] bg-[#535E7C] top-0 ml-[390px]'
        ></div> */}
        <div className='absolute top-2 right-2 flex flex-row z-20 items-start'>
          <div className='flex flex-col items-start'>
            <p className='mr-1 text-white font-normal font-inter text-sm'>Date:</p>
          </div>
          <div className='flex flex-col items-start'>
            <p className='mr-1 text-white font-normal font-inter text-sm p-0'>{formatDateInvoice(data?.date)?.top}</p>
            <p className='mr-1 text-white font-normal font-inter text-sm p-0 mt-0'>{formatDateInvoice(data?.date)?.bottom}</p>
          </div>
        </div>
        <div
          className='absolute bottom-7 left-1/2 transform -translate-x-1/2 z-30'
        >
          <div
            className='w-[60px] h-[60px] bg-white rounded-full border-4 border-white flex items-center justify-center shadow-lg'
          >
            <img
              src={base64ImageLogo}
              className='w-[51px] rounded-full object-cover'
            />
          </div>
        </div>
      </div>

      <div
        className='text-center py-1 border-b border-black'
      >
        <h3 className='font-inter text-[black] text-lg'>Receipt from Hordanso LLC</h3>
        <p className='font-inter text-[#B3B7B8] text-sm'>Receipt #{data?.invoice}</p>
      </div>

      <div
        className='flex justify-between text-[#B3B7B8] px-20 py-5 w-full overflow-x-auto'
      >
        <table className="w-full min-w-[400px]">
          <tbody>
            <tr>
              <td className="font-inter font-normal text-sm items-start text-start content-start">Inovice To</td>
              <td className="flex flex-col font-inter font-normal text-sm text-black content-start">
                <p>{subscription?.payment_details[subscription?.payment_details?.length - 1]?.first_name} {subscription?.payment_details[subscription?.payment_details?.length - 1]?.last_name}</p>
                <p>{subscription?.payment_details[subscription?.payment_details?.length - 1].email}</p>
                <p>{subscription?.payment_details[subscription?.payment_details?.length - 1]?.region}</p>
              </td>
            </tr>
            <tr>
              <td className="font-inter font-normal text-sm items-start text-start content-start">Payment Method</td>
              <td>
                <img
                  src={
                    data?.payment_method?.toLowerCase() === "stripe"
                    ? stripeImage
                    : data?.payment_method?.toLowerCase() === "paystack"
                    ? paystackImage
                    : ""
                  }
                  alt={data?.payment_method}
                  className="w-10 object-contain"
                />
              </td>
            </tr>
            <tr>
              <td className="font-inter font-normal text-sm items-start text-start content-start">Payment Cycle</td>
              <td className="flex flex-col font-inter font-normal text-sm text-black content-start">{subscription?.payment_cycle}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        className='flex justify-between text-[#B3B7B8] px-20 py-5 w-full overflow-x-auto'
      >
        <table className="w-full min-w-[400px]">
          <thead>
            <tr>
              <th className="w-[150px] text-left border-b border-black">Description</th>
              <th className="w-[50px] text-center border-b border-black">Qty</th>
              <th className="w-[100px] text-center border-b border-black">
                {/* Unit Price */}
              </th>
              <th className="w-[100px] text-center border-b border-black">Amount</th>
            </tr>
          </thead>
          <tbody>
            {/* <tr>
              <td className="font-inter font-normal text-sm text-black content-start text-left py-1 border-b border-black">Domain</td>
              <td className="font-inter font-normal text-sm text-black content-start text-center py-1 border-b border-black">1</td>
              <td className="font-inter font-normal text-sm text-black text-right py-1 border-b border-black">
                <div className="inline-block">
                  <span className="inline-block">1</span>
                  <X className="inline-block w-4 h-4 text-black mx-[2px]" />
                  <span className="inline-block">{currencyList?.find(item => item?.name === data?.currency)?.logo}{parseFloat(data?.selectedDomain?.price[data?.currency])?.toFixed(2)}</span>
                </div>
              </td>
              <td className="font-inter font-normal text-sm text-black content-start text-right py-1 border-b border-black">{currencyList?.find(item => item?.name === data?.currency)?.logo}{data?.selectedDomain?.price[data?.currency]}</td>
            </tr> */}
            <tr>
              <td className="font-inter font-normal text-sm text-black content-start text-left py-1 border-b border-black capitalize">{data?.description}</td>
              <td className="font-inter font-normal text-sm text-black content-start text-center py-1 border-b border-black">
              {/* {data?.license_usage} */}
              1
              </td>
              <td className="font-inter font-normal text-sm text-black text-right py-1 border-b border-black">
                {/* <div className="inline-block">
                  <span className="inline-block">{data?.license_usage}</span>
                  <X className="inline-block w-4 h-4 text-black mx-[2px]" />
                  <span className="inline-block">{currencyList?.find(item => item?.name === data?.currency)?.logo}{parseFloat(data?.plan?.amount_details?.find(amount => amount?.currency_code === data?.currency)?.price?.find(priceList => priceList?.type === data?.period)?.discount_price)?.toFixed(2)}</span>
                </div> */}
              </td>
              <td className="font-inter font-normal text-sm text-black content-start text-right py-1 border-b border-black">
                {data?.amount}
              </td>
            </tr>

            {/* <tr>
              <td></td>
              <td></td>
              <td className="font-inter font-normal text-sm text-black text-left py-1 border-b border-black">Voucher</td>
              <td className="font-inter font-normal text-sm text-black content-start text-right py-1 border-b border-black">
                -{currencyList?.find(item => item?.name === data?.currency)?.logo}
                {data?.discountedPrice}
              </td>
            </tr> */}

            {/* <tr>
              <td></td>
              <td></td>
              <td className="font-inter font-normal text-sm text-black text-left py-1 border-b border-black">Tax</td>
              <td className="font-inter font-normal text-sm text-black content-start text-right py-1 border-b border-black">
                {currencyList?.find(item => item?.name === data?.currency)?.logo}
                {data?.taxedPrice}
              </td>
            </tr> */}

            {/* <tr>
              <td></td>
              <td></td>
              <td className="font-inter font-normal text-sm text-black text-left py-1 border-b border-black">Total</td>
              <td className="font-inter font-normal text-sm text-black content-start text-right py-1 border-b border-black">
                {currencyList?.find(item => item?.name === data?.currency)?.logo}
                {data?.finalTotalPrice}
              </td>
            </tr> */}

            {/* <tr>
              <td></td>
              <td></td>
              <td className="font-inter font-normal text-sm text-black text-left py-1 border-b border-black">Amount Charged</td>
              <td className="font-inter font-normal text-sm text-black content-start text-right py-1 border-b border-black">
                {currencyList?.find(item => item?.name === data?.currency)?.logo}
                {data?.finalTotalPrice}
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>

    <div
      className='px-16 py-8'
    >
      <div
        className='w-full h-px bg-[#9A9597] opacity-15'
      ></div>

      <h6
        className='mt-4 text-[#7F8E96]'
      >
        If you have any questions, contact us at&nbsp;
        <span className='text-[#12A833] font-medium'>stripe@hordanso.com</span>
        &nbsp;or call us at&nbsp;
        <span className='text-[#12A833] font-medium'>+1 469-893-0678</span>.
      </h6>
    </div>
    </div>
  );
};

export default BillingInvoice;