import "../globals.css";
import type { Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";
import { Inter, Josefin_Sans } from 'next/font/google';
import { clsx } from "clsx";
import FloatingNavbar from "@/components/FloatingNavbar";
import Footer from "@/components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";

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

type Props = Readonly<{ children: React.ReactNode; }>;

export default async function RootSiteLayout({ children }: Props) {
  const pages: { name: string; link: string; }[] = [
    // { name: "About", link: "/about" },
    // { name: "Projects", link: "/projects" },
  ];
  const rootClassNames = clsx(inter.variable, josefinSans.variable, "scroll-smooth bg-primary-light text-primary-dark dark:bg-primary-dark dark:text-primary-light overscroll-y-none");

  return (
    <>
      <ViewTransitions>
        <div className={rootClassNames}>
          <FloatingNavbar items={pages} />

          <main>{children}</main>

          <Footer />
        </div>
      </ViewTransitions>

      <SpeedInsights />
    </>
  );
}