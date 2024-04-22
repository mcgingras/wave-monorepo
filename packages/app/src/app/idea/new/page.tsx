"use client";

import { useState } from "react";
import Link from "next/link";
import Modal from "@/components/ui/Modal";
import AddActionForm from "@/components/AddActionForm";
import { IdeaTokenHubABI } from "@/abi/IdeaTokenHub";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { configAddresses } from "@/lib/constants";
import { parseEther } from "viem";
import { Action } from "@/models/IdeaToken/types";
import Button from "@/components/ui/Button";

const NewIdeaPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { address } = useAccount();
  const methods = useForm<{
    title: string;
    description: string;
    actions: Action[];
  }>({
    defaultValues: {
      title: "",
      description: "",
      actions: [],
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = methods;

  const {
    fields: actions,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "actions",
  });

  const { data: hash, writeContract, isPending, error } = useWriteContract();
  console.log(error);

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const onSubmit = async (data: { title: string; description: string }) => {
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
          values: [parseEther(".00001")],
          signatures: [""],
          calldatas: ["0x"] as `0x${string}`[],
        },
        `${data.title}\n\n${data.description}`,
      ],
    });
  };

  return (
    <section className="bg-neutral-100 min-h-[calc(100vh-65px)] relative">
      <div className="w-[600px] mx-auto pt-12">
        <FormProvider {...methods}>
          <Modal isOpen={isModalOpen} setIsOpen={() => setIsModalOpen(false)}>
            <AddActionForm
              onSubmitCallback={(data: any) => {
                append(data);
                setIsModalOpen(false);
              }}
              closeModal={() => setIsModalOpen(false)}
            />
          </Modal>
          <form
            className="rounded-2xl bg-white"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="">
              <h2 className="text-lg text-neutral-800 polymath-disp text-center py-4 border-b border-neutral-100 tracking-wide">
                New idea
              </h2>
              <section className="p-4 border-b border-neutral-100">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium leading-6 text-neutral-800"
                  >
                    Title
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="title"
                      {...register("title")}
                      className="block w-full rounded-md border-0 p-1.5 text-neutral-900 ring-1 ring-inset ring-neutral-200 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-neutral-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="col-span-full">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium leading-6 text-neutral-800"
                    >
                      Description
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="description"
                        rows={3}
                        className="block w-full rounded-md border-0 p-1.5 text-neutral-900 ring-1 ring-inset ring-neutral-200 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-neutral-600 sm:text-sm sm:leading-6"
                        defaultValue={""}
                        {...register("description")}
                      />
                    </div>
                    <p className="mt-1 text-sm leading-6 text-neutral-400">
                      The details of your idea. This will be submitted as the
                      body of the proposal.
                    </p>
                  </div>
                </div>
                <div className="sm:col-span-3 mt-6">
                  <label
                    htmlFor="amount"
                    className="block text-sm font-medium leading-6 text-neutral-800"
                  >
                    Actions
                  </label>
                  <div className="space-y-1 flex flex-col bg-neutral-100 p-2 text-sm rounded-md">
                    {actions.length === 0 && (
                      <div className="text-center text-neutral-500">
                        No actions added yet.
                      </div>
                    )}
                    {actions.map((action, index) => (
                      <>
                        <pre>
                          {action.target} - {action.value}
                        </pre>
                        <input
                          key={`action-target-${index}`}
                          {...register(`actions.${index}.target`)}
                          type="hidden"
                        />
                        <input
                          key={`action-value-${index}`}
                          {...register(`actions.${index}.value`)}
                          type="hidden"
                        />
                        <input
                          key={`action-signature-${index}`}
                          {...register(`actions.${index}.signature`)}
                          type="hidden"
                        />
                        <input
                          key={`action-calldata-${index}`}
                          {...register(`actions.${index}.calldata`)}
                          type="hidden"
                        />
                      </>
                    ))}
                  </div>
                  <div className="flex justify-end mt-4">
                    <Button
                      title="Add Action"
                      onClick={() => setIsModalOpen(true)}
                      type="secondary"
                    />
                  </div>
                </div>
              </section>
            </div>

            <section className="p-4 flex items-center justify-end space-x-2">
              <Button
                title="Cancel"
                type="undefined"
                onClick={() => {
                  window.history.back();
                }}
              />
              <Button title="Save" type="primary" isSubmit={true} />
            </section>
            {isConfirming && <div>Waiting for confirmation...</div>}
            {isConfirmed && <div>Transaction confirmed.</div>}
          </form>
        </FormProvider>
      </div>
      <section className="bg-neutral-200 w-full absolute bottom-0">
        <div className="w-[600px] mx-auto py-8 text-xs text-neutral-500">
          <h4 className="text-center">Created by Frog, Adel, and Robriks</h4>
          <ul className="mt-1 flex flex-row items-center justify-center space-x-2">
            <li className="hover:text-neutral-600 transition-colors">
              <Link href="https://github.com/robriks/nouns-prop-lot/blob/master/README.md">
                Github
              </Link>
            </li>
            <li className="hover:text-neutral-600 transition-colors">
              <Link href="https://github.com/robriks/nouns-prop-lot/blob/master/README.md">
                Warpcast
              </Link>
            </li>
            <li className="hover:text-neutral-600 transition-colors">
              <Link href="https://github.com/robriks/nouns-prop-lot/blob/master/README.md">
                Discord
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </section>
  );
};

export default NewIdeaPage;
