import React, { useEffect, useState } from "react";
import Accordion from "./Resources/Accordion";
import { useAppDispatch } from "store/hooks";
import { getFaqsThunk } from "store/user.thunk";
import { Base_URL } from "../../Constant";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

const FrequentlyAskedQuestions = () => {
  const dispatch = useAppDispatch();
  const [faqs, setFaqs] = useState([]);
  const [activeFaqs, setActiveFaqs] = useState([]);
  const [seeMore, setSeeMore] = useState(false);

  const getFaqsList = async() => {
    try {
      const result = await dispatch(getFaqsThunk()).unwrap();
      setFaqs(result?.data);
    } catch (error) {
      setFaqs([]);
    }
  };
  useEffect(() => {
    getFaqsList();
  }, []);

  useEffect(() => {
    if(faqs?.length > 0) {
      if(seeMore) {
        setActiveFaqs([...faqs]);
      } else {
        setActiveFaqs(faqs?.filter((_,index) => index < 4));
      }
    } else {
      setActiveFaqs([]);
    }
  }, [faqs, seeMore])
  const dottedline = (
    <svg height="4" width="100%" className="mt-4 bg-center bg-covers">
      <line
        x1="0"
        y1="0"
        x2="100%"
        y2="0"
        style={{ stroke: "#12A833", strokeWidth: 4, strokeDasharray: "8, 4" }}
      />
    </svg>
  );
  
  return (
    <section className="sm:px-16 px-4 w-full mt-10 bg-cover bg-top flex flex-col" style={{ backgroundImage: `url(${Base_URL}/images/AboutUsSpiral.png)` }}>
      <div className="mb-2">
        <h2 className="text-greenbase font-semibold text-4xl">FAQ's</h2>
        {dottedline}
      </div>
      <Accordion faqList={activeFaqs} />

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
    </section>
  );
};

export default FrequentlyAskedQuestions;
