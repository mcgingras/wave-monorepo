"use client";

import { useState } from "react";
import { formatUnits } from "viem";
import { useEnsAvatar, useEnsName } from "wagmi";
import { truncateEthAddress } from "@/lib/utils";
import { IdeaToken } from "@/models/IdeaToken/types";
import SupportButton from "./SupportButton";
import ActionDisplay from "./ActionDisplay";

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
        {ensName.data ? ensName.data : truncateEthAddress(supporter.owner)}
      </p>
      <p className="text-xs px-2 py-1 bg-neutral-100 text-neutral-400 rounded-full self-start">
        {formatUnits(BigInt(supporter.balance.toString()), 18)}
      </p>
    </div>
  );
};

const ExpandableIdeaCard = ({
  ideaToken,
  expandable = true,
  clickable = true,
}: {
  ideaToken: IdeaToken;
  expandable?: boolean;
  clickable?: boolean;
}) => {
  const [isActionExpanded, setIsActionExpanded] = useState(!expandable);
  const [isSupportersExpanded, setIsSupportersExpanded] = useState(!expandable);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(
    !expandable
  );

  return (
    <div
      className={`bg-white rounded-2xl flex flex-col border border-transparent transition-all ${
        clickable ? "hover:border-neutral-200 cursor-pointer" : ""
      }`}
    >
      <div className="flex flex-row justify-between items-center border-b border-neutral-100 p-4">
        <div className="flex flex-col space-y-1">
          <div className="flex flex-row space-x-2 items-center justify-center">
            <h2 className="text-lg text-neutral-800 polymath-disp font-bold tracking-wide">
              {ideaToken.title}
            </h2>
            <p className="text-xs px-2 py-1 bg-neutral-100 text-neutral-400 rounded-full">
              {truncateEthAddress(ideaToken.author)}
            </p>
          </div>
          <p className="text-sm text-neutral-500 self-start">Yield: 1.1 ETH</p>
        </div>

        <div className="self-start">
          <SupportButton ideaId={ideaToken.id} />
        </div>
      </div>
      <div className="flex flex-col p-4 border-b border-neutral-100">
        <h3
          className="text-xs uppercase text-neutral-400 font-bold polymath-disp tracking-wider"
          onClick={() =>
            expandable && setIsDescriptionExpanded(!isDescriptionExpanded)
          }
        >
          Description
        </h3>
        <p
          className={`text-neutral-500 mt-2 text-sm ${
            !isDescriptionExpanded && "line-clamp-2"
          }`}
        >
          {ideaToken.description}
        </p>
      </div>
      <div className="flex flex-col p-4 border-b border-neutral-100">
        <div
          className="flex flex-row justify-between items-center"
          onClick={() => expandable && setIsActionExpanded(!isActionExpanded)}
        >
          <h3 className="text-xs uppercase text-neutral-400 font-bold polymath-disp tracking-wider">
            Actions
          </h3>
          <div className="flex flex-row space-x-2">
            <span className="text-xs px-2 py-1 bg-neutral-100 text-neutral-400 rounded-full self-start uppercase">
              1.4 ETH ASK
            </span>
            <span className="text-xs px-2 py-1 bg-neutral-100 text-neutral-400 rounded-full self-start uppercase">
              2 CUSTOM
            </span>
          </div>
        </div>
        {isActionExpanded && <ActionDisplay actions={ideaToken.actions} />}
      </div>
      <div className="flex flex-col p-4">
        <div
          className="flex flex-row justify-between items-center"
          onClick={() =>
            expandable && setIsSupportersExpanded(!isSupportersExpanded)
          }
        >
          <h3 className="text-xs uppercase text-neutral-400 font-bold polymath-disp tracking-wider">
            Supporters
          </h3>
          <div className="flex flex-row items-center space-x-[-8px]">
            <span className="h-6 w-6 rounded-full border bg-white"></span>
            <span className="h-6 w-6 rounded-full border bg-white"></span>
            <span className="h-6 w-6 rounded-full border bg-white"></span>
            <span className="h-6 px-2 rounded-full border border-white text-xs text-neutral-400 bg-neutral-100 flex items-center">
              +28
            </span>
          </div>
        </div>
        {isSupportersExpanded && (
          <div className="mt-2 grid grid-cols-2 gap-4">
            {ideaToken.supporters.map((supporter, idx) => {
              return <SupporterItem key={idx} supporter={supporter} />;
            })}
          </div>
        )}
      </div>
      {/* <div className="flex flex-row px-4 py-2 bg-neutral-50 rounded-b-2xl text-xs text-neutral-500">
        Wave 1
      </div> */}
    </div>
  );
};

export default ExpandableIdeaCard;
