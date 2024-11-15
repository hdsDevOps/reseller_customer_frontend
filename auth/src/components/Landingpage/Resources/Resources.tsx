import React from "react";
import { Access, Connect, ConnectSecond, Create } from "./Resourceslist";

const Resources = () => {
  return (
    <section className="px-8 md:px-16">
      <h2 className="text-greenbase font-semibold text-4xl flex justify-center mt-[4rem]">
        Resources
      </h2>
      <div className="flex md:flex-row max-md:flex-col md:basis-1/2 md:py-12 max-md:py-7 md:justify-between max-md:justify-center items-center max-md:gap-y-4">
        <div className="flex flex-col max-md:gap-8 md:gap-[8.875rem]">
          <Connect />
          <Access />
        </div>
        <div className="flex flex-col max-md:gap-8 md:gap-[8.875rem] max-md:justify-center max-md:items-center">
          <Create />
          <ConnectSecond />
        </div>
      </div>
    </section>
  );
};
export default Resources;
