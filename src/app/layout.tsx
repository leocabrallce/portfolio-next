import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

type Props = Readonly<{ children: React.ReactNode; }>;

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>
        {children}

        <Analytics />
      </body>
    </html>
  );
}
