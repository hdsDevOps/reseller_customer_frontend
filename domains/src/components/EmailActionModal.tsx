import React from "react";

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  userRole?: string;
  style?: React.CSSProperties;
}

const ActionModal: React.FC<ActionModalProps> = ({ isOpen, onClose, userRole, style }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-gray-100 rounded-xl shadow-md p-2 w-80 max-w-[12rem]"
        style={style}
        onClick={(e) => e.stopPropagation()}
      >
        <ul className="space-y-2 flex-grow flex-col items-start justify-center">
          {userRole === ".Admin" ? (
            <>
              <li>
                <button
                  type="button"
                  className="w-full text-left text-sm text-black p-2 hover:bg-green-100"
                >
                  Reset user password
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="w-full text-left text-sm text-black p-2 hover:bg-green-100"
                >
                  Rename user account
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <button
                  type="button"
                  className="w-full text-left text-sm text-black p-2 hover:bg-green-100"
                >
                  Remove user account
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="w-full text-left text-sm text-black p-2 hover:bg-green-100"
                >
                  Make admin
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="w-full text-left text-sm text-black p-2 hover:bg-green-100"
                >
                  Reset user password
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="w-full text-left text-sm text-black p-2 hover:bg-green-100"
                >
                  Rename user account
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ActionModal;
