"use client";

import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

const config = createConfig(
  getDefaultConfig({
    chains: [mainnet],
    transports: {
      [mainnet.id]: http(
        `https://eth-mainnet.g.alchemy.com/v2/${process.env
          .NEXT_PUBLIC_ALCHEMY_API_KEY!}`
      ),
    },
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    appName: "Prop Lot Protocol",
    appDescription: "PropLot Protocol gets your ideas on-chain.",
    // appUrl: "", // TODO: add this when we have it
    // appIcon: "", // TODO: add this when we have it
  })
);

const queryClient = new QueryClient();

export const OnChainProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider mode="light">{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
