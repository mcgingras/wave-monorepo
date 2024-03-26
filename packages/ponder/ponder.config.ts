import { createConfig } from "@ponder/core";
import { Address, http } from "viem";
import { PropLotHarnessABI } from "./abi/PropLotHarness";
import { IdeaTokenHubABI } from "./abi/IdeaTokenHub";

const startBlock = 7853000;

export const configAddresses = {
  PropLotHarness: "0xfDc4512f88046609eDfD3624d07814b1cee05d48",
  IdeaTokenHub: "0xD74330E1EC2fC9eF436895DF1fa665838bDf5832",
};

export default createConfig({
  networks: {
    baseSepolia: {
      chainId: 84532,
      // @ts-ignore
      transport: http(process.env.PONDER_RPC_URL_84532!),
    },
  },
  contracts: {
    PropLotHarness: {
      network: "baseSepolia",
      abi: PropLotHarnessABI,
      address: configAddresses.PropLotHarness as `0x${string}`,
      startBlock: startBlock,
    },
    IdeaTokenHub: {
      network: "baseSepolia",
      abi: IdeaTokenHubABI,
      address: configAddresses.IdeaTokenHub as `0x${string}`,
      startBlock: startBlock,
    },
  },
});
