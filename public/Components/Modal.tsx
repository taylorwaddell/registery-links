import React, { useCallback, useEffect, useRef } from "react";

import Link from "next/link";

interface ModalProps {
  isOpen: boolean;
  title: string;
  content: string;
  confirmText: string;
  cancelText: string;
  googleLink: string;
  appleLink: string;
  close: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  content,
  confirmText,
  cancelText,
  googleLink,
  appleLink,
  close,
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        close();
      }
    },
    [close]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (modalRef.current) {
        if (event.key === "Tab") {
          const focusableModalElements = modalRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          ) as NodeListOf<HTMLElement>;
          const firstElement = focusableModalElements[0];
          const lastElement =
            focusableModalElements[focusableModalElements.length - 1];

          if (!event.shiftKey && document.activeElement === lastElement) {
            firstElement.focus();
            event.preventDefault();
          }

          if (event.shiftKey && document.activeElement === firstElement) {
            lastElement.focus();
            event.preventDefault();
          }
        } else if (event.key === "Escape" || event.keyCode === 27) {
          // ESC key
          close();
        }
      }
    },
    [close]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    }
    // Clean up event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleClickOutside, handleKeyDown]);
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-zinc-700 dark:bg-zinc-950 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        <div
          ref={modalRef}
          aria-modal="true"
          role="dialog"
          className="bg-zinc-200 dark:bg-zinc-800 inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full mb-10"
        >
          <p onClick={close} className="sr-only" tabIndex={2}>
            Close modal.
          </p>
          <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 className="text-lg leading-6 font-medium">{title}</h3>
            <div className="mt-2">
              <p className="text-sm">{content}</p>
            </div>
          </div>
          <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <Link
              href={googleLink}
              target="_blank"
              onClick={close}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 dark:text-zinc-900 text-zinc-200 hover:text-zinc-200 bg-zinc-700 dark:bg-zinc-200 hover:bg-blue-700 sm:ml-3 sm:w-auto sm:text-sm"
            >
              {confirmText}
            </Link>
            <Link
              href={appleLink}
              target="_blank"
              onClick={close}
              className="mt-3 w-full inline-flex justify-center rounded-md border shadow-sm px-4 py-2 dark:text-zinc-900 text-zinc-200 hover:text-zinc-200 bg-zinc-700 dark:bg-zinc-200 hover:bg-zinc-800 sm:mt-0 sm:w-auto sm:text-sm"
            >
              {cancelText}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
