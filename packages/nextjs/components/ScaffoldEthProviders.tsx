"use client";

import { RainbowKitProvider, darkTheme, lightTheme } from "@rainbow-me/rainbowkit";
import { WagmiConfig } from "wagmi";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { ProgressBar } from "~~/components/scaffold-eth/ProgressBar";
import { useDarkMode } from "~~/hooks/scaffold-eth/useDarkMode";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";
import { appChains } from "~~/services/web3/wagmiConnectors";

export const ScaffoldEthProviders = ({ children }: { children: React.ReactNode }) => {
  const { isDarkMode } = useDarkMode();

  return (
    <WagmiConfig config={wagmiConfig}>
      <ProgressBar />
      <RainbowKitProvider
        chains={appChains.chains}
        avatar={BlockieAvatar}
        theme={isDarkMode ? darkTheme() : lightTheme()}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
};
