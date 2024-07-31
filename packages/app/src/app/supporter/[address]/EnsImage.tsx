"use client";

import { useEnsAvatar, useEnsName } from "wagmi";
import Image from "next/image";

const EnsImage = ({ address }: { address: `0x${string}` }) => {
  const ensName = useEnsName({ address, chainId: 1 });
  const ensAvatar = useEnsAvatar({
    name: ensName.data || "",
    chainId: 1,
  });

  if (ensAvatar.data) {
    return (
      <Image
        src={ensAvatar.data}
        height={48}
        width={48}
        className="rounded-full"
        alt="ENS avatar for user."
      />
    );
  } else {
    return (
      <span className={`h-12 w-12 bg-neutral-200 rounded-full block`}></span>
    );
  }
};

export default EnsImage;
