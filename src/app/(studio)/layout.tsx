import type { Metadata } from "next";
import "../globals.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Leo Cabral",
  description: "Leo Cabral's personal website",
};

type Props = Readonly<{ children: React.ReactNode; }>;

export default function RootAdminLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>
        {children}

        <Analytics />
      </body>
    </html>
  );
}