import Link from "next/link";
import { formatUnits } from "viem";
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import { LightBulbIcon } from "@heroicons/react/24/solid";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import ExpandableIdeaCard from "@/components/IdeaCard/Expandable";
import IdeaCardSkeleton from "@/components/IdeaCard/Skeleton";
import { client } from "@/lib/viem";
import { configAddresses } from "@/lib/constants";
import { IdeaTokenHubABI } from "@/abi/IdeaTokenHub";

const getCurrentWaveInfo = async () => {
  const waveInfo = await client.readContract({
    address: configAddresses.IdeaTokenHub as `0x${string}`,
    abi: IdeaTokenHubABI,
    functionName: "currentWaveInfo",
  });

  return waveInfo;
};

const WavePage = async ({ params }: { params: { waveNumber: string } }) => {
  const [currentWave, _] = await getCurrentWaveInfo();
  const remainingTime = new Date(new Date().getTime() + 1000 * 60 * 60 * 24);
  const totalPooledEth = 0;
  const delegateProxies = [];
  const ideaTokens = [] as any[];
  const isLoading = false;
  const sortedIdeaTokens = ideaTokens;

  return (
    <div className="min-h-[calc(100vh-65px)] mt-[65px] pt-12 flex flex-col">
      <section className="w-[600px] mx-auto pb-12">
        <div className="flex flex-row items-center justify-between">
          <h1 className="polymath-disp font-bold text-2xl text-neutral-800">
            Wave {params.waveNumber}
          </h1>
          <div className="flex flex-row divide-x-2 divide-white">
            {parseInt(params.waveNumber) > 1 ? (
              <Link
                href={`/wave/${parseInt(params.waveNumber) - 1}`}
                className="rounded-l-lg bg-neutral-100 hover:bg-neutral-200 cursor-pointer transition-colors p-2"
              >
                <ArrowLeftIcon className="text-neutral-500 h-5 w-5" />
              </Link>
            ) : (
              <span className="rounded-l-lg bg-neutral-100 transition-colors p-2">
                <ArrowLeftIcon className="text-neutral-300 h-5 w-5" />
              </span>
            )}
            <Link
              href={
                currentWave === parseInt(params.waveNumber) + 1
                  ? "/"
                  : `/wave/${parseInt(params.waveNumber) + 1}`
              }
              className="rounded-r-lg bg-neutral-100 hover:bg-neutral-200 cursor-pointer transition-colors p-2"
            >
              <ArrowRightIcon className="text-neutral-500 h-5 w-5" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 w-full mt-4">
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
              <LightBulbIcon className="text-neutral-400 h-6 w-6" />
            </span>
            <div className="flex flex-col grow">
              <div className="flex flex-row justify-between text-neutral-400">
                <span>Total winners</span>
                <span>{ideaTokens.length}</span>
              </div>
              <div className="w-full h-3 rounded-full bg-neutral-100 relative">
                <div className="h-3 rounded-full bg-neutral-400 absolute top-0 left-0 w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
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
  );
};

export default WavePage;
