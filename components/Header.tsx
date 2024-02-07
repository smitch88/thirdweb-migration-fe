// External
import Link from "next/link";
import { FC } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const Header: FC = () => {
  return (
    <header className="flex flex-row items-center justify-between px-6 py-6">
      <div className="flex flex-row items-center">
        <Link className="nav-link text-3xl font-bold" href="/"><img src="/assets/logo-sm.png" alt="Shift logo" /></Link>
        <Link className="nav-link text-3xl" href="/migrate">Migrate</Link>
        <Link className="nav-link text-3xl" href="/wrap">Wrap</Link>
      </div>
      <ConnectButton />
    </header>
  );
};

export default Header;
