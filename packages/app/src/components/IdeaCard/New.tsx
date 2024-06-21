"use client";

import { useState } from "react";
import { formatUnits } from "viem";
import { useEnsAvatar, useEnsName } from "wagmi";
import { truncateEthAddress } from "@/lib/utils";
import { IdeaToken } from "@/models/IdeaToken/types";
import SupportButton from "./SupportButton";
import ActionDisplay from "./ActionDisplay";
import Button from "../ui/Button";

const SupporterAvatar = ({ address }: { address: `0x${string}` }) => {
  const ensName = useEnsName({ address, chainId: 1 });
  const ensAvatar = useEnsAvatar({
    name: ensName.data ? ensName.data : "",
    chainId: 1,
  });

  if (ensAvatar.data) {
    return <img src={ensAvatar.data} className="h-6 w-6 rounded-full" />;
  } else {
    return <span className="bg-neutral-200 h-6 w-6 rounded-full block"></span>;
  }
};

const SupporterItem = ({ supporter }: { supporter: any }) => {
  const ensName = useEnsName({ address: supporter.owner, chainId: 1 });
  const ensAvatar = useEnsAvatar({
    name: ensName.data ? ensName.data : "",
    chainId: 1,
  });

  return (
    <div className="space-x-2 flex flex-row items-center">
      {ensAvatar.data ? (
        <img src={ensAvatar.data} className="h-6 w-6 rounded-full" />
      ) : (
        <span className="bg-neutral-200 h-6 w-6 rounded-full block"></span>
      )}
      <p className="text-sm">
        {ensName.data ? ensName.data : truncateEthAddress(supporter?.owner)}
      </p>
      <p className="text-xs px-2 py-1 bg-neutral-100 text-neutral-400 rounded-full self-start">
        {formatUnits(BigInt(supporter.balance.toString()), 18)}
      </p>
    </div>
  );
};

const NewIdeaCard = ({ ideaToken }: { ideaToken: IdeaToken }) => {
  const ensName = useEnsName({
    address: ideaToken.author as `0x${string}`,
    chainId: 1,
  });
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(true);

  const totalYield = ideaToken.supporters.items.reduce(
    (acc, supporter) => acc + BigInt(parseInt(supporter.balance.toString())),
    BigInt(0)
  );

  return (
    <div className="bg-white rounded-2xl flex flex-col transition-all group">
      <div className="flex flex-row justify-between items-center px-4 py-2 bg-blue-100 rounded-t-2xl text-blue-500">
        <div className="flex flex-col space-y-1">
          <div className="flex flex-row space-x-2 items-center justify-center">
            <h2 className="text-lg polymath-disp font-bold tracking-wide">
              {ideaToken.title}
            </h2>
          </div>
        </div>
        <div className="text-base polymath-text">
          {ensName.data || truncateEthAddress(ideaToken.author)}
          {/* <SupportButton ideaId={ideaToken.id} /> */}
        </div>
      </div>
      <div className="flex flex-col p-4">
        <p
          className={`bg-neutral-50 p-2 rounded text-neutral-500 mt-2 text-sm ${
            !isDescriptionExpanded && "line-clamp-2"
          }`}
        >
          {ideaToken.description}
        </p>
      </div>
      <div className="flex flex-col px-4 pb-4 rounded-b-2xl">
        <div className="flex flex-row items-center justify-between border-b pb-2">
          <span className="text-neutral-500">Supporters</span>
          <p className="self-start font-bold">0</p>
        </div>
        <div className="flex flex-row items-center justify-between border-b py-2">
          <span className="text-neutral-500">Pooled ETH</span>
          <p className="self-start font-bold">
            {formatUnits(totalYield, 18)} ETH
          </p>
        </div>
        <div className="flex flex-row items-center justify-between pt-2">
          <span className="text-neutral-500">Actions</span>
          <span className="bg-violet-100 text-violet-500 text-sm px-2 py-1 rounded-full">
            Transfer
          </span>
        </div>
      </div>
      {/* <div className="flex flex-row px-4 py-2 bg-neutral-50 rounded-b-2xl text-xs text-neutral-500">
        Wave 1
      </div> */}
    </div>
  );
};

export default NewIdeaCard;
