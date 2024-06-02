import "../globals.css";
import type { Metadata } from "next";
import { Link, ViewTransitions } from "next-view-transitions";
import { Inter, Josefin_Sans } from 'next/font/google';
import { clsx } from "clsx";

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
  const pages = [
    { _id: "about", title: "About", slug: { current: "about" } },
    { _id: "projects", title: "Projects", slug: { current: "projects" } },
  ];
  const rootClassNames = clsx(inter.variable, josefinSans.variable);

  return (
    <ViewTransitions>
      <html lang="en" className={rootClassNames}>
        <body className="relative overscroll-y-none">
          <nav className="sticky top-0 z-10 bg-black text-white flex justify-between py-2 px-4 sm:py-4 sm:px-8">
            <Link href="/" className="text-lg font-bold">
              Leo
            </Link>

            <ul className="flex gap-4">
              {pages.map((page) => (
                <li key={page._id}>
                  <Link href={`/${page.slug?.current}`}>
                    {page.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>


          <div className="py-2 px-4 sm:py-4 sm:px-8">
            {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
            <main className="">{children}</main>
          </div>
        </body>
      </html>
    </ViewTransitions>
  );
}
