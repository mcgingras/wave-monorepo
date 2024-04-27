"use client";

import Button from "@/components/ui/Button";
import { useDelegateProxies } from "@/models/DelegateProxy/hooks";
import { truncateEthAddress } from "@/lib/utils";

const DelegatePage = () => {
  const { delegateProxies, isLoading, isEmpty } = useDelegateProxies();
  console.log(delegateProxies);

  return (
    <section className="bg-neutral-100 min-h-[calc(100vh-165px)] mt-[65px]">
      <div className="w-[600px] mx-auto pt-12">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-2xl polymath-disp font-bold text-neutral-800 tracking-wide">
            Delegates
          </h1>
          <Button type="primary" title="Add delegate" />
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
