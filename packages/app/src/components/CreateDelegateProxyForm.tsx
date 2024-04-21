import { useReadContract, useAccount, useWriteContract } from "wagmi";
import { configAddresses } from "@/lib/constants";
import { PropLotHarnessABI } from "@/abi/PropLotHarness";
import { NounsTokenABI } from "@/abi/NounsToken";

const CreateDelegateProxyForm = () => {
  const { address } = useAccount();
  const { data: suitableDelegateForAddress, error } = useReadContract({
    address: configAddresses.PropLotHarness as `0x${string}`,
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

  console.log("del", delegatedTo);

  const isDelegated = delegatedTo !== address;

  return (
    <div>
      <h2 className="font-bold mb-2">Add voting power</h2>
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
                  address: configAddresses.PropLotHarness as `0x${string}`,
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
      </div>
    </div>
  );
};

export default CreateDelegateProxyForm;
