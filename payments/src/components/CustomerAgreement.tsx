import paragraph from 'antd/es/skeleton/paragraph'
import React, { useEffect, useState } from 'react'
import { useAppDispatch } from 'store/hooks';
import { getLandingPageThunk } from 'store/user.thunk';

function CustomerAgreement() {
  const dispatch = useAppDispatch();

  const list = [
    {header: 'Provision of the Service', paragraph: '<p class="font-inter font-normal text-sm text-black"></p>'},
    {header: '', paragraph: '<p class="font-inter font-normal text-sm text-black">The Service is provided, maintained and operated by Google and not by Wix. Google has appointed Wix to perform certain administrative actions in relation to the Service including collection of the subscription fees. In addition, Google has delegated to Wix certain administrative access to Google application accounts purchased through Wix.<br />In order to ensure that you do not experience any interruption or loss of services, the Service set to automatically renew, by default.  Unless you turn-off the auto-renewal option, such Service will automatically renew upon the end of the applicable Service period, for the same term then-currently in place for the Services, and at the then-current price for the Services (which may be higher or lower than the original price for the Services). To learn how to turn-off the auto-renewal option, please click here: https://support.wix.com/en/article/google-workspace-turning-off-auto-renewal-for-a-business-email.<br />Wix will attempt to charge your payment method on file, for the renewal fee within up-to 30 days before the expiration date of the Service and extends the Service period for an equivalent period as the original period. Wix will also endeavor to provide you a notice at least 30 prior the renewal date.<br />In the event of failure to collect the fees owed by you, we may in our sole discretion (but shall not be obligated to) retry to collect at a later time and/or suspend or cancel your Service, without further notice. In the event that Wix is unable to charge all fees through your payment method or if Wix receives notification of a chargeback, reversal, payment dispute, or is charged a penalty for any fee it previously charged to your selected payment method, Wix may pursue all available lawful remedies to obtain payment, including immediately suspending or cancelling the Service provided to you. Automatic renewal will not be effective until payment is final.<br />You are solely responsible for ensuring that the payment method you have on file with Wix is current and valid. By entering into this Agreement, You acknowledge the automatic renewal terms of your Service as indicated herein and you authorize Wix to charge the applicable fees to your authorized method of payment until you turn-off the auto-renewal.<br /><br />​IT IS HEREBY MADE CLEAR THAT YOU ARE SOLELY RESPONSIBLE FOR ENSURING THE SERVICES ARE RENEWED. WIX SHALL HAVE NO LIABILITY TO YOU OR ANY THIRD PARTY IN CONNECTION WITH THE RENEWAL AS DESCRIBED HEREIN, INCLUDING, BUT NOT LIMITED TO, ANY FAILURE OR ERRORS IN RENEWING THE SERVICES.​</p>'},
    {header: 'Commercial Terms of Service', paragraph: '<p class="font-inter font-normal text-sm text-black">The commercial terms for the use of the Service, including the fees, the payment terms and the refund policy shall all be as set forth on the Wix website. Such terms may change from time-to-time. You are recommended to review the terms before any renewal of the Service.</p>'},
    {header: 'Compliance with Policies', paragraph: '<p class="font-inter font-normal text-sm text-black">The use of the App is subject to the standard Terms of Service of Google and the Google  Workspace &Cloud Identity Acceptable Use Policy (together the "Google TOS"). Upon your first log in to the Service the Google TOS shall be presented to you. Please read them and make sure you fully understand their terms. By accessing and/or using the Service you approve your full consent to the Google TOS.<br /><br />You understand that if you violate any of these terms or if you do not timely pay for the Service (or any renewal period), Wix or Google may suspend or terminate your account whether or not you are in good standing with Wix.<br /><br />In addition, as any other service or application offered by Wix to its users, the use of the Service is governed by applicable Wix policies, including the Wix Terms of Use and its Privacy Policy ("Wix Polices"). In the event of any contradiction between this Agreement and the Wix Policies or the Google TOS, the terms of this Agreement shall prevail.</p>'},
    {header: 'Support Services', paragraph: '<p class="font-inter font-normal text-sm text-black">The support services provided to you by Google in relation to the Service shall be in accordance with the standard Google Workspace Service Level Agreement (“SLA”). The SLA may be updated periodically by Google. You are aware of the fact that Wix shall not provide you any support or maintenance services in relation to the Service.</p>'},
    {header: 'Back-Ups', paragraph: '<p class="font-inter font-normal text-sm text-black">You acknowledge that Wix will not back up data stored on any Google Application (or any other independent applications), and that Wix will not be able to restore or recover any data or documents that are deleted from such applications. You are recommended to maintain the integrity of your data files, including performing regular back-ups. You should not rely on Google or Wix to back-up your data.</p>'},
    {header: 'Delicate Information', paragraph: '<p class="font-inter font-normal text-sm text-black">You shall not send or store confidential or restricted information through the Service. Neither Wix nor Google shall have any responsibility for a leak of such information stored or sent via the Service.</p>'},
    {header: 'Suspension of Account', paragraph: '<p class="font-inter font-normal text-sm text-black">​In event or if you are in violation of any Wix Policies or if for any other reason your account with Wix is suspended or terminated, your account with Google for the Service may be suspended and/or terminated as a result. In such event you shall be provided the ability to continue the use of the Service by engaging with Google (or any other Google reseller) directly. In such event, Wix shall not have any responsibility for any lose of data stored by you on the Service.</p>'},
    {header: 'No Liability', paragraph: '<p class="font-inter font-normal text-sm text-black">​You acknowledge that Google is responsible for the provision of the Service to you. Wix shall have no responsibility or liability in relation to the provision of the Service by Google, the quality or functionality of the Service, its availability, the support services provided by Google and/or any other aspect of the Service or its provision to you other than Wix❜s responsibility in relation to the technical billing actions conducted by Wix on behalf of Google.</p>'},
    {header: 'Modifications', paragraph: '<p class="font-inter font-normal text-sm text-black">This Agreement, the Google TOS, the SLA and the Wix Policies may be changed from time to time without notification. You should review this Agreement (as posted on the Wix website) and all of the policies periodically to ensure you remain in compliance.</p>'},
  ];
  const [customerAgreementData, setCustomerAgreementData] = useState("");
  // console.log("CustomerAgreement...", customerAgreementData);

  const getCustomerAgreement = async() => {
    try {
      const result = await dispatch(getLandingPageThunk()).unwrap();
      setCustomerAgreementData(result?.data?.customer_agreement?.content);
    } catch (error) {
      setCustomerAgreementData("");
    }
  };

  useEffect(() => {
    getCustomerAgreement();
  }, []);

  return (
    <div className='mt-5 flex flex-col'>
      <h2 className='font-inter font-medium text-[32px] text-[#12A833] py-5'>Google Mailing Application – Customer Agreement</h2>

      <div dangerouslySetInnerHTML={{__html: customerAgreementData}}></div>

      {/* <div className='flex flex-col'>
        <p className='py-5 font-inter font-medium text-sm text-black'>By clicking the "Submit Purchase" button and/or purchasing the Google Mailing Application ("Service") you approve your consent to the following terms and conditions that constitute an agreement between you and Wix ("Agreement"): </p>

        <ol type='1'>
          {
            list.map((list, index) => (
              <li key={index} className='py-2'>
                <h6 className='font-inter font-bold text-base text-black'>{list.header}</h6>
                <p dangerouslySetInnerHTML={{__html: list.paragraph}}></p>
              </li>
            ))
          }
        </ol>
      </div> */}
    </div>
  )
}

export default CustomerAgreement