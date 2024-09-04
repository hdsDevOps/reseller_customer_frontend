import React from "react";
import { IoClose } from "react-icons/io5";

interface TermsAndConditionsProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom md:max-w-3xl bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-lg w-full">
          <div className="bg-white px-4 md:px-6 py-6">
            <div className="flex justify-between items-center">
              <h3
                className="md:text-3xl text-2xl font-bold text-black"
                id="modal-title"
              >
                Terms of Services
              </h3>
              <div
                className="md:w-[3rem] w-[2rem] h-[2rem] md:h-[3rem] bg-greenbase rounded-full flex justify-center items-center"
                onClick={onClose}
              >
                <IoClose className="w-7 h-7" fill="white" />
              </div>
            </div>
            <div className="mt-2">
              <p className="text-greenbase my-3 md:my-4 text-base font-normal">
                Acceptance of terms
              </p>
              <p className="text-xs md:text-sm text-black font-normal">
                BY USING THE SERVICES,YOU ARE AGREEING, ON BEHALF OF YOURSELF
                AND THOSE YOU REPRESENT, TO COMPLY WITH AND BE LEGALLY BOUND BY
                THESE TERMS AS WELL AS OUR PRIVACY POLICY AND ALL APPLICABLE
                LAWS, IF YOU, FOR YOURSELF OR ON BEHALF OF THOSE YOU REPRESENT,
                DO NOT AGREE TO ANY PROVISION OF THESE TERMS, YOU MUST, FOR
                YOURSELF AND ON BEHALF OF SUCH PERSON(S), DISCONTINUE THE
                REGISTRATION PROCESS, DISCONTINUE YOUR USE OF THE SERVICES, AND,
                IF YOU ARE ALREADY REGISTERED, CANCEL YOUR ACCOUNT.
              </p>
            </div>
            <div className="mt-2">
              <p className="text-greenbase my-3 md:my-4 text-base font-normal">Registration</p>
              <p className="text-xs md:text-sm text-black font-normal mt-4">
                As a condition to using the services, you are required to open
                an account choosing “Company”, select a password and username,
                and to provide registration information including a valid email
                address,which may be used to transfer royalty payments to you
                for Licensing Visual Content. The registration information you
                provide must be accurate, complete, and current at all times.
                Failure to do so constitutes of a breach of the Terms,which may
                result in immediate termination of your access to the Services,
                by terminating your account. Any personal information that you
                provide to “Company” is governed by the “Company” Privacy
                Policy.
              </p>
              <p className="text-xs md:text-sm text-black font-normal mt-4">
                As a condition to using the services, you are required to open
                an account choosing “Company”, select a password and username,
                and to provide registration information including a valid email
                address,which may be used to transfer royalty payments to you
                for Licensing Visual Content. The registration information you
                provide must be accurate, complete, and current at all times.
                Failure to do so constitutes of a breach of the Terms,which may
                result in immediate termination of your access to the Services,
                by terminating your account. Any personal information that you
                provide to “Company” is governed by the “Company” Privacy
                Policy.
              </p>
              <p className="text-xs md:text-sm text-black font-normal mt-4">
                As a condition to using the services, you are required to open
                an account choosing “Company”, select a password and username,
                and to provide registration information including a valid email
                address,which may be used to transfer royalty payments to you
                for Licensing Visual Content. The registration information you
                provide must be accurate, complete, and current at all times.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
