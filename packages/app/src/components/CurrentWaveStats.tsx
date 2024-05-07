import { ClockIcon } from "@heroicons/react/24/solid";
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import { LightBulbIcon } from "@heroicons/react/24/solid";
import { UserGroupIcon } from "@heroicons/react/24/solid";
import { StaticCountdown } from "@/components/ui/Counter";
import { WAVELENGTH, configAddresses } from "@/lib/constants";
import { IdeaTokenHubABI } from "@/abi/IdeaTokenHub";
import { formatUnits } from "viem";
import { client } from "@/lib/viem";
import { IdeaToken } from "@/models/IdeaToken/types";

const url = "http://localhost:42069";

const getIdeas = async () => {
  const query = `
    query GetIdeaTokens {
      ideaTokens(where: { isArchived: false }) {
          id
          supporters {
            balance
          }
        }
      }
   `;

  const graphqlRequest = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: {},
    }),
  };

  const data = await fetch(url, graphqlRequest);
  const json = await data.json();
  return json.data.ideaTokens;
};

const getDelegates = async () => {
  const query = `
  query GetDelegateProxies {
    delegateProxys {
        id
      }
    }
 `;

  const graphqlRequest = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
    }),
  };

  const data = await fetch(url, graphqlRequest);
  const json = await data.json();
  return json.data;
};

const getCurrentWaveInfo = async () => {
  const waveInfo = await client.readContract({
    address: configAddresses.IdeaTokenHub as `0x${string}`,
    abi: IdeaTokenHubABI,
    functionName: "currentWaveInfo",
  });

  return waveInfo;
};

const getRemainingTime = async (endingBlock: number) => {
  const blockNumber = await client.getBlockNumber();
  const difference = parseInt(blockNumber?.toString()) - endingBlock;
  const remainingBlocks = WAVELENGTH - difference;
  const remainingSeconds = remainingBlocks * 2;
  const now = new Date();
  const remainingTime = new Date(
    now.getTime() + (remainingSeconds > 0 ? remainingSeconds : 0) * 1000
  );

  return { remainingTime, remainingSeconds };
};

const CurrentWaveStats = async () => {
  const ideaTokens = (await getIdeas()) as IdeaToken[];
  const [_, endingBlock] = await getCurrentWaveInfo();
  const { remainingTime } = await getRemainingTime(endingBlock);
  const delegateProxies = await getDelegates();

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
