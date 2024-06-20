import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { IdeaToken } from "@/models/IdeaToken/types";
import { StaticCountdown } from "@/components/ui/Counter";
import { formatUnits } from "viem";
import FinalizeWaveButton from "@/components/FinalizeWaveCard";

const WaveStatsUI = async ({
  ideaTokens,
  forWave,
  activeWave,
  remainingTime,
  remainingSeconds,
}: {
  ideaTokens: IdeaToken[];
  forWave: number;
  activeWave: number;
  remainingTime: Date;
  remainingSeconds: number;
}) => {
  const ideaTokensWithPooledEth = ideaTokens.map((ideaToken) => {
    const pooledEth = ideaToken.supporters.items.reduce(
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

  return (
    <div className="bg-white rounded-lg p-4">
      <div className="flex flex-row items-center justify-between">
        <h1 className="polymath-disp font-bold text-2xl text-neutral-800">
          Wave {forWave}
        </h1>
        <div className="flex flex-row divide-x-2 divide-white">
          {forWave > 1 ? (
            <Link
              href={`/wave/${forWave - 1}`}
              className="rounded-l-lg bg-neutral-100 hover:bg-neutral-200 cursor-pointer transition-colors p-2"
            >
              <ArrowLeftIcon className="text-neutral-500 h-5 w-5" />
            </Link>
          ) : (
            <span className="rounded-l-lg bg-neutral-100 transition-colors p-2">
              <ArrowLeftIcon className="text-neutral-300 h-5 w-5" />
            </span>
          )}
          {forWave < activeWave ? (
            <Link
              href={forWave + 1 === activeWave ? `/` : `/wave/${forWave + 1}`}
              className="rounded-r-lg bg-neutral-100 hover:bg-neutral-200 cursor-pointer transition-colors p-2"
            >
              <ArrowRightIcon className="text-neutral-500 h-5 w-5" />
            </Link>
          ) : (
            <span className="rounded-r-lg bg-neutral-100 transition-colors p-2">
              <ArrowRightIcon className="text-neutral-300 h-5 w-5" />
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-row space-x-2 mt-4">
        <div className="bg-neutral-100 rounded-lg p-4 flex-1 flex flex-col text-center">
          <span className="text-sm text-neutral-500">Submissions</span>
          <span>{ideaTokens.length}</span>
        </div>
        <div className="bg-neutral-100 rounded-lg p-4 flex-1 flex flex-col text-center">
          <span className="text-sm text-neutral-500">Total yield</span>
          <span className="">
            {formatUnits(BigInt(totalPooledEth), 18)} ETH
          </span>
        </div>
      </div>
      {activeWave === forWave && (
        <div className="mt-4">
          {remainingSeconds <= 0 ? (
            <FinalizeWaveButton />
          ) : (
            <Link href="/new">Add new idea</Link>
          )}
        </div>
      )}
      <p className="text-center text-neutral-500 text-sm mt-4">
        {remainingSeconds <= 0 ? (
          "Wave has ended"
        ) : (
          <StaticCountdown endDate={remainingTime} className="space-x-1" />
        )}
      </p>
    </div>
  );
};

export default WaveStatsUI;
