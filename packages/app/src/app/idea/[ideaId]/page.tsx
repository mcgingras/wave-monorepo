"use client";
import { useIdeaToken } from "@/models/IdeaToken/hooks";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { configAddresses } from "@/lib/constants";
import { parseEther } from "viem";
import { IdeaTokenHubABI } from "@/abi/IdeaTokenHub";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { formatUnits } from "viem";

const IdeaPage = ({ params }: { params: { ideaId: bigint } }) => {
  const { ideaToken, isLoading } = useIdeaToken(params.ideaId);

  const { data: hash, writeContract, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const supportIdea = async () => {
    writeContract({
      chainId: 84532,
      address: configAddresses.IdeaTokenHub as `0x${string}`,
      abi: IdeaTokenHubABI,
      value: parseEther(".001"),
      functionName: "sponsorIdea",
      args: [params.ideaId],
    });
  };

  return (
    <section className="mt-24 w-[1200px] mx-auto">
      <h1 className="text-2xl text-neutral-700">{ideaToken?.title}</h1>
      <p className="text-neutral-500 mt-2">{ideaToken?.description}</p>

      <div className="w-full flex flex-row items-center justify-between mb-2 mt-12">
        <div className="flex flex-row space-x-4 items-center">
          <h1 className="text-2xl text-neutral-700">Supporters</h1>
          {/* <h1 className="text-2xl text-neutral-500">Delegates</h1> */}
        </div>
        <div className="space-x-2">
          <button
            onClick={supportIdea}
            disabled={isPending}
            className="bg-white px-2 py-1 rounded-lg border text-sm text-gray-700"
          >
            Support
          </button>
        </div>
      </div>
      <div className="border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Supporter</TableHead>
              <TableHead className="text-left">Amount</TableHead>
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
                    </TableRow>
                  );
                })
              : ideaToken?.supporters.map((supporter, idx) => {
                  return (
                    <TableRow className="text-neutral-600">
                      <TableCell className="text-left ">{idx + 1}</TableCell>
                      <TableCell className="">{supporter.owner}</TableCell>
                      <TableCell className="text-left font-semibold text-green-500">
                        +{formatUnits(BigInt(supporter.balance.toString()), 18)}
                      </TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default IdeaPage;
