import React, { useState } from "react";
import { Base_URL } from "../../Constant";
import { BsCheckLg } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { SmallButton } from "../../utils/buttons/Button";
import { RiArrowDownSLine, RiArrowUpSLine, RiCheckFill, RiCloseFill } from "react-icons/ri";


const ProductivityAndCollaboration = ({plans}:any) => {
    const navigate = useNavigate();

    const [seeMore, setSeeMore] = useState(false);
    // console.log("plans...", plans);
    const list = [
        {name: 'gmail_business_email', label: '<p><b>Gmail</b> Business email', image: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/gmail.png?alt=media&token=ce4bf445-8280-4c97-9743-e79168a27f11',},
        {name: 'custom_email_for_business', label: '<p>Custom email for your business</p>', image: '',},
        {name: 'phising_protection', label: '<p>Phishing and spam protection that blocks more than 99.9% of attacks</p>', image: '',},
        {name: 'add_free_email', label: '<p>Ad-free email experience</p>', image: '',},
        {name: 'meet_video_conferencing', label: '<p><b>Meet</b> Video and voice conferencing</p>', image: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/google-meet.png?alt=media&token=4945f794-64ac-447b-9b60-cdb3ec04e1bb',},
        {name: 'meeting_lenght', label: '<p>Meeting length (maximum)</p>', image: '',},
        {name: 'us_or_internation_phone_number', label: '<p>US or international dial-in phone numbers</p>', image: '',},
        {name: 'digital_whiteboarding', label: '<p>Digital whiteboarding</p>', image: '',},
        {name: 'noise_cancellation', label: '<p>Noise cancellation</p>', image: '',},
        {name: 'meeting_recodings_save', label: '<p>Meeting recordings saved to Google Drive</p>', image: '',},
    ];
    const seeMoreList = [
        {name: 'advanced_protection_program', label: '<p>Advanced protection program</p>', image: '',},
        {name: 'endpoint_management', label: '<p>Endpoint management</p>', image: '',},
        {name: 'google_wokspace_migrate_tool', label: '<p>Google wokspace migrate tool</p>', image: '',},
        {name: 'group_base_policy_control', label: '<p>Group base policy control</p>', image: '',},
    ];
    return (
        <section className="min-w-full my-5">
            <div className="w-full relative">
                <div className="w-full grid grid-cols-12 sticky top-0 bg-white z-10">
                    <div className="md:col-span-6 col-span-12"></div>
                    {
                        plans?.length > 0 && plans?.map((plan, index) => {
                            if(index === 1) {
                                return (
                                    <div className="md:col-span-2 col-span-4 flex flex-col justify-center items-center border-l border-[#8C8C8C] pb-2" key={index}>
                                        <p className="font-inter font-normal md:text-xs text-[10px] text-[#12A833] bg-[#12A8331A] w-full text-center h-10 items-center pt-[13px]">MOST POPULAR</p>
                                        <p className="font-inter font-normal sm:text-lg text-xs text-black">{plan?.plan_name}</p>
                                        <button type="button" onClick={() => {navigate('/subscribe', { state: plan })}} className="font-inter font-semibold sm:text-base text-xs text-[#F0F0F3] bg-[#12A833] sm:px-3 px-2 sm:py-2 py-[2px] sm:rounded-[10px] rounded-[4px] max-w-[126px] mt-1">Start a trial</button>
                                    </div>
                                )
                            } else if(index < 3) {
                                return (
                                    <div className="md:col-span-2 col-span-4 flex flex-col justify-center items-center border-l border-[#8C8C8C] last:border-r pt-10 pb-2" key={index}>
                                        <p className="font-inter font-normal sm:text-lg text-xs text-black">{plan?.plan_name}</p>
                                        <button type="button" onClick={() => {navigate('/subscribe', { state: plan })}} className="font-inter font-semibold sm:text-base text-xs text-[#F0F0F3] bg-[#12A833] sm:px-3 px-2 sm:py-2 py-[2px] sm:rounded-[10px] rounded-[4px] max-w-[126px] mt-1">Start a trial</button>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
                <div className="w-full grid grid-cols-12 my-2">
                    <h3 className="font-inter font-medium text-[28px] text-[#0D121F] col-span-6">Productivity and collaboration</h3>
                </div>
                {
                    list.map((item, index) => {
                        if(item.image !== "") {
                            return(
                                <div className="w-full grid grid-cols-12" key={index}>
                                    <div className="md:col-span-6 col-span-12 py-3 border-t last:border-b border-[#8C8C8C] gap-4 flex items-center">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-[27px] object-contain"
                                        />
                                        <div className="" dangerouslySetInnerHTML={{__html: item.label}}></div>
                                    </div>
                                    {
                                        plans?.length > 0 && plans?.map((plan, index2) => {
                                            if(index2 < 3) {
                                                return (
                                                    <div
                                                        className="md:col-span-2 col-span-4 py-3 border border-[#8C8C8C] w-full text-center font-inter font-normal text-base text-[#12A833]"
                                                        key={index2}
                                                    >
                                                        {
                                                            plan?.services[item.name] === true ? <RiCheckFill className="mx-auto w-8 h-8 text-[#12A833]" /> : item.name === "meet_video_conferencing"  ? plan?.services[item.name] : <RiCloseFill className="mx-auto w-8 h-8 text-red-600" />
                                                        }
                                                    </div>
                                                )
                                            }
                                        })
                                    }
                                </div>
                            )
                        } else if(item.name === "meet_video_conferencing" || item.name === "meeting_lenght") {
                            return(
                                <div className="w-full grid grid-cols-12" key={index}>
                                    <div className="md:col-span-6 col-span-12 py-3 border-t last:border-b border-[#8C8C8C] pl-5 flex items-center">
                                        <div className="pl-[27px] ml-1" dangerouslySetInnerHTML={{__html: item.label}}></div>
                                    </div>
                                    {
                                        plans?.length > 0 && plans?.map((plan, index2) => {
                                            if(index2 < 3) {
                                                return (
                                                    <div
                                                        className="md:col-span-2 col-span-4 py-3 border border-[#8C8C8C] w-full text-center font-inter font-normal text-base text-[#12A833]"
                                                        key={index2}
                                                    >
                                                        {plan?.services[item.name]}
                                                    </div>
                                                )
                                            }
                                        })
                                    }
                                </div>
                            )
                        } else {
                            return(
                                <div className="w-full grid grid-cols-12" key={index}>
                                    <div className="md:col-span-6 col-span-12 py-3 border-t last:border-b border-[#8C8C8C] pl-5 flex items-center">
                                        <div className="pl-[27px] ml-1" dangerouslySetInnerHTML={{__html: item.label}}></div>
                                    </div>
                                    {
                                        plans?.length > 0 && plans?.map((plan, index2) => {
                                            if(index2 < 3) {
                                                return (
                                                    <div
                                                        className="md:col-span-2 col-span-4 py-3 border border-[#8C8C8C] w-full"
                                                        key={index2}
                                                    >
                                                        {
                                                            plan?.services[item.name] === true ? <RiCheckFill className="mx-auto w-8 h-8 text-[#12A833]" /> : <RiCloseFill className="mx-auto w-8 h-8 text-red-600" />
                                                        }
                                                    </div>
                                                )
                                            }
                                        })
                                    }
                                </div>
                            )
                        }
                    })
                }
                {
                    seeMore && (
                        seeMoreList.map((item, index) => {
                            if(item.name === 'endpoint_management') {
                                return(
                                    <div className="w-full grid grid-cols-12" key={index}>
                                        <div className="md:col-span-6 col-span-12 py-3 border-t last:border-b border-[#8C8C8C] pl-5 flex items-center">
                                            <div className="pl-[27px] ml-1" dangerouslySetInnerHTML={{__html: item.label}}></div>
                                        </div>
                                        {
                                            plans?.length > 0 && plans?.map((plan, index2) => {
                                                if(index2 < 3) {
                                                    return (
                                                        <div
                                                            className="md:col-span-2 col-span-4 py-3 border border-[#8C8C8C] w-full text-center font-inter font-normal text-base text-[#12A833]"
                                                            key={index2}
                                                        >
                                                            {plan?.services[item.name]}
                                                        </div>
                                                    )
                                                }
                                            })
                                        }
                                    </div>
                                )
                            } else {
                                return(
                                    <div className="w-full grid grid-cols-12" key={index}>
                                        <div className="md:col-span-6 col-span-12 py-3 border-t last:border-b border-[#8C8C8C] pl-5 flex items-center">
                                            <div className="pl-[27px] ml-1" dangerouslySetInnerHTML={{__html: item.label}}></div>
                                        </div>
                                        {
                                            plans?.length > 0 && plans?.map((plan, index2) => {
                                                if(index2 < 3) {
                                                    return (
                                                        <div
                                                            className="md:col-span-2 col-span-4 py-3 border border-[#8C8C8C] w-full"
                                                            key={index2}
                                                        >
                                                            {
                                                                plan?.services[item.name] === true ? <RiCheckFill className="mx-auto w-8 h-8 text-[#12A833]" /> : <RiCloseFill className="mx-auto w-8 h-8 text-red-600" />
                                                            }
                                                        </div>
                                                    )
                                                }
                                            })
                                        }
                                    </div>
                                )
                            }
                        })
                    )
                }
                <div
                    onClick={() => {setSeeMore(!seeMore)}}
                    className="w-fit bg-[#D9D9D9] bg-opacity-50 rounded-[27px] flex gap-2 px-2 py-1 mt-1"
                >{seeMore ? (
                    <>
                        <RiArrowUpSLine className="text-black w-[18px] h-[18px]" />
                        <p className="font-inter font-normal text-xs text-black">See Less</p>
                    </>
                ) : (
                    <>
                        <RiArrowDownSLine className="text-black w-[18px] h-[18px]" />
                        <p className="font-inter font-normal text-xs text-black">See More</p>
                    </>
                )}</div>
            </div>
        </section>
    );
};

export default ProductivityAndCollaboration;
