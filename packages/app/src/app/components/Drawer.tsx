"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";

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
    <AnimatePresence>
      {open && (
        <Dialog static className="relative z-10" open={open} onClose={onClose}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30"
          />

          <div className="fixed inset-4 overflow-hidden">
            <div className="absolute inset-4 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-4 right-4 flex max-w-full pl-10">
                <motion.div
                  className="pointer-events-auto w-screen max-w-md"
                  initial={{ translateX: "100%" }}
                  animate={{ translateX: "0%" }}
                  exit={{ translateX: "100%" }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl rounded-lg">
                    <div className="px-4 sm:px-6 pb-4 sm:pb-6 border-b">
                      <div className="flex items-start justify-between">
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={onClose}
                          >
                            <span className="absolute -inset-2.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                        <h2 className="text-base font-semibold leading-6 text-gray-900">
                          {title}
                        </h2>
                      </div>
                    </div>
                    <div className="relative mt-6 flex-1">{children}</div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default Drawer;
