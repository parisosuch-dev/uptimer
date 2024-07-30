import type { Metadata } from "next";
import Link from "next/link";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import "./globals.css";

export const metadata: Metadata = {
  title: "uptimer",
  description: "Log uptimes of services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="bg-gray-50 h-screen flex flex-col">
        <div className="w-full flex justify-between py-8 px-24">
          <Link href="/" className="text-2xl font-bold">
            uptimer.
          </Link>
          <Link href="/services" className="text-xl font-medium">
            my services
          </Link>
        </div>
        {children}
      </body>
    </html>
  );
}
