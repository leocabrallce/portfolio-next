import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Leo Cabral",
  description: "Leo Cabral's personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="max-w-3xl mx-auto py-10">
        <nav>
          <Link href="/" className="text-lg font-bold bg-gradient-to-r from-orange-400 to-purple-600 bg-clip-text text-transparent">
            Leo
          </Link>
        </nav>

        <main className="py-20">{children}</main></body>
    </html>
  );
}
