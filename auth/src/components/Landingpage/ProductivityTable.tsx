import React from "react";
import { Base_URL } from "../../Constant";
import { BsCheckLg } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";
import { SmallButton } from "../../utils/buttons/Button";


const ProductivityAndCollaboration = () => {
    return (
        <section>
            <div className="w-full overflow-x-auto">
                <table className="min-w-full border-collapse">
                    <tbody>
                        <tr>
                            <td className="px-4 py-4 flex gap-3 items-center w-[600px]">
                                {/* <div className="w-full"></div> */}
                            </td>
                            <td className="border-2  px-4 py-4 text-center w-[200px]">
                                <div className="flex flex-col gap-3 pt-5">
                                    <p className="text-lg font-normal">Business Starter</p>
                                    <Link to="/subscribe">
                                        <SmallButton placeholder="Start trial" className="text-white" />
                                    </Link>
                                </div>
                            </td>
                            <td className="border-2  px-4 py-4 text-center w-[200px]">
                                <div className="flex flex-col gap-3 pb-7">
                                    <p className="text-greenbase text-xs font-normal bg-[#e7f6eb] flex justify-center">MOST POPULAR</p>
                                    <div className="flex flex-col gap-3">
                                        <p className="text-lg font-normal">Business Standard</p>
                                        <SmallButton placeholder="Start trial" className="!bg-[#F0F0F3] text-greenbase" />
                                    </div>
                                </div>
                            </td>
                            <td className="border-2  px-4 py-4 text-center w-[200px]">
                                <div className="flex flex-col gap-3 pt-5">
                                    <p className="text-lg font-normal">Business Plus</p>
                                    <SmallButton placeholder="Start trial" className="!bg-[#F0F0F3] text-greenbase" />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={4}>
                                <h2 className="py-8 text-3xl font-medium">Productivity and Collaboration</h2>
                            </td>
                        </tr>
                        <tr>
                            <td className="border-2  px-4 py-4 flex gap-3 items-center w-[600px]">
                                <img
                                    src={Base_URL + "/images/gmail.png"}
                                    alt="Gmail"
                                    className="size-7"
                                />
                                <p className="font-bold text-lg">Gmail <span className="font-normal text-lg">Business email</span></p>
                            </td>
                            <td className="border-2  px-4 py-4 text-center w-[200px]">
                                <BsCheckLg fill="#12A833" className="w-8 mx-auto" />
                            </td>
                            <td className="border-2  px-4 py-4 text-center w-[200px]">
                                <BsCheckLg fill="#12A833" className="w-8 mx-auto" />
                            </td>
                            <td className="border-2  px-4 py-4 text-center w-[200px]">
                                <BsCheckLg fill="#12A833" className="w-8 mx-auto" />
                            </td>
                        </tr>
                        <tr>
                            <td className="border-2  px-4 py-4 w-[600px]">
                                <p className="font-normal text-lg">Custom email for your business</p>
                            </td>
                            <td className="border-2  px-4 py-4 text-center w-[200px]">
                                <BsCheckLg fill="#12A833" className="w-8 mx-auto" />
                            </td>
                            <td className="border-2  px-4 py-4 text-center w-[200px]">
                                <BsCheckLg fill="#12A833" className="w-8 mx-auto" />
                            </td>
                            <td className="border-2  px-4 py-4 text-center w-[200px]">
                                <BsCheckLg fill="#12A833" className="w-8 mx-auto" />
                            </td>
                        </tr>
                        <tr>
                            <td className="border-2  px-4 py-4 w-[600px]">
                                <p className="font-normal text-lg">Phishing and spam protection that blocks more than 99.9% of attacks</p>
                            </td>
                            <td className="border-2  px-4 py-4 text-center w-[200px]">
                                <BsCheckLg fill="#12A833" className="w-8 mx-auto" />
                            </td>
                            <td className="border-2  px-4 py-4 text-center w-[200px]">
                                <BsCheckLg fill="#12A833" className="w-8 mx-auto" />
                            </td>
                            <td className="border-2  px-4 py-4 text-center w-[200px]">
                                <BsCheckLg fill="#12A833" className="w-8 mx-auto" />
                            </td>
                        </tr>
                        <tr>
                            <td className="border-2  px-4 py-4 w-[600px]">
                                <p className="font-normal text-lg">Ad-free email experience</p>
                            </td>
                            <td className="border-2  px-4 py-4 text-center w-[200px]">
                                <BsCheckLg fill="#12A833" className="w-8 mx-auto" />
                            </td>
                            <td className="border-2  px-4 py-4 text-center w-[200px]">
                                <BsCheckLg fill="#12A833" className="w-8 mx-auto" />
                            </td>
                            <td className="border-2  px-4 py-4 text-center w-[200px]">
                                <BsCheckLg fill="#12A833" className="w-8 mx-auto" />
                            </td>
                        </tr>
                        <tr>
                            <td className="border-2  flex gap-3 items-center px-4 py-4 w-[600px]">
                                <img
                                    src={Base_URL + "/images/meet.png"}
                                    alt="Meet"
                                    className="size-7"
                                />
                                <p className="font-bold text-lg" >Meet <span className="font-normal text-lg">Video and voice conferencing</span></p>
                            </td>
                            <td className="border-2  px-4 py-4 text-center w-[200px] text-greenbase">
                                100 participants
                            </td>
                            <td className="border-2  px-4 py-4 text-center w-[200px] text-greenbase">
                                150 participants
                            </td>
                            <td className="border-2  px-4 py-4 text-center w-[200px] text-greenbase">
                                500 participants
                            </td>
                        </tr>
                        <tr>
                            <td className="border-2  px-4 py-4 w-[600px]">
                                <p className="font-normal text-lg">Meeting length (maximum)</p>
                            </td>
                            <td className="border-2  px-4 py-4 text-center w-[200px] text-greenbase">
                                24 Hours
                            </td>
                            <td className="border-2  px-4 py-4 text-center w-[200px] text-greenbase">
                                24 Hours
                            </td>
                            <td className="border-2  px-4 py-4 text-center w-[200px] text-greenbase">
                                24 Hours
                            </td>
                        </tr>
                        <tr>
                            <td className="border-2  px-4 py-4 w-[600px]">
                                <p className="font-normal text-lg">US or international dial-in phone numbers</p>
                            </td>
                            <td className="border-2  px-4 py-4 text-center w-[200px]">
                                <BsCheckLg fill="#12A833" className="w-8 mx-auto" />
                            </td>
                            <td className="border-2  px-4 py-4 text-center w-[200px]">
                                <BsCheckLg fill="#12A833" className="w-8 mx-auto" />
                            </td>
                            <td className="border-2  px-4 py-4 text-center w-[200px]">
                                <BsCheckLg fill="#12A833" className="w-8 mx-auto" />
                            </td>
                        </tr>
                        <tr>
                            <td className="border-2  px-4 py-4 w-[600px]">
                                <p className="font-normal text-lg">Digital whiteboarding</p>
                            </td>
                            <td className="border-2  px-4 py-4 text-center w-[200px]">
                                <BsCheckLg fill="#12A833" className="w-8 mx-auto" />
                            </td>
                            <td className="border-2  px-4 py-4 text-center w-[200px]">
                                <BsCheckLg fill="#12A833" className="w-8 mx-auto" />
                            </td>
                            <td className="border-2  px-4 py-4 text-center w-[200px]">
                                <BsCheckLg fill="#12A833" className="w-8 mx-auto" />
                            </td>
                        </tr>
                        <tr>
                            <td className="border-2  px-4 py-4 w-[600px]">
                                <p className="font-normal text-lg">Noise cancellation</p>
                            </td>
                            <td className="border-2  px-4 py-4 text-center w-[200px]">
                                <BsCheckLg fill="#12A833" className="w-8 mx-auto" />
                            </td>
                            <td className="border-2  px-4 py-4 text-center w-[200px]">
                                <BsCheckLg fill="#12A833" className="w-8 mx-auto" />
                            </td>
                            <td className="border-2  px-4 py-4 text-center w-[200px]">
                                <BsCheckLg fill="#12A833" className="w-8 mx-auto" />
                            </td>
                        </tr>
                        <tr>
                            <td className="border-2  px-4 py-4 w-[600px]">
                                <p className="font-normal text-lg">Meeting recordings saved to Google Drive</p>
                            </td>
                            <td className="border-2  px-4 py-4 text-center w-[200px]">
                                <BsCheckLg fill="#12A833" className="w-8 mx-auto" />
                            </td>
                            <td className="border-2  px-4 py-4 text-center w-[200px]">
                                <BsCheckLg fill="#12A833" className="w-8 mx-auto" />
                            </td>
                            <td className="border-2  px-4 py-4 text-center w-[200px]">
                                <BsCheckLg fill="#12A833" className="w-8 mx-auto" />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="flex gap-1 px-2 rounded-full py-2 bg-[#D9D9D980] justify-center items-center mt-6 mb-10 w-[8.75rem]">
                    <MdKeyboardArrowDown size={20} />
                    <p className="font-normal text-xs">See more features</p>


                </div>
            </div>
        </section>
    );
};

export default ProductivityAndCollaboration;
