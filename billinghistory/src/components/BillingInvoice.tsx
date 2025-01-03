import { format } from 'date-fns';
import React from 'react';

const BillingInvoice: React.FC = ({pdfRef, data}) => {
  // const logo = "https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/logo.jpeg?alt=media&token=c210a6cb-a46f-462f-a00a-dfdff341e899";
  const logo = "";
  // const visa = "https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/visa-logo-grey.png?alt=media&token=00881596-2fad-4385-82bb-a0269ae4b4fb";
  const visa = "";

  const formatDate = (seconds, nanoseconds) => {
    const miliseconds = parseInt(seconds) * 1000 + parseInt(nanoseconds) / 1e6;

    const date = new Date(miliseconds);
    // const date = new Date();

    const formattedDate = format(date, "MMM dd, yyyy, h:mm:ss a");
    return formattedDate;
  };
  return (
    <div
      className='w-[700px]'
      ref={pdfRef}
    >
      <div
        className='bg-white px-1 w-full mx-auto'
      >
        <div
          className='relative h-40 bg-white overflow-hidden'
        >
          <div
            className='absolute top-0 w-full h-full bg-[#12A833] transform -skew-y-[11deg] origin-top-left z-10'
          ></div>
          <div
            className='absolute top-0 right-0 w-[200px] h-[80%] bg-[#f4f4f6] opacity-50 transform -skew-y-[17deg] origin-top-left z-10'
          ></div>
          <div
            className='absolute h-full w-[2px] bg-[#535E7C] top-0 ml-[300px]'
          ></div>
          <div
            className='absolute h-full w-[2px] bg-[#535E7C] top-0 ml-[390px]'
          ></div>
          <div
            className='absolute bottom-7 left-1/2 transform -translate-x-1/2 z-30'
          >
            <div
              className='w-[60px] h-[60px] bg-white rounded-full border-4 border-white flex items-center justify-center shadow-lg'
            >
              <img
                src={logo}
                className='w-[51px] rounded-full object-cover'
              />
            </div>
          </div>
        </div>

        <div
          className='text-center py-1'
        >
          <h3 className='font-inter text-[black] text-lg'>Receipt from Hordanso LLC</h3>
          <p className='font-inter text-[#B3B7B8] text-sm'>Receipt #1567-5406</p>
        </div>

        <div
          className='flex justify-between text-[#B3B7B8] px-20 py-5'
        >
          <div
            className='flex flex-col text-start font-inter'
          >
            <h6
              className='text-sm font-medium'
            >AMOUNT PAID</h6>
            <p
              className='text-sm'
            >$ {data?.amount}</p>
          </div>
          <div
            className='flex flex-col text-start'
          >
            <h6
              className='text-sm font-medium'
            >DATE PAID</h6>
            <p
              className='text-sm'
            >{formatDate(data?.created_at?._seconds,data?.created_at?._nanoseconds)}</p>
          </div>
          <div
            className='flex flex-col text-start'
          >
            <h6
              className='text-sm font-medium'
            >PAYMENT METHOD</h6>
            <div
              className='flex gap-1'
            >
              {/* <img
                src={visa}
                alt='visa'
                className='h-5'
              />
              <p
                className='text-sm'
              > - 5953</p> */}
              <p className='text-sm capitalize'>{data?.payment_method}</p>
            </div>
          </div>
        </div>

        <h5
          className='px-14 pb-6 font-inter font-bold text-sm text-[#B3B7B8]'
        >SUMMARY</h5>
      </div>

      <div
        className='bg-[#F6F8Fc] w-full pb-2'
      >
        <div
          className='flex items-center justify-between p-2'
        >
          <p
            className='text-[#9A9597] break-words break-all w-[600px]'
          >Automated Recharge: Messaging credits worth 18.19 USD added for The Jaiye Room. These credits will be used for SMS, Calls, Emails, phone numbers, etc. Please refer to Company Billing Page (https://app.hordanso.com/V2/location/Muygwiofec8362y9uncevb94309wcun98x2t4efwgrdswqdf/settings/company-billing/billing) for more details.</p>
          <p
            className='text-[#9A9597]'
          >${data?.amount}</p>
        </div>

        <div
          className='w-full h-px bg-[#9A9597] my-2 opacity-15'
        ></div>
        <div
          className='w-full flex justify-between items-center p-2'
        >
          <p
            className='text-[#4F5860] font-medium'
          >Amount charged</p>
          <p
            className='text-[#4F5860] font-medium'
          >${data?.amount}</p>
        </div>
      </div>

      <div
        className='px-16 py-8'
      >
        <div
          className='w-full h-px bg-[#9A9597] my-8 opacity-15'
        ></div>

        <h6
          className='my-8 text-[#7F8E96]'
        >
          If you have any questions, contact us at&nbsp;
          <span className='text-[#12A833] font-medium'>stripe@hordanso.com</span>
          &nbsp;or call us at&nbsp;
          <span className='text-[#12A833] font-medium'>+1 469-893-0678</span>.
        </h6>

        <div
          className='w-full h-px bg-[#9A9597] my-8 opacity-15'
        ></div>

        <p
          className='my-8 text-[#7F8E96]'
        >
          Something wrong with the email?&nbsp;
          <span className='text-[#12A833] font-medium'>View in your browser</span>.
        </p>

        <p
          className='my-8 text-[#7F8E96]'
        >
          You are viewing this email because you made a purchase at Hordanso LLC, which partners with&nbsp;
          <span className='text-[#12A833] font-medium'>Stripe</span>
          &nbsp;to provide marketing and payment processing.
        </p>
      </div>
    </div>
  );
};

export default BillingInvoice;