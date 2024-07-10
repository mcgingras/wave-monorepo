import { createPublicClient, http } from "viem";
import { baseSepolia, mainnet } from "viem/chains";

const mainnetClient = createPublicClient({
  chain: mainnet,
  transport: http(
    `https://eth-mainnet.g.alchemy.com/v2/${process.env
      .NEXT_PUBLIC_ALCHEMY_API_KEY!}`
  ),
});

const baseSepoliaClient = createPublicClient({
  chain: baseSepolia,
  transport: http(process.env.NEXT_PUBLIC_BASE_SEPOLIA_RPC!),
});

export const getClient = (chainId: number) => {
  switch (chainId) {
    case 1:
      return mainnetClient;
    case 31337:
      return baseSepoliaClient;
    default:
      throw new Error("Unsupported chain");
  }
};

export const client = createPublicClient({
  chain: baseSepolia,
  transport: http(process.env.NEXT_PUBLIC_BASE_SEPOLIA_RPC!),
});
