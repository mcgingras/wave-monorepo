import { createConfig } from "@ponder/core";
import { Address, http, parseAbiItem } from "viem";
import { PropLotHarnessABI } from "./abi/PropLotHarness";
import { DelegateABI } from "./abi/Delegate";
import { IdeaTokenHubABI } from "./abi/IdeaTokenHub";
import { NounsTokenABI } from "./abi/NounsToken";

const startBlock = 7853000;

export const configAddresses = {
  PropLotHarness: "0x92bc9f0D42A3194Df2C5AB55c3bbDD82e6Fb2F92",
  IdeaTokenHub: "0x114Bb2c1b74E931fC4bF77754c4f684958ac2099",
  NounsTokenHarness: "0x9B786579B3d4372d54DFA212cc8B1589Aaf6DcF3",
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
    Delegate: {
      network: "baseSepolia",
      abi: DelegateABI,
      factory: {
        address: configAddresses.PropLotHarness as `0x${string}`,
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
