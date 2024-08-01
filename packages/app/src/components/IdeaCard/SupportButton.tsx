"use client";

import { useState } from "react";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import SupportForm from "./SupportForm";

const SupportButton = ({ ideaId }: { ideaId: BigInt }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <h2 className="font-bold ">Support idea</h2>
        <p className="text-neutral-500 text-sm">
          Show your support for this idea by minting an NFT.
        </p>
        <SupportForm ideaId={ideaId} isArchived={false} />
      </Modal>
      <Button
        type="secondary"
        title="Support"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsModalOpen(true);
        }}
      />
    </>
  );
};

export default SupportButton;
