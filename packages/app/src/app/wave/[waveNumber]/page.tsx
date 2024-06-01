import Link from "next/link";
import { formatUnits } from "viem";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import ExpandableIdeaCard from "@/components/IdeaCard/Expandable";
import IdeaCardSkeleton from "@/components/IdeaCard/Skeleton";
import { client } from "@/lib/viem";
import { configAddresses } from "@/lib/constants";
import { IdeaTokenHubABI } from "@/abi/IdeaTokenHub";
import { IdeaToken } from "@/models/IdeaToken/types";

// clears out next-js cache for viem calls
// this might not be the "best" way but at least it's not storing stale data
// TODO: review next's caching strategies and decide on best one.
export const dynamic = "force-dynamic";

const getCurrentWaveInfo = async () => {
  const waveInfo = await client.readContract({
    address: configAddresses.IdeaTokenHub as `0x${string}`,
    abi: IdeaTokenHubABI,
    functionName: "currentWaveInfo",
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
  const [currentWave, _] = await getCurrentWaveInfo();
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

  const isLoading = false;

  return (
    <div className="min-h-[calc(100vh-65px)] mt-[65px] pt-12 flex flex-col">
      <section className="w-[600px] mx-auto pb-6">
        <div className="flex flex-row items-center justify-between">
          <h1 className="polymath-disp font-bold text-2xl text-neutral-800">
            Wave {waveNumber}
          </h1>
          <div className="flex flex-row divide-x-2 divide-white">
            {parseInt(waveNumber) > 1 ? (
              <Link
                href={`/wave/${parseInt(waveNumber) - 1}`}
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
                currentWave <= parseInt(waveNumber) + 1
                  ? "/"
                  : `/wave/${parseInt(waveNumber) + 1}`
              }
              className="rounded-r-lg bg-neutral-100 hover:bg-neutral-200 cursor-pointer transition-colors p-2"
            >
              <ArrowRightIcon className="text-neutral-500 h-5 w-5" />
            </Link>
          </div>
        </div>

        <div className="flex flex-col space-y-4 w-full mt-4">
          <div className="flex flex-row justify-between text-neutral-400 items-center space-x-4">
            <span>Total yield</span>
            <span className="h-1 border-b border-dotted border-neutral-400 flex-grow"></span>
            <span>{formatUnits(BigInt(totalPooledEth), 18)} ETH</span>
          </div>

          <div className="flex flex-row justify-between text-neutral-400 items-center space-x-4">
            <span>Total winners</span>
            <span className="h-1 border-b border-dotted border-neutral-400 flex-grow"></span>
            <span>
              {winningIdeas?.length} idea{winningIdeas?.length !== 1 && "s"}
            </span>
          </div>
        </div>
      </section>
      <section className="bg-neutral-100 py-8 grow flex-1">
        <div className="w-[600px] mx-auto space-y-8">
          {isLoading ? (
            [1, 2, 3].map((_, idx) => {
              return <IdeaCardSkeleton key={`skelly-${idx}`} />;
            })
          ) : sortedIdeaTokens.length > 0 ? (
            sortedIdeaTokens.map((ideaToken, idx) => {
              return (
                <div key={`idea-${idx}`}>
                  <Link href={`/idea/${ideaToken.id}`}>
                    <ExpandableIdeaCard ideaToken={ideaToken} archived={true} />
                  </Link>
                </div>
              );
            })
          ) : (
            <div className="text-center text-neutral-500">
              There were no winning ideas in this wave.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default WavePage;
