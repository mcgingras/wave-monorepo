"use client";

import { useEnsName } from "wagmi";
import { truncateEthAddress } from "@/lib/utils";

const AvatarAddress = ({ address }: { address: `0x${string}` }) => {
  return <span className="text-sm">{truncateEthAddress(address)}</span>;
};

export default AvatarAddress;
