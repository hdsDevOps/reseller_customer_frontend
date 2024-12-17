import React, { useState } from "react";
import { FaTriangleExclamation } from "react-icons/fa6";
import { FaRegCopy } from "react-icons/fa";
import { GoChevronDown } from "react-icons/go";
import VoucherModal from './VoucherModal';
import "./Voucher.css";
// import '../styles/CustomStyle.css';

const VoucherCard: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState([false, false, false]);
  const [isModalOpen, setModalOpen] = useState(false);


  const handleMouseEnter = (index: number) => {
    const newTooltips = [...showTooltip];
    newTooltips[index] = true;
    setShowTooltip(newTooltips);
  };

  const handleMouseLeave = (index: number) => {
    const newTooltips = [...showTooltip];
    newTooltips[index] = false;
    setShowTooltip(newTooltips);
  };
  const handleOpenModal = () => {
    console.log("Opening modal");
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-1 mb-6">
       <div className="flex items-center justify-between">
       <h1 className="text-green-500 text-3xl font-medium">Vouchers</h1>
        <button className="text-green-500 claim-btn border border-green-500 px-4 py-2 rounded-md flex items-center gap-2 "  onClick={handleOpenModal} >How to claim <GoChevronDown className="text-green-500 text-md"/></button>
       </div>
        <p className="text-gray-900 text-sm">
          Use your vouchers to build your brand and drive visitors to your site
        </p>
      </div>
      <div className="grid   sm:grid-cols-1  md:grid-cols-2 gap-5 w-full">
      {/* <div className="grid flex flex-col sm:flex-col  md:flex-row gap-5 w-full"> */}
        {/* First Card */}
        <div className="flex justify-center card-anime">
          <div className="side-card h-full">
            <h4 className="side-text uppercase font-semibold text-md rotate-90">
              Discount Voucher
            </h4>
            <div className="flex items-center gap-2">
              <h1 className="border-text">20%</h1>
              <small className="save-text">SAVE</small>
            </div>
            {/* Side elements */}
            {[...Array(12)].map((_, i) => (
              <div className={`side-left${i}`} key={i}></div>
            ))}
          </div>
          <div className="voucher-card">
            <div className="flex flex-col gap-10">
              <div className="flex flex-col">
                <h4 className="text-xl">VOUCHER CODE:</h4>
                <h3 className="voucher-title relative font-bold border border-white py-2 px-4 rounded">
                  HORD20
                  <FaRegCopy className="absolute right-2 top-2 cursor-pointer text-white text-sm" />
                </h3>
                <p className="text-md my-1 uppercase text-white">
                  Valid Till: <span className="text-md font-bold">29TH MARCH, 2025</span>
                </p>
              </div>

              <div className="flex items-center justify-between flex-grow w-full gap-10">
                <small
                  className="flex items-center gap-1 cursor-pointer relative"
                  onMouseEnter={() => handleMouseEnter(0)}
                  onMouseLeave={() => handleMouseLeave(0)}
                >
                  Terms and condition
                  <FaTriangleExclamation className="text-white" />
                  {showTooltip[0] && (
                    <div className="tooltip">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente delectus laborum!
                    </div>
                  )}
                </small>
                <small className="cursor-pointer">www.Hordanso.com</small>
              </div>
            </div>
            {/* Circular elements */}
            {[...Array(12)].map((_, i) => (
              <div className={`circular-left${i}`} key={i}></div>
            ))}
            {[...Array(12)].map((_, i) => (
              <div className={`circular-right${i}`} key={i}></div>
            ))}
          </div>
        </div>

        {/* Second Card */}
        <div className="flex justify-center card-anime">
          <div className="side-card card-lemon-border h-full">
            <h4 className="side-text-lemon uppercase font-semibold text-md rotate-90">
              Discount Voucher
            </h4>
            <div className="flex items-center gap-2">
              <h1 className="border-text-lemon">20%</h1>
              <small className="save-text-lemon">SAVE</small>
            </div>
            {/* Lemon side elements */}
            {[...Array(12)].map((_, i) => (
              <div className={`lemon-left${i}`} key={i}></div>
            ))}
          </div>
          <div className="card-lemon">
            <div className="flex flex-col gap-10">
              <div className="flex flex-col">
                <h4 className="text-xl">VOUCHER CODE:</h4>
                <h3 className="voucher-title relative font-bold border border-white py-2 px-4 rounded">
                  HORD20
                  <FaRegCopy className="absolute right-2 top-2 cursor-pointer text-white text-sm" />
                </h3>
                <p className="text-md my-1 uppercase text-white">
                  Valid Till: <span className="text-md font-bold">29TH MARCH, 2025</span>
                </p>
              </div>

              <div className="flex items-center justify-between flex-grow w-full gap-10">
                <small
                  className="flex items-center gap-1 cursor-pointer relative"
                  onMouseEnter={() => handleMouseEnter(1)}
                  onMouseLeave={() => handleMouseLeave(1)}
                >
                  Terms and condition
                  <FaTriangleExclamation className="text-white" />
                  {showTooltip[1] && (
                    <div className="tooltip">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente delectus laborum!
                    </div>
                  )}
                </small>
                <small className="cursor-pointer">www.Hordanso.com</small>
              </div>
            </div>
            {/* Circular elements */}
            {[...Array(12)].map((_, i) => (
              <div className={`circular-left${i}`} key={i}></div>
            ))}
            {[...Array(12)].map((_, i) => (
              <div className={`circular-right${i}`} key={i}></div>
            ))}
          </div>
        </div>
        {/* Third Card */}
        <div className="flex justify-center card-anime">
          <div className="side-card card-orange-border h-full">
            <h4 className="side-text-orange uppercase font-semibold text-md rotate-90">
              Discount Voucher
            </h4>
            <div className="flex items-center gap-2">
              <h1 className="border-text-orange">20%</h1>
              <small className="save-text-orange">SAVE</small>
            </div>
            {/* orange side elements */}
            {[...Array(12)].map((_, i) => (
              <div className={`orange-left${i}`} key={i}></div>
            ))}
          </div>
          <div className="card-orange">
            <div className="flex flex-col gap-10">
              <div className="flex flex-col">
                <h4 className="text-xl">VOUCHER CODE:</h4>
                <h3 className="voucher-title relative font-bold border border-white py-2 px-4 rounded">
                  HORD20
                  <FaRegCopy className="absolute right-2 top-2 cursor-pointer text-white text-sm" />
                </h3>
                <p className="text-md my-1 uppercase text-white">
                  Valid Till: <span className="text-md font-bold">29TH MARCH, 2025</span>
                </p>
              </div>

              <div className="flex items-center justify-between flex-grow w-full gap-10">
                <small
                  className="flex items-center gap-1 cursor-pointer relative"
                  onMouseEnter={() => handleMouseEnter(2)}
                  onMouseLeave={() => handleMouseLeave(2)}
                >
                  Terms and condition
                  <FaTriangleExclamation className="text-white" />
                  {showTooltip[2] && (
                    <div className="tooltip">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente delectus laborum!
                    </div>
                  )}
                </small>
                <small className="cursor-pointer">www.Hordanso.com</small>
              </div>
            </div>
            {/* Circular elements */}
            {[...Array(12)].map((_, i) => (
              <div className={`circular-left${i}`} key={i}></div>
            ))}
            {[...Array(12)].map((_, i) => (
              <div className={`circular-right${i}`} key={i}></div>
            ))}
          </div>
        </div>

        {/* Fourth Card */}
        <div className="flex justify-center card-anime">
          <div className="side-card card-pink-border h-full">
            <h4 className="side-text-pink uppercase font-semibold text-md rotate-90">
              Discount Voucher
            </h4>
            <div className="flex items-center gap-2">
              <h1 className="border-text-pink">20%</h1>
              <small className="save-text-pink">SAVE</small>
            </div>
            {/* pink side elements */}
            {[...Array(12)].map((_, i) => (
              <div className={`pink-left${i}`} key={i}></div>
            ))}
          </div>
          <div className="card-pink">
            <div className="flex flex-col gap-10">
              <div className="flex flex-col">
                <h4 className="text-xl">VOUCHER CODE:</h4>
                <h3 className="voucher-title relative font-bold border border-white py-2 px-4 rounded">
                  HORD20
                  <FaRegCopy className="absolute right-2 top-2 cursor-pointer text-white text-sm" />
                </h3>
                <p className="text-md my-1 uppercase text-white">
                  Valid Till: <span className="text-md font-bold">29TH MARCH, 2025</span>
                </p>
              </div>

              <div className="flex items-center justify-between flex-grow w-full gap-10">
                <small
                  className="flex items-center gap-1 cursor-pointer relative"
                  onMouseEnter={() => handleMouseEnter(3)}
                  onMouseLeave={() => handleMouseLeave(3)}
                >
                  Terms and condition
                  <FaTriangleExclamation className="text-white" />
                  {showTooltip[3] && (
                    <div className="tooltip">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente delectus laborum!
                    </div>
                  )}
                </small>
                <small className="cursor-pointer">www.Hordanso.com</small>
              </div>
            </div>
            {/* Circular elements */}
            {[...Array(12)].map((_, i) => (
              <div className={`circular-left${i}`} key={i}></div>
            ))}
            {[...Array(12)].map((_, i) => (
              <div className={`circular-right${i}`} key={i}></div>
            ))}
          </div>
        </div>

        {/* Fifth Card */}
        <div className="flex justify-center card-anime">
          <div className="side-card card-gray-border h-full">
            <h4 className="side-text-gray uppercase font-semibold text-md rotate-90">
              Discount Voucher
            </h4>
            <div className="flex items-center gap-2">
              <h1 className="border-text-gray">20%</h1>
              <small className="save-text-gray">SAVE</small>
            </div>
            {/* gray side elements */}
            {[...Array(12)].map((_, i) => (
              <div className={`gray-left${i}`} key={i}></div>
            ))}
          </div>
          <div className="card-gray relative overflow-hidden">
            <div className="uppercase py-2 px-6 slant">
              Applied
            </div>
            <div className="flex flex-col gap-10">
              <div className="flex flex-col">
                <h4 className="text-xl">VOUCHER CODE:</h4>
                <h3 className="voucher-title relative font-bold border border-white py-2 px-4 rounded">
                  HORD20
                  <FaRegCopy className="absolute right-2 top-2 cursor-pointer text-white text-sm" />
                </h3>
                <p className="text-md my-1 uppercase text-white">
                  Valid Till: <span className="text-md font-bold">29TH MARCH, 2025</span>
                </p>
              </div>

              <div className="flex items-center justify-between flex-grow w-full gap-10">
                <small
                  className="flex items-center gap-1 cursor-pointer relative"
                  onMouseEnter={() => handleMouseEnter(4)}
                  onMouseLeave={() => handleMouseLeave(4)}
                >
                  Terms and condition
                  <FaTriangleExclamation className="text-white" />
                  {showTooltip[4] && (
                    <div className="tooltip">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente delectus laborum!
                    </div>
                  )}
                </small>
                <small className="cursor-pointer">www.Hordanso.com</small>
              </div>
            </div>
            {/* Circular elements */}
            {[...Array(12)].map((_, i) => (
              <div className={`circular-left${i}`} key={i}></div>
            ))}
            {[...Array(12)].map((_, i) => (
              <div className={`circular-right${i}`} key={i}></div>
            ))}
          </div>
        </div>
        {/* Sixth Card */}
        <div className="flex justify-center card-anime">
          <div className="side-card card-gray-border h-full">
            <h4 className="side-text-gray uppercase font-semibold text-md rotate-90">
              Discount Voucher
            </h4>
            <div className="flex items-center gap-2">
              <h1 className="border-text-gray">20%</h1>
              <small className="save-text-gray">SAVE</small>
            </div>
            {/* gray side elements */}
            {[...Array(12)].map((_, i) => (
              <div className={`gray-left${i}`} key={i}></div>
            ))}
          </div>
          <div className="card-gray relative overflow-hidden">
            <div className="uppercase py-2 px-6 slant1">
              Expired
            </div>
            <div className="flex flex-col gap-10">
              <div className="flex flex-col">
                <h4 className="text-xl">VOUCHER CODE:</h4>
                <h3 className="voucher-title relative font-bold border border-white py-2 px-4 rounded">
                  HORD20
                  <FaRegCopy className="absolute right-2 top-2 cursor-pointer text-white text-sm" />
                </h3>
                <p className="text-md my-1 uppercase text-white">
                  Valid Till: <span className="text-md font-bold">29TH MARCH, 2025</span>
                </p>
              </div>

              <div className="flex items-center justify-between flex-grow w-full gap-10">
                <small
                  className="flex items-center gap-1 cursor-pointer relative"
                  onMouseEnter={() => handleMouseEnter(5)}
                  onMouseLeave={() => handleMouseLeave(5)}
                >
                  Terms and condition
                  <FaTriangleExclamation className="text-white" />
                  {showTooltip[5] && (
                    <div className="tooltip">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente delectus laborum!
                    </div>
                  )}
                </small>
                <small className="cursor-pointer">www.Hordanso.com</small>
              </div>
            </div>
            {/* Circular elements */}
            {[...Array(12)].map((_, i) => (
              <div className={`circular-left${i}`} key={i}></div>
            ))}
            {[...Array(12)].map((_, i) => (
              <div className={`circular-right${i}`} key={i}></div>
            ))}
          </div>
        </div>
        
      </div>
      <VoucherModal isModalOpen={isModalOpen} closeModal={handleCloseModal} />
    </div>
  );
};

export default VoucherCard;
