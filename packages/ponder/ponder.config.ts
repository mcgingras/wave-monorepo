import { createConfig } from "@ponder/core";
import { Address, http, parseAbiItem } from "viem";
import { WaveHarnessABI } from "./abi/WaveHarness";
import { DelegateABI } from "./abi/Delegate";
import { IdeaTokenHubABI } from "./abi/IdeaTokenHub";
import { NounsTokenABI } from "./abi/NounsToken";

const startBlock = 9550000;

export const configAddresses = {
  Wave: "0x55C7c4ADEd315FF29a336cAE5671a4B0A69ae348",
  IdeaTokenHub: "0x54a488958D1f7e90aC1a9C7eE5a450d1E2170789",
  NounsTokenHarness: "0xa28Fb072290d6d731cA08EFb8f79bF4dB1D13e67",
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
