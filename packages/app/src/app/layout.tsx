import type { Metadata } from "next";
import { OnChainProvider } from "@/components/OnChainProvider";
import { Toaster } from "react-hot-toast";
import MobilePlaceholder from "@/components/MobilePlaceholder";
import Nav from "@/components/Nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Wave Protocol",
  description:
    "The Wave protocol is a protocol for submitting ideas to the Nouns DAO in a permissionless way.",
};

export default function RootLayout({
  children,
  slider,
}: Readonly<{
  children: React.ReactNode;
  slider: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="polymath-text">
        <OnChainProvider>
          <MobilePlaceholder>
            <>
              <Toaster />
              <div className="flex flex-col min-h-screen">
                <Nav />
                {children}
                {slider}
              </div>
            </>
          </MobilePlaceholder>
        </OnChainProvider>
      </body>
    </html>
  );
}
