"use client";

import Link from "next/link";
import { formatUnits } from "viem";
import { useIdeaTokens } from "@/models/IdeaToken/hooks";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";

export default function Home() {
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
    <section className="mt-24 w-[1200px] mx-auto">
      <div className="w-full flex flex-row items-center justify-between mb-2">
        <div className="flex flex-row space-x-4 items-center">
          <h1 className="text-2xl text-neutral-700">Leaderboard</h1>
          {/* <h1 className="text-2xl text-neutral-500">Delegates</h1> */}
        </div>
        <div className="space-x-2">
          <Link href="/idea/new">
            <button className="bg-white px-2 py-1 rounded-lg border text-sm text-gray-700">
              + New idea
            </button>
          </Link>
        </div>
      </div>
      <div className="border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Rank</TableHead>
              <TableHead className="w-[100px]">Idea Id</TableHead>
              <TableHead>Created at</TableHead>
              <TableHead>Author</TableHead>
              <TableHead className="text-left">Title</TableHead>
              <TableHead className="text-left">Supporters</TableHead>
              <TableHead className="text-left">Pooled ETH</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading
              ? [1, 2, 3].map((idx) => {
                  return (
                    <TableRow
                      key={`loading-${idx}`}
                      className="text-neutral-600"
                    >
                      <TableCell className="">
                        <span className="animate-pulse rounded bg-gray-200 block h-[12px] w-[50px]"></span>
                      </TableCell>
                      <TableCell className="">
                        <span className="animate-pulse rounded bg-gray-200 block h-[12px] w-[50px]"></span>
                      </TableCell>
                      <TableCell className="">
                        <span className="animate-pulse rounded bg-gray-200 block h-[12px] w-[50px]"></span>
                      </TableCell>
                      <TableCell className="">
                        <span className="animate-pulse rounded bg-gray-200 block h-[12px] w-[200px]"></span>
                      </TableCell>
                      <TableCell className="">
                        <span className="animate-pulse rounded bg-gray-200 block h-[12px] w-[150px]"></span>
                      </TableCell>
                      <TableCell className="">
                        <span className="animate-pulse rounded bg-gray-200 block h-[12px] w-[50px]"></span>
                      </TableCell>
                      <TableCell className="">
                        <span className="animate-pulse rounded bg-gray-200 block h-[12px] w-[50px]"></span>
                      </TableCell>
                    </TableRow>
                  );
                })
              : sortedIdeaTokens.map((ideaToken, idx) => {
                  return (
                    <TableRow className="text-neutral-600">
                      <TableCell className="text-left ">{idx + 1}</TableCell>
                      <TableCell className="font-medium ">
                        {ideaToken.id.toString()}
                      </TableCell>
                      <TableCell className="">
                        {ideaToken.createdAt.toString()}
                      </TableCell>
                      <TableCell className="">{ideaToken.author}</TableCell>
                      <TableCell className=" text-left">
                        {ideaToken.title}
                      </TableCell>
                      <TableCell className=" text-left">
                        {ideaToken.supporters.length}
                      </TableCell>
                      <TableCell className="text-left font-semibold text-green-500">
                        {formatUnits(BigInt(ideaToken.pooledEth), 18)}
                      </TableCell>
                      <TableCell>
                        <Link
                          key={ideaToken.id.toString()}
                          href={`/idea/${ideaToken.id}`}
                        >
                          <span className="text-blue-500">View</span>
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
