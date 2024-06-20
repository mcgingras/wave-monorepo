import { client } from "@/lib/viem";
import { configAddresses } from "@/lib/constants";
import { IdeaTokenHubABI } from "@/abi/IdeaTokenHub";
import { IdeaToken } from "@/models/IdeaToken/types";
import { Suspense } from "react";
import IdeaList from "./components/IdeaList";
import SupportersList from "../../components/SupportersList";
import WaveStats from "./components/WaveStats";

// clears out next-js cache for viem calls
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "only-no-store";

const LoadingCard = () => {
  return (
    <div className="bg-white rounded-lg p-6">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const getCurrentWaveInfo = async () => {
  const waveInfo = await client.readContract({
    address: configAddresses.IdeaTokenHub as `0x${string}`,
    abi: IdeaTokenHubABI,
    functionName: "getCurrentWaveInfo",
  });

  return waveInfo;
};

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

const WavePage = async ({
  params: { waveNumber },
}: {
  params: { waveNumber: string };
}) => {
  const [currentWaveId, _] = await getCurrentWaveInfo();
  const winningIdeas = (await getWinningIdeasForWave(
    BigInt(waveNumber)
  )) as IdeaToken[];

  const ideaTokensWithPooledEth = winningIdeas.map((ideaToken) => {
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

  const sortedIdeaTokens = ideaTokensWithPooledEth.sort(
    (a, b) => b.pooledEth - a.pooledEth
  );

  return (
    <div className="min-h-[calc(100vh-165px)] mt-[65px] pt-12 flex flex-col bg-neutral-100">
      <section className="container mx-auto pb-12 grid grid-cols-8 gap-8">
        <div className="col-span-5">
          <h2 className="polymath-disp font-bold text-2xl text-neutral-800 pt-6">
            Submissions
          </h2>
          <Suspense fallback={<LoadingCard />}>
            <IdeaList waveNumber={BigInt(waveNumber)} />
          </Suspense>
        </div>
        <div className="col-span-3">
          <Suspense fallback={<LoadingCard />}>
            <WaveStats waveNumber={BigInt(waveNumber)} />
          </Suspense>
          <Suspense fallback={<LoadingCard />}>
            <SupportersList />
          </Suspense>
        </div>
      </section>
    </div>
  );
};

export default WavePage;
