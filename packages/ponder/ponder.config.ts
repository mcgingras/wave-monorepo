import { createConfig } from "@ponder/core";
import { Address, http, parseAbiItem } from "viem";
import { PropLotHarnessABI } from "./abi/PropLotHarness";
import { DelegateABI } from "./abi/Delegate";
import { IdeaTokenHubABI } from "./abi/IdeaTokenHub";
import { NounsTokenABI } from "./abi/NounsToken";

const startBlock = 7853000;

export const configAddresses = {
  PropLotHarness: "0xD49c56d08D3c40854c0543bA5B1747f2Ad1c7b89",
  IdeaTokenHub: "0xaB626b93B3f98d79ae1FBf6c76Bf678F83E7faf3",
  NounsTokenHarness: "0x1B8D11880fe221B51FC814fF4C41366a91A59DEB",
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
