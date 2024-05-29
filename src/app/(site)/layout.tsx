import type { Metadata } from "next";
import "../globals.css";
import Link from "next/link";
import { ApolloWrapper } from "@/lib/apollo/wrapper";
import { gql } from "@apollo/client";
import { getClient } from "@/lib/apollo/client";
import type { Page } from "@/types/Page";

export const metadata: Metadata = {
  title: "Leo Cabral",
  description: "Leo Cabral's personal website",
};

async function getPages() {
  const PAGES_QUERY = gql`
    query AllPage {
      allPage {
        _id
        title
        slug {
          current
        }
      }
    }
  `;

  const client = getClient();

  // TODO: Type this
  const { data } = await client.query({
    query: PAGES_QUERY,
  });

  const pages: Pick<Page, '_id' | 'title' | 'slug'>[] = data.allPage.map((page: any): Pick<Page, '_id' | 'title' | 'slug'> => {
    return {
      _id: page._id,
      title: page.title,
      slug: page.slug.current,
    };
  });

  return pages;
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  const pages = await getPages();

  return (
    <html lang="en">
      <body className="max-w-3xl mx-auto py-10">
        <nav className="flex justify-between">
          <Link href="/" className="text-lg font-bold bg-gradient-to-r from-orange-400 to-purple-600 bg-clip-text text-transparent">
            Leo
          </Link>

          <ul className="flex gap-4">
            {pages.map((page) => (
              <li key={page._id}>
                <Link href={`/${page.slug}`}>
                  {page.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ApolloWrapper>
          <main className="py-20">{children}</main>
        </ApolloWrapper>
      </body>
    </html>
  );
}
