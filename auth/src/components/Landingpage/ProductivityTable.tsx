import React from "react";
import { Base_URL } from "../../Constant";
import { BsCheckLg } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";

const ProductivityAndCollaboration = () => {
  return (
    <section>
      <div>
        <h2 className="py-8 text-2xl lg:text-3xl font-medium w-full">
          Productivity and Collaboration
        </h2>
        <table className="min-w-full table-auto border-collapse border-2 border-[#8c8c8c]">
          <tbody>
            <tr>
              <td className="md:px-4 md:py-4 max-md:p-2 flex gap-3 items-center">
                <img
                  src={Base_URL + "/images/gmail.png"}
                  alt="Gmail"
                  className="size-7"
                />
                <p className="font-bold text-base md:text-lg max-md:flex flex-col">
                  Gmail{" "}
                  <span className="font-normal text-sm md:text-lg">
                    Business email
                  </span>
                </p>
              </td>
              <td className="border md:px-4 md:py-4 text-center">
                <BsCheckLg fill="#12A833" size={26} className=" mx-auto" />
              </td>
              <td className="border md:px-4 md:py-4 text-center">
                <BsCheckLg fill="#12A833" size={26} className=" mx-auto" />
              </td>
              <td className="border md:px-4 md:py-4 text-center">
                <BsCheckLg fill="#12A833" size={26} className=" mx-auto" />
              </td>
            </tr>
            <tr>
              <td className="border p-2 md:px-4 md:py-4">
                <p className="font-normal text-sm md:text-lg">
                  Custom email for your business
                </p>
              </td>
              <td className="border md:px-4 md:py-4 text-center">
                <BsCheckLg fill="#12A833" size={26} className=" mx-auto" />
              </td>
              <td className="border md:px-4 md:py-4 text-center">
                <BsCheckLg fill="#12A833" size={26} className=" mx-auto" />
              </td>
              <td className="border md:px-4 md:py-4 text-center">
                <BsCheckLg fill="#12A833" size={26} className=" mx-auto" />
              </td>
            </tr>
            <tr>
              <td className="border p-2 md:px-4 md:py-4">
                <p className="font-normal text-[0.8rem] md:text-lg">
                  Phishing and spam protection that blocks more than 99.9% of
                  attacks
                </p>
              </td>
              <td className="border md:px-4 md:py-4 text-center">
                <BsCheckLg fill="#12A833" size={26} className=" mx-auto" />
              </td>
              <td className="border md:px-4 md:py-4 text-center">
                <BsCheckLg fill="#12A833" size={26} className=" mx-auto" />
              </td>
              <td className="border md:px-4 md:py-4 text-center">
                <BsCheckLg fill="#12A833" size={26} className=" mx-auto" />
              </td>
            </tr>
            <tr>
              <td className="border p-2 md:px-4 md:py-4">
                <p className="font-normal text-sm md:text-lg">
                  Ad-free email experience
                </p>
              </td>
              <td className="border md:px-4 md:py-4 text-center">
                <BsCheckLg fill="#12A833" size={26} className=" mx-auto" />
              </td>
              <td className="border md:px-4 md:py-4 text-center">
                <BsCheckLg fill="#12A833" size={26} className=" mx-auto" />
              </td>
              <td className="border md:px-4 md:py-4 text-center">
                <BsCheckLg fill="#12A833" size={26} className=" mx-auto" />
              </td>
            </tr>
            <tr>
              <td className="flex gap-2 items-center md:px-4 md:py-4 max-md:p-1">
                <img
                  src={Base_URL + "/images/meet.png"}
                  alt="Meet"
                  className="size-7"
                />

                <p className="font-bold text-base md:text-lg max-md:flex flex-col">
                  Meet{" "}
                  <span className="font-normal text-xs md:text-lg">
                    Video and voice conferencing
                  </span>
                </p>
              </td>
              <td className="border max-md:text-xs max-md:p-1 md:px-4 md:py-4 text-center text-greenbase">
                100 participants
              </td>
              <td className="border max-md:text-xs max-md:p-1 md:px-4 md:py-4 text-center text-greenbase">
                150 participants
              </td>
              <td className="border max-md:text-xs max-md:p-1 md:px-4 md:py-4 text-center text-greenbase">
                500 participants
              </td>
            </tr>
            <tr>
              <td className="border p-2 md:px-4 md:py-4">
                <p className="font-normal text-sm md:text-lg">Meeting length (maximum)</p>
              </td>
              <td className="border md:px-4 md:py-4 text-center text-greenbase">
                24 Hours
              </td>
              <td className="border md:px-4 md:py-4 text-center text-greenbase">
                24 Hours
              </td>
              <td className="border md:px-4 md:py-4 text-center text-greenbase">
                24 Hours
              </td>
            </tr>
            <tr>
              <td className="border p-2 md:px-4 md:py-4">
                <p className="font-normal text-sm md:text-lg">
                  US or international dial-in phone numbers
                </p>
              </td>
              <td className="border md:px-4 md:py-4 text-center">
                <BsCheckLg fill="#12A833" size={26} className=" mx-auto" />
              </td>
              <td className="border md:px-4 md:py-4 text-center">
                <BsCheckLg fill="#12A833" size={26} className=" mx-auto" />
              </td>
              <td className="border md:px-4 md:py-4 text-center">
                <BsCheckLg fill="#12A833" size={26} className=" mx-auto" />
              </td>
            </tr>
            <tr>
              <td className="border p-2 md:px-4 md:py-4">
                <p className="font-normal text-sm md:text-lg">Digital whiteboarding</p>
              </td>
              <td className="border md:px-4 md:py-4 text-center">
                <BsCheckLg fill="#12A833" size={26} className=" mx-auto" />
              </td>
              <td className="border md:px-4 md:py-4 text-center">
                <BsCheckLg fill="#12A833" size={26} className=" mx-auto" />
              </td>
              <td className="border md:px-4 md:py-4 text-center">
                <BsCheckLg fill="#12A833" size={26} className=" mx-auto" />
              </td>
            </tr>
            <tr>
              <td className="border p-2 md:px-4 md:py-4">
                <p className="font-normal text-sm md:text-lg">Noise cancellation</p>
              </td>
              <td className="border md:px-4 md:py-4 text-center">
                <BsCheckLg fill="#12A833" size={26} className=" mx-auto" />
              </td>
              <td className="border md:px-4 md:py-4 text-center">
                <BsCheckLg fill="#12A833" size={26} className=" mx-auto" />
              </td>
              <td className="border md:px-4 md:py-4 text-center">
                <BsCheckLg fill="#12A833" size={26} className=" mx-auto" />
              </td>
            </tr>
            <tr>
              <td className="border p-2 md:px-4 md:py-4">
                <p className="font-normal text-sm md:text-lg">
                  Meeting recordings saved to Google Drive
                </p>
              </td>
              <td className="border md:px-4 md:py-4 text-center">
                <BsCheckLg fill="#12A833" size={26} className=" mx-auto" />
              </td>
              <td className="border md:px-4 md:py-4 text-center">
                <BsCheckLg fill="#12A833" size={26} className=" mx-auto" />
              </td>
              <td className="border md:px-4 md:py-4 text-center">
                <BsCheckLg fill="#12A833" size={26} className=" mx-auto" />
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
