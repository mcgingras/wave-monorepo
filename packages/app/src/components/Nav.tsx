"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import WaveIcon from "@/components/icons/Wave";
import CustomConnectKit from "./CustomConnectKit";
import { usePathname } from "next/navigation";

const Nav = () => {
  const pathname = usePathname();

  return (
    <div className="border-b fixed top-0 left-0 w-full bg-white z-10">
      <div className="container mx-auto">
        <nav className="px-4 md:px-0 py-4 flex flex-row justify-between items-center text-neutral-600 min-h-[56px]">
          <ul className="flex flex-row items-center space-x-6">
            <li>
              <Link href="/" className="text-blue-500">
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
                href="/delegates"
                className={` hover:text-neutral-500 transition-all ${
                  pathname === "/delegates"
                    ? "text-neutral-500"
                    : "text-neutral-400"
                }`}
              >
                Delegates
              </Link>
            </li>
            <li>
              <Link
                href="/scout"
                className={`hover:text-neutral-500 transition-all ${
                  pathname.includes("scout")
                    ? "text-neutral-500"
                    : "text-neutral-400"
                }`}
              >
                Supporters
              </Link>
            </li>
          </ul>
          <div className="flex flex-row items-center space-x-2">
            <Link href="/delegates">
              <Button title="My rewards" type="muted" />
            </Link>
            <CustomConnectKit />
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Nav;
