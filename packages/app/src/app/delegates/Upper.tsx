"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import CreateDelegateProxyForm from "@/components/CreateDelegateProxyForm";
import UndelegateProxyForm from "@/components/UndelegateProxyForm";
import Modal from "@/components/ui/Modal";
import UserStats from "./UserStats";

const Upper = () => {
  const [isDelegateModalOpen, setIsDelegateModalOpen] = useState(false);
  const [isUnDelegateModalOpen, setIsUnDelegateModalOpen] = useState(false);
  return (
    <>
      <Modal
        isOpen={isDelegateModalOpen}
        setIsOpen={() => setIsDelegateModalOpen(false)}
      >
        <CreateDelegateProxyForm
          closeModal={() => setIsDelegateModalOpen(false)}
        />
      </Modal>
      <Modal
        isOpen={isUnDelegateModalOpen}
        setIsOpen={() => setIsUnDelegateModalOpen(false)}
      >
        <UndelegateProxyForm
          closeModal={() => setIsUnDelegateModalOpen(false)}
        />
      </Modal>
      <section className="w-[600px] mx-auto pt-12 pb-8">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-2xl polymath-disp font-bold text-neutral-800 tracking-wide">
            Delegation
          </h1>

          <div className="flex flex-row space-x-2">
            <Button
              type="secondary"
              title="Undelegate"
              onClick={() => {
                setIsUnDelegateModalOpen(true);
              }}
            />

            <Button
              type="primary"
              title="Add voting power"
              onClick={() => {
                setIsDelegateModalOpen(true);
              }}
            />
          </div>
        </div>
        <UserStats />
      </section>
    </>
  );
};

export default Upper;
