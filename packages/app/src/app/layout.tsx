import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { OnChainProvider } from "@/components/OnChainProvider";
import Nav from "@/components/Nav";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      {/* <body className="indicate min-h-screen w-full"> */}
      <body className={`${inter.className}`}>
        <OnChainProvider>
          <>
            <Nav />
            <main className="h-[calc(100vh-200px)]">{children}</main>
          </>
        </OnChainProvider>
      </body>
    </html>
  );
}
