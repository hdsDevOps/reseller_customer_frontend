import React from "react";
import { Base_URL } from "../../../Constant";

export const Connect = () => {
  return (
    <div className="flex flex-col items-start lg:block">
      <h1 className="font-medium text-3xl text-center w-full lg:inline">Connect</h1>
      <p className="text-[#868686] font-normal text-xl mt-3 mb-6 text-center lg:text-left w-full  ">
        Lorem ipsum dolor sit amet consectetur.{" "}
      </p>
      <div className="flex gap-4 items-center  justify-center  lg:justify-start">
        <img
          src={Base_URL + "/images/gmail.png"}
          alt="google mail"
          className="size-16"
        />
        <img
          src={process.env.BASE_URL + "/images/calendar.png"}
          alt="google calender"
          className="size-16"
        />
        <img
          src={process.env.BASE_URL + "/images/googlechat.png"}
          alt="google chat"
          className="size-16"
        />
        <img
          src={process.env.BASE_URL + "/images/meet.png"}
          alt="google meet"
          className="size-16"
        />
      </div>
    </div>
  );
};

export const Create = () => {
  return (
    <div className="flex flex-col items-start lg:block">
      <h1 className="font-medium text-3xl text-center w-full lg:inline">Create</h1>
      <p className="text-[#868686] font-normal text-xl mt-3 mb-6 text-center  ">
        Lorem ipsum dolor sit amet consectetur Lacus sollicitudin.{" "}
      </p>
      <div className="flex gap-4 items-center w-full justify-center lg:justify-start">
        <img
          src={Base_URL + "/images/sheet1.png"}
          alt="google sheet"
          className="size-16"
        />
        <img
          src={process.env.BASE_URL + "/images/sheet2.png"}
          alt="google sheet"
          className="size-16"
        />
        <img
          src={process.env.BASE_URL + "/images/sheet3.png"}
          alt="google sheet"
          className="size-16"
        />
        <img
          src={process.env.BASE_URL + "/images/sheet4.png"}
          alt="google sheet"
          className="size-16"
        />
        <img
          src={process.env.BASE_URL + "/images/sheet5.png"}
          alt="google sheet"
          className="size-16"
        />
      </div>
    </div>
  );
};

export const Access = () => {
  return (
    <div className="flex flex-col items-start lg:block">
      <h1 className="font-medium text-3xl text-center w-full lg:inline">Access</h1>
      <p className="text-[#868686] font-normal text-xl mt-3 mb-6 text-center  w-full">
        Lorem ipsum dolor sit amet.{" "}
      </p>
      <div className="flex gap-4 items-center w-full justify-center">
        <img
          src={Base_URL + "/images/googlecloud.png"}
          alt="google cloud"
          className="size-16"
        />
        <img
          src={process.env.BASE_URL + "/images/works.png"}
          alt="google work"
          className="size-16"
        />
      </div>
    </div>
  );
};

export const ConnectSecond = () => {
  return (
    <div className="flex flex-col items-start lg:block">
      <h1 className="font-medium text-3xl text-center w-full lg:inline">Connect</h1>
      <p className="text-[#868686] font-normal text-xl mt-3 mb-6 text-center  w-full">
        Lorem ipsum dolor sit amet consectetur.{" "}
      </p>
      <div className="flex gap-4 items-center w-full justify-center">
        <img
          src={Base_URL + "/images/googlesecurity.png"}
          alt="google secure"
          className="size-16"
        />
        <img
          src={process.env.BASE_URL + "/images/goggleconnect.png"}
          alt="google connect"
          className="size-16"
        />
        <img
          src={process.env.BASE_URL + "/images/googlepoly.png"}
          alt="google poly"
          className="size-16"
        />
      </div>
    </div>
  );
};
