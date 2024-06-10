import Link from "next/link";
import { configAddresses, WAVELENGTH } from "@/lib/constants";
import { IdeaTokenHubABI } from "@/abi/IdeaTokenHub";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import ExpandableIdeaCard from "@/components/IdeaCard/Expandable";
import CurrentWaveStats from "@/components/CurrentWaveStats";
import { IdeaToken } from "@/models/IdeaToken/types";
import FinalizeWaveCard from "@/components/FinalizeWaveCard";
import { client } from "@/lib/viem";

// clears out next-js cache for viem calls
// this might not be the "best" way but at least it's not storing stale data
// TODO: review next's caching strategies and decide on best one.
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "only-no-store";

const getIdeas = async () => {
  const url = process.env.NEXT_PUBLIC_GRAPHQL_URL!;
  const query = `
  query GetIdeaTokens {
    ideaTokens(where: { isArchived: false }) {
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
      variables: {},
    }),
  };

  try {
    const data = await fetch(url, graphqlRequest);
    const json = await data.json();
    return json.data.ideaTokens.items;
  } catch (e) {
    console.log("error", e);
    return [];
  }
};

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
  const ideaTokens = (await getIdeas()) as IdeaToken[];
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

  const sortedIdeaTokens = ideaTokensWithPooledEth.sort(
    (a, b) => b.pooledEth - a.pooledEth
  );

  const [currentWaveId, waveInfo] = await getCurrentWaveInfo();
  const currentWave = Number(currentWaveId);
  const { remainingSeconds } = await getRemainingTime(waveInfo.startBlock);

  return (
    <>
      <div className="min-h-[calc(100vh-165px)] mt-[65px] pt-12 flex flex-col">
        <section className="w-[600px] mx-auto pb-12">
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
          {remainingSeconds <= 0 ? <FinalizeWaveCard /> : <CurrentWaveStats />}
        </section>
        <section className="bg-neutral-100 py-8 grow flex-1">
          <div className="w-[600px] mx-auto space-y-8">
            {sortedIdeaTokens.length > 0 ? (
              sortedIdeaTokens.map((ideaToken, idx) => {
                return (
                  <div key={`idea-${idx}`}>
                    <Link href={`/idea/${ideaToken.id}`}>
                      <ExpandableIdeaCard ideaToken={ideaToken} />
                    </Link>
                  </div>
                );
              })
            ) : (
              <div>
                <p className="text-neutral-500 text-center">
                  No ideas submitted yet.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
