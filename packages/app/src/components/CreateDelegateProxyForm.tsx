import { useEffect } from "react";
import {
  useReadContract,
  useAccount,
  useWriteContract,
  useTransactionReceipt,
} from "wagmi";
import { configAddresses } from "@/lib/constants";
import { PropLotHarnessABI } from "@/abi/PropLotHarness";
import { NounsTokenABI } from "@/abi/NounsToken";
import { WaveHarnessABI } from "@/abi/WaveHarness";
import Button from "./ui/Button";
import { getClient } from "@/lib/viem";
import { CheckIcon } from "@heroicons/react/24/solid";
import revalidate from "@/actions/revalidatePath";

const copy = {
  1: {
    title: "Delegate",
    description:
      "The wave protocol is designed to suggest the best proxy for you to delegate your voting power to based on your current voting power and the current state of the protocol.",
  },
  2: {
    title: "Register",
    description:
      "You have delegated your voting power to a proxy. Now you need to register your voting power with the wave protocol. More information about registration can be found here.",
  },
  3: {
    title: "Registered",
    description:
      "You have registered your voting power with the wave protocol. Thanks!",
  },
};

/**
 * TODO:
 * Need to figure out a better flow for delegating -> registering -> keeping track of delegates
 * What happens when someone undelegates but is still registered? That should be okay.
 * What happens when someone transfers a noun?
 * How do you unregister?
 */
const CreateDelegateProxyForm = ({
  closeModal,
}: {
  closeModal: () => void;
}) => {
  const { address } = useAccount();

  const {
    data: optimisticDelegations,
    error: optimisticDelegationError,
    refetch: refetchOptimisticDelegations,
  } = useReadContract({
    address: configAddresses.Wave as `0x${string}`,
    abi: WaveHarnessABI,
    functionName: "getOptimisticDelegations",
  });

  const { data: suitableDelegateForAddress, error: suitableDelegateError } =
    useReadContract({
      address: configAddresses.Wave as `0x${string}`,
      abi: PropLotHarnessABI,
      functionName: "getSuitableDelegateFor",
      args: [address as `0x${string}`],
    });

  const { data: nounsBalance } = useReadContract({
    address: configAddresses.NounsTokenHarness as `0x${string}`,
    abi: NounsTokenABI,
    functionName: "balanceOf",
    args: [address as `0x${string}`],
  });

  const { data: delegatedTo, refetch: refetchDelegateTo } = useReadContract({
    address: configAddresses.NounsTokenHarness as `0x${string}`,
    abi: NounsTokenABI,
    functionName: "delegates",
    args: [address as `0x${string}`],
  });

  const {
    data: delegateDataHash,
    writeContractAsync: delegateTo,
    isPending: isDelegateWritePending,
  } = useWriteContract();
  const {
    data: registerDataHash,
    writeContractAsync: registerDelegate,
    isPending: isRegisterWritePending,
  } = useWriteContract();

  const { isFetching: isDelegateFetching, isFetched: isDelegateActionFetched } =
    useTransactionReceipt({
      hash: delegateDataHash,
    });

  useEffect(() => {
    if (isDelegateActionFetched) {
      refetchDelegateTo();
      refetchOptimisticDelegations();
    }
  }, [isDelegateActionFetched]);

  const {
    isFetching: isRegisterFetching,
    isFetched: isRegistrationActionFetched,
  } = useTransactionReceipt({
    hash: registerDataHash,
  });

  useEffect(() => {
    if (isRegistrationActionFetched) {
      refetchDelegateTo();
      refetchOptimisticDelegations();
      // trying to give the indexer a bit of time
      setTimeout(() => {
        revalidate("/delegates");
      }, 2000);
    }
  }, [isRegistrationActionFetched]);

  const delegateHelper = async () => {
    await delegateTo({
      chainId: 84532,
      address: configAddresses.NounsTokenHarness as `0x${string}`,
      abi: NounsTokenABI,
      functionName: "delegate",
      args: [suitableDelegateForAddress?.[0] as `0x${string}`],
    });
  };
  const registerHelper = async () => {
    const client = getClient(process.env.NEXT_PUBLIC_ENV === "dev" ? 84532 : 1);
    const delegateId = await client.readContract({
      address: configAddresses.Wave as `0x${string}`,
      abi: WaveHarnessABI,
      functionName: "getDelegateId",
      args: [delegatedTo as `0x${string}`],
    });

    await registerDelegate({
      chainId: 84532,
      address: configAddresses.Wave as `0x${string}`,
      abi: PropLotHarnessABI,
      functionName: "registerDelegation",
      args: [address as `0x${string}`, delegateId],
    });
  };

  const isDelegated = delegatedTo && delegatedTo !== address;
  const isRegistered = optimisticDelegations?.some((proxy) => {
    return proxy.delegator === address;
  });

  const stage = !isDelegated ? 1 : isRegistered ? 3 : 2;

  return (
    <div>
      <h2 className="font-bold text-center">Add voting power</h2>
      <p className="text-neutral-700 text-xs text-center mt-2">
        {copy[stage].description}
      </p>
      <div className="relative w-[calc(100%-64px)] mx-auto mt-8">
        <div className="flex flex-row w-full items-center justify-between">
          <div className="flex flex-col items-center relative z-20">
            <span
              className={`h-8 w-8 rounded-full flex items-center justify-center border-2 border-blue-500 ${
                isDelegated ? "bg-blue-500" : "bg-white"
              }`}
            >
              {isDelegated && <CheckIcon className="h-5 w-5 text-white" />}
            </span>
            <p className="text-xs text-neutral-500 mt-1">Delegate</p>
          </div>
          <div className="flex flex-col items-center relative z-20">
            <span
              className={`h-8 w-8 rounded-full flex items-center justify-center border-2 border-blue-500 ${
                isRegistered ? "bg-blue-500" : "bg-white"
              }`}
            >
              {isRegistered && <CheckIcon className="h-5 w-5 text-white" />}
            </span>
            <p className="text-xs text-neutral-500 mt-1">Register</p>
          </div>
        </div>
        <span className="w-[calc(100%-30px)] h-1 border-b block absolute top-[14px] left-[20px] z-10"></span>
      </div>

      {stage !== 3 && (
        <div className="border rounded mt-6">
          <div className="p-4 border-b">
            <label
              htmlFor="type"
              className="block text-sm font-medium leading-6 text-neutral-700"
            >
              Voting power
            </label>
            <div className="mt-1">
              <span className="p-2 rounded w-full bg-neutral-100 block text-sm text-neutral-500">
                {nounsBalance?.toString()}
              </span>
            </div>
          </div>

          <div className="p-4">
            <label
              htmlFor="type"
              className="block text-sm font-medium leading-6 text-neutral-700"
            >
              Proxy
            </label>
            <div className="mt-1">
              <span className="p-2 rounded w-full bg-neutral-100 block text-sm text-neutral-500">
                {suitableDelegateForAddress && suitableDelegateForAddress[0]}
              </span>
            </div>
          </div>
        </div>
      )}
      <div className="mt-8 flex justify-end space-x-2">
        <Button
          onClick={closeModal}
          type="secondary"
          title={stage === 3 ? "Close" : "Cancel"}
        />

        {stage !== 3 && (
          <Button
            type="primary"
            title={
              isDelegateWritePending ||
              isRegisterWritePending ||
              isDelegateFetching ||
              isRegisterFetching
                ? "Pending..."
                : isDelegated
                ? "Register"
                : "Delegate"
            }
            onClick={() => {
              isDelegated ? registerHelper() : delegateHelper();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default CreateDelegateProxyForm;
