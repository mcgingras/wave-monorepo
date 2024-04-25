import type { Metadata } from "next";
import Link from "next/link";
import { OnChainProvider } from "@/components/OnChainProvider";
import Nav from "@/components/Nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "PropLot",
  description:
    "PropLot protocol is a protocol for submitting ideas to the PropLot DAO in a permissionless way.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactElement;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="polymath-text h-full min-h-screen">
        <OnChainProvider>
          <>
            <div className="h-full flex flex-col">
              <Nav />
              <main className="grow min-h-[calc(100vh-65px)]">{children}</main>
            </div>
          </>
        </OnChainProvider>
      </body>
    </html>
  );
}
