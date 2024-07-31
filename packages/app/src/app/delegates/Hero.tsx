"use client";

import { useState } from "react";
import { configAddresses } from "@/lib/constants";
import { NounsTokenABI } from "@/abi/NounsToken";
import Button from "@/components/ui/Button";
import { useReadContract, useAccount } from "wagmi";
import NounAvatar from "@/components/NounAvatar";
import Modal from "@/components/ui/Modal";
import CreateDelegateProxyForm from "@/components/CreateDelegateProxyForm";
import UndelegateProxyForm from "@/components/UndelegateProxyForm";
import { WaveHarnessABI } from "@/abi/WaveHarness";

const Hero = ({ proxies }: { proxies: any }) => {
  const [isDelegateModalOpen, setIsDelegateModalOpen] = useState(false);
  const [isUnDelegateModalOpen, setIsUnDelegateModalOpen] = useState(false);
  const { address } = useAccount();
  const { data: nounsBalance } = useReadContract({
    address: configAddresses.NounsTokenHarness as `0x${string}`,
    abi: NounsTokenABI,
    functionName: "balanceOf",
    args: [address as `0x${string}`],
  });

  console.log("address", address);
  console.log("balanceOf", nounsBalance);

  const { data: delegatedTo } = useReadContract({
    address: configAddresses.NounsTokenHarness as `0x${string}`,
    abi: NounsTokenABI,
    functionName: "delegates",
    args: [address as `0x${string}`],
  });

  const { data: optimisticDelegations } = useReadContract({
    address: configAddresses.Wave as `0x${string}`,
    abi: WaveHarnessABI,
    functionName: "getOptimisticDelegations",
  });

  const isDelegatedToProxy = proxies.some((proxy: any) => {
    return proxy.id === delegatedTo;
  });

  const isRegistered = optimisticDelegations?.some((proxy) => {
    return proxy.delegator === address;
  });

  const stage = !isDelegatedToProxy ? 0 : !isRegistered ? 1 : 2;

  const stageConfig = {
    0: {
      title: `You have ${nounsBalance?.toString()} Noun${
        nounsBalance !== BigInt(1) && "s"
      } to delegate`,
      description:
        "Nouns delegated to Wave are used to turn ideas into proposals, and in turn earn a reward! If you have a noun, delegate to start earning.",
      buttonText: "Get started",
      onClick: () => {
        setIsDelegateModalOpen(true);
      },
    },
    1: {
      title: `Register your Noun${
        nounsBalance !== BigInt(1) && "s"
      } to complete delegation`,
      description:
        "You must register your Noun to complete the delegation process. This will allow you to earn rewards and participate in the Wave protocol.",
      buttonText: "Delegate more",
      onClick: () => {
        setIsDelegateModalOpen(true);
      },
    },
    2: {
      title: "Thanks for being a delegate!",
      description:
        "You are now earning yield by participating in the Wave protocol.",
      buttonText: "Undelegate",
      onClick: () => {
        setIsUnDelegateModalOpen(true);
      },
    },
  };

  return (
    <section>
      <Modal
        isOpen={isDelegateModalOpen}
        setIsOpen={() => setIsDelegateModalOpen(false)}
      >
        <CreateDelegateProxyForm
          closeModal={() => setIsDelegateModalOpen(false)}
        />
      </Modal>
      <Modal
        isOpen={isUnDelegateModalOpen}
        setIsOpen={() => setIsUnDelegateModalOpen(false)}
      >
        <UndelegateProxyForm
          closeModal={() => setIsUnDelegateModalOpen(false)}
        />
      </Modal>

      <div className="flex flex-col items-center max-w-[600px] mx-auto">
        <NounAvatar
          id={4}
          className="h-16 w-16 rounded-full data-[fallback]:bg-neutral-300"
        />
        {nounsBalance !== undefined && (
          <p className="text-2xl font-bold mt-6">{stageConfig[stage].title}</p>
        )}
        <p className="text-center text-neutral-500 text-sm mb-4 mt-2">
          {stageConfig[stage].description}
        </p>
        {nounsBalance !== undefined && nounsBalance > BigInt(0) && (
          <Button
            title={stageConfig[stage].buttonText}
            type="primary"
            onClick={stageConfig[stage].onClick}
          />
        )}
      </div>
    </section>
  );
};

export default Hero;
