import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Josh - Frontend & Web3 Developer",
  description: "Portfolio de Josh - Frontend & Web3 Developer especializado em React, Next.js e contratos inteligentes",
  keywords: ["Josh", "Frontend Developer", "Web3", "React", "Next.js", "Blockchain", "Smart Contracts"],
  authors: [{ name: "Josh" }],
  creator: "Josh",
  openGraph: {
    title: "Josh - Frontend & Web3 Developer",
    description: "Portfolio de Josh - Frontend & Web3 Developer especializado em React, Next.js e contratos inteligentes",
    url: "https://josh-alot.sh",
    siteName: "Josh Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Josh - Frontend & Web3 Developer",
    description: "Portfolio de Josh - Frontend & Web3 Developer especializado em React, Next.js e contratos inteligentes",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
