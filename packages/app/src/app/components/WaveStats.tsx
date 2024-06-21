import { client } from "@/lib/viem";
import { configAddresses, WAVELENGTH } from "@/lib/constants";
import { IdeaTokenHubABI } from "@/abi/IdeaTokenHub";
import { IdeaToken } from "@/models/IdeaToken/types";
import WaveStatsUI from "./WaveStatsUI";

const url = process.env.NEXT_PUBLIC_GRAPHQL_URL!;

const getIdeas = async () => {
  const query = `
    query GetIdeaTokens {
      ideaTokens(where: { isArchived: false }) {
        items {
           id
           supporters {
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

  try {
    const data = await fetch(url, graphqlRequest);
    const json = await data.json();
    return json.data.ideaTokens.items;
  } catch (error) {
    console.log("error", error);
  }
};

const getCurrentWaveInfo = async () => {
  const waveInfo = await client.readContract({
    address: configAddresses.IdeaTokenHub as `0x${string}`,
    abi: IdeaTokenHubABI,
    functionName: "getCurrentWaveInfo",
  });

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

const WaveStats = async () => {
  const ideaTokens = (await getIdeas()) as IdeaToken[];
  const [currentWaveId, waveInfo] = await getCurrentWaveInfo();
  const currentWave = Number(currentWaveId);
  const { remainingTime, remainingSeconds } = await getRemainingTime(
    waveInfo.endBlock
  );

  return (
    <WaveStatsUI
      ideaTokens={ideaTokens}
      activeWave={currentWave}
      forWave={currentWave}
      remainingTime={remainingTime}
      remainingSeconds={remainingSeconds}
    />
  );
};

export default WaveStats;
