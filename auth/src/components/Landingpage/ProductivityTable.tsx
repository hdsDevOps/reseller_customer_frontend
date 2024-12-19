import React from "react";
import { Base_URL } from "../../Constant";
import { BsCheckLg } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { SmallButton } from "../../utils/buttons/Button";
import { RiCheckFill } from "react-icons/ri";


const ProductivityAndCollaboration = () => {
    const navigate = useNavigate();
    const list = [
        {name: '', label: '<p><b>Gmail</b> Business email', image: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/gmail.png?alt=media&token=ce4bf445-8280-4c97-9743-e79168a27f11',},
        {name: '', label: '<p>Custom email for your business</p>', image: '',},
        {name: '', label: '<p>Phishing and spam protection that blocks more than 99.9% of attacks</p>', image: '',},
        {name: '', label: '<p>Ad-free email experience</p>', image: '',},
        {name: '', label: '<p><b>Meet</b> Video and voice conferencing</p>', image: 'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/google-meet.png?alt=media&token=4945f794-64ac-447b-9b60-cdb3ec04e1bb',},
        {name: '', label: '<p>Meeting length (maximum)</p>', image: '',},
        {name: '', label: '<p>US or international dial-in phone numbers</p>', image: '',},
        {name: '', label: '<p>Digital whiteboarding</p>', image: '',},
        {name: '', label: '<p>Noise cancellation</p>', image: '',},
        {name: '', label: '<p>Meeting recordings saved to Google Drive</p>', image: '',},
    ];
    const buttonList = [
        {name: '', label: 'Business Starter',},
        {name: '', label: 'Business Standard',},
        {name: '', label: 'Business Plus',},
    ];
    return (
        <section className="min-w-full my-5">
            <div className="w-full relative">
                <div className="w-full grid grid-cols-12 sticky top-0 bg-white z-10">
                    <div className="md:col-span-6 col-span-12"></div>
                    {
                        buttonList.map((item, index) => {
                            if(index === 1) {
                                return (
                                    <div className="md:col-span-2 col-span-4 flex flex-col justify-center items-center border-l border-[#8C8C8C] pb-2" key={index}>
                                        <p className="font-inter font-normal md:text-xs text-[10px] text-[#12A833] bg-[#12A8331A] w-full text-center h-10 items-center pt-[13px]">MOST POPULAR</p>
                                        <p className="font-inter font-normal sm:text-lg text-xs text-black">{item.label}</p>
                                        <button type="button" onClick={() => {navigate('/subscribe')}} className="font-inter font-semibold sm:text-base text-xs text-[#F0F0F3] bg-[#12A833] sm:px-3 px-2 sm:py-2 py-[2px] sm:rounded-[10px] rounded-[4px] max-w-[126px] mt-1">Start a trial</button>
                                    </div>
                                )
                            } else {
                                return (
                                    <div className="md:col-span-2 col-span-4 flex flex-col justify-center items-center border-l border-[#8C8C8C] last:border-r pt-10 pb-2" key={index}>
                                        <p className="font-inter font-normal sm:text-lg text-xs text-black">{item.label}</p>
                                        <button type="button" onClick={() => {navigate('/subscribe')}} className="font-inter font-semibold sm:text-base text-xs text-[#F0F0F3] bg-[#12A833] sm:px-3 px-2 sm:py-2 py-[2px] sm:rounded-[10px] rounded-[4px] max-w-[126px] mt-1">Start a trial</button>
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
                                    <div className="md:col-span-2 col-span-4 py-3 border border-[#8C8C8C] w-full"><RiCheckFill className="mx-auto w-8 h-8 text-[#12A833]" /></div>
                                    <div className="md:col-span-2 col-span-4 py-3 border border-[#8C8C8C] w-full"><RiCheckFill className="mx-auto w-8 h-8 text-[#12A833]" /></div>
                                    <div className="md:col-span-2 col-span-4 py-3 border border-[#8C8C8C] w-full"><RiCheckFill className="mx-auto w-8 h-8 text-[#12A833]" /></div>
                                </div>
                            )
                        } else {
                            return(
                                <div className="w-full grid grid-cols-12" key={index}>
                                    <div className="md:col-span-6 col-span-12 py-3 border-t last:border-b border-[#8C8C8C] pl-[53px]" dangerouslySetInnerHTML={{__html: item.label}}></div>
                                    <div className="md:col-span-2 col-span-4 py-3 border border-[#8C8C8C] w-full"><RiCheckFill className="mx-auto w-8 h-8 text-[#12A833]" /></div>
                                    <div className="md:col-span-2 col-span-4 py-3 border border-[#8C8C8C] w-full"><RiCheckFill className="mx-auto w-8 h-8 text-[#12A833]" /></div>
                                    <div className="md:col-span-2 col-span-4 py-3 border border-[#8C8C8C] w-full"><RiCheckFill className="mx-auto w-8 h-8 text-[#12A833]" /></div>
                                </div>
                            )
                        }
                    })
                }
            </div>
        </section>
    );
};

export default ProductivityAndCollaboration;
