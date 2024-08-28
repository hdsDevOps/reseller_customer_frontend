import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import Input from "../utils/inputs/input";
import { RiEyeCloseLine } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { PhoneNumberInput } from "../utils/inputs/phonenumber";
import { useNavigate } from "react-router-dom";
import TermsAndConditions from "./Terms";
import CheckBox from "../utils/inputs/checkbox";
import { Link } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [business, setBusiness] = useState("");
  const [street, setStreet] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!termsAccepted) {
      setError("You must accept the terms and conditions");
      return;
    }
    navigate("/verifyemail");
  };

  return (
    <section className="w-full mx-auto px-8 pt-3 pb-8">
      <Link to="/login">
      <div className="flex gap-1 items-center cursor-pointer">
        <IoIosArrowBack className="w-4 h-4" />
        <p className="text-greenbase">Back to previous page</p>
      </div>
      </Link>

      <div className="">
        <h1 className="font-bold md:text-4xl text-2xl text-greenbase flex justify-center pt-3">
          Welcome to Hordanso LLC
        </h1>
        <p className="font-normal text-base flex justify-center md:pt-4 pt-2">
          To create an account, we need some information for your HORDANSO account.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="flex xl:flex-row flex-col gap-10 justify-center md:pt-12 pt-8 pb-4">
            <div className="flex flex-col gap-4">
              <Input
                placeholder="First name"
                type="text"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
              />
              <Input
                placeholder="Business name"
                type="text"
                value={business}
                onChange={(e) => setBusiness(e.target.value)}
              />
              <Input
                placeholder="State"
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
              <Input
                placeholder="City*"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <Input
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="Password"
                icon={RiEyeCloseLine}
                iconColor="black"
                iconSize="20"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Input
                placeholder="Last name"
                type="text"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
              />
              <Input
                placeholder="Street number"
                type="text"
                icon={IoIosArrowDown}
                iconColor="#8A8A8A"
                iconSize="20"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
              <Input
                placeholder="Region"
                type="text"
                icon={IoIosArrowDown}
                iconColor="#8A8A8A"
                iconSize="20"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              />
              <Input
                placeholder="Zip code"
                type="text"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
              />
              <PhoneNumberInput
                placeholder="Business phone number"
                className="w-full"
              />
              <Input
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {error && <p className="text-red-500">{error}</p>}
            </div>
          </div>
          <div className="text-sm flex gap-2 md:pl-28">
            <CheckBox
              checked={termsAccepted}
              onChange={() => setTermsAccepted(!termsAccepted)}
            />
            <button
              onClick={() => setShowModal(true)}
              className="font-medium text-green-500 hover:text-green-800"
              data-testid="terms-conditions"
              type="button"
            >
              Terms and conditions
            </button>
          </div>
          {showModal && (
            <TermsAndConditions
              isOpen={showModal}
              onClose={() => setShowModal(false)}
            />
          )}
          <div className="mt-4 flex justify-center">
            <button
              type="submit"
              className="group relative w-full md:max-w-40 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:!bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 cursor-pointer"
              data-testid="log-in"
              disabled={!termsAccepted || password !== confirmPassword}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RegisterPage;
