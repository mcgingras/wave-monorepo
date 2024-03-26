"use client";
import { ConnectKitButton } from "connectkit";
import Link from "next/link";
import WaveIcon from "./icons/Wave";

const Nav = () => {
  return (
    <div className="w-full p-4">
      <nav className="px-8 py-2 flex flex-row justify-between items-center bg-white border rounded-lg">
        <ul className="flex flex-row space-x-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/ideas">Ideas</Link>
          </li>
          <li>
            <Link href="/delegates">Delegate</Link>
          </li>
        </ul>
        <div className="flex flex-row items-center space-x-4">
          <a href="/">Documentation</a>
          <ConnectKitButton />
        </div>
      </nav>
    </div>
  );
};

export default Nav;
