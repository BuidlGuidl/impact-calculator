"use client";

import Link from "next/link";
import { SaveList } from "./impact-vector/SaveList";
import { useAccount } from "wagmi";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";

/**
 * Site header
 */
export const Header = () => {
  const { isConnected } = useAccount();
  return (
    <div className="sticky lg:static top-0 navbar bg-base-100 min-h-0 flex-shrink-0 z-20 px-0 sm:px-2">
      <div className="md:navbar-end hidden md:flex text-right items-center lg:w-1/2">
        <Link href="/" passHref className="flex items-center gap-2 ml-4 mr-6 shrink-0">
          <h2 className="text-right">Impact Calculator 🌱</h2>
        </Link>
      </div>
      <div className="navbar-end flex-grow mr-4">
        {isConnected && <SaveList />}
        <RainbowKitCustomConnectButton />
      </div>
    </div>
  );
};
