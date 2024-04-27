"use client";

import { useState } from "react";
import Button from "../ui/Button";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { configAddresses } from "@/lib/constants";
import { IdeaTokenHubABI } from "@/abi/IdeaTokenHub";
import { parseEther } from "viem";
import Modal from "../ui/Modal";

const SupportButton = ({ ideaId }: { ideaId: BigInt }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: hash, writeContract, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const supportIdea = async () => {
    writeContract({
      chainId: 84532,
      address: configAddresses.IdeaTokenHub as `0x${string}`,
      abi: IdeaTokenHubABI,
      value: parseEther(".001"),
      functionName: "sponsorIdea",
      args: [BigInt(ideaId.toString())],
    });
  };
  return (
    <>
      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <h2>Support idea</h2>
        <Button
          type="primary"
          title="Mint"
          fullWidth={true}
          onClick={() => {
            supportIdea();
          }}
        />
      </Modal>
      <Button
        type="secondary"
        title="Support"
        onClick={() => {
          setIsModalOpen(true);
        }}
      />
    </>
  );
};

export default SupportButton;
