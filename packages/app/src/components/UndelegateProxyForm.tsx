import { useEffect } from "react";
import {
  useReadContract,
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { configAddresses } from "@/lib/constants";
import { NounsTokenABI } from "@/abi/NounsToken";
import Button from "./ui/Button";

/**
 * TODO:
 * Need to figure out a better flow for delegating -> registering -> keeping track of delegates
 * What happens when someone undelegates but is still registered? That should be okay.
 * What happens when someone transfers a noun?
 * How do you unregister?
 */
const UndelegateProxyForm = ({ closeModal }: { closeModal: () => void }) => {
  const { address } = useAccount();

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
    data: hash,
    writeContractAsync: delegateTo,
    isPending: isDelegateWritePending,
  } = useWriteContract();

  const {
    isFetching: isDelegateWriteFetching,
    isFetched: isUndelegateActionFetched,
  } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isUndelegateActionFetched) {
      refetchDelegateTo();
    }
  }, [isUndelegateActionFetched]);

  const undelegateHelper = async () => {
    await delegateTo({
      chainId: 84532,
      address: configAddresses.NounsTokenHarness as `0x${string}`,
      abi: NounsTokenABI,
      functionName: "delegate",
      args: [address as `0x${string}`],
    });
  };

  return (
    <div>
      <h2 className="font-bold text-center">Undelegate voting power</h2>
      <p className="text-neutral-700 text-xs text-center mt-2">
        By undelegating you will remove your voting power from the delegate
        below, and will transfer the voting power back to your account.
      </p>

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
            Current delegate
          </label>
          <div className="mt-1">
            <span className="p-2 rounded w-full bg-neutral-100 block text-sm text-neutral-500">
              {delegatedTo}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end space-x-2">
        <Button onClick={closeModal} type="secondary" title={"Cancel"} />

        <Button
          type="primary"
          title={
            isDelegateWritePending || isDelegateWriteFetching
              ? "Pending..."
              : "Undelegate"
          }
          onClick={() => {
            undelegateHelper();
          }}
        />
      </div>
    </div>
  );
};

export default UndelegateProxyForm;
