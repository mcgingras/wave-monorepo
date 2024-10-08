"use client";

import { useState, useEffect } from "react";
import Button from "../ui/Button";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { configAddresses, MIN_SPONSOR_AMOUNT } from "@/lib/constants";
import { IdeaTokenHubABI } from "@/abi/IdeaTokenHub";
import { parseEther, formatEther } from "viem";
import revalidate from "@/actions/revalidatePath";
import IdeaNFT from "@/components/ClientIdeaNFT";

const SupportForm = ({
  ideaId,
  isArchived,
}: {
  ideaId: BigInt;
  isArchived: boolean;
}) => {
  const [amount, setAmount] = useState<number>(0);
  const [reason, setReason] = useState<string>("");
  const { data: hash, writeContract, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const supportIdea = async (amount: number) => {
    writeContract({
      chainId: process.env.NEXT_PUBLIC_ENV === "dev" ? 84532 : 1,
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
    }
  }, [isConfirmed, ideaId]);

  const formatedMin = formatEther(BigInt(MIN_SPONSOR_AMOUNT));

  return (
    <>
      <section className="mt-4 flex items-center justify-center">
        <IdeaNFT id={ideaId} className="h-[150px] w-[150px]" />
      </section>
      {!isArchived ? (
        <>
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
                placeholder={formatedMin}
                type="number"
                min={formatedMin}
                step={0.000000001}
              />
              <span className="text-xs text-neutral-500">
                The minimum sponsor amount is {formatedMin}
              </span>
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
            isDisabled={amount < parseFloat(formatedMin)}
            type={amount < parseFloat(formatedMin) ? "muted" : "primary"}
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
        </>
      ) : (
        <div className="text-sm text-neutral-500 text-center mt-4">
          This idea is archived and can no longer be supported.
        </div>
      )}
    </>
  );
};

export default SupportForm;
