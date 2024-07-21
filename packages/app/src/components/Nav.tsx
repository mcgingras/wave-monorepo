"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import WaveIcon from "@/components/icons/Wave";
import CustomConnectKit from "./CustomConnectKit";
import { usePathname } from "next/navigation";
import DelegateDrawer from "./DelegateDrawer";
import { useAccount, useReadContract } from "wagmi";
import { configAddresses } from "@/lib/constants";
import { IdeaTokenHubABI } from "@/abi/IdeaTokenHub";
import { formatUnits } from "viem";

const Nav = () => {
  const [open, setOpen] = useState(false);
  const { address } = useAccount();
  const pathname = usePathname();

  const { data: claimableYield } = useReadContract({
    address: configAddresses.IdeaTokenHub as `0x${string}`,
    abi: IdeaTokenHubABI,
    functionName: "getClaimableYield",
    args: [address as `0x${string}`],
  });

  let parsedYield = claimableYield ? formatUnits(claimableYield, 18) : "0";
  if (parseFloat(parsedYield) < 0.001) parsedYield = "< 0.001";

  return (
    <div className="border-b fixed top-0 left-0 w-full bg-white z-10 px-4">
      {address && (
        <DelegateDrawer
          delegateAddress={address}
          open={open}
          setOpen={setOpen}
        />
      )}
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
                className={` text-neutral-400 border-0 hover:border-b transition-all ${
                  pathname === "/delegates" ? "border-b pb-1" : "pb-1"
                }`}
              >
                Delegates
              </Link>
            </li>
            <li>
              <Link
                href="/scout"
                className={`text-neutral-400 border-0 hover:border-b transition-all ${
                  pathname.includes("scout") ? "border-b pb-1" : "pb-1"
                }`}
              >
                Supporters
              </Link>
            </li>
          </ul>
          <div className="flex flex-row items-center space-x-2">
            {address && (
              <Button
                type="muted"
                onClick={() => {
                  setOpen(true);
                }}
              >
                <span className="mr-2">My reward</span>
                <span className="font-bold text-neutral-500">
                  {parsedYield} ETH
                </span>
              </Button>
            )}

            <CustomConnectKit />
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Nav;
