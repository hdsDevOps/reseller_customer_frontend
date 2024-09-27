import React from "react";
import { Access, Connect, ConnectSecond, Create } from "./Resourceslist";

const Resources = () => {
  return (
    <section className="px-16">
      <h2 className="text-greenbase font-semibold text-4xl flex justify-center mt-[4rem]">
        Resources
      </h2>
      <div className="flex basis-1/2 py-12 justify-between items-center">
        <div className="flex flex-col gap-[8.875rem]">
          <Connect />
          <Access />
        </div>
        <div className="flex flex-col gap-[8.875rem]">
          <Create />
          <ConnectSecond />
        </div>
      </div>
    </section>
  );
};
export default Resources;
