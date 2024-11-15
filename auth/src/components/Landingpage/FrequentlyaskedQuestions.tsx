import React from "react";
import Accordion from "./Resources/Accordion";

const FrequentlyAskedQuestions = () => {
   const dottedline = (
    <svg height="4" width="100%" className="mt-4">
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
    <section className="px-8 md:px-16 max-w-screen-2xl mx-auto mt-10">
      <div className="mb-4 md:mb-8">
        <h2 className="text-greenbase font-semibold text-2xl md:text-4xl">FAQ's</h2>
        {dottedline}
      </div>
      <Accordion/>
    </section>
  );
};

export default FrequentlyAskedQuestions;
