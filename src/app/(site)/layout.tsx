import type { Metadata } from "next";
import "../globals.css";
import { Link, ViewTransitions } from "next-view-transitions";
import { sdk } from "@/lib/graphql-request";

export const metadata: Metadata = {
  title: "Leo Cabral",
  description: "Leo Cabral's personal website",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  const getAllPages = await sdk.GetAllPages();
  const pages = getAllPages.data.allPage;

  return (
    <ViewTransitions>
      <html lang="en">
        <body className="max-w-3xl mx-auto py-10">
          <nav className="flex justify-between">
            <Link href="/" className="text-lg font-bold bg-gradient-to-r from-orange-400 to-purple-600 bg-clip-text text-transparent">
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

          <main className="py-20">{children}</main>
        </body>
      </html>
    </ViewTransitions>
  );
}
