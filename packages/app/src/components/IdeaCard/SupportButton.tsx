"use client";

import { useState, useEffect } from "react";
import Button from "../ui/Button";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { configAddresses } from "@/lib/constants";
import { IdeaTokenHubABI } from "@/abi/IdeaTokenHub";
import { parseEther } from "viem";
import Modal from "../ui/Modal";
import Image from "next/image";
import revalidate from "@/actions/revalidatePath";

const SupportButton = ({ ideaId }: { ideaId: BigInt }) => {
  const [amount, setAmount] = useState<number>(0);
  const [reason, setReason] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: hash, writeContract, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const supportIdea = async (amount: number) => {
    writeContract({
      chainId: 84532,
      address: configAddresses.IdeaTokenHub as `0x${string}`,
      abi: IdeaTokenHubABI,
      value: parseEther(String(amount)),
      functionName: "sponsorIdeaWithReason",
      args: [BigInt(ideaId.toString()), reason],
    });
  };

  useEffect(() => {
    if (isConfirmed) {
      revalidate(`/idea/${ideaId}`);
      setIsModalOpen(false);
    }
  }, [isConfirmed, ideaId]);

  return (
    <>
      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <h2 className="font-bold ">Support idea</h2>
        <p className="text-neutral-500 text-sm">
          Supporting the idea blah blah this is a description...
        </p>
        <section className="mt-4 flex items-center justify-center">
          <Image
            src="/badge.svg"
            alt="temporary nft image"
            width={200}
            height={200}
          />
        </section>
        <div className="col-span-full my-4">
          <label
            htmlFor="type"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Support amount (ETH)
          </label>
          <div className="mt-1">
            <input
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              id="amount"
              name="amount"
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-neutral-600 sm:text-sm sm:leading-6"
              placeholder=".001"
              type="number"
              min={0.001}
              step={0.001}
            />
          </div>
        </div>
        <div className="col-span-full my-4">
          <label
            htmlFor="type"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Reason
          </label>
          <div className="mt-1">
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              id="reason"
              name="reason"
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-neutral-600 sm:text-sm sm:leading-6"
              placeholder="I support this idea because..."
              rows={3}
            />
          </div>
        </div>
        <Button
          type="primary"
          title={isConfirming ? "Confirming..." : "Support"}
          fullWidth={true}
          onClick={() => {
            supportIdea(amount);
          }}
        />
        {isPending && (
          <p className="text-sm text-neutral-500 mt-1 text-center">
            Transaction pending...
          </p>
        )}
        {isConfirmed && (
          <p className="text-sm text-neutral-500 mt-1 text-center">
            Transaction confirmed
          </p>
        )}
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
