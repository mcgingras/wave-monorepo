"use client";

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
import { Counter, Countdown } from "@/components/ui/Counter";
import { format } from "path";

export default function Home() {
  const { ideaTokens } = useIdeaTokens();
  const now = new Date();
  const sevenDays = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  return (
    <section className="h-full flex items-center justify-center">
      <div className="w-[1200px]">
        <div className="w-full flex flex-row items-center justify-between mb-2">
          <div className="flex flex-row space-x-4 items-center">
            <h1 className="font-bold uppercase tracking-wider text-sm">
              Wave 1:
            </h1>
            <Countdown endDate={sevenDays} />
          </div>
          <button className="bg-white px-2 py-1 rounded-lg border text-sm text-gray-700">
            + New idea
          </button>
        </div>
        <div className="border rounded-lg bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left">Rank</TableHead>
                <TableHead className="w-[100px]">Number</TableHead>
                <TableHead>Created at</TableHead>
                <TableHead>Author</TableHead>
                <TableHead className="text-left">Title</TableHead>
                <TableHead className="text-left">Supporters</TableHead>
                <TableHead className="text-left">Pooled ETH</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ideaTokens.map((ideaToken, idx) => {
                const pooledEth = ideaToken.supporters.reduce(
                  (acc, supporter) =>
                    acc + parseInt(supporter.balance.toString()),
                  0
                );
                return (
                  <TableRow
                    key={ideaToken.id.toString()}
                    className="text-neutral-600"
                  >
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
                      +{formatUnits(BigInt(pooledEth), 18)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}
