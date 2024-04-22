"use client";
import { useIdeaToken } from "@/models/IdeaToken/hooks";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { configAddresses } from "@/lib/constants";
import { IdeaTokenHubABI } from "@/abi/IdeaTokenHub";
import { TableCell, TableRow } from "@/components/ui/Table";
import { parseEther, formatUnits } from "viem";
import { truncateEthAddress } from "@/lib/utils";
import Button from "@/components/ui/Button";

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
    <div className="h-full flex flex-col">
      <section className="mt-12 w-[600px] mx-auto">
        <div className="col-span-3">
          <div className="flex flex-row justify-between">
            <h1 className="text-2xl text-neutral-700 font-bold polymath-disp tracking-wide">
              {ideaToken?.title}
            </h1>
            <Button
              type="primary"
              title="Support"
              onClick={() => supportIdea?.()}
            />
          </div>
          <p className="text-neutral-500 mt-2 bg-white p-4 border rounded-lg">
            {ideaToken?.description}
          </p>
          <h1 className="text-2xl text-neutral-700 font-bold mt-6 mb-2">
            Actions
          </h1>
          <p className="text-neutral-500 mt-2 bg-white p-4 border rounded-lg">
            {ideaToken?.actions.targets.map((target, idx) => (
              <div key={`target-${idx}`} className="flex items-center">
                <span className="text-neutral-700 font-bold">{target}</span>
                <span className="text-neutral-500 ml-2">
                  {ideaToken?.actions.values[idx]} ETH
                </span>
              </div>
            ))}
          </p>
        </div>
      </section>
      <section className="bg-neutral-100 grow pt-8">
        <div className="col-span-2 w-[600px] mx-auto">
          <div className="flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-white">
                      <tr>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Supporter
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Contributed
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {isLoading
                        ? [1, 2, 3].map((idx) => {
                            return (
                              <TableRow
                                key={`loading-${idx}`}
                                className="text-neutral-600"
                              >
                                <TableCell className="">
                                  <span className="animate-pulse rounded bg-gray-200 block h-[12px] w-[200px]"></span>
                                </TableCell>
                                <TableCell className="">
                                  <span className="animate-pulse rounded bg-gray-200 block h-[12px] w-[50px]"></span>
                                </TableCell>
                              </TableRow>
                            );
                          })
                        : ideaToken?.supporters.map((supporter, idx) => (
                            <tr
                              className="cursor-pointer hover:bg-gray-50"
                              key={`supporter-${idx}`}
                            >
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                                {truncateEthAddress(supporter.owner)}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-green-500">
                                {formatUnits(
                                  BigInt(supporter.balance.toString()),
                                  18
                                )}{" "}
                                ETH
                              </td>
                            </tr>
                          ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IdeaPage;
