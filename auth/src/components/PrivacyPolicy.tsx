import React, { useEffect, useState } from 'react';
import './list.css';
import { useAppDispatch } from 'store/hooks';
import { getLandingPageThunk } from 'store/user.thunk';

function PrivacyPolicy() {
  const dispatch = useAppDispatch();

  const list2_1 = [
    'Information you provide us. When you register for our Services, sign up for any Wix events, subscribe to our blog(s) or newsletter(s), purchase and/or register domain names, use any of our Services; and/or when you contact us directly by any communication channel (e.g., Wix’s support tickets, emails), you may provide us Personal Information, such as name, email address, phone number, payment information (for Users with Paid Services), information you include in your communications with us and with other users on our platform, and Personal Information contained in scanned identification documents (such as an ID card, driver’s license, passport, or official company registration documents).',
    'Information we collect when you use the Services. When you visit, download, and/or use any of our Services, we may collect aggregated usage Personal Information, such as Visitors’ and Users’ browsing and ‘click-stream’ activity on the Services, session heatmaps and scrolls, non-identifying Personal Information regarding the Visitor’s or User’s device, operating system, internet browser, screen resolution, language and keyboard settings, internet service provider, referring/exit pages, date/time stamps, etc',
    'Information we collect from other sources. We may receive Personal Information about you from third-party sources, such as i) security providers , fraud detection and prevention providers for example to help us screen out users associated with fraud, ii) social media platforms, when you log-in or sign-up using your social media account, we may receive Personal Information from that service (e.g., your username, basic profile Personal Information) and in some cases, we may collect Personal Information from lead enhancement companies which help us to improve our service offering; iii) advertising and marketing partners in order to monitor, manage and measure our ad campaigns.'
  ];
  const list2_2 = [
    {header: 'Users of users ‘Personal Information’', paragraph: '<p  class="font-inter font-normal text-sm text-black">We may also collect Personal Information pertaining to visitors and users of our User’s websites or services (“Users-of-Users”), solely for and on our Users’ behalf (as further described in Section 6 below).</p>'},
    {header: 'Wix jobs applicant information', paragraph: '<p  class="font-inter font-normal text-sm text-black">We also collect information that is provided to us by Wix jobs candidates (“Applicants”), when they apply to any of the open positions published at https://www.wix.com/jobs, by e-mail or otherwise (as further described in our Privacy Policy for Job Applicants).</p>'},
  ];
  const list3 = [
    'To provide and operate the Services;',
    'To further develop, customize, expand, and improve our Services, based on Users’ common or personal preferences, experiences and difficulties;',
    'To provide our Users with ongoing customer assistance and technical support;',
    'To be able to contact our Users with general or personalized service-related notices and promotional messages (as further detailed in Section 8 below);',
    'To help us to update, expand and analyze our records to identify new customers;',
    'To facilitate, sponsor, and offer certain contests, events, and promotions, determine participants’ eligibility, monitor performance, contact winners, and grant prizes and benefits;',
    'To analyze our performance and marketing activities;',
    'To create aggregated statistical data and other aggregated and/or inferred information, which we or our business partners may use to provide and improve our respective services;',
    'To provide you with professional assistance.',
    'To enhance our data security and fraud prevention capabilities; and',
    'To comply with any applicable laws and regulations.'
  ];

  const [privacyPolicyData, setPrivacyPolicyData] = useState("");
  console.log("privacyPolicyData...", privacyPolicyData);

  const getPrivacyPolicyData = async() => {
    try {
      const result = await dispatch(getLandingPageThunk()).unwrap();
      setPrivacyPolicyData(result?.data?.privacy_policy?.content);
    } catch (error) {
      setPrivacyPolicyData("");
    }
  };

  useEffect(() => {
    getPrivacyPolicyData();
  }, []);
  
  
  return (
    <div className='mt-5 flex flex-col'>
      <h2 className='font-inter font-medium text-[32px] text-[#12A833] py-5'>Our Privacy Policies</h2>

      <div dangerouslySetInnerHTML={{__html: privacyPolicyData}}></div>

      {/* <div className='flex flex-col'>
        <ol type='1'>
          <li className='py-2'>
            <h6 className='font-inter font-bold text-[20px] text-black'>Please read carefully</h6>
            <p className="font-inter font-normal text-sm text-black">
            Wix.com cares deeply about the privacy of its visitors and users. To that end, this Privacy Policy (“Privacy Policy”) describes how Wix.com Ltd., together with its affiliated companies worldwide (“Wix”, “we”, “our”, or “us”), collect, use, and share your Personal Information, as well as an explanation of the data rights you may have in that Personal Information. This Privacy Policy applies to all Wix users, including unregistered visitors, registered users, and premium users (collectively, “Users”, “you”, or “your”), and to all Wix services, including our websites (including www.wix.com and any of its subdomains, the “Website”), web applications (“Wix Apps”), mobile applications (“Mobile Apps”), and related services (collectively, the “Services”). This Privacy Policy is not intended to override the terms of any contract you have with us, nor any rights you may have under other applicable data privacy laws.<br />Prior to accessing or using our Services, please read this policy and make sure you fully understand our practices in relation to your Personal Information.  If you read and fully understand this Privacy Policy, and remain opposed to our practices, you must immediately leave and discontinue all use of any of our Services.  If you have any questions or concerns regarding this policy, please contact us here.
            </p>
          </li>

          <li className='py-2'>
            <h6 className='font-inter font-bold text-[20px] text-black'>What ‘Personal Information’ do we collect?</h6>
            <ol>
              <li className='py-1'>
                <h6 className='font-inter font-bold text-base text-black'>User information:</h6>
                <p className="font-inter font-normal text-sm text-black">To provide you the Services, we must collect Personal Information relating to an identified or identifiable natural person (“Personal Information”). We collect Personal Information you provide us, from your use of the Services, and from other sources. Here are the types of Personal Information we collect about you:</p>
                <ol>
                  {
                    list2_1.map((list, index) => (
                      <li key={index}  className='py-[2px]'>
                        <p className="font-inter font-normal text-sm text-black">{list}</p>
                      </li>
                    ))
                  }
                </ol>
              </li>
              {
                list2_2.map((list, index) => (
                  <li key={index} className='py-1'>
                    <h6 className='font-inter font-bold text-base text-black'>{list.header}</h6>
                    <p dangerouslySetInnerHTML={{__html: list.paragraph}}></p>
                  </li>
                ))
              }
            </ol>
          </li>

          <li className='py-2'>
            <h6 className='font-inter font-bold text-[20px] text-black'>What ‘Personal Information’ do we collect?</h6>
            <p className="font-inter font-normal text-sm text-black mt-2">We use your Personal Information for the following purposes:</p>
            <ol type='1'>
              {
                list3.map((list, index) => (
                  <li key={index} className='py-1'>
                    <p className="font-inter font-normal text-sm text-black">{list}</p>
                  </li>
                ))
              }
            </ol>
            <p className="font-inter font-normal text-sm text-black mt-2">We may use techniques like “machine learning” (European law refers to this as “automated decision-making”) to help us improve our services. When we use machine learning, we either: (i) still have a human being involved in the process (and so are not fully automated); or (ii) use machine learning in ways that don’t have significant privacy implications (for example, reordering how applications might appear when you visit the Wix App Market). We may also use machine learning to help us monitor, identify, and suspend accounts sending spam, or engaging in other abusive or fraudulent activity.</p>
          </li>
        </ol>
      </div> */}
    </div>
  )
}

export default PrivacyPolicy