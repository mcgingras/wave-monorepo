import { createConfig } from "@ponder/core";
import { Address, http, parseAbiItem } from "viem";
import { WaveHarnessABI } from "./abi/WaveHarness";
import { DelegateABI } from "./abi/Delegate";
import { IdeaTokenHubABI } from "./abi/IdeaTokenHub";
import { NounsTokenABI } from "./abi/NounsToken";

// for baseSepolia
// will need to sub out when we go to mainnet
const startBlock = 11000000;

export const configAddresses = {
  Wave: "0x9deDC79469EA982bd507beB58f1c29B294b4B58d",
  IdeaTokenHub: "0x30F301933faF7f0d9e3a4cA1536A2FDAdFAdFd20",
  NounsTokenHarness: "0x3fcac51A44ba6Ec3f1D29BbC6d81b5A30522aacD",
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
    Wave: {
      network: "baseSepolia",
      abi: WaveHarnessABI,
      address: configAddresses.Wave as `0x${string}`,
      startBlock: startBlock,
    },
    IdeaTokenHub: {
      network: "baseSepolia",
      abi: IdeaTokenHubABI,
      address: configAddresses.IdeaTokenHub as `0x${string}`,
      startBlock: startBlock,
    },
    Delegate: {
      network: "baseSepolia",
      abi: DelegateABI,
      factory: {
        address: configAddresses.Wave as `0x${string}`,
        event: parseAbiItem(
          "event DelegateCreated(address delegate,uint256 id)"
        ),
        parameter: "delegate",
      },
      startBlock: startBlock,
    },
    NounsToken: {
      network: "baseSepolia",
      abi: NounsTokenABI,
      address: configAddresses.NounsTokenHarness as `0x${string}`,
      startBlock: startBlock,
    },
  },
});
