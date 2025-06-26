import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Josh Portfolio - Web3 Developer",
  description: "Frontend & Web3 Developer Portfolio with NFT Business Cards",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-background text-text antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
