import { StaticCountdown } from "@/components/ui/Counter";
import { WAVELENGTH, configAddresses } from "@/lib/constants";
import { IdeaTokenHubABI } from "@/abi/IdeaTokenHub";
import { formatUnits } from "viem";
import { getClient } from "@/lib/viem";
import { IdeaToken } from "@/models/IdeaToken/types";

const url = process.env.NEXT_PUBLIC_GRAPHQL_URL!;

const getIdeas = async () => {
  const query = `
    query GetIdeaTokens {
      ideaTokens(where: { isArchived: false }) {
        items {
           id
           supports {
                items {
                    balance
                }
            }
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
  return json.data.ideaTokens.items;
};

const getDelegates = async () => {
  const query = `
  query GetDelegateProxies {
    delegateProxys {
        items {
            id
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
    }),
  };

  const data = await fetch(url, graphqlRequest);
  const json = await data.json();
  return json.data;
};

const getCurrentWaveInfo = async () => {
  const client = getClient(process.env.NEXT_PUBLIC_ENV === "dev" ? 84532 : 1);
  const waveInfo = await client.readContract({
    address: configAddresses.IdeaTokenHub as `0x${string}`,
    abi: IdeaTokenHubABI,
    functionName: "getCurrentWaveInfo",
  });

  return waveInfo;
};

const getRemainingTime = async (endingBlock: number) => {
  const client = getClient(process.env.NEXT_PUBLIC_ENV === "dev" ? 84532 : 1);
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
  const [_, waveInfo] = await getCurrentWaveInfo();
  const { remainingTime } = await getRemainingTime(waveInfo.endBlock);
  const delegateProxies = await getDelegates();

  const ideaTokensWithPooledEth = ideaTokens.map((ideaToken) => {
    const pooledEth = ideaToken.supports.items.reduce(
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
    <div className="flex flex-col space-y-4 w-full mt-4">
      <div className="flex flex-row justify-between text-neutral-400 items-center space-x-4">
        <span>Time</span>
        <span className="h-1 border-b border-dotted border-neutral-400 flex-grow"></span>
        <StaticCountdown endDate={remainingTime} className="space-x-1" />
      </div>
      <div className="flex flex-row justify-between text-neutral-400 items-center space-x-4">
        <span>Total yield</span>
        <span className="h-1 border-b border-dotted border-neutral-400 flex-grow"></span>
        <span>{formatUnits(BigInt(totalPooledEth), 18)} ETH</span>
      </div>
      <div className="flex flex-row justify-between text-neutral-400 items-center space-x-4">
        <span>Total delegates</span>
        <span className="h-1 border-b border-dotted border-neutral-400 flex-grow"></span>
        <span>{delegateProxies.delegateProxys.items.length}</span>
      </div>
      <div className="flex flex-row justify-between text-neutral-400 items-center space-x-4">
        <span>Total ideas</span>
        <span className="h-1 border-b border-dotted border-neutral-400 flex-grow"></span>
        <span>{ideaTokens.length}</span>
      </div>
    </div>
  );
};

export default CurrentWaveStats;
