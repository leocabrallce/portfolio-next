import "../globals.css";
import type { Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";
import { Inter, Josefin_Sans } from 'next/font/google';
import { clsx } from "clsx";
import FloatingNavbar from "@/components/FloatingNavbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const josefinSans = Josefin_Sans({
  subsets: ['latin'],
  variable: '--font-josefin-sans',
});

export const metadata: Metadata = {
  title: "Leo Cabral",
  description: "Leo Cabral's personal website",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  const pages: { name: string; link: string; }[] = [
    // { name: "About", link: "/about" },
    // { name: "Projects", link: "/projects" },
  ];
  const rootClassNames = clsx(inter.variable, josefinSans.variable, "scroll-smooth bg-primary-light text-primary-dark dark:bg-primary-dark dark:text-primary-light");

  return (
    <ViewTransitions>
      <html lang="en" className={rootClassNames}>
        <body className="overscroll-y-none">
          <FloatingNavbar items={pages} />

          <main>{children}</main>

          <Footer />
        </body>
      </html>
    </ViewTransitions>
  );
}
