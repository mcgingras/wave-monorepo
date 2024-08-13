import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";

const mainnetClient = createPublicClient({
  chain: mainnet,
  transport: http(
    `https://eth-mainnet.g.alchemy.com/v2/${process.env
      .NEXT_PUBLIC_ALCHEMY_API_KEY!}`
  ),
});

export const getClient = (chainId: number) => {
  switch (chainId) {
    case 1:
      return mainnetClient;
    default:
      throw new Error("Unsupported chain");
  }
};
