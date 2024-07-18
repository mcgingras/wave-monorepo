"use client";

import { useEnsAvatar, useEnsName } from "wagmi";
import { truncateEthAddress } from "@/lib/utils";
import Image from "next/image";

const SupporterAvatar = ({
  address,
  size = "base",
}: {
  address: `0x${string}`;
  size?: "sm" | "base";
}) => {
  const { data: ensName } = useEnsName({ address, chainId: 1 });
  const ensAvatar = useEnsAvatar({
    name: ensName || "",
    chainId: 1,
  });

  if (ensAvatar.data) {
    return (
      <Image
        src={ensAvatar.data}
        height={size === "base" ? 24 : 20}
        width={size === "base" ? 24 : 20}
        className="rounded-full"
        alt="ENS avatar for user."
      />
    );
  } else {
    return (
      <span
        className={`${
          size === "base" ? "h-6 w-6" : "h-5 w-5"
        } bg-neutral-200 rounded-full block`}
      ></span>
    );
  }
};

const AvatarAddress = ({
  address,
  className,
  size = "base",
}: {
  address: `0x${string}`;
  className?: string;
  size?: "sm" | "base";
}) => {
  const ensName = useEnsName({ address, chainId: 1 });
  return (
    <span className={`flex flex-row items-center space-x-2 ${className}`}>
      <SupporterAvatar address={address} size={size} />
      <span
        className={`${
          size === "base" ? "text-base" : "text-sm"
        } text-neutral-700`}
      >
        {ensName.data || truncateEthAddress(address)}
      </span>
    </span>
  );
};

export default AvatarAddress;
