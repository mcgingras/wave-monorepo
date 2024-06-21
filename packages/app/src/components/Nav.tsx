"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import WaveIcon from "@/components/icons/Wave";
import CustomConnectKit from "./CustomConnectKit";

const Nav = () => {
  return (
    <div className="border-b fixed top-0 left-0 w-full bg-white z-10">
      <div className="container mx-auto">
        <nav className="px-4 md:px-0 py-4 flex flex-row justify-between items-center text-neutral-600 min-h-[56px]">
          <ul className="flex flex-row items-center space-x-3">
            <li>
              <Link href="/" className="text-blue-500 font-bold">
                <WaveIcon className="h-10 w-10" />
              </Link>
            </li>
            <li>
              <Link href="/" className="text-blue-500">
                Wave Protocol
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-neutral-400 hover:text-neutral-500 font-normal transition-all"
              >
                Docs
              </Link>
            </li>
          </ul>
          <div className="flex flex-row items-center space-x-2">
            <Link href="/idea/new">
              <Button title="Add idea" type="secondary" />
            </Link>
            <Link href="/delegates">
              <Button title="Delegate" type="secondary" />
            </Link>
            <CustomConnectKit />
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Nav;
