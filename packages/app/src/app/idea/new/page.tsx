"use client";

import { IdeaTokenHubABI } from "@/abi/IdeaTokenHub";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { useForm } from "react-hook-form";
import { configAddresses } from "@/lib/constants";
import { parseEther } from "viem";

const NewIdeaPage = () => {
  const { address } = useAccount();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      amount: 0,
    },
  });

  const { data: hash, writeContract, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const onSubmit = async (data: {
    title: string;
    description: string;
    amount: number;
  }) => {
    // throw error or something... make them log in
    if (!address) return;

    writeContract({
      chainId: 84532,
      address: configAddresses.IdeaTokenHub as `0x${string}`,
      abi: IdeaTokenHubABI,
      functionName: "createIdea",
      value: parseEther(".001"),
      args: [
        {
          targets: [address] as `0x${string}`[],
          values: [parseEther(data.amount.toString())],
          signatures: [""],
          calldatas: ["0x"] as `0x${string}`[],
        },
        `${data.title}\n\n${data.description}`,
      ],
    });
  };

  return (
    <section className="mt-24 w-[800px] mx-auto">
      <h1 className="text-2xl text-neutral-700 mb-2">New idea</h1>
      <form className="border p-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <label>Title</label>
          <input type="text" className="border p-2" {...register("title")} />
        </div>
        <div className="flex flex-col">
          <label>Description</label>
          <textarea className="border p-2" {...register("description")} />
        </div>
        <div className="flex flex-col">
          <label>Amount</label>
          <input type="number" className="border p-2" {...register("amount")} />
        </div>
        <button disabled={isPending}>Submit</button>
        {isConfirming && <div>Waiting for confirmation...</div>}
        {isConfirmed && <div>Transaction confirmed.</div>}
      </form>
    </section>
  );
};

export default NewIdeaPage;
