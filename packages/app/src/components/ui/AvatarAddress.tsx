"use client";

import { useEnsAvatar, useEnsName } from "wagmi";
import { truncateEthAddress } from "@/lib/utils";
import Image from "next/image";

const SupporterAvatar = ({ address }: { address: `0x${string}` }) => {
  const ensName = useEnsName({ address, chainId: 1 });
  const ensAvatar = useEnsAvatar({
    name: ensName.data || "",
    chainId: 1,
  });

  if (ensAvatar.data) {
    return (
      <Image
        src={ensAvatar.data}
        height={24}
        width={24}
        className="rounded-full"
        alt="ENS avatar for user."
      />
    );
  } else {
    return <span className="bg-neutral-200 h-6 w-6 rounded-full block"></span>;
  }
};

const AvatarAddress = ({
  address,
  className,
}: {
  address: `0x${string}`;
  className?: string;
}) => {
  const ensName = useEnsName({ address, chainId: 1 });
  return (
    <span className={`flex flex-row items-center space-x-2 ${className}`}>
      <SupporterAvatar address={address} />
      <span className="text-base">
        {ensName.data || truncateEthAddress(address)}
      </span>
    </span>
  );
};

export default AvatarAddress;
