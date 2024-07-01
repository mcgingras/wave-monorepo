"use client";

import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

import { XMarkIcon } from "@heroicons/react/24/outline";

const Drawer = ({
  children,
  title,
}: {
  children: React.ReactElement;
  title: string;
}) => {
  const [open, setOpen] = useState(true);

  const router = useRouter();

  const onClose = () => {
    setOpen(false);
    setTimeout(() => {
      router.back();
    }, 300);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <Dialog
            static
            className="relative z-10"
            open={open}
            onClose={onClose}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30"
            />

            <div className="fixed inset-4 overflow-hidden">
              <div className="absolute inset-4 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-4 right-4 flex max-w-full pl-10">
                  <Transition show={open} appear={true}>
                    <DialogPanel
                      className="pointer-events-auto w-screen max-w-md"
                      as={motion.div}
                      initial={{ translateX: "100%" }}
                      animate={{ translateX: "0%" }}
                      exit={{ translateX: "100%" }}
                    >
                      <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl rounded-lg">
                        <div className="px-4 sm:px-6">
                          <div className="flex items-start justify-between">
                            <div className="ml-3 flex h-7 items-center">
                              <button
                                type="button"
                                className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                onClick={onClose}
                              >
                                <span className="absolute -inset-2.5" />
                                <span className="sr-only">Close panel</span>
                                <XMarkIcon
                                  className="h-6 w-6"
                                  aria-hidden="true"
                                />
                              </button>
                            </div>
                            <DialogTitle className="text-base font-semibold leading-6 text-gray-900">
                              {title}
                            </DialogTitle>
                          </div>
                        </div>
                        <div className="relative mt-6 flex-1 px-4 sm:px-6">
                          {children}
                        </div>
                      </div>
                    </DialogPanel>
                  </Transition>
                </div>
              </div>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
};

export default Drawer;
