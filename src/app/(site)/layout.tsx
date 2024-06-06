import "../globals.css";
import type { Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";
import { Inter, Josefin_Sans } from 'next/font/google';
import { cn } from "@/utils/classNames";
import FloatingNavbar from "@/components/FloatingNavbar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from 'next-themes';

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
  const rootClassNames = cn(inter.variable, josefinSans.variable, "transition-colors scroll-smooth bg-primary-light text-primary-dark dark:bg-primary-dark dark:text-primary-light");

  return (
    <ViewTransitions>

      <html lang="en" className={rootClassNames} >
        <body className="overscroll-y-none">
          <ThemeProvider>
            {/*
              Suppressing hydration warning because the dark mode updates the element in the client side.
              This property only applies one level deep, so it won't block hydration warnings on other elements.
            */}
            <div suppressContentEditableWarning>
              <FloatingNavbar items={pages} />

              <main>{children}</main>

              <Footer />

              <Analytics />
              <SpeedInsights />
            </div>
          </ThemeProvider>
        </body>
      </html>

    </ViewTransitions>
  );
}