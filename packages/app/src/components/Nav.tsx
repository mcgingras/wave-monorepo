"use client";
import { ConnectKitButton } from "connectkit";
import Link from "next/link";
import Button from "@/components/ui/Button";

const Nav = () => {
  return (
    <div className="border-b">
      <div className="w-[600px] mx-auto">
        <nav className="px-4 md:px-0 py-4 flex flex-row justify-between items-center text-neutral-600 min-h-[56px]">
          <ul className="flex flex-row space-x-6">
            <li>
              <Link href="/" className="text-blue-500 font-bold">
                Wave protocol
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
            <ConnectKitButton.Custom>
              {({ isConnected, show, truncatedAddress, ensName }) => {
                return (
                  <button
                    onClick={show}
                    className={`${
                      !isConnected
                        ? "bg-blue-500 text-white hover:shadow-[0_0_0_2px_rgba(59,130,246,1)]"
                        : "bg-white text-neutral-600 border border-neutral-200 hover:shadow-[0_0_0_2px_rgba(229,229,229,1)]"
                    } rounded-md px-2 py-1 transition-all`}
                  >
                    {isConnected ? ensName ?? truncatedAddress : "Connect"}
                  </button>
                );
              }}
            </ConnectKitButton.Custom>
            {/* <ConnectKitButton /> */}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Nav;
