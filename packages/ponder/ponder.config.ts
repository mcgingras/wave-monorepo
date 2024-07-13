import { createConfig } from "@ponder/core";
import { Address, http, parseAbiItem } from "viem";
import { WaveHarnessABI } from "./abi/WaveHarness";
import { DelegateABI } from "./abi/Delegate";
import { IdeaTokenHubABI } from "./abi/IdeaTokenHub";
import { NounsTokenABI } from "./abi/NounsToken";

// for baseSepolia
// will need to sub out when we go to mainnet
const startBlock = 12000000;

export const configAddresses = {
  Wave: "0x443f1F80fBB72Fa40cA70A93a0139852b0563961",
  IdeaTokenHub: "0xAFFED3815a60aACeACDA3aE53425f053eD6Efc4d",
  NounsTokenHarness: "0xE8b46D16107e1d562B62B5aA8d4bF9A60e6c51b4",
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
