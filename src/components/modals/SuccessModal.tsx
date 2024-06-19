import React from "react";
import Modals from "./Modals";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  content?: any;
  handleOkAction?: () => void;
}

const SuccessModal = (props: Props) => {
  const { isOpen, setIsOpen, content, handleOkAction } = props;

  return (
    <>
      <Modals
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        content={
          <div className="w-full p-5 mt-3">
            <div className="">
              <h1 className="text-2xl font-bold text-green-600 mb-4">
                {content}
              </h1>

              <div className="text-right">
                <button
                  className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                  onClick={() => {
                    setIsOpen(false);
                    handleOkAction && handleOkAction();
                  }}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        }
      />
    </>
  );
};

export default SuccessModal;
