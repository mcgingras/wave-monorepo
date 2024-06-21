"use client";

import { useEnsAvatar, useEnsName } from "wagmi";
import { truncateEthAddress } from "@/lib/utils";
import { IdeaToken } from "@/models/IdeaToken/types";

const FullIdeaCard = ({ ideaToken }: { ideaToken: IdeaToken }) => {
  const ensName = useEnsName({
    address: ideaToken.author as `0x${string}`,
    chainId: 1,
  });

  const totalYield = ideaToken.supporters.items.reduce(
    (acc, supporter) => acc + BigInt(parseInt(supporter.balance.toString())),
    BigInt(0)
  );

  return (
    <div className="bg-white rounded-2xl flex flex-col p-6">
      <h2 className="text-2xl polymath-disp font-bold tracking-wide">
        {ideaToken.title}
      </h2>
      <div className="flex flex-row items-center space-x-4 mt-6">
        <span className="text-neutral-500">Created by</span>
        <span className="h-1 border-b border-dotted flex-1 border-neutral-300"></span>
        <p className="font-bold">
          {ensName.data || truncateEthAddress(ideaToken.author)}
        </p>
      </div>
      <div className="flex flex-row items-center space-x-4 mt-4">
        <span className="text-neutral-500">Actions</span>
        <span className="h-1 border-b border-dotted flex-1 border-neutral-300"></span>
        <span className="bg-violet-100 text-violet-500 text-sm px-2 py-1 rounded-full">
          Transfer
        </span>
      </div>

      <span className="font-bold mt-6">Description</span>
      <p className="text-base text-neutral-500">{ideaToken.description}</p>
    </div>
  );
};

export default FullIdeaCard;
