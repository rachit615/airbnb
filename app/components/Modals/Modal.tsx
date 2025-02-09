"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  body: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  secondaryActionLabel?: string;
  secondaryAction?: () => void;
  disabled: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  secondaryAction,
  secondaryActionLabel,
  disabled,
}) => {
  const [showModal, setShowModal] = useState(isOpen);
  const tableHeaderRef = useRef();

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  // all methods of common component (modal) will be starting with ... handle[method] like handleClose, handleSubmit, handleSecon daryAction
  const handleClose = useCallback(() => {
    if (disabled) return;
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [onSubmit, disabled]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) return;
    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!showModal) return null;

  return (
    <>
      <div
        className="justify-center 
          items-center 
          flex 
          overflow-x-hidden 
          fixed 
          inset-0 
          z-50 
          outline-none 
          focus:outline-none
          bg-neutral-800/70
          "
      >
        <div
          className="relative 
          w-full
          md:w-4/6
          lg:w-3/6
          xl:w-2/5
          my-6
          mx-auto 
           "
        >
          {/* content */}
          <div
            className={`translate duration-300 
            ${showModal ? `translate-y-0` : `translate-y-full`}
            ${showModal ? `opacity-100` : `opacity-0`}
          `}
          >
            <div
              className="translate
              border-0 
              rounded-lg 
              shadow-lg 
              relative 
              flex 
              flex-col 
              w-full 
              bg-white
              outline-none 
              overflow-y-auto
              h-[520px]
              focus:outline-none"
            >
              {/* header */}
              <div className="flex items-center justify-center p-6 relative border-b-[1px] rounded-t">
                <button
                  onClick={handleClose}
                  className=" absolute transition left-6 p-1 hover:opacity-70"
                >
                  <IoMdClose size={18} />
                </button>
                <div className="text-md font-semibold">{title}</div>
              </div>

              <div className="overflow-y-auto">
                {/* body */}
                <div className="flex-auto p-6 relative">{body}</div>

                {/* footer */}
                <div className="flex flex-col gap-2 p-6">
                  <div className="flex flex-row items-center gap-4  w-full">
                    {secondaryAction && secondaryActionLabel && (
                      <Button
                        disabled={disabled}
                        label={secondaryActionLabel}
                        onClick={handleSecondaryAction}
                        outline
                      />
                    )}
                    <Button
                      disabled={disabled}
                      label={actionLabel}
                      onClick={handleSubmit}
                    />
                  </div>
                  {footer}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
