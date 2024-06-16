import Link from "next/link";
import { configAddresses, WAVELENGTH } from "@/lib/constants";
import { IdeaTokenHubABI } from "@/abi/IdeaTokenHub";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import CurrentWaveStats from "@/components/CurrentWaveStats";
import FinalizeWaveCard from "@/components/FinalizeWaveCard";
import { client } from "@/lib/viem";
import IdeaList from "./components/IdeaList";
import { Suspense } from "react";
import SupportersList from "./components/SupportersList";

// clears out next-js cache for viem calls
// this might not be the "best" way but at least it's not storing stale data
// TODO: review next's caching strategies and decide on best one.
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "only-no-store";

const getCurrentWaveInfo = async () => {
  const waveInfo = await client.readContract({
    address: configAddresses.IdeaTokenHub as `0x${string}`,
    abi: IdeaTokenHubABI,
    functionName: "getCurrentWaveInfo",
  });

  console.log(waveInfo);

  return waveInfo;
};

const getRemainingTime = async (startingBlock: number) => {
  const blockNumber = await client.getBlockNumber();
  const timeElapsed = parseInt(blockNumber?.toString()) - startingBlock;
  const remainingBlocks = WAVELENGTH - timeElapsed;
  const remainingSeconds = remainingBlocks * 2;
  const now = new Date();
  const remainingTime = new Date(
    now.getTime() + (remainingSeconds > 0 ? remainingSeconds : 0) * 1000
  );

  return { remainingTime, remainingSeconds };
};

export default async function Home() {
  const [currentWaveId, waveInfo] = await getCurrentWaveInfo();
  const currentWave = Number(currentWaveId);
  const { remainingSeconds } = await getRemainingTime(waveInfo.startBlock);

  return (
    <>
      <div className="min-h-[calc(100vh-165px)] mt-[65px] pt-12 flex flex-col bg-neutral-100">
        <section className="container mx-auto pb-12 grid grid-cols-8 gap-8">
          <div className="col-span-5">
            <h2 className="polymath-disp font-bold text-2xl text-neutral-800 pt-6">
              Submissions
            </h2>
            <Suspense fallback={<div>Loading...</div>}>
              <IdeaList />
            </Suspense>
          </div>
          <div className="col-span-3">
            <div className="bg-white rounded-lg p-4">
              <div className="flex flex-row items-center justify-between">
                <h1 className="polymath-disp font-bold text-2xl text-neutral-800">
                  Wave {currentWave}
                </h1>
                <div className="flex flex-row divide-x-2 divide-white">
                  <Link
                    href={`/wave/${currentWave - 1}`}
                    className="rounded-l-lg bg-neutral-100 hover:bg-neutral-200 cursor-pointer transition-colors p-2"
                  >
                    <ArrowLeftIcon className="text-neutral-500 h-5 w-5" />
                  </Link>
                  <span className="rounded-r-lg bg-neutral-100 transition-colors p-2">
                    <ArrowRightIcon className="text-neutral-300 h-5 w-5" />
                  </span>
                </div>
              </div>
              <div className="flex flex-row space-x-2 mt-4">
                <div className="bg-neutral-100 rounded-lg p-4 flex-1 flex flex-col text-center">
                  <span className="text-sm text-neutral-500">Submissions</span>
                  <span>1000</span>
                </div>
                <div className="bg-neutral-100 rounded-lg p-4 flex-1 flex flex-col text-center">
                  <span className="text-sm text-neutral-500">Total yield</span>
                  <span className="">1000 ETH</span>
                </div>
              </div>
              {remainingSeconds <= 0 ? (
                <FinalizeWaveCard />
              ) : (
                <CurrentWaveStats />
              )}
            </div>
            <Suspense fallback={<div>Loading...</div>}>
              <SupportersList />
            </Suspense>
          </div>
        </section>
      </div>
    </>
  );
}
