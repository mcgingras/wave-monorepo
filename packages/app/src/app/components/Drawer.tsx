"use client";

import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { IdeaToken } from "@/models/IdeaToken/types";
import Button from "@/components/ui/Button";
import { ArrowUpIcon } from "@heroicons/react/24/solid";
import { ArrowDownIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import SupportButton from "@/components/IdeaCard/SupportButton";

function hasParentWithId(element: HTMLElement | null, idName: string) {
  while (element) {
    if (element.id === idName) {
      return true;
    }
    element = element.parentElement;
  }
  return false;
}

export function useClickAway(cb: any) {
  const ref = useRef(null);
  const refCb = useRef(cb);

  useLayoutEffect(() => {
    refCb.current = cb;
  });

  useEffect(() => {
    const handler = (e: any) => {
      const element = ref.current as any;

      if (
        element &&
        !element.contains(e.target) &&
        !hasParentWithId(e.target, "avoid-clickaway")
      ) {
        refCb.current(e);
      }
    };

    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, []);

  return ref;
}

const Drawer = ({
  ideaToken,
  active,
  children,
}: {
  ideaToken: IdeaToken;
  active: boolean;
  children: React.ReactElement;
}) => {
  const [open, setOpen] = useState(true);

  const router = useRouter();

  const onClose = () => {
    setOpen(false);
    setTimeout(() => {
      router.back();
    }, 300);
  };

  const ref = useClickAway(() => {
    onClose();
  });

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
                  ref={ref}
                >
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-4 shadow-xl rounded-lg">
                    <div className="px-4 pb-4 border-b">
                      <div className="flex items-start justify-between">
                        <div className="flex flex-row space-x-2 items-center">
                          <div className="flex h-7 items-center">
                            <button
                              type="button"
                              className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              onClick={onClose}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                          <Button
                            type="primary"
                            onClick={() => {
                              window.location.href = `/idea/${ideaToken.id}`;
                            }}
                            title="Idea page"
                          />

                          {!ideaToken.isArchived && active && (
                            <SupportButton ideaId={ideaToken.id} />
                          )}
                        </div>
                        <div className="flex flex-row space-x-1">
                          <Link
                            href={`/idea/${Number(ideaToken.id) - 1}`}
                            className="rounded-l-lg bg-neutral-100 hover:bg-neutral-200 cursor-pointer transition-colors p-2"
                          >
                            <ArrowUpIcon className="text-neutral-500 h-5 w-5" />
                          </Link>
                          <Link
                            href={`/idea/${Number(ideaToken.id) + 1}`}
                            className="rounded-r-lg bg-neutral-100 hover:bg-neutral-200 cursor-pointer transition-colors p-2"
                          >
                            <ArrowDownIcon className="text-neutral-500 h-5 w-5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="relative mt-4 flex-1">{children}</div>
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
