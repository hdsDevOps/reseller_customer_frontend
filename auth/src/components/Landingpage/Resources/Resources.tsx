import React from "react";
import { Access, Connect, ConnectSecond, Create } from "./Resourceslist";

const Resources = () => {
  return (
    <section className="sm:px-16 px-4 w-full">
      <h2 className="text-greenbase font-semibold text-4xl flex justify-center mt-[4rem]">
        Resources
      </h2>
      <div className="grid grid-cols-2">
        <Connect />
        <Access />
        <Create />
        <ConnectSecond />
      </div>
    </section>
  );
};
export default Resources;
