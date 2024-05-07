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

const getIdeas = async () => {
  const url = "http://localhost:42069";
  const query = `
  query GetIdeaTokens {
    ideaTokens(where: { isArchived: false }) {
        id
        author
        title
        description
        createdAt
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

export default async function Home() {
  const ideaTokens = (await getIdeas()) as IdeaToken[];
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

  const sortedIdeaTokens = ideaTokensWithPooledEth.sort(
    (a, b) => b.pooledEth - a.pooledEth
  );

  const [currentWave, endingBlock] = await getCurrentWaveInfo();
  const { remainingSeconds } = await getRemainingTime(endingBlock);

  return (
    <>
      <div className="min-h-[calc(100vh-65px)] mt-[65px] pt-12 flex flex-col">
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
                  <div>
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
