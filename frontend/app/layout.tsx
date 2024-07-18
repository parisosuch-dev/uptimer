import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <body className={`${inter.className} bg-gray-100 h-screen flex flex-col`}>
        <div className="w-full flex justify-between py-8 px-16">
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
