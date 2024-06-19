import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import React from "react";
import { Close } from "../../assets";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string | null;
  content: JSX.Element | any;
  className?: string;
  width?: number;
  height?: number;
  isCloseButton?: boolean;
}

const Modals = (props: Props) => {
  const {
    isOpen,
    setIsOpen,
    title,
    content,
    className,
    width = 400,
    height,
    isCloseButton,
  } = props;

  function close() {
    setIsOpen(false);
  }

  return (
    <Transition show={isOpen}>
      <Dialog
        as="div"
        className={`relative z-10 focus:outline-none ${className}`}
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto modal-window">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 transform-[scale(95%)]"
              enterTo="opacity-100 transform-[scale(100%)]"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 transform-[scale(100%)]"
              leaveTo="opacity-0 transform-[scale(95%)]"
            >
              <DialogPanel
                className="w-full rounded-xl bg-white backdrop-blur-2xl login_modal"
                style={{ width: `${width}px`, height: `${height}px` }}
              >
                {isCloseButton && (
                  <div className=" flex flex-row justify-end p-2">
                    <button onClick={() => setIsOpen(false)}>
                      <Close />
                    </button>
                  </div>
                )}
                {title && (
                  <DialogTitle
                    as="h3"
                    className="w-full flex flex-row items-center text-center justify-center login_title py-[30px]"
                  >
                    {title}
                  </DialogTitle>
                )}

                {content}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modals;
