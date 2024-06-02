"use client";

import { useReadContract, useAccount } from "wagmi";
import { configAddresses } from "@/lib/constants";
import { NounsTokenABI } from "@/abi/NounsToken";

const UserStats = () => {
  const { address } = useAccount();

  const { data: nounsBalance, error } = useReadContract({
    address: configAddresses.NounsTokenHarness as `0x${string}`,
    abi: NounsTokenABI,
    functionName: "balanceOf",
    args: [address as `0x${string}`],
  });

  console.log("nouns balance", nounsBalance?.toString());
  console.log(error);

  const { data: delegatedTo, refetch: refetchDelegateTo } = useReadContract({
    address: configAddresses.NounsTokenHarness as `0x${string}`,
    abi: NounsTokenABI,
    functionName: "delegates",
    args: [address as `0x${string}`],
  });

  return (
    <div className="flex flex-col space-y-4 w-full mt-4">
      <div className="flex flex-row justify-between text-neutral-400 items-center space-x-4">
        <span>Your voting power</span>
        <span className="h-1 border-b border-dotted border-neutral-400 flex-grow"></span>
        <span>{nounsBalance?.toString()}</span>
      </div>
      <div className="flex flex-row justify-between text-neutral-400 items-center space-x-4">
        <span>Delegated to</span>
        <span className="h-1 border-b border-dotted border-neutral-400 flex-grow"></span>
        <span>{delegatedTo?.toString()}</span>
      </div>
      <div className="flex flex-row justify-between text-neutral-400 items-center space-x-4">
        <span>Registration complete</span>
        <span className="h-1 border-b border-dotted border-neutral-400 flex-grow"></span>
        <span>False</span>
      </div>
      <div className="flex flex-row justify-between text-neutral-400 items-center space-x-4">
        <span>Unclaimed yield</span>
        <span className="h-1 border-b border-dotted border-neutral-400 flex-grow"></span>
        <div className="flex flex-row items-center space-x-2">
          <span>0 ETH</span>
          <span className="bg-green-100 text-green-500 hover:shadow-[0_0_0_2px_rgba(220,252,231,1)] rounded-md px-2 py-1 cursor-pointer transition-all text-xs font-bold">
            CLAIM
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserStats;
