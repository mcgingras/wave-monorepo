"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatUnits } from "viem";
import { useReadContract, useBlockNumber, useAccount } from "wagmi";
import { formatTimeAgo } from "@/lib/utils";
import { configAddresses, WAVELENGTH } from "@/lib/constants";
import { useIdeaTokens } from "@/models/IdeaToken/hooks";
import { useDelegateProxies } from "@/models/DelegateProxy/hooks";
import { useTokenHubData, useEstimatedYield } from "@/models/TokenHub/hooks";
import Modal from "@/components/ui/Modal";
import { Countdown } from "@/components/ui/Counter";
import CreateDelegateProxyForm from "@/components/CreateDelegateProxyForm";
import { IdeaTokenHubABI } from "@/abi/IdeaTokenHub";
import { PropLotHarnessABI } from "@/abi/PropLotHarness";
import { useFinalizeWave } from "@/hooks/useFinalizeWave";

export default function Home() {
  const { address } = useAccount();
  const data = useTokenHubData();
  const { finalizeWave, error } = useFinalizeWave();
  console.log(error);
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
    <div className="pb-24">
      <Modal isOpen={isModalOpen} setIsOpen={() => setIsModalOpen(false)}>
        <CreateDelegateProxyForm />
      </Modal>
      <section className="mt-12">
        {/* <Countdown endDate={remainingTime} /> */}
        <div className="bg-white p-12 border mb-12 text-center">
          {remainingSeconds > 0 ? (
            <Countdown endDate={remainingTime} />
          ) : (
            <>
              <p className="mb-4 font-bold">Wave has ended!</p>
              <p>Winners: {data.numWinners}</p>
              <p>Eligible delegates: {data.eligibleProposerIds}</p>
              <button
                className="bg-neutral-700 py-2 px-4 text-white rounded-full mt-4"
                onClick={async () => await finalizeWave()}
              >
                Finalize wave
              </button>
            </>
          )}
        </div>
        <div className="w-full flex flex-row items-end justify-between mb-4">
          <div className="flex flex-row space-x-4 items-center">
            <h1 className="text-2xl text-neutral-800 font-bold">Leaderboard</h1>
          </div>
          <div className="space-x-2">
            <Link href="/idea/new">
              <button className="px-4 py-2 rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors text-white">
                + New idea
              </button>
            </Link>
          </div>
        </div>
        <div className="flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-white">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Rank
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Created
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Author
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Supporters
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Pooled ETH
                      </th>
                    </tr>
                  </thead>
                  {sortedIdeaTokens.length > 0 ? (
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {sortedIdeaTokens.map((idea, idx) => (
                        <tr
                          className={`cursor-pointer hover:bg-gray-50 ${
                            data.winningIdeaIds?.includes(
                              parseInt(idea.id.toString())
                            )
                              ? "bg-green-50"
                              : ""
                          }`}
                          key={idea.id.toString()}
                          onClick={() => {
                            router.push(`/idea/${idea.id}`);
                          }}
                        >
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {idx + 1}
                          </td>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                            {formatTimeAgo(parseInt(idea.createdAt.toString()))}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {idea.author}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {idea.title}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {idea.supporters.length}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-green-500">
                            {formatUnits(BigInt(idea.pooledEth), 18)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  ) : (
                    <tbody className="divide-y divide-gray-200 bg-white">
                      <tr>
                        <td
                          colSpan={6}
                          className="text-center py-4 text-sm text-gray-500"
                        >
                          No ideas found
                        </td>
                      </tr>
                    </tbody>
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-12">
        <div className="w-full flex flex-row items-end justify-between mb-4">
          <div className="flex flex-row space-x-4 items-center">
            <h1 className="text-2xl text-neutral-800 font-bold">Delegates</h1>
          </div>
          <div className="space-x-2">
            <button
              className="px-4 py-2 rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors text-white"
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              + Add voting power
            </button>
          </div>
        </div>
        <div className="flow-root">
          <div className="grid grid-cols-3 gap-4">
            {delegateProxies.map((delegateProxy, idx) => (
              <div
                key={delegateProxy.id.toString()}
                className="bg-white p-4 rounded-lg ring-1 ring-black ring-opacity-5 shadow flex flex-col"
              >
                <h3 className="text-center font-semibold">Proxy {idx + 1}</h3>
                <h4 className="text-sm text-neutral-500">{delegateProxy.id}</h4>
                <div className="mt-8 flex items-center justify-center">
                  {delegateProxy.delegators.map((delegate, idx) => (
                    <div
                      key={delegate.id.toString()}
                      className="flex flex-row items-center space-x-2"
                    >
                      {/* <span>{delegate.id}</span> */}
                      <span className="bg-gray-300 h-8 w-8 rounded-full"></span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col space-y-2">
                  <span className="text-sm text-neutral-500">
                    {delegateProxy.votingPower?.toString()} votes
                  </span>
                  <span className="text-sm text-neutral-500">
                    {minRequiredVotes?.toString()} votes required
                  </span>
                </div>
                <div className="mt-2 flex justify-end">
                  {/* <button
                    className="bg-neutral-700 py-1 px-2 text-white text-sm rounded-full"
                    disabled={
                      delegateProxy.delegators.length >
                      parseInt(minRequiredVotes?.toString() ?? "0")
                    }
                    onClick={() => {
                      setIsModalOpen(true);
                    }}
                  >
                    delegate
                  </button> */}
                </div>
              </div>
            ))}
            <div className="bg-white p-4 rounded-lg ring-1 ring-black ring-opacity-5 hover:shadow flex flex-col transition-shadow">
              <h3 className="text-center font-semibold">Your yield</h3>
              <h4 className="text-center text-sm text-neutral-500">
                {estimatedYield && formatUnits(BigInt(estimatedYield), 18)} ETH
              </h4>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
