import { IdeaToken } from "@/models/IdeaToken/types";
import WaveStatsUI from "../../../components/WaveStatsUI";
import { client } from "@/lib/viem";
import { configAddresses } from "@/lib/constants";
import { IdeaTokenHubABI } from "@/abi/IdeaTokenHub";

const url = process.env.NEXT_PUBLIC_GRAPHQL_URL!;

const getWinningIdeasForWave = async (waveId: bigint) => {
  const url = process.env.NEXT_PUBLIC_GRAPHQL_URL!;
  const query = `
      query GetIdeaTokensForWave($waveId: Int!) {
        ideaTokens(where: { waveId: $waveId }) {
            items {
                id
                author
                title
                description
                createdAt
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
      variables: { waveId: parseInt(waveId.toString()) },
    }),
  };

  const data = await fetch(url, graphqlRequest);
  const json = await data.json();
  return json.data.ideaTokens.items;
};

const getCurrentWaveInfo = async () => {
  const waveInfo = await client.readContract({
    address: configAddresses.IdeaTokenHub as `0x${string}`,
    abi: IdeaTokenHubABI,
    functionName: "getCurrentWaveInfo",
  });

  return waveInfo;
};

const WaveStats = async ({ waveNumber }: { waveNumber: bigint }) => {
  const ideaTokens = (await getWinningIdeasForWave(waveNumber)) as IdeaToken[];
  const [currentWaveId, _] = await getCurrentWaveInfo();
  const now = new Date();

  return (
    <WaveStatsUI
      ideaTokens={ideaTokens}
      forWave={Number(waveNumber)}
      activeWave={Number(currentWaveId)}
      remainingTime={now}
      remainingSeconds={0}
    />
  );
};

export default WaveStats;
