"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import CreateDelegateProxyForm from "@/components/CreateDelegateProxyForm";
import Modal from "@/components/ui/Modal";
import UserStats from "./UserStats";

const Upper = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Modal isOpen={isModalOpen} setIsOpen={() => setIsModalOpen(false)}>
        <CreateDelegateProxyForm closeModal={() => setIsModalOpen(false)} />
      </Modal>
      <section className="w-[600px] mx-auto pt-12 pb-8">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-2xl polymath-disp font-bold text-neutral-800 tracking-wide">
            Delegation
          </h1>

          <Button
            type="primary"
            title="Add voting power"
            onClick={() => {
              setIsModalOpen(true);
            }}
          />
        </div>
        <UserStats />
      </section>
    </>
  );
};

export default Upper;
