import { useReadContract, useAccount, useWriteContract } from "wagmi";
import { configAddresses } from "@/lib/constants";
import { PropLotHarnessABI } from "@/abi/PropLotHarness";
import { NounsTokenABI } from "@/abi/NounsToken";
import Button from "./ui/Button";

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
  const { data: suitableDelegateForAddress, error } = useReadContract({
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

  const { data: delegatedTo } = useReadContract({
    address: configAddresses.NounsTokenHarness as `0x${string}`,
    abi: NounsTokenABI,
    functionName: "delegates",
    args: [address as `0x${string}`],
  });

  const { data: delegateToData, writeContract: delegateTo } =
    useWriteContract();
  const { data: registerDelegateData, writeContract: registerDelegate } =
    useWriteContract();

  const isDelegated = delegatedTo !== address;

  return (
    <div>
      <div>
        <h2 className="font-bold text-center">Add voting power</h2>
        <p className="text-neutral-700 text-xs text-center">
          {/* Wave protocol can support as many delegates as it has voting power.
          The more voting power the protocol has, the more ideas it can push on
          chain in parallel. */}
          The wave protocol is designed to suggest to best proxy for you to
          delegate your voting power to based on your current voting power and
          the current state of the protocol.
        </p>

        <div className="col-span-full mt-4">
          <label
            htmlFor="type"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Voting power
          </label>
          <div className="mt-1">
            <span className="p-2 rounded w-full bg-neutral-100 block text-sm text-neutral-500">
              {nounsBalance?.toString()}
            </span>
          </div>
        </div>

        <div className="col-span-full mt-4">
          <label
            htmlFor="type"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Proxy
          </label>
          <div className="mt-1">
            <span className="p-2 rounded w-full bg-neutral-100 block text-sm text-neutral-500">
              {suitableDelegateForAddress && suitableDelegateForAddress[0]}
            </span>
          </div>
        </div>
        {isDelegated ? "Time to register" : "Delegate"}
        <div className="mt-6 flex justify-end space-x-2">
          <Button onClick={closeModal} type="secondary" title="Cancel" />
          <Button
            type="primary"
            title="Add"
            onClick={() => {
              isDelegated
                ? registerDelegate({
                    chainId: 84532,
                    address: configAddresses.Wave as `0x${string}`,
                    abi: PropLotHarnessABI,
                    functionName: "registerDelegation",
                    args: [address as `0x${string}`, BigInt(1)],
                  })
                : delegateTo({
                    chainId: 84532,
                    address: configAddresses.NounsTokenHarness as `0x${string}`,
                    abi: NounsTokenABI,
                    functionName: "delegate",
                    args: [suitableDelegateForAddress?.[0] as `0x${string}`],
                  });
            }}
          />
        </div>
      </div>
      {/* <h2 className="font-bold mb-2">Add voting power</h2>
      <div className="flex flex-col space-y-2 text-sm">
        <div className="flex flex-col space-y-1">
          <span className="font-semibold">Your voting power:</span>
          <span>{nounsBalance?.toString()}</span>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="font-semibold">Best proxy:</span>
          <span>
            {suitableDelegateForAddress && suitableDelegateForAddress[0]}
          </span>
        </div>
        <div className="mt-4">
          {isDelegated ? (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-full"
              onClick={() => {
                // todo -- need to get delegateId from delegateAddress
                // todo -- need to figure out if we should register entire delegate balance? (does this matter?)
                registerDelegate({
                  chainId: 84532,
                  address: configAddresses.Wave as `0x${string}`,
                  abi: PropLotHarnessABI,
                  functionName: "registerDelegation",
                  args: [address as `0x${string}`, BigInt(1)],
                });
              }}
            >
              Register
            </button>
          ) : (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-full"
              onClick={() => {
                delegateTo({
                  chainId: 84532,
                  address: configAddresses.NounsTokenHarness as `0x${string}`,
                  abi: NounsTokenABI,
                  functionName: "delegate",
                  args: [suitableDelegateForAddress?.[0] as `0x${string}`],
                });
              }}
            >
              Delegate
            </button>
          )}
        </div>
      </div> */}
    </div>
  );
};

export default CreateDelegateProxyForm;
