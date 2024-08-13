import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";

const MAINNET_RPC = process.env.PONDER_RPC_URL_1!;

const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(MAINNET_RPC),
  cacheTime: 0,
});

export default publicClient;
