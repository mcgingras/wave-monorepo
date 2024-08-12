import { createConfig } from "@ponder/core";
import { http, parseAbiItem } from "viem";
import { WaveHarnessABI } from "./abi/WaveHarness";
import { DelegateABI } from "./abi/Delegate";
import { IdeaTokenHubABI } from "./abi/IdeaTokenHub";
import { NounsTokenABI } from "./abi/NounsToken";

const mainnetStartBlock = 20466000;

export const configAddresses = {
  Wave: "0x00000000008DDB753b2dfD31e7127f4094CE5630",
  IdeaTokenHub: "0x000000000088b111eA8679dD42f7D55512fD6bE8",
  NounsTokenHarness: "0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03",
};

export default createConfig({
  networks: {
    mainnet: {
      chainId: 1,
      // @ts-ignore
      transport: http(process.env.PONDER_RPC_URL_1!),
    },
  },
  contracts: {
    Wave: {
      network: "mainnet",
      abi: WaveHarnessABI,
      address: configAddresses.Wave as `0x${string}`,
      startBlock: mainnetStartBlock,
    },
    IdeaTokenHub: {
      network: "mainnet",
      abi: IdeaTokenHubABI,
      address: configAddresses.IdeaTokenHub as `0x${string}`,
      startBlock: mainnetStartBlock,
    },
    Delegate: {
      network: "mainnet",
      abi: DelegateABI,
      factory: {
        address: configAddresses.Wave as `0x${string}`,
        event: parseAbiItem(
          "event DelegateCreated(address delegate,uint256 id)"
        ),
        parameter: "delegate",
      },
      startBlock: mainnetStartBlock,
    },
    NounsToken: {
      network: "mainnet",
      abi: NounsTokenABI,
      address: configAddresses.NounsTokenHarness as `0x${string}`,
      startBlock: mainnetStartBlock,
    },
  },
});
