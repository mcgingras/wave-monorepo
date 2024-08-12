"use client";

import { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import AddActionForm from "@/components/AddActionForm";
import { IdeaTokenHubABI } from "@/abi/IdeaTokenHub";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { useForm, FormProvider } from "react-hook-form";
import { configAddresses, MIN_SPONSOR_AMOUNT } from "@/lib/constants";
import { parseEther, formatEther } from "viem";
import { Action } from "@/lib/camp/types";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";
import { parseEventLogs } from "viem";
import redirectAndRevalidate from "@/actions/redirectAndRevalidate";
import Markdown from "react-markdown";
import ActionList from "@/components/ActionList";
import {
  resolveAction as resolveActionTransactions,
  unparse,
} from "@/lib/camp/transactions";

const NewIdeaForm = () => {
  const [showMarkdown, setShowMarkdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actions, setActions] = useState<Action[]>([]);

  const addAction = (action: Action) => {
    setActions((actions) => [...actions, action]);
  };

  const { address } = useAccount();
  const methods = useForm<{
    title: string;
    description: string;
    actions: Action[];
  }>({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const { data: hash, writeContractAsync } = useWriteContract();
  const { data: transactionData, isLoading: isConfirming } =
    useWaitForTransactionReceipt({
      hash,
    });

  useEffect(() => {
    if (transactionData) {
      const logs = parseEventLogs({
        abi: IdeaTokenHubABI,
        logs: transactionData.logs,
      });

      const transferSingleLog = logs.find(
        (log) => log.eventName === "TransferSingle"
      );

      if (transferSingleLog) {
        // @ts-ignore
        const id = transferSingleLog.args?.id;
        toast.success(`Idea created!`);
        redirectAndRevalidate(`/idea/${id}`);
      }
    }
  }, [transactionData]);

  const onSubmit = async (data: { title: string; description: string }) => {
    // throw error or something... make them log in
    if (!address) {
      toast.error("You need to connect your wallet to submit an idea.");
      return;
    }

    const transactions = actions.flatMap((a) => {
      // @ts-ignore
      return unparse(resolveActionTransactions(a, { chainId: 1 }), {
        chainId: 1,
      });
    });

    const joinedTransactions = {
      targets: [],
      values: [],
      signatures: [],
      calldatas: [],
    } as any;

    transactions.forEach((transaction) => {
      joinedTransactions.targets = [
        ...joinedTransactions.targets,
        ...transaction.targets,
      ];
      joinedTransactions.values = [
        ...joinedTransactions.values,
        ...transaction.values,
      ];
      joinedTransactions.signatures = [
        ...joinedTransactions.signatures,
        ...transaction.signatures,
      ];
      joinedTransactions.calldatas = [
        ...joinedTransactions.calldatas,
        ...transaction.calldatas,
      ];
    });

    const id = await writeContractAsync({
      chainId: process.env.NEXT_PUBLIC_ENV === "dev" ? 84532 : 1,
      address: configAddresses.IdeaTokenHub as `0x${string}`,
      abi: IdeaTokenHubABI,
      functionName: "createIdea",
      value: BigInt(MIN_SPONSOR_AMOUNT),

      args: [joinedTransactions, `${data.title}\n\n${data.description}`],
    });
  };

  return (
    <div className="w-full mx-auto">
      <FormProvider {...methods}>
        <Modal isOpen={isModalOpen} setIsOpen={() => setIsModalOpen(false)}>
          <AddActionForm
            addAction={(action) => {
              addAction(action);
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
                    className="block w-full rounded-md border-0 p-1.5 text-neutral-900 ring-1 ring-inset ring-neutral-200 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-neutral-200 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium leading-6 text-neutral-800 self-end"
                  >
                    Description
                  </label>

                  <div className="mt-1">
                    {showMarkdown ? (
                      <div className="bg-neutral-100 p-2 rounded-md prose text-sm text-neutral-500">
                        <Markdown>{methods.watch("description")}</Markdown>
                      </div>
                    ) : (
                      <textarea
                        id="description"
                        rows={3}
                        className="block w-full rounded-md border-0 p-1.5 text-neutral-900 ring-1 ring-inset ring-neutral-200 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-neutral-200 sm:text-sm sm:leading-6"
                        defaultValue={""}
                        {...register("description")}
                      />
                    )}
                  </div>
                  <p className="mt-1 text-sm leading-6 text-neutral-400">
                    The details of your idea. This will be submitted as the body
                    of the proposal. This will be saved as markdown.
                  </p>
                  <div className="flex justify-end mt-2">
                    <Button
                      title={showMarkdown ? "Hide markdown" : "Show markdown"}
                      onClick={() => setShowMarkdown(!showMarkdown)}
                      type="secondary"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-3 mt-6">
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium leading-6 text-neutral-800"
                >
                  Actions
                </label>

                {actions.length === 0 ? (
                  <div className="text-center text-neutral-500 border rounded text-sm py-4">
                    No actions added yet.
                  </div>
                ) : (
                  <div className="space-y-1 flex flex-col text-sm rounded-md w-3/4 text-neutral-500">
                    <ActionList actions={actions} />
                  </div>
                )}

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
              type="muted"
              onClick={() => {
                window.history.back();
              }}
            />
            <Button
              title={isConfirming ? "Loading..." : "Create"}
              type="primary"
              isSubmit={true}
            />
          </section>
        </form>
      </FormProvider>
    </div>
  );
};

export default NewIdeaForm;
