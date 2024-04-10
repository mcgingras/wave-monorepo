"use client";
import { ConnectKitButton } from "connectkit";
import Link from "next/link";

const Nav = () => {
  return (
    <div className="w-full">
      <nav className="px-4 md:px-0 py-4 flex flex-row justify-between items-center text-neutral-600 min-h-[56px]">
        <ul className="flex flex-row space-x-6">
          <li>
            <Link href="/" className="text-blue-500 font-bold">
              Wave
            </Link>
          </li>
          <li>
            <Link href="https://github.com/robriks/nouns-prop-lot/blob/master/README.md">
              Documentation
            </Link>
          </li>
        </ul>
        <div className="flex flex-row items-center space-x-4">
          <ConnectKitButton />
        </div>
      </nav>
    </div>
  );
};

export default Nav;
