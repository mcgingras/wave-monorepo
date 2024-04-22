"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatUnits } from "viem";
import { useReadContract, useBlockNumber, useAccount } from "wagmi";
import { formatTimeAgo, truncateEthAddress } from "@/lib/utils";
import { configAddresses, WAVELENGTH } from "@/lib/constants";
import { useIdeaTokens } from "@/models/IdeaToken/hooks";
import { useDelegateProxies } from "@/models/DelegateProxy/hooks";
import { useTokenHubData, useEstimatedYield } from "@/models/TokenHub/hooks";
import Modal from "@/components/ui/Modal";
import { Countdown, StaticCountdown } from "@/components/ui/Counter";
import CreateDelegateProxyForm from "@/components/CreateDelegateProxyForm";
import { IdeaTokenHubABI } from "@/abi/IdeaTokenHub";
import { PropLotHarnessABI } from "@/abi/PropLotHarness";
import { useFinalizeWave } from "@/hooks/useFinalizeWave";
import { ClockIcon } from "@heroicons/react/24/solid";
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import { LightBulbIcon } from "@heroicons/react/24/solid";
import { UserGroupIcon } from "@heroicons/react/24/solid";

export default function Home() {
  const { address } = useAccount();
  const data = useTokenHubData();
  const { finalizeWave, error } = useFinalizeWave();
  const { estimatedYield } = useEstimatedYield(address);

  const router = useRouter();
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
    <div>
      <Modal isOpen={isModalOpen} setIsOpen={() => setIsModalOpen(false)}>
        <CreateDelegateProxyForm />
      </Modal>
      <section className="w-[600px] mx-auto mt-12 pb-12">
        <h1 className="polymath-disp text-2xl text-neutral-800">Wave 1</h1>
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
                <div className="h-3 rounded-full bg-blue-500 absolute top-0 left-0 w-1/2"></div>
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
      </section>
      <section className="bg-neutral-100 py-8">
        <div className="w-[600px] mx-auto space-y-8">
          {sortedIdeaTokens.map((ideaToken, idx) => {
            return (
              <div>
                <Link href={`/idea/${ideaToken.id}`}>
                  <div className="bg-white rounded-2xl flex flex-col border border-transparent hover:border-neutral-200 hover:translate-y-[-2px] cursor-pointer transition-all">
                    <div className="flex flex-row justify-between items-center border-b border-neutral-100 p-4">
                      <div className="flex flex-col space-y-1">
                        <h2 className="text-lg text-neutral-800 polymath-disp tracking-wide">
                          {ideaToken.title}
                        </h2>
                        <p className="text-xs px-2 py-1 bg-neutral-100 text-neutral-400 rounded-full">
                          {truncateEthAddress(ideaToken.author)}
                        </p>
                      </div>
                      <button className="self-start bg-blue-100 text-blue-500 rounded-md px-2 py-1 hover:scale-105 transition-all">
                        Support
                      </button>
                    </div>
                    <div className="flex flex-row p-4 border-b border-neutral-100">
                      <p className="text-neutral-500">
                        {ideaToken.description}
                      </p>
                    </div>
                    <div className="flex flex-col p-4">
                      <h3 className="text-xs uppercase text-neutral-400 font-bold polymath-disp tracking-wider">
                        Supporters
                      </h3>
                      <div className="mt-2 grid grid-cols-3 gap-4">
                        <div className="space-x-2 flex flex-row items-center">
                          <span className="bg-neutral-200 h-6 w-6 rounded-full block"></span>
                          <p>lilfrog.eth</p>
                          <p className="text-xs px-2 py-1 bg-neutral-100 text-neutral-400 rounded-full self-start">
                            1
                          </p>
                        </div>
                        <div className="space-x-2 flex flex-row items-center">
                          <span className="bg-neutral-200 h-6 w-6 rounded-full block"></span>
                          <p>lilfrog.eth</p>
                          <p className="text-xs px-2 py-1 bg-neutral-100 text-neutral-400 rounded-full self-start">
                            1
                          </p>
                        </div>
                        <div className="space-x-2 flex flex-row items-center">
                          <span className="bg-neutral-200 h-6 w-6 rounded-full block"></span>
                          <p>lilfrog.eth</p>
                          <p className="text-xs px-2 py-1 bg-neutral-100 text-neutral-400 rounded-full self-start">
                            1
                          </p>
                        </div>
                        <div className="space-x-2 flex flex-row items-center">
                          <span className="bg-neutral-200 h-6 w-6 rounded-full block"></span>
                          <p>lilfrog.eth</p>
                          <p className="text-xs px-2 py-1 bg-neutral-100 text-neutral-400 rounded-full self-start">
                            1
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </section>
      <section className="bg-neutral-200">
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
    </div>
  );
}
