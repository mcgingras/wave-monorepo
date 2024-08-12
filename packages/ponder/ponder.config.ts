import { createConfig } from "@ponder/core";
import { http, parseAbiItem } from "viem";
import { WaveHarnessABI } from "./abi/WaveHarness";
import { DelegateABI } from "./abi/Delegate";
import { IdeaTokenHubABI } from "./abi/IdeaTokenHub";
import { NounsTokenABI } from "./abi/NounsToken";

const isProd = true;
const baseSepoliaStartBlock = 12000000;
const mainnetStartBlock = 20466000;

const baseSepoliaContracts = {
  Wave: "0x443f1F80fBB72Fa40cA70A93a0139852b0563961",
  IdeaTokenHub: "0xAFFED3815a60aACeACDA3aE53425f053eD6Efc4d",
  NounsTokenHarness: "0xE8b46D16107e1d562B62B5aA8d4bF9A60e6c51b4",
};

const mainnetContracts = {
  Wave: "0x00000000008DDB753b2dfD31e7127f4094CE5630",
  IdeaTokenHub: "0x000000000088b111eA8679dD42f7D55512fD6bE8",
  NounsTokenHarness: "0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03",
};

export const configAddresses = {
  Wave: isProd ? mainnetContracts.Wave : baseSepoliaContracts.Wave,
  IdeaTokenHub: isProd
    ? mainnetContracts.IdeaTokenHub
    : baseSepoliaContracts.IdeaTokenHub,
  NounsTokenHarness: isProd
    ? mainnetContracts.NounsTokenHarness
    : baseSepoliaContracts.NounsTokenHarness,
};

export default createConfig({
  networks: {
    baseSepolia: {
      chainId: 84532,
      // @ts-ignore
      transport: http(process.env.PONDER_RPC_URL_84532!),
    },
    mainnet: {
      chainId: 1,
      // @ts-ignore
      transport: http(process.env.PONDER_RPC_URL_1!),
    },
  },
  contracts: {
    Wave: {
      network: isProd ? "mainnet" : "baseSepolia",
      abi: WaveHarnessABI,
      address: configAddresses.Wave as `0x${string}`,
      startBlock: isProd ? mainnetStartBlock : baseSepoliaStartBlock,
    },
    IdeaTokenHub: {
      network: isProd ? "mainnet" : "baseSepolia",
      abi: IdeaTokenHubABI,
      address: configAddresses.IdeaTokenHub as `0x${string}`,
      startBlock: isProd ? mainnetStartBlock : baseSepoliaStartBlock,
    },
    Delegate: {
      network: isProd ? "mainnet" : "baseSepolia",
      abi: DelegateABI,
      factory: {
        address: configAddresses.Wave as `0x${string}`,
        event: parseAbiItem(
          "event DelegateCreated(address delegate,uint256 id)"
        ),
        parameter: "delegate",
      },
      startBlock: isProd ? mainnetStartBlock : baseSepoliaStartBlock,
    },
    NounsToken: {
      network: isProd ? "mainnet" : "baseSepolia",
      abi: NounsTokenABI,
      address: configAddresses.NounsTokenHarness as `0x${string}`,
      startBlock: isProd ? mainnetStartBlock : baseSepoliaStartBlock,
    },
  },
});
