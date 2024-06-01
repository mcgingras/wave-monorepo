"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { useDelegateProxies } from "@/models/DelegateProxy/hooks";
import { truncateEthAddress } from "@/lib/utils";
import CreateDelegateProxyForm from "@/components/CreateDelegateProxyForm";
import Modal from "@/components/ui/Modal";
import { useReadContract, useAccount, useWriteContract } from "wagmi";
import { configAddresses } from "@/lib/constants";
import { PropLotHarnessABI } from "@/abi/PropLotHarness";
import { NounsTokenABI } from "@/abi/NounsToken";
import { WaveHarnessABI } from "@/abi/WaveHarness";

const DelegatePage = () => {
  const { address } = useAccount();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { delegateProxies, isLoading, isEmpty } = useDelegateProxies();

  const { data: nounsBalance } = useReadContract({
    address: configAddresses.NounsTokenHarness as `0x${string}`,
    abi: NounsTokenABI,
    functionName: "balanceOf",
    args: [address as `0x${string}`],
  });

  console.log(nounsBalance, address);

  const { data: delegatedTo, refetch: refetchDelegateTo } = useReadContract({
    address: configAddresses.NounsTokenHarness as `0x${string}`,
    abi: NounsTokenABI,
    functionName: "delegates",
    args: [address as `0x${string}`],
  });

  return (
    <div className="min-h-[calc(100vh-165px)] mt-[65px] flex flex-col">
      <Modal isOpen={isModalOpen} setIsOpen={() => setIsModalOpen(false)}>
        <CreateDelegateProxyForm closeModal={() => setIsModalOpen(false)} />
      </Modal>
      <section className="w-[600px] mx-auto pt-12 pb-8">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-2xl polymath-disp font-bold text-neutral-800 tracking-wide">
            Delegation
          </h1>

          <Button
            type="primary"
            title="Add voting power"
            onClick={() => {
              setIsModalOpen(true);
            }}
          />
        </div>
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
      </section>
      <section className="bg-neutral-100 py-8 grow flex-1">
        <div className="w-[600px] mx-auto">
          <h2 className="polymath-disp font-bold text-neutral-800 tracking-wide mb-4 text-lg">
            All delegate proxies
          </h2>
          <div className="w-full bg-white rounded-lg">
            {delegateProxies.map((proxy, id) => {
              return (
                <div
                  key={proxy.id}
                  className="p-4 border-b border-neutral-100 flex flex-col space-y-2"
                >
                  <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row space-x-1">
                      <h2 className="font-bold">Proxy {id + 1}</h2>
                      <span className="text-xs px-2 py-1 bg-neutral-100 text-neutral-400 rounded-full self-start">
                        {truncateEthAddress(proxy.id)}
                      </span>
                    </div>
                    <span
                      className={`h-4 w-4 rounded-full flex items-center justify-center ${
                        parseInt(proxy.votingPower.toString()) > 0
                          ? "bg-green-100"
                          : "bg-red-100"
                      }`}
                    >
                      <span
                        className={`rounded-full h-2 w-2 ${
                          parseInt(proxy.votingPower.toString()) > 0
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      ></span>
                    </span>
                  </div>
                  <div className="text-neutral-500 text-sm">
                    Voting power: {proxy.votingPower.toString()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DelegatePage;
