"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { useDelegateProxies } from "@/models/DelegateProxy/hooks";
import { truncateEthAddress } from "@/lib/utils";
import CreateDelegateProxyForm from "@/components/CreateDelegateProxyForm";
import Modal from "@/components/ui/Modal";

const DelegatePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { delegateProxies, isLoading, isEmpty } = useDelegateProxies();
  console.log(delegateProxies);

  return (
    <section className="bg-neutral-100 min-h-[calc(100vh-165px)] mt-[65px]">
      <Modal isOpen={isModalOpen} setIsOpen={() => setIsModalOpen(false)}>
        <CreateDelegateProxyForm closeModal={() => setIsModalOpen(false)} />
      </Modal>
      <div className="w-[600px] mx-auto pt-12">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-2xl polymath-disp font-bold text-neutral-800 tracking-wide">
            Delegates
          </h1>
          <Button
            type="primary"
            title="Add delegate"
            onClick={() => {
              setIsModalOpen(true);
            }}
          />
        </div>
        <div className="mt-4 bg-white rounded-lg">
          {delegateProxies.map((proxy, id) => {
            return (
              <div
                key={proxy.id}
                className="p-4 border-b border-neutral-100 flex flex-col space-y-2"
              >
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-row space-x-1">
                    <h2 className="font-bold">Delegate {id + 1}</h2>
                    <span className="text-xs px-2 py-1 bg-neutral-100 text-neutral-400 rounded-full self-start">
                      {truncateEthAddress(proxy.id)}
                    </span>
                  </div>
                  <span className="bg-green-100 h-4 w-4 rounded-full flex items-center justify-center">
                    <span className="rounded-full h-2 w-2 bg-green-500"></span>
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
  );
};

export default DelegatePage;
