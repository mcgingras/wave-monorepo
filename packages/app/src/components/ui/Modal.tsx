import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

type ModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
};

export default function Modal({ isOpen, setIsOpen, children }: ModalProps) {
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Dialog
      open={isOpen}
      onClose={closeModal}
      className="relative z-10"
      id="avoid-clickaway"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-neutral-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-md sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
