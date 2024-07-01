"use client";

import { useState } from "react";
import { formatUnits } from "viem";
import { useEnsAvatar, useEnsName } from "wagmi";
import { truncateEthAddress } from "@/lib/utils";
import { IdeaToken } from "@/models/IdeaToken/types";
import SupportButton from "./SupportButton";
import ActionDisplay from "./ActionDisplay";
import Button from "../ui/Button";
import Image from "next/image";

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

  const totalYield = ideaToken.supporters.items.reduce(
    (acc, supporter) => acc + BigInt(parseInt(supporter.balance.toString())),
    BigInt(0)
  );

  return (
    <div className="bg-white rounded-2xl flex flex-row transition-all group p-4 space-x-8">
      <div className="flex-1">
        <div className="flex flex-col">
          <div>
            <span className="text-neutral-500">{Number(ideaToken.id)}</span>
          </div>
          <h2 className="text-xl polymath-disp font-bold tracking-wide mt-4">
            {ideaToken.title}
          </h2>
          <div className="text-base polymath-text text-neutral-500 mt-4">
            By: {ensName.data || truncateEthAddress(ideaToken.author)}
          </div>
          <div className="flex flex-row space-x-2 items-center mt-4">
            <span className="text-neutral-500">Actions:</span>
            <span className="bg-blue-50 text-blue-500 text-sm px-4 py-1 rounded-full">
              Transfer 14 ETH
            </span>
            <span className="bg-blue-50 text-blue-500 text-sm px-4 py-1 rounded-full">
              Custom
            </span>
          </div>
        </div>
      </div>
      <div className="bg-neutral-100 rounded-lg p-4 flex flex-col">
        <span>
          <Image
            src="/badge.svg"
            alt="temporary nft image"
            width={150}
            height={150}
          />
        </span>
        <span className="text-sm text-center text-neutral-500">
          Supporters badge
        </span>
        {/* <span className="text-center font-bold text-xl">
          {formatUnits(totalYield, 18)} ETH
        </span>
        <div className="flex flex-row space-x-[-4px] mx-auto mt-2">
          <span className="bg-neutral-300 h-6 w-6 rounded-full block"></span>
          <span className="bg-neutral-300 h-6 w-6 rounded-full block"></span>
          <span className="bg-neutral-300 h-6 w-6 rounded-full block"></span>
          <span className="bg-neutral-300 h-6 w-6 rounded-full block"></span>
        </div> */}
      </div>
    </div>
  );
};

export default NewIdeaCard;
