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
    <section className="mt-24 w-[1200px] mx-auto bg-white py-12 rounded-2xl border-2 border-[#F0F2F5]">
      <form
        className="bg-white w-[800px] mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="space-y-12">
          <div className="pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              New idea
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Submit a new idea to the wave.
            </p>

            <div className="sm:col-span-3 mt-10">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Title
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="title"
                  {...register("title")}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-neutral-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-neutral-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                    {...register("description")}
                  />
                </div>
                <p className="mt-2 text-sm leading-6 text-gray-400">
                  The details of your idea. This will be submitted as the body
                  of the proposal.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end">
          <button
            type="submit"
            disabled={isPending}
            className="px-4 py-2 rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors text-white"
          >
            Save
          </button>
          {isConfirming && <div>Waiting for confirmation...</div>}
          {isConfirmed && <div>Transaction confirmed.</div>}
        </div>
      </form>
    </section>
  );
};

export default NewIdeaPage;
