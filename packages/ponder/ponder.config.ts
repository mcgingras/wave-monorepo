import { createConfig } from "@ponder/core";
import { Address, http } from "viem";

const startBlock = 5300000;

export const configAddresses = {};

export default createConfig({
  networks: {
    sepolia: {
      chainId: 11155111,
      transport: http(process.env.PONDER_RPC_URL_11155111),
    },
  },
  contracts: {
    // Easel: {
    //   network: "sepolia",
    //   abi: EaselAbi,
    //   address: configAddresses.Easel,
    //   startBlock: startBlock,
    // },
  },
});
