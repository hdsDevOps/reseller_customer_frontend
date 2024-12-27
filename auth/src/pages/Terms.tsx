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
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-xl w-full p-2">
        <div className="flex justify-between items-center pb-3">
          <h1 className="h1-text">Terms of Services</h1>
          <button onClick={onClose} className="text-black">
            <img
              src={'https://firebasestorage.googleapis.com/v0/b/dev-hds-gworkspace.firebasestorage.app/o/close.png?alt=media&token=3fac7102-9ead-4bfa-a6f0-2c84d72260c6'}
              alt="close"
              className="w-[40px] h-[40px]"
            />
          </button>
        </div>
        <p
          className="h-[500px] overflow-scroll overflow-x-hidden font-inter text-[14px] pr-1"
        >
        &nbsp;1. Introduction
        These Terms and Conditions ("Terms") govern your use of the design services provided by [Your Company Name] ("Company," "we," "us," or "our"). By using our design services, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you must not use our design services.

        <br /><br />

        &nbsp;2. Intellectual Property Rights

        <br />

        2.1. Ownership: All design work, including but not limited to graphics, logos, illustrations, and layouts created by [Your Company Name] remains the intellectual property of [Your Company Name] until full payment is received.

        <br /><br />

        2.2. Usage Rights: Upon full payment, you are granted a non-exclusive, non-transferable license to use the design work for the intended purpose as agreed upon. This license does not grant you ownership of the design work, only the right to use it.

        <br /><br />

        2.3. Third-Party Elements: Any third-party elements, such as stock images or fonts, included in the design work may have separate licenses. It is your responsibility to comply with the terms of these licenses.

        <br /><br />

        &nbsp;3. Payment and Fees

        <br />

        3.1. Payment Terms: Payment terms will be outlined in the invoice provided. Full payment is required upon completion of the design work unless otherwise agreed upon in writing.

        <br /><br />

        3.2. Late Payments: Late payments may incur additional fees as specified in the invoice or agreed upon separately.

        <br /><br />

        &nbsp;4. Revisions and Modifications

        <br />

        4.1. Revisions: We offer a reasonable number of revisions to the design work as part of our service. The scope of revisions will be defined in the project agreement.

        <br /><br />

        4.2. Additional Revisions: Any additional revisions beyond the agreed-upon scope may incur extra charges.

        <br /><br />

        &nbsp;5. Use of Designs

        <br /><br />

        5.1. Permitted Use: The design work may be used for the specific purpose for which it was created and as described in the project agreement.

        <br /><br />

        5.2. Prohibited Use: You may not resell, redistribute, or use the design work for any other purpose without prior written consent from [Your Company Name].

        <br /><br />
        
        &nbsp;6. Confidentiality

        <br />

        6.1. Confidential Information: Any confidential information shared during the course of the project will be kept confidential and will not be disclosed to any third parties without your consent.

        <br /><br />
        
        &nbsp;7. Liability

        <br />

        7.1. No Warranty: The design work is provided "as is" without any warranty of any kind, either express or implied, including but not limited to the implied warranties of merchantability and fitness for a particular purpose.
        
        <br /><br />

        7.2. Limitation of Liability: In no event shall [Your Company Name] be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with the use or inability to use the design work.

        <br /><br />
        
        &nbsp;8. Termination
        
        <br />

        8.1. Termination by Client: You may terminate the project at any time by providing written notice. In such cases, you will be billed for any completed work and any expenses incurred up to the date of termination.

        <br /><br />
        
        8.2. Termination by Company: We reserve the right to terminate the project if you breach any of these Terms. In such cases, no refund will be provided.

        <br /><br />
        
        &nbsp;9. Governing Law

        <br />

        These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction].

        <br /><br />
        
        &nbsp;10. Changes to Terms

        <br />

        We reserve the right to update these Terms from time to time. Any changes will be posted on our website, and it is your responsibility to review these Terms periodically.

        <br /><br />
        
        &nbsp;11. Contact Information

        <br />

        If you have any questions about these Terms, please contact us at [Your Contact Information].
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
