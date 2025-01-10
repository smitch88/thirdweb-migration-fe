// Styles
import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

// External
import {
  RainbowKitProvider,
  getDefaultWallets,
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
import { WagmiProvider } from "wagmi";
import { createConfig, http } from "@wagmi/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { injected, walletConnect } from "@wagmi/connectors";

// Internal
import { appName, projectId } from "../utils";

const { wallets } = getDefaultWallets({
  appName,
  projectId,
  chains: [mainnet, polygon, optimism, apeChain],
});

const config = createConfig({
  chains: [
    mainnet,
    polygon,
    optimism,
    apeChain,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
      ? [goerli, sepolia]
      : []),
  ],
  connectors: [
    injected(),
    walletConnect({ projectId }),
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
        <RainbowKitProvider>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;
