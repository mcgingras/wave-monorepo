"use client";

import { useState } from "react";
import Link from "next/link";
import { formatUnits } from "viem";
import { useReadContract, useBlockNumber, useAccount } from "wagmi";
import { configAddresses, WAVELENGTH } from "@/lib/constants";
import { useIdeaTokens } from "@/models/IdeaToken/hooks";
import { useDelegateProxies } from "@/models/DelegateProxy/hooks";
import { useTokenHubData, useEstimatedYield } from "@/models/TokenHub/hooks";
import Modal from "@/components/ui/Modal";
import { StaticCountdown } from "@/components/ui/Counter";
import CreateDelegateProxyForm from "@/components/CreateDelegateProxyForm";
import { IdeaTokenHubABI } from "@/abi/IdeaTokenHub";
import { PropLotHarnessABI } from "@/abi/PropLotHarness";
import { useFinalizeWave } from "@/hooks/useFinalizeWave";
import { ClockIcon } from "@heroicons/react/24/solid";
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import { LightBulbIcon } from "@heroicons/react/24/solid";
import { UserGroupIcon } from "@heroicons/react/24/solid";
import Button from "@/components/ui/Button";
import ExpandableIdeaCard from "@/components/IdeaCard/Expandable";
import AbridgedList from "@/components/IdeaCard/AbridgedList";
import IdeaCardSkeleton from "@/components/IdeaCard/Skeleton";

export default function Home() {
  const { address } = useAccount();
  const data = useTokenHubData();
  const { finalizeWave, error } = useFinalizeWave();
  const { estimatedYield } = useEstimatedYield(address);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { ideaTokens, isLoading } = useIdeaTokens();
  const { delegateProxies } = useDelegateProxies();
  const ideaTokensWithPooledEth = ideaTokens.map((ideaToken) => {
    const pooledEth = ideaToken.supporters.reduce(
      (acc, supporter) => acc + parseInt(supporter.balance.toString()),
      0
    );
    return {
      ...ideaToken,
      pooledEth,
    };
  });

  const totalPooledEth = ideaTokensWithPooledEth.reduce(
    (acc, ideaToken) => acc + ideaToken.pooledEth,
    0
  );

  const sortedIdeaTokens = ideaTokensWithPooledEth.sort(
    (a, b) => b.pooledEth - a.pooledEth
  );

  const { data: blockNumber } = useBlockNumber();
  const { data: waveInfo } = useReadContract({
    address: configAddresses.IdeaTokenHub as `0x${string}`,
    abi: IdeaTokenHubABI,
    functionName: "currentWaveInfo",
  });

  const { data: minRequiredVotes } = useReadContract({
    address: configAddresses.PropLotHarness as `0x${string}`,
    abi: PropLotHarnessABI,
    functionName: "getCurrentMinRequiredVotes",
  });

  // @ts-ignore
  const difference = parseInt(blockNumber?.toString()) - waveInfo?.[1];
  const remainingBlocks = WAVELENGTH - difference;
  const remainingSeconds = remainingBlocks * 2;

  const now = new Date();
  const remainingTime = new Date(
    now.getTime() + (remainingSeconds > 0 ? remainingSeconds : 0) * 1000
  );

  return (
    <>
      <Modal isOpen={isModalOpen} setIsOpen={() => setIsModalOpen(false)}>
        <CreateDelegateProxyForm />
      </Modal>
      <div className="min-h-[calc(100vh-65px)] mt-[65px] pt-12 flex flex-col">
        <section className="w-[600px] mx-auto pb-12">
          <h1 className="polymath-disp font-bold text-2xl text-neutral-800">
            Wave {waveInfo?.[0]}
          </h1>
          {remainingSeconds <= 0 ? (
            <div className="border border-neutral-200 p-4 rounded-lg flex flex-col items-center justify-center space-y-2 mt-4">
              <p className="text-neutral-500 text-center">
                This wave has ended!
              </p>
              <Button
                title="Finalize wave"
                type="primary"
                onClick={() => finalizeWave()}
              />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-8 w-full mt-4">
              <div className="flex flex-row space-x-4 col-span-1 w-full">
                <span className="bg-blue-100 p-2 rounded-full">
                  <ClockIcon className="text-blue-500 h-6 w-6" />
                </span>
                <div className="flex flex-col grow">
                  <div className="flex flex-row justify-between text-blue-500">
                    <span>Time</span>
                    <StaticCountdown
                      endDate={remainingTime}
                      className="space-x-1"
                    />
                  </div>
                  <div className="w-full h-3 rounded-full bg-blue-100 relative">
                    <div className="h-3 rounded-full bg-blue-500 absolute top-0 left-0 w-full"></div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row space-x-4 col-span-1 w-full">
                <span className="bg-blue-100 p-2 rounded-full">
                  <CurrencyDollarIcon className="text-blue-500 h-6 w-6" />
                </span>
                <div className="flex flex-col grow">
                  <div className="flex flex-row justify-between text-blue-500">
                    <span>Total yield</span>
                    <span>{formatUnits(BigInt(totalPooledEth), 18)} ETH</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-blue-100 relative">
                    <div className="h-3 rounded-full bg-blue-500 absolute top-0 left-0 w-1/2"></div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row space-x-4">
                <span className="bg-neutral-100 p-2 rounded-full">
                  <UserGroupIcon className="text-neutral-400 h-6 w-6" />
                </span>
                <div className="flex flex-col grow">
                  <div className="flex flex-row justify-between text-neutral-400">
                    <span>Total delegates</span>
                    <span>{delegateProxies.length}</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-neutral-100 relative">
                    <div className="h-3 rounded-full bg-neutral-400 absolute top-0 left-0 w-1/2"></div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row space-x-4">
                <span className="bg-neutral-100 p-2 rounded-full">
                  <LightBulbIcon className="text-neutral-400 h-6 w-6" />
                </span>
                <div className="flex flex-col grow">
                  <div className="flex flex-row justify-between text-neutral-400">
                    <span>Total ideas</span>
                    <span>{ideaTokens.length}</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-neutral-100 relative">
                    <div className="h-3 rounded-full bg-neutral-400 absolute top-0 left-0 w-1/2"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
        <section className="bg-neutral-100 py-8 grow flex-1">
          <div className="w-[600px] mx-auto space-y-8">
            {isLoading
              ? [1, 2, 3].map(() => {
                  return <IdeaCardSkeleton />;
                })
              : sortedIdeaTokens.map((ideaToken, idx) => {
                  return (
                    <div>
                      <Link href={`/idea/${ideaToken.id}`}>
                        <ExpandableIdeaCard ideaToken={ideaToken} />
                      </Link>
                    </div>
                  );
                })}
          </div>
        </section>
      </div>
    </>
  );
}
