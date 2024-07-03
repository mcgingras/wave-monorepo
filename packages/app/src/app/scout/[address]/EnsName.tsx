"use client";

import { useEnsName } from "wagmi";
import { truncateEthAddress } from "@/lib/utils";

const EnsName = ({ address }: { address: `0x${string}` }) => {
  const ensName = useEnsName({ address, chainId: 1 });
  return (
    <h2 className="polymath-disp font-bold text-2xl text-neutral-800">
      {ensName.data || truncateEthAddress(address)}
    </h2>
  );
};

export default EnsName;
