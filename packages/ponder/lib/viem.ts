import { createPublicClient, http } from "viem";
import { mainnet, baseSepolia } from "viem/chains";

const isProd = false;
const BASE_RPC = process.env.PONDER_RPC_URL_XXX!;
const BASE_SEPOLIA_RPC = process.env.PONDER_RPC_URL_84532!;

const publicClient = createPublicClient({
  chain: isProd ? mainnet : baseSepolia,
  transport: http(isProd ? BASE_RPC : BASE_SEPOLIA_RPC),
});

export default publicClient;
