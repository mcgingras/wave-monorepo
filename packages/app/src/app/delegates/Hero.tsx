"use client";

import { configAddresses } from "@/lib/constants";
import { NounsTokenABI } from "@/abi/NounsToken";
import Button from "@/components/ui/Button";
import { useReadContract, useAccount } from "wagmi";
import NounAvatar from "@/components/NounAvatar";

const Hero = () => {
  const { address } = useAccount();
  const { data: nounsBalance, error } = useReadContract({
    address: configAddresses.NounsTokenHarness as `0x${string}`,
    abi: NounsTokenABI,
    functionName: "balanceOf",
    args: [address as `0x${string}`],
  });

  return (
    <section>
      <div className="flex flex-col items-center max-w-[600px] mx-auto">
        <NounAvatar id={4} className="h-16 w-16 rounded-full" />
        {!!nounsBalance && (
          <p className="text-2xl font-bold mt-6">
            You have{" "}
            {(() => {
              switch (nounsBalance.toString()) {
                case "0":
                  return "no Nouns";
                case "1":
                  return "1 Noun";
                default:
                  return `${nounsBalance.toString()} Nouns`;
              }
            })()}{" "}
            to delegate
          </p>
        )}
        <p className="text-center text-neutral-500 text-sm mb-4 mt-2">
          Nouns delegated to Wave are used to turn ideas into proposals, and in
          turn earn a reward! Delegate your Noun to start earning.
        </p>
        <Button
          title="Get started"
          type="primary"
          onClick={() => {
            console.log("clicked");
          }}
        />
      </div>
    </section>
  );
};

export default Hero;
