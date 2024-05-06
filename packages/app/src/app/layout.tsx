import type { Metadata } from "next";
import Link from "next/link";
import { OnChainProvider } from "@/components/OnChainProvider";
import Nav from "@/components/Nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Wave Protocol",
  description:
    "The Wave protocol is a protocol for submitting ideas to the Nouns DAO in a permissionless way.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactElement;
}>) {
  return (
    <html lang="en">
      <body className="polymath-text">
        <OnChainProvider>
          <>
            <div className="flex flex-col min-h-screen">
              <Nav />
              {children}
              <footer className="bg-neutral-200">
                <div className="w-[600px] mx-auto py-8 text-xs text-neutral-500">
                  <h4 className="text-center">
                    Created by Frog, Adel, and Robriks
                  </h4>
                  <ul className="mt-1 flex flex-row items-center justify-center space-x-2">
                    <li className="hover:text-neutral-600 transition-colors">
                      <Link href="https://github.com/robriks/nouns-prop-lot/blob/master/README.md">
                        Github
                      </Link>
                    </li>
                    <li className="hover:text-neutral-600 transition-colors">
                      <Link href="https://github.com/robriks/nouns-prop-lot/blob/master/README.md">
                        Warpcast
                      </Link>
                    </li>
                    <li className="hover:text-neutral-600 transition-colors">
                      <Link href="https://github.com/robriks/nouns-prop-lot/blob/master/README.md">
                        Discord
                      </Link>
                    </li>
                  </ul>
                </div>
              </footer>
            </div>
          </>
        </OnChainProvider>
      </body>
    </html>
  );
}
