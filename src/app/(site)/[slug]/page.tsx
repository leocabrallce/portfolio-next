import { PortableText } from 'next-sanity';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { gql } from "@apollo/client";
import { getClient } from "@/lib/apollo/client";
import type { Page } from "@/types/Page";

type PageProps = Readonly<{
  params: {
    slug: string;
  };
}>;

async function getPage(slug: string) {
  const PAGE_QUERY = gql`
    query GetPage($slug: String!) {
      allPage(where: { slug: { current: { eq: $slug } } }) {
        _id
        title
        contentRaw
        slug {
          current
        }
      }
    }
  `;

  const client = getClient();

  // TODO: Type this
  const { data } = await client.query({
    query: PAGE_QUERY,
    variables: {
      slug: slug,
    },
  });

  const page: Pick<Page, '_id' | 'title' | 'slug' | 'content'> = {
    _id: data.allPage[0]._id,
    title: data.allPage[0].title,
    slug: data.allPage[0].slug.current,
    content: data.allPage[0].contentRaw,
  };

  return page;
}

async function handleFetch(slug: string) {
  const page = await getPage(slug);

  if (!page) {
    return notFound();
  }

  return page;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = await handleFetch(params.slug);

  return {
    title: page.title,
    description: page.title,
  };
}

async function Page({ params }: PageProps) {
  const page = await handleFetch(params.slug);

  return (
    <div>
      <h1>{page.title}</h1>

      <article className='prose'>
        <PortableText value={page.content} />
      </article>
    </div>
  );
}

export default Page;