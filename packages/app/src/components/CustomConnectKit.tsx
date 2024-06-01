"use client";

import { useState, useEffect, useRef } from "react";
import { ConnectKitButton } from "connectkit";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useDisconnect } from "wagmi";
import { useRouter } from "next/navigation";

const CustomConnectKit = () => {
  const router = useRouter();
  const { disconnect } = useDisconnect();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event: any) => {
    // @ts-ignore
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, truncatedAddress, ensName, address }) => {
        return (
          <div className="relative">
            <button
              onClick={isConnected ? () => setShowDropdown(true) : show}
              className={`${
                !isConnected
                  ? "bg-blue-500 text-white hover:shadow-[0_0_0_2px_rgba(59,130,246,1)]"
                  : "bg-white text-neutral-600 border border-neutral-200 hover:shadow-[0_0_0_2px_rgba(229,229,229,1)]"
              } rounded-md px-2 py-1 transition-all`}
            >
              {isConnected ? (
                <span className="flex flex-row items-center space-x-1">
                  <span>{ensName ?? truncatedAddress}</span>
                  {showDropdown ? (
                    <ChevronUpIcon className="h-5 w-5" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5" />
                  )}
                </span>
              ) : (
                "Connect"
              )}
            </button>
            {showDropdown && (
              <div
                className="absolute w-[150px] border rounded-lg p-2 right-0 top-[40px] bg-white text-neutral-600"
                ref={dropdownRef}
              >
                <ul>
                  <li
                    className="hover:text-neutral-500 cursor-pointer transition-colors"
                    onClick={() => {
                      router.push(`/scout/${address}`);
                      setShowDropdown(false);
                    }}
                  >
                    Profile
                  </li>

                  <Link href="/">
                    <li className="hover:text-neutral-500 cursor-pointer transition-colors">
                      Docs
                    </li>
                  </Link>

                  <li
                    className="hover:text-neutral-500 cursor-pointer transition-colors"
                    onClick={() => {
                      // trigger wagmi disconnect?
                      disconnect();
                      setShowDropdown(false);
                    }}
                  >
                    Disconnect
                  </li>
                </ul>
              </div>
            )}
          </div>
        );
      }}
    </ConnectKitButton.Custom>
  );
};

export default CustomConnectKit;
