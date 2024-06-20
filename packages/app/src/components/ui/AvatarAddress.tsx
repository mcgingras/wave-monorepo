"use client";

import { useEnsAvatar, useEnsName } from "wagmi";
import { truncateEthAddress } from "@/lib/utils";

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

const AvatarAddress = ({ address }: { address: `0x${string}` }) => {
  return (
    <span className="flex flex-row items-center space-x-2">
      <SupporterAvatar address={address} />
      <span className="text-sm">{truncateEthAddress(address)}</span>
    </span>
  );
};

export default AvatarAddress;
