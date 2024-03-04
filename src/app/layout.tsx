import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="px-4 py-2 flex flex-row justify-between">
          <div className="flex flex-row space-x-2">
            <a href="/">Home</a>
            <a href="/ideas">Ideas</a>
            <a href="/delegate">Delegate</a>
          </div>
          <div className="flex flex-row space-x-2">
            <a href="/">Documentation</a>
            <button>Login</button>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
