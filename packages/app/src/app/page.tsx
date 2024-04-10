"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { formatUnits } from "viem";
import { useIdeaTokens } from "@/models/IdeaToken/hooks";
import { formatTimeAgo } from "@/lib/utils";

export default function Home() {
  const router = useRouter();
  const { ideaTokens, isLoading } = useIdeaTokens();
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

  const now = new Date();
  const sevenDays = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  return (
    <section className="mt-24">
      <div className="w-full flex flex-row items-end justify-between mb-4">
        <div className="flex flex-row space-x-4 items-center">
          <h1 className="text-2xl text-neutral-800 font-bold">Leaderboard</h1>
          {/* <h1 className="text-2xl text-neutral-500">Delegates</h1> */}
        </div>
        <div className="space-x-2">
          <Link href="/idea/new">
            <button className="px-4 py-2 rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors text-white">
              + New idea
            </button>
          </Link>
        </div>
      </div>
      <div className="flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-white">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Rank
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Created
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Author
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Supporters
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Pooled ETH
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {sortedIdeaTokens.map((idea, idx) => (
                    <tr
                      className="cursor-pointer hover:bg-gray-50"
                      key={idea.id.toString()}
                      onClick={() => {
                        router.push(`/idea/${idea.id}`);
                      }}
                    >
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {idx + 1}
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                        {formatTimeAgo(parseInt(idea.createdAt.toString()))}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {idea.author}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {idea.title}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {idea.supporters.length}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-green-500">
                        {formatUnits(BigInt(idea.pooledEth), 18)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
