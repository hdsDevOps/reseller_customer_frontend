import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
const Home: React.FC = () => {
  return (
    <section className="w-full">
      <div className="">
        <div className="px-20 py-1 w-full bg-[rgba(18,168,51,0.5)] flex gap-2 text-white ">
          <p>
          Gemini for Workspace: Google's AI-powered assistant seamlessly integrated into Gmail, Docs, Sheets, and more. Discover the future of productivity. LEARN MORE
          </p>
          <FaArrowRightLong className="w-6 h-6"/>
        </div>
        <div className="">
          <img src="auth/src/images/heroimage.png"/>
        </div>
       
      </div>
    </section>
  );
};

export default Home;
