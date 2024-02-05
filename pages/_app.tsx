// Styles
import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

// External
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { goerli, sepolia, polygonMumbai, mainnet, polygon, optimism } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

// Internal
import { appName, projectId } from "../utils";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    // arbitrum,
    // base,
    // zora,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
      ? [goerli, sepolia, polygonMumbai]
      : []),
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: appName,
  projectId: projectId,
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: false,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
