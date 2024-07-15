"use client";

import { useEnsName } from "wagmi";
import { truncateEthAddress } from "@/lib/utils";

const EnsName = ({
  address,
  className,
}: {
  address: `0x${string}`;
  className?: string;
}) => {
  const ensName = useEnsName({ address, chainId: 1 });
  return (
    <h2 className={className}>{ensName.data || truncateEthAddress(address)}</h2>
  );
};

export default EnsName;
