import React from "react";
import { Access, Connect, Contact, Create } from "./Resourceslist";

const Resources = ({resouces}:any) => {
  // console.log("resources...", resouces);
  return (
    <section className="sm:px-16 px-4 w-full bg-top bg-cover" style={{ backgroundImage: `url("https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/AboutUsSpiral.png?alt=media&token=9059dd40-366f-4bb2-96fd-92914d35ee49")` }}>
      <h2 className="text-greenbase font-semibold text-4xl flex justify-center mt-[4rem]">
        Resources
      </h2>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <Connect connect={resouces?.connect} />
        <Access access={resouces?.Access} />
        <Create create={resouces?.create} />
        <Contact contact={resouces?.contact} />
      </div>
    </section>
  );
};
export default Resources;
