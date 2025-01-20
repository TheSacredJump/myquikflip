import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {
  ClerkProvider,
} from '@clerk/nextjs'


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "QuikFlip - Instantly Utilize Crypto Assets",
  description: "Immediately convert crypto assets to fiat currency and buy anything you want.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-gray-950 text-white antialiased`}
      >
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
