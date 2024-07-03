import Image from "next/image";
import EnsImage from "./EnsImage";
import EnsName from "./EnsName";
import { Suspense } from "react";
import SupportedIdeaList from "./SupportedIdeaList";

const BadgeCard = () => {
  return (
    <div className="bg-white rounded-lg">
      <div className="flex items-center justify-center border-b border-neutral-100">
        <Image
          src="/badge.svg"
          alt="temporary nft image"
          width={200}
          height={200}
        />
      </div>
      <div className="p-4">
        <h3 className="text-xs uppercase text-neutral-500 font-bold polymath-disp tracking-wider">
          Idea #143
        </h3>
        <p className="text-sm text-neutral-400">
          Here is my reason for voting. This will be a bunch of random garbage
          here. Idk what else we want to show here, maybe some stats about if
          its on-chain or not? Maybe how much I donated?
        </p>
      </div>
    </div>
  );
};

const ScoutPage = ({ params }: { params: { address: `0x${string}` } }) => {
  return (
    <div className="min-h-[calc(100vh-72px)] mt-[72px] pt-12 flex flex-col bg-neutral-100">
      <div className="container mx-auto pb-12">
        <section className="grid grid-cols-3 gap-12 pt-6">
          <div className="flex flex-row space-x-4 items-center self-start">
            <EnsImage address={params.address} />
            <EnsName address={params.address} />
          </div>
          <div>
            <h3 className="text-neutral-500 pb-2 border-b border-neutral-300 font-semibold">
              Support stats
            </h3>
            <ul className="mt-4 space-y-2">
              <li className="flex flex-row items-center space-x-4">
                <span className="h-4 w-4 rounded-full bg-neutral-300 block"></span>
                <p className="flex-1 text-neutral-500">Waves participated</p>
                <span className="font-semibold">4</span>
              </li>
              <li className="flex flex-row items-center space-x-4">
                <span className="h-4 w-4 rounded-full bg-neutral-300 block"></span>
                <p className="flex-1 text-neutral-500">Waves participated</p>
                <span className="font-semibold">4</span>
              </li>
              <li className="flex flex-row items-center space-x-4">
                <span className="h-4 w-4 rounded-full bg-neutral-300 block"></span>
                <p className="flex-1 text-neutral-500">Waves participated</p>
                <span className="font-semibold">4</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-neutral-500 pb-2 border-b border-neutral-300 font-semibold">
              Success rates
            </h3>
            <ul className="mt-4 space-y-2">
              <li className="flex flex-row items-center space-x-4">
                <span className="h-4 w-4 rounded-full bg-neutral-300 block"></span>
                <p className="flex-1 text-neutral-500">Waves participated</p>
                <span className="font-semibold">4</span>
              </li>
              <li className="flex flex-row items-center space-x-4">
                <span className="h-4 w-4 rounded-full bg-neutral-300 block"></span>
                <p className="flex-1 text-neutral-500">Waves participated</p>
                <span className="font-semibold">4</span>
              </li>
              <li className="flex flex-row items-center space-x-4">
                <span className="h-4 w-4 rounded-full bg-neutral-300 block"></span>
                <p className="flex-1 text-neutral-500">Waves participated</p>
                <span className="font-semibold">4</span>
              </li>
            </ul>
          </div>
        </section>
        <section className="mt-12">
          <h3 className="polymath-disp font-bold text-lg text-neutral-800">
            Supported ideas
          </h3>
          <Suspense fallback={"loading"}>
            <SupportedIdeaList supporterAddress={params.address} />
          </Suspense>
        </section>
      </div>
    </div>
  );
};

export default ScoutPage;
