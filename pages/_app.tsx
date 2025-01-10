'use client';

import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

// External
import {
  RainbowKitProvider,
  getDefaultConfig,
} from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import {
  mainnet,
  polygon,
  optimism,
  goerli,
  sepolia,
  apeChain,
} from "viem/chains";
import { http } from "viem";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Internal
import { appName, projectId } from "../utils";

const config = getDefaultConfig({
  appName,
  projectId,
  chains: [
    mainnet,
    polygon,
    optimism,
    apeChain,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
      ? [goerli, sepolia]
      : []),
  ],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [optimism.id]: http(),
    [apeChain.id]: http(),
    [goerli.id]: http(),
    [sepolia.id]: http(),
  },
});

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider modalSize="compact">
          <Component {...pageProps} />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;
