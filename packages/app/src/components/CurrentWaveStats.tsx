import { ClockIcon } from "@heroicons/react/24/solid";
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import { LightBulbIcon } from "@heroicons/react/24/solid";
import { UserGroupIcon } from "@heroicons/react/24/solid";
import { StaticCountdown } from "@/components/ui/Counter";
import { WAVELENGTH } from "@/lib/constants";
import { formatUnits } from "viem";

const CurrentWaveStats = async () => {
  const difference = parseInt(blockNumber?.toString()) - waveInfo?.[1];
  const remainingBlocks = WAVELENGTH - difference;
  const remainingSeconds = remainingBlocks * 2;
  const now = new Date();
  const remainingTime = new Date(
    now.getTime() + (remainingSeconds > 0 ? remainingSeconds : 0) * 1000
  );

  return (
    <div className="grid grid-cols-2 gap-8 w-full mt-4">
      <div className="flex flex-row space-x-4 col-span-1 w-full">
        <span className="bg-blue-100 p-2 rounded-full">
          <ClockIcon className="text-blue-500 h-6 w-6" />
        </span>
        <div className="flex flex-col grow">
          <div className="flex flex-row justify-between text-blue-500">
            <span>Time</span>
            <StaticCountdown endDate={remainingTime} className="space-x-1" />
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
  );
};

export default CurrentWaveStats;
