"use client";

import { useEnsName } from "wagmi";
import { truncateEthAddress } from "@/lib/utils";
import { IdeaToken } from "@/models/IdeaToken/types";
import Markdown from "react-markdown";
import { formatUnits } from "viem";
import { TransactionPill } from "../ActionList";
import {
  resolveAction as resolveActionTransactions,
  parse,
} from "@/lib/camp/transactions";

const FullIdeaCard = ({ ideaToken }: { ideaToken: IdeaToken }) => {
  const ensName = useEnsName({
    address: ideaToken.author as `0x${string}`,
    chainId: 1,
  });

  const totalYield = ideaToken.supports.items.reduce(
    (acc, supporter) => acc + BigInt(parseInt(supporter.balance.toString())),
    BigInt(0)
  );

  const actions = JSON.parse(ideaToken.actions);
  const parsedActions = parse(actions, { chainId: 1 });

  return (
    <div className="bg-white rounded-2xl flex flex-col p-6">
      <div className="flex flex-row items-center space-x-2">
        <span className="text-neutral-500 bg-neutral-100 rounded-lg text-sm px-4 py-1 flex items-center justify-center">
          {ideaToken.id.toString()}
        </span>
        <h2 className="text-2xl polymath-disp font-bold tracking-wide text-neutral-700">
          {ideaToken.title}
        </h2>
      </div>
      <div className="flex flex-row items-center space-x-4 mt-6">
        <span className="text-neutral-500">Created by</span>
        <span className="h-1 border-b border-dotted flex-1 border-neutral-300"></span>
        <p className="font-bold text-neutral-700">
          {ensName.data || truncateEthAddress(ideaToken.author)}
        </p>
      </div>
      <div className="flex flex-row items-center space-x-4 mt-6">
        <span className="text-neutral-500">Total yield</span>
        <span className="h-1 border-b border-dotted flex-1 border-neutral-300"></span>
        <p className="font-bold text-neutral-700">
          {formatUnits(totalYield, 18)} ETH
        </p>
      </div>
      <div className="flex flex-row items-center space-x-4 mt-4">
        <span className="text-neutral-500">Actions</span>
        <span className="h-1 border-b border-dotted flex-1 border-neutral-300"></span>
        <div>
          {parsedActions.map((action: any, idx: number) => {
            return (
              <TransactionPill key={`action-${idx}`} transaction={action} />
            );
          })}
        </div>
      </div>

      <span className="font-bold mt-6 text-neutral-700">Description</span>
      <div className="bg-neutral-100 p-2 rounded-md prose text-sm text-neutral-500 mt-2">
        <Markdown>{ideaToken.description}</Markdown>
      </div>
    </div>
  );
};

export default FullIdeaCard;
